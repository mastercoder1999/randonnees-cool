class RandoDAO {
  constructor() {
    this.URL = "https://blog.leopold.monster/";
  }

  lister(action, filtre) {
    const USER = "mobile";
    const PASS = "mobile2025";

    const AUTH = "Basic " + btoa(`${USER}:${PASS}`);
    fetch(this.URL + "rando.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: AUTH,
      },
      body: "filtre=" + encodeURIComponent(filtre),
    })
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((xml) => {
        const randos = xml.getElementsByTagName("rando");
        let listeRando = [];
        for (let i = 0; i < randos.length; i++) {
          const r = randos[i];
          let rando = new Rando(
            r.getElementsByTagName("id")[0].textContent,
            r.getElementsByTagName("nom")[0].textContent,
            r.getElementsByTagName("longitude")[0].textContent,
            r.getElementsByTagName("latitude")[0].textContent,
            r.getElementsByTagName("longueur")[0].textContent,
            r.getElementsByTagName("denivele")[0].textContent,
            r.getElementsByTagName("difficulte")[0].textContent
          );
          listeRando.push(rando);
        }
        action(listeRando);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des randos :", err);
        action([]);
      });
  }

  chercher(id, action) {
    const USER = "mobile";
    const PASS = "mobile2025";

    const AUTH = "Basic " + btoa(`${USER}:${PASS}`);
    fetch(this.URL + "detail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: AUTH,
      },
      body: "id=" + id,
    })
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((xml) => {
        const r = xml.getElementsByTagName("rando")[0];
        if (!r) {
          console.error("Rando introuvable dans le XML");
          action(null);
          return;
        }

        let rando = new Rando(
          r.getElementsByTagName("id")[0].textContent,
          r.getElementsByTagName("nom")[0].textContent,
          r.getElementsByTagName("longitude")[0].textContent,
          r.getElementsByTagName("latitude")[0].textContent,
          r.getElementsByTagName("longueur")[0].textContent,
          r.getElementsByTagName("denivele")[0].textContent,
          r.getElementsByTagName("difficulte")[0].textContent
        );

        action(rando);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération de la rando :", err);
        action(null);
      });
  }
}
