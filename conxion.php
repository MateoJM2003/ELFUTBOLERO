<?php
$host = "localhost";              
$nombreBD = "Register";  
$usuario = "postgres";  
$password = "20030720jm";    


$conn = pg_connect("host=$host dbname=$nombreBD user=$usuario password=$password");

if (!$conn) {
    echo "Error: No se pudo conectar a la base de datos.";
    exit;
}
echo "Conexión exitosa a la base de datos.";

$id = $_POST['cedula'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$mail = $_POST['email'];

$query = "INSERT INTO cliente (nombre, apellido, cedula, correo) 
          VALUES ('$nombre', '$apellido', '$id', '$mail')";

$result = pg_query($conn, $query);

if ($result) {
    echo "Usuario registrado exitosamente.";
    header("Location: index.html");
} else {
    echo "Error al registrar el usuario.";
}

pg_close($conn);
?>
