// Booking page: date/time picker, validation, and submit to Formspree (email)
// and Firebase (orders log).
import { HOURS, formatHour } from "./site.js";
import { currentDate, formatDate, formatTimeTo12Hour, isEmailValid } from "./utils.js";
import { CATEGORIES, TECHNICIANS, formatDuration } from "./services.js";

// ---------- Picker settings ----------
const DAYS_AHEAD = 21;          // how many days the date strip shows
const SLOT_MINUTES = 15;        // spacing between time slots; booked length rounds up to this
const DEFAULT_MINUTES = 30;     // appointment length assumed before any service is picked
const SAME_DAY_LEAD_MINUTES = 30;  // today's slots must start at least this far from now

const form = document.getElementById("bookingForm");
const status = form.querySelector(".form-status");
const submit = form.querySelector('button[type="submit"]');
const dateGroup = document.getElementById("date-group");
const timeGroup = document.getElementById("time-group");
const hoursHint = document.getElementById("hours-hint");
const summary = document.getElementById("picker-summary");
const categoryGroup = document.getElementById("category-group");
const servicePicker = document.getElementById("service-picker");
const serviceGroup = document.getElementById("service-group");
const selectedBox = document.getElementById("selected-services");
const selectedList = document.getElementById("selected-list");
const selectedTotal = document.getElementById("selected-total");
const techSelect = document.getElementById("technician");
const techHint = document.getElementById("tech-hint");

// ---------- Helpers ----------
const pad = (n) => String(n).padStart(2, "0");
const toISODate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toTimeValue = (h) => `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60))}`;

// Parse "YYYY-MM-DD" as a local date (not UTC).
function parseDate(value) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
}

const checked = (name) => form.querySelector(`input[name="${name}"]:checked`);

// ---------- Services ----------
const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

// Item value is "<category>:<s|a>:<index>" (s = service, a = add-on).
function itemFor(value) {
    const [catId, kind, i] = value.split(":");
    const cat = categoryById[catId];
    const item = (kind === "a" ? cat.addons : cat.services)[Number(i)];
    return { ...item, category: cat, addon: kind === "a", value };
}

function selectedItems() {
    return [...form.querySelectorAll('input[name="item"]:checked')].map((el) => itemFor(el.value));
}

function totalMinutes() {
    return selectedItems().reduce((sum, item) => sum + item.min, 0);
}

function chip(cat, kind, item, i) {
    const label = document.createElement("label");
    label.className = "service-chip";
    label.innerHTML = `
        <input type="checkbox" name="item" value="${cat.id}:${kind}:${i}">
        <span>${item.name}<small>${kind === "a" ? "+" : ""}${formatDuration(item.min)}</small></span>`;
    return label;
}

function renderServicePanels() {
    const kept = new Set(selectedItems().map((i) => i.value));
    const picked = [...categoryGroup.querySelectorAll("input:checked")].map((el) => el.value);
    const frag = document.createDocumentFragment();

    CATEGORIES.filter((c) => picked.includes(c.id)).forEach((cat) => {
        const panel = document.createElement("div");
        panel.className = "service-panel";
        panel.innerHTML = `<p class="service-panel-name">${cat.name}</p><div class="chip-grid"></div>`;
        const grid = panel.querySelector(".chip-grid");
        cat.services.forEach((item, i) => grid.appendChild(chip(cat, "s", item, i)));

        if (cat.addons.length) {
            const head = document.createElement("p");
            head.className = "service-addon-head";
            head.textContent = "Add-ons";
            const addons = document.createElement("div");
            addons.className = "chip-grid";
            cat.addons.forEach((item, i) => addons.appendChild(chip(cat, "a", item, i)));
            panel.append(head, addons);
        }
        frag.appendChild(panel);
    });

    serviceGroup.replaceChildren(frag);
    serviceGroup.querySelectorAll('input[name="item"]').forEach((el) => { el.checked = kept.has(el.value); });
    servicePicker.hidden = picked.length === 0;
}

