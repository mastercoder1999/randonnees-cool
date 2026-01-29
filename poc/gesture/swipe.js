const diapositives = document.querySelectorAll(".slide");
    let indexActuelle = 0;
    const SEUIL_AVANT_SWIPE = 60;
    let positionDepartX = 0;
    let glissementEnCours = false;

    function afficherRando(n) {
        diapositives.forEach(diap => diap.classList.remove("active"));
        diapositives[n].classList.add("active");
        indexActuelle = n;
    }

    function swipeGauche() {
        let nouvelIndex = indexActuelle - 1;
        if (nouvelIndex < 0) nouvelIndex = diapositives.length - 1;
        afficherRando(nouvelIndex);
    }

    function swipeDroite() {
        let nouvelIndex = indexActuelle + 1;
        if (nouvelIndex >= diapositives.length) nouvelIndex = 0;
        afficherRando(nouvelIndex);
    }

    const conteneur = document.querySelector(".page-detail");

    if (conteneur) {
        conteneur.addEventListener("pointerdown", e => {
            positionDepartX = e.clientX;
            glissementEnCours = true;
        });

        conteneur.addEventListener("pointerup", e => {
            if (!glissementEnCours) return;
            const difference = e.clientX - positionDepartX;
            
            if (difference > SEUIL_AVANT_SWIPE) {
              swipeGauche();
            }
            else if (difference < -SEUIL_AVANT_SWIPE) {
              swipeDroite();
            }
            glissementEnCours = false;
        });
    }

