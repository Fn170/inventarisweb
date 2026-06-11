<?php
include('koneksi.php');

//saat menggunakan POST
$data = json_decode(file_get_contents('php://input'), true);

$query ="INSERT INTO pengguna(username, password, nama, del,ctm,mtm, dtm, usr) VALUES (?, ?,?,0,NOW(),
NULL,NULL,0)";

$stmt = mysqli_prepare($conn, $query);

if ($stmt) {
    $username=$data['username'];
    $password=$data['password'];
    $nama=$data['nama'];

    mysqli_stmt_bind_param($stmt,'sss',$username,$password,$nama);

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['STATUS'=>'BERHASIL', 'PESAN'=>'DATA BERHASIL DISIMPAN', 'DATA'=>[]]);
    }else{
        echo json_encode(['STATUS'=>'GAGAL', 'PESAN'=>'DATA GAGAL DISIMPAN','DATA'=>[]]);
    }
}else{
    echo json_encode(['STATUS'=>'GAGAL', 'PESAN'=>'MASALAH KONEKSI', 'DATA'=>[]]);
}
?>