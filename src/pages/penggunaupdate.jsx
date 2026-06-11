import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link  } from "react-router-dom";
import axios from "axios";

import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardRoot,
    CardTitle,
    Center,
    Image,
    Input,
    Text,
  } from "@chakra-ui/react";

const PenggunaUpdate = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nama, setNama] = useState("");
    
    const navigate = useNavigate();
    const { id } = useParams(); 

    console.log(id);
  
    
    const selectSatuPengguna = async () => {
      const url = `http://localhost/inventarisweb/satupenggunaread.php?id=${id}`;
      try {
        const response = await axios.get(url);
        console.log(response); 
        
        
        setNama(response.data["DATA"][0]["nama"]);
        setUsername(response.data["DATA"][0]["username"]);
        setPassword(response.data["DATA"][0]["password"]);
      } catch (error) {
        console.log(error);
        
      }
    };
  
    useEffect(() => {
      selectSatuPengguna();
    }, []);
  
    
    const handleUpdate = async () => {
      const url = "http://localhost/inventarisweb/penggunaupdate.php";
      const body = { username: username, password: password, nama: nama, id: id };
  
      try {
        const response = await axios.post(url, body);
        // console.log(response);
  
        if (response.data.STATUS === "BERHASIL") {
          navigate("/dashboard/pengguna");
        } else {
          navigate("/dashboard/pengguna/update");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
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
                <Card.Root width="50dvw" shadowColor="bg.emphasized" shadow="lg">
                    <CardHeader>
                        <CardTitle>
                            <Text>Form Update Pengguna</Text>
                        </CardTitle>
                    </CardHeader>
            
                    {/* <CardBody gap="4"> */}
                    <CardBody gapY="10px">
                        <Input
                            onChange={(e) => {setUsername(e.target.value);}}
                            placeholder="Username"
                            type="text"
                            value={username}
                        />
                        <Input
                            onChange={(e) => {setPassword(e.target.value);}}
                            placeholder="Password"
                            type="password"
                            value={password}
                        />
                        <Input
                            onChange={(e) => {setNama(e.target.value);}}
                            placeholder="Nama"
                            type="text"
                            value={nama}
                        />
            
                        <Button
                            onClick={() => { handleUpdate(); }}
                            
                            // colorPalette="teal"
                            backgroundColor="teal"
                            // variant="solid"
                            color="white"
                            borderRadius="10px"
                        >
                            <Text>Update Pengguna</Text>
                        </Button>
            
                        <Button
                            as={Link}
                            to="/dashboard/pengguna"
                            variant="outline"
                            borderRadius="10px"
                        >
                            <Text>Kembali</Text>
                        </Button>
                    </CardBody>
                </Card.Root>
            </Box>
        </>
    );
  };
  
export default PenggunaUpdate;
  
  