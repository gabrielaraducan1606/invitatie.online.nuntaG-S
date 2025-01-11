import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    VStack,
    Heading,
    useToast,
} from "@chakra-ui/react";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        guests: "",
        diet: "",
        comments: "",
    });

    const toast = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/rsvp", formData);
            toast({ title: response.data.message, status: "success", duration: 3000, isClosable: true });
            setFormData({ name: "", phone: "", guests: "", diet: "", comments: "" });
        } catch (error) {
            toast({ title: "Eroare la trimiterea datelor.", status: "error", duration: 3000, isClosable: true });
        }
    };

    return (
        <Box maxW="500px" mx="auto" mt="50px">
            <Heading mb={6} textAlign="center">Confirmare RSVP</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Nume</FormLabel>
                        <Input name="name" value={formData.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Telefon</FormLabel>
                        <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Număr de invitați</FormLabel>
                        <Input name="guests" type="number" value={formData.guests} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Preferințe alimentare</FormLabel>
                        <Select name="diet" value={formData.diet} onChange={handleChange}>
                            <option value="">Nicio preferință</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="halal">Halal</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Comentarii</FormLabel>
                        <Textarea name="comments" value={formData.comments} onChange={handleChange} />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="full">Trimite</Button>
                </VStack>
            </form>
        </Box>
    );
}

export default App;
