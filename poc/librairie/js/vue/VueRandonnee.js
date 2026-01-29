class VueRandonnee {
    constructor() {
        this.html = document.getElementById("html-vue-randonnee").innerHTML;
        this.randonnee = null;
        this.listeRandonnees = [];
        this.indexActuel = 0;
    }

    initialiserRandonnee(randonnee) {
        this.randonnee = randonnee;
    }

    setListeRandonnees(liste, index) {
        this.listeRandonnees = liste;
        this.indexActuel = index;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        this.afficherDetails();
        this.initialiserSwipe();
        this.initialiserLikes();
        this.afficherCarteRandonnee(this.randonnee.latitude, this.randonnee.longitude, this.randonnee.nom);

    }

    afficherDetails() {
        document.getElementById("randonnee-nom").textContent = this.randonnee.nom;
        document.getElementById("randonnee-difficulte").textContent = "Difficulté : " + this.randonnee.difficulte + "/10";
        document.getElementById("randonnee-longueur").textContent = "Longueur : " + this.randonnee.distance + "km";
        document.getElementById("randonnee-longitude").textContent = "Longitude : " + this.randonnee.longitude;
        document.getElementById("randonnee-latitude").textContent = "Latitude : " + this.randonnee.latitude;
        document.getElementById("randonnee-denivele").textContent = "Dénivelé : " + this.randonnee.denivele + "m";
        document.getElementById("like-count").textContent = this.randonnee.likes;
    }

    initialiserSwipe() {
        const btnLeft = document.querySelector(".swipe-left");
        const btnRight = document.querySelector(".swipe-right");

        if (btnLeft) {
            btnLeft.addEventListener("click", () => {
                let newIndex = this.indexActuel - 1;
                if (newIndex < 0) newIndex = this.listeRandonnees.length - 1;
                window.location.hash = "#randonnee/" + newIndex;
            });
        }

        if (btnRight) {
            btnRight.addEventListener("click", () => {
                let newIndex = this.indexActuel + 1;
                if (newIndex >= this.listeRandonnees.length) newIndex = 0;
                window.location.hash = "#randonnee/" + newIndex;
            });
        }
    }

    initialiserLikes() {
        const likeBtn = document.getElementById("like-btn");
        if (likeBtn) {
            likeBtn.addEventListener("click", () => {
                this.randonnee.likes++;
                document.getElementById("like-count").textContent = this.randonnee.likes;
                // Sauvegarder dans le DAO
                if (window.app && window.app.RandonneeDAO) {
                    window.app.RandonneeDAO.modifier(this.randonnee);
                }
            });
        }
    }
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

}
