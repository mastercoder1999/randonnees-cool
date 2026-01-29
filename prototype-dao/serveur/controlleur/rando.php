<?php
    header("Content-Type: text/xml");
    if (isset($_POST['filtre'])) {
        $filtre = $_POST['filtre'];
    } else {
        $filtre = "";
    }
    
    include "../accesseur/RandoDAO.php";
    include "../modele/Filtre.php";

    $filtre = new Filtre($filtre);
    $randos = RandoDAO::listerRandos($filtre);
    

    echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<randos>
<?php
    foreach($randos as $rando)
    {
        echo $rando->getXML();
    }
?>
</randos>
