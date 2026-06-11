import { Text,Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@chakra-ui/react";
// import { createPortal } from 'react-dom';
import { Portal } from "@chakra-ui/react";


import { useEffect, useState } from "react";
import axios from "axios";

import { Table, Heading, Box, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";



const Perangkat = () => {
  const [user, setUser] = useState([]);
  const selectPerangkat = async () => {
    const url="http://localhost/inventarisweb/perangkatread.php";
   

    
    try {
      const response = await axios.get(url);
      setUser(response.data["DATA"]);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => { selectPerangkat();
  }, []);

  const handleHapus = async (id) => {
    const url = "http://localhost/inventarisweb/perangkatdelete.php";
    const body = { id: id };
  
    try {
      const response = await axios.post(url, body);
      if (response.data.STATUS === "BERHASIL") {
        await selectPerangkat(); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
  <>
    <Heading size="xl" textAlign="center" padding="10px">
      Tabel Perangkat
    </Heading>
    <Box padding="10px">
      <Button as={Link} to="tambah" variant="solid" bgcolor="teal">
        Tambah Perangkat
      </Button>
    </Box>

    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>No</Table.ColumnHeader>
          <Table.ColumnHeader>Nama Perangkat</Table.ColumnHeader>
          <Table.ColumnHeader>Jenis Perangkat</Table.ColumnHeader>
          <Table.ColumnHeader>Posisi</Table.ColumnHeader>
          {/* Kolom Aksi Y */}
          <Table.ColumnHeader>Aksi</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {user.map((item, index) => (
          <Table.Row key={item.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{item.nama_perangkat} </Table.Cell>
            <Table.Cell>{item.jenis_perangkat}</Table.Cell>            
            <Table.Cell>{item.posisi}</Table.Cell>
            <Table.Cell>
              <Button
                as={Link}
                to={`update/${item.id}`}
                margin="2px"
                // colorPalette="blue"
                bgColor="blue.400"
              >
                Ubah
              </Button>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button margin="2px" bgColor="red.400">
                    Hapus
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Konfirmasi Hapus</Dialog.Title>
                        {/* <Dialog.Title>Dialog Title</Dialog.Title> */}
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text>Apakah Anda yakin hapus data {item.nama_perangkat}?</Text>
                        {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel vero similique 
                          magnam laudantium dolorem expedita dolorum illum pariatur inventore. Optio ex 
                          voluptas asperiores? Iste laborum aliquam nemo officia enim sed.
                        </p> */}
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline">Batal</Button>
                        </Dialog.ActionTrigger>
                        
                        <Button
                          bgColor="red.500"
                          onClick={() => { handleHapus(item.id); }}
                        >
                          Hapus
                        </Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>


            </Table.Cell>
            

          </Table.Row>
      ))}
      </Table.Body>
    </Table.Root>
  </>
  );
};

export default Perangkat;

