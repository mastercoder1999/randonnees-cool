const THEME_KEY = "rando_theme_v1";

function appliquerTheme(theme) {
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(theme);
  localStorage.setItem(THEME_KEY, theme);
}

function chargerTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  appliquerTheme(saved || "theme-dark"); // default
}

function toggleTheme() {
  const isDark = document.body.classList.contains("theme-dark");
  appliquerTheme(isDark ? "theme-light" : "theme-dark");
}

class Application {
  constructor(window, RandonneeDAO, vueAccueil, vueListeRandonnee, vueRandonnee, vueChecklist) {
    this.window = window;
    this.RandonneeDAO = RandonneeDAO;
    this.vueAccueil = vueAccueil;
    this.vueListeRandonnee = vueListeRandonnee;
    this.vueRandonnee = vueRandonnee;
    this.vueChecklist = vueChecklist;

    
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
    chargerTheme();
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
    } else if(hash === "#checklist"){
      this.vueChecklist.afficher();
    }else {
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

new Application(window, new RandonneeDAO(), new VueAccueil(), new VueListeRandonnee(), new VueRandonnee(), new VueChecklist());
