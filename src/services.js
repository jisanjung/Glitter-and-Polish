// Bookable services by category. `min` is how long the service takes;
// add-ons extend the appointment by their `min`.
export const CATEGORIES = [
    {
        id: "manicure",
        name: "Manicure",
        services: [
            { name: "Cut & file", min: 15 },
            { name: "Polish change", min: 30 },
            { name: "Regular manicure", min: 40 },
            { name: "Gel polish change", min: 40 },
            { name: "Gel manicure", min: 60 },
            { name: "Softgel manicure", min: 60 },
            { name: "Dip powder", min: 90 },
            { name: "Gel full set", min: 105 },
        ],
        addons: [
            { name: "Soak-off", min: 15 },
            { name: "Spa upgrade", min: 10 },
            { name: "French / American", min: 10 },
            { name: "Designs", min: 15 },
        ],
    },
    {
        id: "pedicure",
        name: "Pedicure",
        services: [
            { name: "Cut & file", min: 15 },
            { name: "Polish change", min: 30 },
            { name: "Express pedicure", min: 30 },
            { name: "Regular pedicure", min: 40 },
            { name: "Signature spa pedicure", min: 45 },
            { name: "Premium spa pedicure", min: 60 },
            { name: "Reflexology massage (10 min)", min: 10 },
            { name: "Reflexology massage (20 min)", min: 20 },
        ],
        addons: [
            { name: "Callus treatment", min: 10 },
            { name: "Keratin treatment", min: 10 },
            { name: "Gel polish", min: 15 },
            { name: "Reflexology massage (+10 min)", min: 10 },
            { name: "French / American", min: 10 },
            { name: "Designs", min: 15 },
        ],
    },
    {
        id: "waxing",
        name: "Waxing",
        services: [
            { name: "Eyebrow", min: 15 },
            { name: "Lip", min: 10 },
            { name: "Chin", min: 15 },
            { name: "Underarm", min: 15 },
            { name: "Legs", min: 30 },
            { name: "Arms", min: 30 },
        ],
        addons: [],
    },
    {
        id: "kids",
        name: "Kids 9 & under",
        services: [
            { name: "Polish change, fingers", min: 30 },
            { name: "Polish change, toes", min: 30 },
            { name: "Regular manicure", min: 30 },
            { name: "Gel manicure", min: 30 },
            { name: "Regular pedicure", min: 30 },
        ],
        addons: [
            { name: "Design", min: 10 },
            { name: "Extended wear polish", min: 10 },
            { name: "French / American", min: 10 },
            { name: "Gel polish add-on", min: 10 },
        ],
    },
];

// Technicians. `days` limits bookable weekdays (0 = Sunday); omit for every day.
export const TECHNICIANS = [
    { id: "any", name: "Any available tech" },
    { id: "jenny", name: "Jenny", days: [0, 6] },
];

export function formatDuration(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (!h) return `${m} min`;
    return m ? `${h} hr ${m} min` : `${h} hr`;
}
