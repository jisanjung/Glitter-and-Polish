// Home page behavior (no jQuery).

// ---------- Service tabs ----------
function initTabs() {
    const root = document.querySelector("[data-tabs]");
    if (!root) return;

    const tabList = root.querySelector('[role="tablist"]');
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

    const select = (index, focus = false) => {
        tabs.forEach((tab, i) => {
            const active = i === index;
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
            panels[i].hidden = !active;
        });
        if (focus) tabs[index].focus();
        tabs[index].scrollIntoView({ block: "nearest", inline: "nearest" });
    };

    tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => select(i));
        tab.addEventListener("keydown", (e) => {
            let next = null;
            if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
            else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = tabs.length - 1;
            if (next !== null) {
                e.preventDefault();
                select(next, true);
            }
        });
    });

    // Progressive enhancement: without JS every panel shows; with JS, show the tabs.
    tabList.hidden = false;
    root.classList.add("is-ready");
    panels.forEach((panel) => { panel.tabIndex = 0; });
    tabs.forEach((tab, i) => {
        tab.tabIndex = i === 0 ? 0 : -1;
        tab.setAttribute("aria-selected", String(i === 0));
        panels[i].hidden = i !== 0;
    });
}

// ---------- Gallery lightbox ----------
function initLightbox() {
    const dialog = document.querySelector(".lightbox");
    const items = [...document.querySelectorAll(".gallery-item")];
    if (!dialog || !items.length || typeof dialog.showModal !== "function") return;

    const img = dialog.querySelector("img");
    let current = 0;

    const show = (index) => {
        current = (index + items.length) % items.length;
        const source = items[current].querySelector("img");
        img.src = source.currentSrc || source.src;
        img.alt = source.alt;
    };

    items.forEach((item, i) => {
        item.addEventListener("click", () => {
            show(i);
            dialog.showModal();
        });
    });

    dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
    dialog.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));

    dialog.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") show(current + 1);
        if (e.key === "ArrowLeft") show(current - 1);
    });
    // Click on the backdrop closes the dialog.
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => items[current].focus());
}

// ---------- Map ----------
function initMap() {
    const el = document.getElementById("map");
    if (!el || typeof window.L === "undefined") return;

    const coords = [40.0423, -75.4819];
    const map = window.L.map(el, { scrollWheelZoom: false }).setView(coords, 15);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    window.L.marker(coords)
        .addTo(map)
        .bindPopup("<strong>Glitter &amp; Polish</strong><br>39 E Lancaster Avenue<br>Paoli, PA 19301")
        .openPopup();
}

// ---------- Contact form ----------
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const status = form.querySelector(".form-status");
    const submit = form.querySelector('button[type="submit"]');
    const rules = {
        name: (v) => /^[a-z ,.'-]+$/i.test(v.trim()),
        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        subject: (v) => v.trim().length > 0,
        message: (v) => v.trim().length > 0,
    };

    const validate = (input) => {
        const ok = rules[input.id](input.value);
        const field = input.closest(".field");
        field.classList.toggle("has-error", !ok);
        input.setAttribute("aria-invalid", String(!ok));
        if (!ok) input.setAttribute("aria-describedby", `${input.id}-error`);
        else input.removeAttribute("aria-describedby");
        return ok;
    };

    Object.keys(rules).forEach((id) => {
        const input = document.getElementById(id);
        input.addEventListener("blur", () => { if (input.value) validate(input); });
        input.addEventListener("input", () => {
            if (input.closest(".field").classList.contains("has-error")) validate(input);
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputs = Object.keys(rules).map((id) => document.getElementById(id));
        const results = inputs.map(validate);
        const firstInvalid = inputs[results.indexOf(false)];
        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        submit.disabled = true;
        submit.textContent = "Sending…";
        status.className = "form-status";
        status.textContent = "";

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            form.reset();
            status.classList.add("is-success");
            status.textContent = "Thank you! Your message was sent. We'll be in touch soon.";
        } catch (err) {
            status.classList.add("is-error");
            status.textContent = "Sorry, something went wrong. Please try again or call us at (484) 329-7989.";
        } finally {
            submit.disabled = false;
            submit.textContent = "Send message";
        }
    });
}

initTabs();
initLightbox();
initMap();
initContactForm();
