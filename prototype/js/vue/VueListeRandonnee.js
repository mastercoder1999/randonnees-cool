class VueListeRandonnee {
    constructor() {
        this.html = document.getElementById("html-vue-liste-randonnee").innerHTML;
        this.listeRandonneeDonnee = null;
    }

    initialiserListeRandonnee(listeRandonneeDonnee) {
        this.listeRandonneeDonnee = listeRandonneeDonnee;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        this.afficherListe(this.listeRandonneeDonnee);
        this.initialiserRecherche();
    }

    afficherListe(listeFiltree) {
        let listeContainer = document.getElementById("liste-randonnee-container");
        const templateCard = listeContainer.querySelector(".randonnee-card");
        const cardHTML = templateCard ? templateCard.outerHTML : "";

        let listeHTML = "";

        for (var numero in listeFiltree) {
            let cardHTMLRemplacement = cardHTML;
            cardHTMLRemplacement = cardHTMLRemplacement.replace(/\{Randonnee\.id\}/g, listeFiltree[numero].id);
            cardHTMLRemplacement = cardHTMLRemplacement.replace("{Randonnee.nom}", listeFiltree[numero].nom);
            cardHTMLRemplacement = cardHTMLRemplacement.replace("{Randonnee.difficulte}", listeFiltree[numero].difficulte + "/10");
            cardHTMLRemplacement = cardHTMLRemplacement.replace("{Randonnee.duree}", listeFiltree[numero].duree + "h");

            listeHTML += cardHTMLRemplacement;
        }

        listeContainer.innerHTML = listeHTML;
    }

    initialiserRecherche() {
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                const terme = e.target.value.toLowerCase();
                const listeFiltree = this.listeRandonneeDonnee.filter(r =>
                    r.nom.toLowerCase().includes(terme)
                );
                this.afficherListe(listeFiltree);
            });
        }
    }
}
