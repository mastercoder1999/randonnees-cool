<?php
    header("Content-Type: text/xml");
    if (isset($_POST['id'])) {
        $id = $_POST['id'];
    } else {
        $id = 1;
    }
    include "../accesseur/RandoDAO.php";
    include "../modele/Rando.php";

    $randoTemp = new Rando($id);
    
    $rando = RandoDAO::detailRando($randoTemp);
    

    echo '<?xml version="1.0" encoding="UTF-8"?>';
    
    if ($rando !== null) {
        echo $rando->getXML(); 
    } else {
        echo "<error>Randonnée non trouvée</error>";
    }
?>
