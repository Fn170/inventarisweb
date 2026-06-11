<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Koneksi ke database MySQL XAMPP
$conn = new mysqli("localhost", "root", "", "inventarisweb");

if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal"]));
}

$sql = "SELECT * FROM perangkat";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
