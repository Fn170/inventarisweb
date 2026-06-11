<?php
include('koneksi.php');

//saat menggunakan POST
$data = json_decode(file_get_contents('php://input'), true);

$query="UPDATE pengguna SET username =? , password =? , nama =? , mtm = NOW(), usr=0 WHERE id =? ";

$stmt = mysqli_prepare($conn, $query);

if ($stmt) {
    $username=$data['username'];
    $password=$data['password'];
    $nama=$data['nama'];
    $id=$data['id'];

    mysqli_stmt_bind_param($stmt,'sssi',$username, $password, $nama, $id);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['STATUS'=>'BERHASIL', 'PESAN'=>'DATA PENGGUNA BERHASIL DIUPDATE', 'DATA'=>[]]);
    } else {
        echo json_encode(['STATUS'=>'GAGAL', 'PESAN'=>'DATA PENGGUNA GAGAL DIUPDATE', 'DATA'=>[]]);
    }

} else {
    echo json_encode(['STATUS'=>'GAGAL', 'PESAN'=>'MASALAH KONEKSI','DATA'=>[]]);
}

?>