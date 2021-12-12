<?php
header('Location: https://qdenya.github.io/oblacko/index.html');

if (isset($_POST)) {
    print_r($_POST);
}

// На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()
$message = serialize($_POST);

// Отправляем
mail('denya.drobysh@mail.ru', 'My Subject', $message);
?>

?>