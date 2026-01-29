class RandonneeDAO {
    constructor() {
        this.exercises = this.charger();

        // Si aucune donnée n'existe, ajouter des données par défaut
        if (this.exercises.length === 0) {
            this.initialiserDonneesParDefaut();
        }
    }

    charger() {
        let exercisesJSON = localStorage.getItem("randonnees");
        if (exercisesJSON) {
            return JSON.parse(exercisesJSON);
        }
        return [];
    }

    initialiserDonneesParDefaut() {
        const donneesParDefaut = [
            new Randonnee(0, "Mont Everest", 10, 2, 10, 9876, 23498, 150, 2),
            new Randonnee(1, "Mont Blanc", 8.5, 1.5, 8, 6.8652, 45.8326, 1200, 5),
            new Randonnee(2, "Sentier des Appalaches", 15, 3, 7, -76.5157, 40.4259, 800, 3),
            new Randonnee(3, "Tour du Mont Ventoux", 12, 2.5, 9, 5.2785, 44.1742, 1600, 8),
            new Randonnee(4, "Parc de la Gatineau", 6, 1, 4, -75.9119, 45.5088, 300, 12),
            new Randonnee(5, "Massif de Charlevoix", 18, 4, 8, -70.4636, 47.5594, 950, 6),
            new Randonnee(6, "Sentier des Caps", 20, 5, 9, -70.7989, 47.3894, 1100, 4),
            new Randonnee(7, "Mont Tremblant", 11, 2, 6, -74.5896, 46.2094, 700, 15),
            new Randonnee(8, "Canyon Sainte-Anne", 5, 1.5, 3, -71.0564, 47.0731, 200, 20),
            new Randonnee(9, "Parc de la Jacques-Cartier", 14, 3.5, 7, -71.3806, 47.0806, 850, 7)
        ];

        donneesParDefaut.forEach(randonnee => {
            this.exercises.push(randonnee);
        });

        this.sauvegarder();
    }

    sauvegarder() {
        localStorage.setItem("randonnees", JSON.stringify(this.exercises));
    }

    lister() {
        return this.exercises;
    }

    ajouter(randonnee) {
        randonnee.id = this.exercises.length;
        this.exercises.push(randonnee);
        this.sauvegarder();
    }

    modifier(randonnee) {
        this.exercises[randonnee.id] = randonnee;
        this.sauvegarder();
    }
}
