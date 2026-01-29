# Protocole

## Protocole de communication du serveur
API Google Maps
```
rando :
    id,
    nom,
    longitude,
    latitude,
    longueur,
    denivele,
    difficulte,
    ranking

randos :
    plusieurs randos (meme champs que rando)
```
```
listeRando($filtre){
    return randos;
}
detailRando(id){
    return rando;
}
```


## Échantillons des données échangées
XML Avec une balise randos qui contient toutes les randonnées dans des balises rando
```
<rando>
    <id>2</id>
    <nom>Mont Albert</nom>
    <longitude>-65.8833</longitude>
    <latitude>49.0167</latitude>
    <longueur>17.2</longueur>
    <denivele>775</denivele>
    <difficulte>5</difficulte>
    <ranking>0</ranking>
</rando>
```
