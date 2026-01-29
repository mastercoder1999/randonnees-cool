<?php

class RandoDAO
{
    public static function listerRandos(Filtre $filtre)
    {
        include "../connexion.php";
        include_once "../modele/Rando.php";

        $signe = $filtre->getSigne();
        $distance = $filtre->getDistance();


        $sql = "SELECT * FROM rando WHERE longueur $signe :longueur";

        $requete = $basededonnees->prepare($sql);
        $requete->bindParam(':longueur', $distance);
        $requete->execute();
        $resultats = $requete->fetchAll(PDO::FETCH_OBJ);
        
        $randos = [];
        foreach ($resultats as $donnee) {
            $randos[] = new Rando(
                $donnee->id,
                $donnee->nom,
                $donnee->longitude,
                $donnee->latitude,
                $donnee->longueur,
                $donnee->denivele,
                $donnee->difficulte
            );
        }
        
        return $randos;
    }

    public static function detailRando(Rando $rando)
    {
        include "../connexion.php";
        include_once "../modele/Rando.php";
        $id = $rando->getId();
        
        $requete = $basededonnees->prepare("SELECT * FROM rando WHERE id = :id");
        $requete->bindParam(':id', $id, PDO::PARAM_INT);
        $requete->execute();
        $donnee = $requete->fetch(PDO::FETCH_OBJ);
        
        if (!$donnee) {
            return null;
        }

        return new Rando(
            $donnee->id,
            $donnee->nom,
            $donnee->longitude,
            $donnee->latitude,
            $donnee->longueur,
            $donnee->denivele,
            $donnee->difficulte
        );
    }
}

?>
