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

    this.afficherCarteRandonnee(
      this.randonnee.latitude,
      this.randonnee.longitude,
      this.randonnee.nom
    );

    this.afficherMeteoPourRandonnee(
      this.randonnee.latitude,
      this.randonnee.longitude
    );
  }

  afficherDetails() {
    document.getElementById("randonnee-nom").textContent = this.randonnee.nom;
    document.getElementById("randonnee-difficulte").textContent =
      "Difficulté : " + this.randonnee.difficulte + "/5";
    document.getElementById("randonnee-longueur").textContent =
      "Longueur : " + this.randonnee.longueur + "km";
    document.getElementById("randonnee-longitude").textContent =
      "Longitude : " + this.randonnee.longitude;
    document.getElementById("randonnee-latitude").textContent =
      "Latitude : " + this.randonnee.latitude;
    document.getElementById("randonnee-denivele").textContent =
      "Dénivelé : " + this.randonnee.denivele + "m";
  }

  initialiserSwipe() {
    const btnLeft = document.querySelector(".swipe-left");
    const btnRight = document.querySelector(".swipe-right");
    const conteneur = document.querySelector(".page-detail");
    let positionDepartX = 0;
    let glissementEnCours = false;
    const SEUIL = 60;

    if (conteneur) {
      conteneur.addEventListener("pointerdown", (e) => {
        positionDepartX = e.clientX;
        glissementEnCours = true;
      });

      conteneur.addEventListener("pointerup", (e) => {
        if (!glissementEnCours) return;

        const difference = e.clientX - positionDepartX;

        if (difference > SEUIL) {
          this.swipeGauche();
        } else if (difference < -SEUIL) {
          this.swipeDroite();
        }

        glissementEnCours = false;
      });
    }

    if (btnLeft) btnLeft.addEventListener("click", () => this.swipeGauche());
    if (btnRight) btnRight.addEventListener("click", () => this.swipeDroite());
  }

  swipeGauche() {
    let newIndex = this.indexActuel - 1;
    if (newIndex < this.listeRandonnees[0].id)
      newIndex = this.listeRandonnees[0].id;
    window.location.hash = "#randonnee/" + newIndex;
  }

  swipeDroite() {
    let newIndex = this.indexActuel + 1;
    if (
      newIndex >
      this.listeRandonnees[this.listeRandonnees.length - 1].id
    )
      newIndex =
        this.listeRandonnees[this.listeRandonnees.length - 1].id;
    window.location.hash = "#randonnee/" + newIndex;
  }

  afficherCarteRandonnee(lat, lon, nom) {
    if (typeof L === "undefined") return;

    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    const latitude = Number(lat);
    const longitude = Number(lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

    if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
      mapContainer.innerHTML = "";
    }

    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("<b>" + nom + "</b><br>Point de départ.")
      .openPopup();

    setTimeout(() => map.invalidateSize(), 0);
  }

  async afficherMeteoPourRandonnee(lat, lon) {
    const box = document.getElementById("meteo-box");
    if (!box) return;

    const latitude = Number(lat);
    const longitude = Number(lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      box.textContent = "Météo indisponible (coordonnées invalides).";
      return;
    }

    const cacheKey = "meteo_" + latitude + "_" + longitude;
    const ttlMs = 60 * 60 * 1000;

    const cached = getCacheTTL(cacheKey);
    if (cached && cached.current) {
      const c = cached.current;
      box.textContent =
        meteoCodeVersTexte(c.weather_code) +
        " | Température : " +
        c.temperature_2m +
        "°C | Vent : " +
        c.wind_speed_10m +
        " km/h";
      return;
    }

    if (!navigator.onLine) {
      box.textContent = "Météo indisponible hors ligne.";
      return;
    }

    try {
      box.textContent = "Chargement météo...";
      const data = await fetchMeteoActuelle(latitude, longitude);
      setCacheTTL(cacheKey, data, ttlMs);

      const c = data.current;
      box.textContent =
        meteoCodeVersTexte(c.weather_code) +
        " | Température : " +
        c.temperature_2m +
        "°C | Vent : " +
        c.wind_speed_10m +
        " km/h";
    } catch (e) {
      box.textContent = "Erreur lors de la récupération météo.";
    }
  }
}

function meteoCodeVersTexte(code) {
  if (code === 0) return "Ciel clair";
  if ([1, 2, 3].includes(code)) return "Nuages";
  if ([45, 48].includes(code)) return "Brouillard";
  if ([61, 63, 65].includes(code)) return "Pluie";
  if ([71, 73, 75].includes(code)) return "Neige";
  if (code === 95) return "Orage";
  return "Conditions variables";
}

function setCacheTTL(key, data, ttlMs) {
  localStorage.setItem(
    key,
    JSON.stringify({ ts: Date.now(), ttl: ttlMs, data })
  );
}

function getCacheTTL(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const obj = JSON.parse(raw);
    if (Date.now() - obj.ts > obj.ttl) return null;
    return obj.data;
  } catch {
    return null;
  }
}

async function fetchMeteoActuelle(lat, lon) {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    encodeURIComponent(lat) +
    "&longitude=" +
    encodeURIComponent(lon) +
    "&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Open-Meteo error");
  return await res.json();
}
