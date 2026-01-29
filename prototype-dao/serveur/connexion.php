<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$usager = 'mobile';
	$motdepasse = 'mobileCBad122';
	$hote = 'localhost';
	$base = 'mobile';
	$charset = 'utf8';

	$dns = "mysql:host=$hote;dbname=$base;$charset";
	$basededonnees = new PDO($dns, $usager, $motdepasse);

?>
