import { Box, Button, Card, CardBody, CardHeader, CardTitle, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { TampilPesan } from "../components/ui/services";

const PenggunaUpdate = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");

    const { id } = useParams();
    
    const selectSatuPengguna = async () => {
        const url = `http://localhost/inventarisweb/satupenggunaread.php?id=${id}`;

        try {
            const res = await axios.get(url);
            setNama(res.data["DATA"][0]["nama"]);
            setUsername(res.data["DATA"][0]["username"]);
            setPassword(res.data["DATA"][0]["password"]);
        } catch (error) {
            print(error);
        }
    }

    const handleUpdate = async () => {
        const url = "http://localhost/inventarisweb/penggunaupdate.php";
        const body = { username: username, password: password, nama: nama, id: id };

        try {
            const res = await axios.post(url, body);

            if(res.data.STATUS === "BERHASIL") {
                navigate("/dashboard/pengguna");
                TampilPesan("Info", "Pengguna berhasil diupdate!");
            } else {
                navigate("/dashboard/pengguna/update");
                TampilPesan("Info", "Gagal mengupdate pengguna!");
            }
        } catch (error) {
            TampilPesan("Info", "Terjadi kesalahan.");
        }
    }

    useEffect(() => {
        selectSatuPengguna();
    }, []);

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                width="100dvw"
                height="100dvh"
                justifyContent="center"
                alignItems="center"
            >
                <Toaster />
                <Card.Root
                    width="50dvw"
                    shadowColor="bg.emphasized"
                    shadow="lg"
                >
                    <CardHeader>
                        <CardTitle>
                            <Text>Form Ubah Pengguna</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardBody gapY="10px">
                        <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Input placeholder="Nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                        <Button
                            backgroundColor="teal"
                            color="white"
                            borderRadius="10px"
                            onClick={() => handleUpdate()}
                        >
                            <Text>Update Pengguna</Text>
                        </Button>
                        <Button
                            as={Link}
                            to="/dashboard/pengguna"
                            borderRadius="10px"
                            variant="outline"
                        >
                            <Text>Kembali</Text>
                        </Button>
                    </CardBody>
                </Card.Root>
            </Box>
        </>
    );
}

export default PenggunaUpdate;