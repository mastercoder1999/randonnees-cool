<?php

class Filtre
{
    private string $filtre = "+0";
    private string $signe = ">=";
    private float $distance = 0;


    public static $filtres = [
        'filtre' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'signe' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'distance' => FILTER_VALIDATE_FLOAT,
    ];

    public function __construct(string $filtre = "")
    {
        if ($filtre !== "" && !preg_match('/^[+-]\d+$/', $filtre)) {
            throw new InvalidArgumentException(
                "Filtre doit être dans le format +N or -N (e.g., +12, -10)"
            );
        }
        $this->filtre = $filtre;

        if ($this->filtre !== "") {
            $operateur = substr($this->filtre, 0, 1);
            $this->distance = substr($this->filtre, 1);

            if ($operateur === '+') {
                #$sql = "SELECT * FROM rando WHERE longueur >= :longueur";
                $this->signe = ">=";
            } elseif ($operateur === '-') {
                #$sql = "SELECT * FROM rando WHERE longueur <= :longueur";
                $this->signe = "<=";
            }
        }
    }

    // Getters
    public function getFiltre(): string
    {
        return $this->filtre;
    }
    public function getSigne(): string
    {
        return $this->signe;
    }
    public function getDistance(): float
    {
        return $this->distance;
    }
}
