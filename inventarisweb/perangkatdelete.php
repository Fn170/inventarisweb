<?php
include('koneksi.php');

//saat menggunakan POST
$data = json_decode(file_get_contents('php://input'), true);

$query="UPDATE perangkat SET del=1, usr=0 WHERE id =? ";

$stmt = mysqli_prepare($conn, $query);

if ($stmt) {
    $id=$data['id'];

    mysqli_stmt_bind_param($stmt,'i',$id);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['STATUS'=>'BERHASIL', 'PESAN'=>'DATA PERANGKAT BERHASIL DIHAPUS','DATA'=>[]]);
    } else {
        echo json_encode(['STATUS'=>'GAGAL', 'PESAN'=>'DATA PERANGKAT GAGAL DIHAPUS','DATA'=>[]]);
    }

} else {
    echo json_encode(['STATUS'=>'GAGAL','PESAN'=>'MASALAH KONEKSI','DATA'=>[]]);
}
?>