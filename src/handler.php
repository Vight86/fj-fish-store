<?php

$recepient = "vpekun@gmail.com";
$sitename = "Название сайта";

$id = trim($_POST["id"]);
$name = trim($_POST["title"]);
$price = trim($_POST["price"]);
$qty = trim($_POST["qty"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$message = "Id продукта: $id \nНазвание продукта: $name \nЦена продукта: $price \nКоличество: $qty \nНомер телефона: $phone \nEmail: $email";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>