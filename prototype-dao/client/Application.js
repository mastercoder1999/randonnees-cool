class Application {
  constructor(window, RandoDAO) {
    this.window = window;
    this.dao = new RandoDAO();

    this.ul = this.window.document.getElementById('listeRandos');
    this.detailContent = this.window.document.getElementById('detailContent');

    this.afficherListeRando();
  }

  afficherListeRando() {
    this.ul.innerHTML = '';
    this.detailContent.innerHTML = '';

    this.window.location.hash = "#";

    this.dao.lister(liste => {
      liste.forEach(rando => {
        const li = this.window.document.createElement('li');
        li.textContent = rando.nom;

        li.addEventListener('click', () => {
          this.dao.chercher(rando.id, r => {
            if (!r) return;

            this.detailContent.innerHTML = `
              <strong>Nom:</strong> ${r.nom}<br>
              <strong>Longitude:</strong> ${r.longitude}<br>
              <strong>Latitude:</strong> ${r.latitude}<br>
              <strong>Longueur:</strong> ${r.longueur} km<br>
              <strong>Dénivelé:</strong> ${r.denivele} m<br>
              <strong>Difficulté:</strong> ${r.difficulte}
            `;
          });
        });

        this.ul.appendChild(li);
      });
    }, '+10');
  }
}

new Application(window, RandoDAO);
