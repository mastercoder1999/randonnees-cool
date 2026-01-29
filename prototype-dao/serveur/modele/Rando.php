<?php

class Rando
{
    private int $id;
    private string $nom;
    private float $longitude;
    private float $latitude;
    private float $longueur;
    private int $denivele;
    private int $difficulte;

    public static $filtres = [
        'id' => FILTER_VALIDATE_INT,
        'nom' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'longitude' => FILTER_VALIDATE_FLOAT,
        'latitude' => FILTER_VALIDATE_FLOAT,
        'longueur' => FILTER_VALIDATE_FLOAT,
        'denivele' => FILTER_VALIDATE_INT,
        'difficulte' => FILTER_VALIDATE_INT,
    ];

    public function __construct(
        int $id = 0,
        string $nom = "",
        float $longitude = 0.0,
        float $latitude = 0.0,
        float $longueur = 0.0,
        int $denivele = 0,
        int $difficulte = 1
    ) {
        $data = [
            'id' => $id,
            'nom' => $nom,
            'longitude' => $longitude,
            'latitude' => $latitude,
            'longueur' => $longueur,
            'denivele' => $denivele,
            'difficulte' => $difficulte
        ];

        $filtered = filter_var_array($data, self::$filtres);

        $this->id = ($filtered['id'] !== false && $filtered['id'] !== null) ? $filtered['id'] : 0;
        $this->nom = $filtered['nom'] ?? "";
        $this->longitude = ($filtered['longitude'] !== false && $filtered['longitude'] !== null) ? $filtered['longitude'] : 0.0;
        $this->latitude = ($filtered['latitude'] !== false && $filtered['latitude'] !== null) ? $filtered['latitude'] : 0.0;
        $this->longueur = ($filtered['longueur'] !== false && $filtered['longueur'] !== null) ? $filtered['longueur'] : 0.0;
        $this->denivele = ($filtered['denivele'] !== false && $filtered['denivele'] !== null) ? $filtered['denivele'] : 0;
        $this->difficulte = ($filtered['difficulte'] !== false && $filtered['difficulte'] !== null) ? $filtered['difficulte'] : 1;
    }

    // Getters
    public function getId(): int
    {
        return $this->id;
    }
    public function getNom(): string
    {
        return $this->nom;
    }
    public function getLongitude(): float
    {
        return $this->longitude;
    }
    public function getLatitude(): float
    {
        return $this->latitude;
    }
    public function getLongueur(): float
    {
        return $this->longueur;
    }
    public function getDenivele(): int
    {
        return $this->denivele;
    }
    public function getDifficulte(): int
    {
        return $this->difficulte;
    }

    // Setters
    public function setId(int $id): void
    {
        $this->id = $id;
    }
    public function setNom(string $nom): void
    {
        $this->nom = $nom;
    }
    public function setLongitude(float $longitude): void
    {
        $this->longitude = $longitude;
    }
    public function setLatitude(float $latitude): void
    {
        $this->latitude = $latitude;
    }
    public function setLongueur(float $longueur): void
    {
        $this->longueur = $longueur;
    }
    public function setDenivele(int $denivele): void
    {
        $this->denivele = $denivele;
    }
    public function setDifficulte(int $difficulte): void
    {
        $this->difficulte = $difficulte;
    }

    // XML Generator
    public function getXML(): string
    {
        // Only escape dangerous XML characters, not accented characters
        $nom = htmlspecialchars($this->nom, ENT_XML1, 'UTF-8');

        return "<rando>
        <id>{$this->id}</id>
        <nom>{$nom}</nom>
        <longitude>{$this->longitude}</longitude>
        <latitude>{$this->latitude}</latitude>
        <longueur>{$this->longueur}</longueur>
        <denivele>{$this->denivele}</denivele>
        <difficulte>{$this->difficulte}</difficulte>
    </rando>";
    }
}
