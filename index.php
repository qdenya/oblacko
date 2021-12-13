<?php
header('Location: https://catering-center.by/index.html');

if (isset($_POST)) {
    print_r($_POST);
}

$text = "";
$keys = array_keys($_POST);

for($i=0; $i<count($_POST); $i++) {
    $text = $text.$keys[$i].": ".$_POST[$keys[$i]]."\n";
}

// На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()
$message = serialize($_POST);

// Отправляем
mail('denya.drobysh@mail.ru', 'My Subject', $text);
?>

?>