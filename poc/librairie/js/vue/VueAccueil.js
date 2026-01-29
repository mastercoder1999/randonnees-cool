class VueAccueil {
    constructor() {
        this.html = document.getElementById("html-vue-accueil").innerHTML;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;
    }
}