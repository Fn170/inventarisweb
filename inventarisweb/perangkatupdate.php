<?php
include('koneksi.php');

//saat menggunakan POST
$data = json_decode(file_get_contents('php://input'), true);

$query="UPDATE perangkat SET nama_perangkat =? , jenis_perangkat =? , posisi =? , mtm = NOW(), usr=0 WHERE id =? ";

$stmt = mysqli_prepare($conn, $query);

if ($stmt) {
    $namaperangkat=$data['nama_perangkat'];
    $jenis_perangkat=$data['jenis_perangkat'];
    $posisi=$data['posisi'];
    $id=$data['id'];

    mysqli_stmt_bind_param($stmt,'sssi',$namaperangkat, $jenis_perangkat, $posisi, $id);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['STATUS'=>'BERHASIL', 'PESAN'=>'DATA PERANGKAT BERHASIL DIUPDATE', 'DATA'=>[]]);
    } else {
        echo json_encode(['STATUS'=>'GAGAL', 'PESAN'=>'DATA PERANGKAT GAGAL DIUPDATE', 'DATA'=>[]]);
    }

} else {
    echo json_encode(['STATUS'=>'GAGAL', 'PESAN'=>'MASALAH KONEKSI','DATA'=>[]]);
}

?>