var map = L.map('map').setView([40.0423, -75.4819], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([40.0423, -75.4819]).addTo(map)
    .bindPopup('Glitter and Polish')
    .openPopup();