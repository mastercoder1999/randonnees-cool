class Application{
    constructor(window, RandonneeDAO, vueAccueil, vueListeRandonnee, vueRandonnee){
        this.window = window;
        this.RandonneeDAO = RandonneeDAO;
        this.vueAccueil = vueAccueil;
        this.vueListeRandonnee = vueListeRandonnee;
        this.vueRandonnee = vueRandonnee;

        // Store app instance globally for access from views
        window.app = this;

        this.window.addEventListener("hashchange", () => this.naviguer());
        this.naviguer();

        document.addEventListener('deviceready', () => this.initialiserNavigation(), false);
    }

    initialiserNavigation(){
        console.log("Application-->initialiserNavigation");
        this.window.addEventListener("hashchange", () => this.naviguer());
    }

    naviguer(){
        let hash = window.location.hash;

        if(!hash){
            this.vueAccueil.afficher();
        }else if(hash.match(/^#liste-randonnee/)){
            this.vueListeRandonnee.initialiserListeRandonnee(this.RandonneeDAO.lister());
            this.vueListeRandonnee.afficher();
        }else{
            let navigation = hash.match(/^#randonnee\/([0-9]+)/);
            let idRandonnee = navigation[1];
            let liste = this.RandonneeDAO.lister();
            this.vueRandonnee.setListeRandonnees(liste, parseInt(idRandonnee));
            this.vueRandonnee.initialiserRandonnee(liste[idRandonnee]);
            this.vueRandonnee.afficher();
        }
    }
}

new Application(
    window,
    new RandonneeDAO(),
    new VueAccueil(),
    new VueListeRandonnee(),
    new VueRandonnee(),
);
