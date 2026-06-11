import { For,
    Portal,
    Select,
    Stack,
    createListCollection,Box, Card, Text ,CardHeader,CardTitle,CardBody,Input, Button} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";




import { Link } from "react-router-dom";
import axios from "axios";

const PerangkatCreate = () => {
    const [jenis_perangkat, setJenisPerangkat] = useState("");
    const [posisi, setPosisi] = useState("");
    const [nama_perangkat, setNamaPerangkat] = useState("");
    const navigate = useNavigate();

    const handleTambah = async () => {
        console.log(value);
        
        // const url = "http://localhost/inventarisweb/perangkatinsert.php";
        // const body = { jenis_perangkat: jenis_perangkat, posisi: posisi, nama_perangkat: nama_perangkat };
    
        // try {
        //   const response = await axios.post(url, body);
          
    
          
        //   if (response.data.STATUS === "BERHASIL") {
        //     navigate("/dashboard/perangkat");
        //   } else {
        //     navigate("/dashboard/perangkat/tambah");
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
    };
    

    
    const [value, setValue] = useState([])
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
                            <Text>Form Tambah Perangkat</Text>
                        </CardTitle>
                    </CardHeader>
                    
                    <CardBody gapY="10px">

                    
                    <For each={["outline", "subtle"]}>
                    {(variant) => (
                    // <Select.Root key={variant} variant={variant} collection={frameworks}>

                    <Select.Root
                    key={variant}
                    collection={frameworks}
                    width="320px"
                    value={frameworks.value}
                    onValueChange={(e) => setValue(e.value)

                        
                    }
                    >
                    
                        
                        <Select.HiddenSelect />
                        <Select.Label>Select framework - {variant}</Select.Label>
                        <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select framework" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                        <Select.Positioner>
                            <Select.Content>
                            {frameworks.items.map((framework) => (
                                <Select.Item item={framework} key={framework.value}>
                                {framework.label}
                                <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                            </Select.Content>
                        </Select.Positioner>
                        </Portal>
                    </Select.Root>
                    )}
                    </For>
                    {/* <Input onChange={(e) => {setJenisPerangkat(e.target.value)}} placeholder="JenisPerangkat" type="text" />
                    <Input onChange={(e) => {setPosisi(e.target.value)}} placeholder="Posisi" type="text"/> */}
                    <Input onChange={(e) => {setNamaPerangkat(e.target.value)}} placeholder="NamaPerangkat" type="text" />

                        
                        <Button onClick={() => { handleTambah() }}backgroundColor="teal"color="white" borderRadius="10px">

                        
                            <Text>Tambah Perangkat</Text>
                        </Button>
                        <Button as={Link}to="/dashboard/perangkat"variant="outline"borderRadius="10px">
                            <Text>Kembali</Text>
                        </Button>
                    </CardBody>
                </Card.Root>
            </Box>
        </>
    );
};



const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  })

export default PerangkatCreate;



