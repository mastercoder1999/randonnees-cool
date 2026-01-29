
Dans afficher
afficher() {
    // Ajouter cette ligne
    this.afficherCarteRandonnee(this.randonnee.latitude, this.randonnee.longitude, this.randonnee.nom);

}

Mettre comme dernière fonction
afficherCarteRandonnee(lat, lon, nom) {
    // Vérifier si Leaflet existe déjà (pour éviter doublons)
    if (typeof L === "undefined") return;

    // S’assurer que l’élément #map existe
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    // Si une ancienne carte existe, on la nettoie
    if (mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
        mapContainer.innerHTML = "";
    }

    // Initialisation
    const map = L.map("map").setView([lat, lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Ajouter un marqueur
    L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>${nom}</b><br>Randonnée ici.`)
        .openPopup();
}
