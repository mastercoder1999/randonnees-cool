class Randonnee {
    constructor(id, nom, distance, duree, difficulte, longitude, latitude, denivele, likes = 0) {
        this.id = id;
        this.nom = nom;
        this.distance = distance;
        this.duree = duree;
        this.difficulte = difficulte;
        this.longitude = longitude;
        this.latitude = latitude;
        this.denivele = denivele;
        this.likes = likes;
    }
}
