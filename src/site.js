// Shared site behavior for redesigned pages (no jQuery).

// Opening hours: day index (0 = Sunday) -> [open, close] in 24h decimal hours.
export const HOURS = {
    0: [10, 17],
    1: [9.5, 19], 2: [9.5, 19], 3: [9.5, 19], 4: [9.5, 19], 5: [9.5, 19],
    6: [9, 18],
};

function formatHour(h) {
    const hours = Math.floor(h);
    const minutes = Math.round((h - hours) * 60);
    const suffix = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    return minutes ? `${h12}:${String(minutes).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

// Header: solid background once the page scrolls.
function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
}

// Mobile menu toggle.
function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
            setOpen(false);
            toggle.focus();
        }
    });
    window.matchMedia("(min-width: 941px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
}

// "Open now" status + highlight today's hours row.
function initOpenStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    const [open, close] = HOURS[day];

    const status = document.getElementById("open-status");
    if (status) {
        let text;
        let isOpen = false;
        if (hour < open) {
            text = `Opens today at ${formatHour(open)}`;
        } else if (hour < close) {
            text = `Open today until ${formatHour(close)}`;
            isOpen = true;
        } else {
            const [nextOpen] = HOURS[(day + 1) % 7];
            text = `Closed now · Opens tomorrow ${formatHour(nextOpen)}`;
        }
        status.innerHTML = `<span class="open-dot${isOpen ? "" : " closed"}" aria-hidden="true"></span>${text}`;
    }

    document.querySelectorAll(".hours tr[data-days]").forEach((row) => {
        const days = row.dataset.days.split(",").map(Number);
        row.classList.toggle("is-today", days.includes(day));
    });
}

function initYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
}

initHeader();
initMenu();
initOpenStatus();
initYear();
