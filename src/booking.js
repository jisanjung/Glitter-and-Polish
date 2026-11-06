// Booking page: validation + submit to Formspree (email) and Firebase (orders log).
import { HOURS, formatHour } from "./site.js";
import { currentDate, formatDate, formatTimeTo12Hour, isEmailValid } from "./utils.js";

const form = document.getElementById("bookingForm");
const status = form.querySelector(".form-status");
const submit = form.querySelector('button[type="submit"]');
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const hoursHint = document.getElementById("hours-hint");
const serviceGroup = document.getElementById("service-group");
const serviceError = document.getElementById("service-error");

// ---------- Date helpers ----------
const pad = (n) => String(n).padStart(2, "0");
const toISODate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayISO = () => toISODate(new Date());

// Parse "YYYY-MM-DD" as a local date (not UTC).
function parseDate(value) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
}

const timeToHours = (value) => {
    const [h, m] = value.split(":").map(Number);
    return h + m / 60;
};

dateInput.min = todayISO();

function updateHoursHint() {
    if (!dateInput.value) {
        hoursHint.textContent = "Choose a date to see that day's hours.";
        timeInput.removeAttribute("min");
        timeInput.removeAttribute("max");
        return;
    }
    const day = parseDate(dateInput.value);
    const [open, close] = HOURS[day.getDay()];
    const weekday = day.toLocaleDateString("en-US", { weekday: "long" });
    hoursHint.textContent = `We're open ${formatHour(open)} – ${formatHour(close)} on ${weekday}.`;
    timeInput.min = `${pad(Math.floor(open))}:${pad(Math.round((open % 1) * 60))}`;
    timeInput.max = `${pad(Math.floor(close))}:${pad(Math.round((close % 1) * 60))}`;
}

// ---------- Validation ----------
// Each rule returns an error message, or "" when valid.
const rules = {
    date: (v) => {
        if (!v) return "Please choose a date.";
        if (v < todayISO()) return "Please choose today or a later date.";
        return "";
    },
    time: (v) => {
        if (!v) return "Please choose a time.";
        if (!dateInput.value) return "";
        const [open, close] = HOURS[parseDate(dateInput.value).getDay()];
        const t = timeToHours(v);
        if (t < open || t >= close) {
            return `Please choose a time between ${formatHour(open)} and ${formatHour(close)}.`;
        }
        if (dateInput.value === todayISO()) {
            const now = new Date();
            if (t <= now.getHours() + now.getMinutes() / 60) return "That time has already passed today.";
        }
        return "";
    },
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

function selectedService() {
    return form.querySelector('input[name="service"]:checked');
}

function validateService() {
    const ok = Boolean(selectedService());
    serviceGroup.classList.toggle("has-error", !ok);
    serviceError.style.display = ok ? "" : "block";
    return ok;
}

Object.keys(rules).forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => { if (input.value) validate(input); });
    input.addEventListener("input", () => {
        if (input.closest(".field").classList.contains("has-error")) validate(input);
    });
});

dateInput.addEventListener("change", () => {
    updateHoursHint();
    if (timeInput.value) validate(timeInput);
});
serviceGroup.addEventListener("change", validateService);

// ---------- Submit ----------
async function sendEmail(body) {
    const data = new FormData();
    data.append("Date", body.request_date);
    data.append("Time", body.request_time);
    data.append("Name", body.name);
    data.append("Email", body.email);
    data.append("Phone", body.phone);
    data.append("Service", body.service);
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

    const serviceOk = validateService();
    const inputs = Object.keys(rules).map((id) => document.getElementById(id));
    const results = inputs.map(validate);
    const firstInvalid = !serviceOk
        ? form.querySelector('input[name="service"]')
        : inputs[results.indexOf(false)];
    if (firstInvalid) {
        firstInvalid.focus();
        return;
    }

    const body = {
        request_date: formatDate(dateInput.value),
        request_time: formatTimeTo12Hour(timeInput.value),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        service: selectedService().value,
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
        updateHoursHint();
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