function renderSelected() {
    const items = selectedItems();
    selectedBox.hidden = items.length === 0;
    if (!items.length) return;

    selectedList.replaceChildren(...items.map((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="selected-name">
                <small>${item.category.name}${item.addon ? " · Add-on" : ""}</small>
                ${item.name}
            </span>
            <span class="selected-min">${item.addon ? "+" : ""}${formatDuration(item.min)}</span>
            <button type="button" class="selected-remove" data-value="${item.value}" aria-label="Remove ${item.name}">×</button>`;
        return li;
    }));
    selectedTotal.textContent = `Total ${formatDuration(totalMinutes())}`;
}

selectedList.addEventListener("click", (e) => {
    const btn = e.target.closest(".selected-remove");
    if (!btn) return;
    const input = serviceGroup.querySelector(`input[value="${btn.dataset.value}"]`);
    if (input) input.checked = false;
    onServicesChange();
});

// ---------- Technician ----------
techSelect.replaceChildren(...TECHNICIANS.map((t) => new Option(t.name, t.id)));
const currentTech = () => TECHNICIANS.find((t) => t.id === techSelect.value) || TECHNICIANS[0];

function updateTechHint() {
    const tech = currentTech();
    techHint.hidden = !tech.days;
    if (tech.days) {
        const names = tech.days.map((d) => new Date(2024, 0, 7 + d).toLocaleDateString("en-US", { weekday: "long" }));
        techHint.textContent = `${tech.name} works ${names.reverse().map((n) => `${n}s`).join(" & ")} only.`;
    }
}

// Internal only: the time held for an appointment, rounded up to the next
// 15-min block (e.g. 2 hr 5 min -> 2 hr 15 min) so the next customer starts
// on a slot. Customers always see the real service length and end time.
function blockMinutes() {
    const min = totalMinutes() || DEFAULT_MINUTES;
    return Math.ceil(min / SLOT_MINUTES) * SLOT_MINUTES;
}

// Start times (decimal hours) on the given date; a slot is available when the
// whole appointment fits before closing and the technician works that day.
function slotsFor(date) {
    const [open, close] = HOURS[date.getDay()];
    const block = blockMinutes() / 60;                       // used for availability only
    const length = (totalMinutes() || DEFAULT_MINUTES) / 60; // shown to the customer
    const tech = currentTech();
    const works = !tech.days || tech.days.includes(date.getDay());
    const now = new Date();
    const isToday = toISODate(date) === toISODate(now);
    const earliest = now.getHours() + (now.getMinutes() + SAME_DAY_LEAD_MINUTES) / 60;

    const slots = [];
    for (let t = open; t <= close - SLOT_MINUTES / 60 + 1e-9; t += SLOT_MINUTES / 60) {
        const fits = t + block <= close + 1e-9;
        slots.push({ hour: t, end: t + length, available: works && fits && (!isToday || t >= earliest) });
    }
    return slots;
}

// ---------- Date strip ----------
function renderDates() {
    const previous = checked("date")?.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const frag = document.createDocumentFragment();

    for (let i = 0; i < DAYS_AHEAD; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const value = toISODate(d);
        const open = slotsFor(d).some((s) => s.available);
        const top = i === 0 ? "Today" : i === 1 ? "Tmrw" : d.toLocaleDateString("en-US", { weekday: "short" });
        const month = d.toLocaleDateString("en-US", { month: "short" });
        const full = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

        const label = document.createElement("label");
        label.className = "date-chip";
        label.innerHTML = `
            <input type="radio" name="date" value="${value}" ${open ? "" : "disabled"} ${open && value === previous ? "checked" : ""}
                aria-label="${full}${open ? "" : ", no times left"}">
            <span>
                <small>${top}</small>
                <strong>${d.getDate()}</strong>
                <small>${month}</small>
            </span>`;
        frag.appendChild(label);
    }
    dateGroup.replaceChildren(frag);
}

document.querySelectorAll(".picker-arrow").forEach((btn) => {
    btn.addEventListener("click", () => {
        const dir = Number(btn.dataset.scroll);
        dateGroup.scrollBy({ left: dir * dateGroup.clientWidth * 0.8, behavior: "smooth" });
    });
});

// ---------- Time slots ----------
const PERIODS = [
    { name: "Morning", test: (h) => h < 12 },
    { name: "Afternoon", test: (h) => h >= 12 && h < 17 },
    { name: "Evening", test: (h) => h >= 17 },
];

function renderTimes() {
    const dateInput = checked("date");
    const previous = checked("time")?.value;

    if (!dateInput) {
        hoursHint.textContent = "";
        timeGroup.innerHTML = `<p class="slots-empty"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg><span>Choose a date to see available times.</span></p>`;
        return;
    }

    const date = parseDate(dateInput.value);
    const [open, close] = HOURS[date.getDay()];
    hoursHint.textContent = `Open ${formatHour(open)} – ${formatHour(close)}`;

    const slots = slotsFor(date);
    const frag = document.createDocumentFragment();

    PERIODS.forEach(({ name, test }) => {
        const group = slots.filter((s) => test(s.hour));
        if (!group.length) return;

        const section = document.createElement("div");
        section.className = "slot-period";
        section.innerHTML = `<p class="slot-period-name">${name}</p><div class="slot-grid"></div>`;
        const grid = section.querySelector(".slot-grid");

        group.forEach(({ hour, end, available }) => {
            const value = toTimeValue(hour);
            const label = document.createElement("label");
            label.className = "time-slot";
            label.innerHTML = `
                <input type="radio" name="time" value="${value}"
                    ${available ? "" : "disabled"} ${available && value === previous ? "checked" : ""}>
                <span>${formatHour(hour)}<small>to ${formatHour(end)}</small></span>`;
            grid.appendChild(label);
        });
        frag.appendChild(section);
    });

    timeGroup.replaceChildren(frag);
}

function updateSummary() {
    const date = checked("date");
    const time = checked("time");
    if (!date || !time) {
        summary.hidden = true;
        return;
    }
    const day = parseDate(date.value).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const tech = currentTech();
    const withTech = tech.id === "any" ? "" : ` with ${tech.name}`;
    const [h, m] = time.value.split(":").map(Number);
    const end = formatHour(h + m / 60 + (totalMinutes() || DEFAULT_MINUTES) / 60);
    summary.textContent = `${day}, ${formatTimeTo12Hour(time.value)} – ${end}${withTech}`;
    summary.hidden = false;
}

// ---------- Validation ----------
// Text inputs: each rule returns "" when valid, or an error message.
const rules = {
    name: (v) => (/^[a-z ,.'-]+$/i.test(v.trim()) ? "" : "Please enter your name."),
    email: (v) => (isEmailValid(v.trim()) ? "" : "Please enter a valid email address."),
    phone: (v) => (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v.trim()) ? "" : "Please enter a 10-digit phone number."),
};

function validate(input) {
    const message = rules[input.id](input.value);
    const field = input.closest(".field");
    const error = document.getElementById(`${input.id}-error`);
    if (message) error.textContent = message;
    field.classList.toggle("has-error", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) input.setAttribute("aria-describedby", error.id);
    else input.removeAttribute("aria-describedby");
    return !message;
}

// Choice groups: service, date, time.
const groups = {
    service: categoryGroup,
    date: dateGroup,
    time: timeGroup,
};

function validateGroup(name) {
    const ok = name === "service" ? selectedItems().length > 0 : Boolean(checked(name));
    groups[name].classList.toggle("has-error", !ok);
    document.getElementById(`${name}-error`).style.display = ok ? "" : "block";
    return ok;
}

Object.keys(rules).forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => { if (input.value) validate(input); });
    input.addEventListener("input", () => {
        if (input.closest(".field").classList.contains("has-error")) validate(input);
    });
});

// Re-render dates & times whenever the appointment length or technician changes.
function refreshSchedule() {
    renderDates();
    renderTimes();
    updateSummary();
}

function onServicesChange() {
    renderSelected();
    if (categoryGroup.classList.contains("has-error")) validateGroup("service");
    refreshSchedule();
}

categoryGroup.addEventListener("change", () => {
    renderServicePanels();
    onServicesChange();
});
serviceGroup.addEventListener("change", onServicesChange);
techSelect.addEventListener("change", () => {
    updateTechHint();
    refreshSchedule();
});
dateGroup.addEventListener("change", () => {
    validateGroup("date");
    renderTimes();
    if (groups.time.classList.contains("has-error") && checked("time")) validateGroup("time");
    updateSummary();
});
timeGroup.addEventListener("change", () => {
    validateGroup("time");
    updateSummary();
});

renderDates();

// ---------- Submit ----------
async function sendEmail(body) {
    const data = new FormData();
    data.append("Date", body.request_date);
    data.append("Time", body.request_time);
    data.append("Name", body.name);
    data.append("Email", body.email);
    data.append("Phone", body.phone);
    data.append("Service", body.service);
    data.append("Duration", body.duration);
    data.append("Technician", body.technician);
    data.append("Note", body.inquery);

    const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
    });
    return res.ok;
}

// Fire and forget; loaded lazily so a Firebase problem never blocks booking.
async function logOrder(body) {
    try {
        const { postOrder } = await import("../server/firebase.js");
        await postOrder(body);
    } catch (err) {
        console.error("ERROR_POSTING_AN_ORDER_TO_FIREBASE", err);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate in on-screen order and focus the first problem.
    const problems = [];
    ["service", "date", "time"].forEach((name) => {
        if (!validateGroup(name)) problems.push((name === "service" && serviceGroup.querySelector("input")) || groups[name].querySelector("input:not(:disabled)") || groups[name]);
    });
    Object.keys(rules).forEach((id) => {
        const input = document.getElementById(id);
        if (!validate(input)) problems.push(input);
    });
    if (problems.length) {
        problems[0].focus();
        return;
    }

    const body = {
        request_date: formatDate(checked("date").value),
        request_time: formatTimeTo12Hour(checked("time").value),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        service: selectedItems().map((i) => `${i.category.name}: ${i.name}${i.addon ? " (add-on)" : ""}`).join(", "),
        duration: formatDuration(totalMinutes()),
        technician: currentTech().name,
        inquery: document.getElementById("inquiry").value.trim(),
        date_posted: currentDate(),
    };

    submit.disabled = true;
    submit.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";

    try {
        logOrder(body);
        const ok = await sendEmail(body);
        if (!ok) throw new Error("Formspree request failed");
        form.reset();
        renderServicePanels();
        renderSelected();
        updateTechHint();
        refreshSchedule();
        status.classList.add("is-success");
        status.textContent = `Thank you, ${body.name}! Your request for ${body.request_date} at ${body.request_time} was sent. We'll be in touch to confirm.`;
    } catch (err) {
        status.classList.add("is-error");
        status.textContent = "Sorry, something went wrong. Please try again or call us at (484) 329-7989.";
    } finally {
        submit.disabled = false;
        submit.textContent = "Request appointment";
    }
});
