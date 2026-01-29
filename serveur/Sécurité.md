# Sécurité

## Authentification au serveur
L'application s'authentifie en envoyant l'utilisateur et le mot de passe au serveur. L'authentification est faites avec l'utilisation d'un mot de passe sur le dossier apache du système de donnée
[Conversastion chatgpt](https://github.com/copilot/share/ca6f0198-0084-80d3-8950-1407a4270886) 

## Filtres 
Utilisation de php filters sur dans le modele Rando 
```
        'id' => FILTER_VALIDATE_INT,
        'nom' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'longitude' => FILTER_VALIDATE_FLOAT,
        'latitude' => FILTER_VALIDATE_FLOAT,
        'longueur' => FILTER_VALIDATE_FLOAT,
        'denivele' => FILTER_VALIDATE_INT,
        'difficulte' => FILTER_VALIDATE_INT,
        $filtered = filter_var_array($data, self::$filtres);
        

```

## Prepared Statement
Utilisation de prepared statement en sql 
```
 $requete = $basededonnees->prepare("SELECT * FROM rando WHERE id = :id");
 $requete->bindParam(':id', $id, PDO::PARAM_INT);
```

## Demande d'autorisation utilisateur
Faire la demande d'accès au GPS pour que notre tracker de vitesse fonctionne. Le plugin android le fait automatiquement.

## HTTPS
le site du service de données est encrypté en HTTPS pour s'assurer de la transmission des données de facon sécurisé
