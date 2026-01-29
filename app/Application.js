class Application {
  constructor(window, RandonneeDAO, vueAccueil, vueListeRandonnee, vueRandonnee) {
    this.window = window;
    this.RandonneeDAO = RandonneeDAO;
    this.vueAccueil = vueAccueil;
    this.vueListeRandonnee = vueListeRandonnee;
    this.vueRandonnee = vueRandonnee;

    // Store app instance globally for access from views
    window.app = this;
    if (window.cordova) {
      document.addEventListener("deviceready", () => this.initialiserNavigation(), false);
    } else {
      // Running in browser - initialize immediately
      this.initialiserNavigation();
    }
  }

  initialiserNavigation() {
    console.log("Application-->initialiserNavigation");
    this.window.addEventListener("hashchange", () => this.naviguer());
    this.naviguer();
  }

  naviguer() {
    let hash = window.location.hash;

    if (!hash) {
      this.vueAccueil.afficher();
    } else if (hash.match(/^#liste-randonnee/)) {
      this.RandonneeDAO.lister("").then((randonnees) => {
        this.vueListeRandonnee.initialiserListeRandonnee(randonnees);
        this.vueListeRandonnee.afficher();
      });
    } else {
      let navigation = hash.match(/^#randonnee\/([0-9]+)/);
      let idRandonnee = navigation[1];
      this.RandonneeDAO.chercher(idRandonnee).then((randonnee) => {
        this.vueRandonnee.initialiserRandonnee(randonnee);
        this.RandonneeDAO.lister("").then((listeRandonnee) => {
          this.vueRandonnee.setListeRandonnees(listeRandonnee, parseInt(idRandonnee));
        });
        this.vueRandonnee.afficher();
      });
    }
  }
}

new Application(window, new RandonneeDAO(), new VueAccueil(), new VueListeRandonnee(), new VueRandonnee());
