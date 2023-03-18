import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";

const AddSubject = () => {
  const [name, setName] = useState();
  const [semester, setSemester] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!name || !semester) {
      toast({
        title: "Please fill all fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:5000/addSubject", {
        name: name,
        semester: semester,
      });
      // console.log(data);
      setName("");
      if (data) {
        toast({
          title: "Subject added Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Can't add Subject",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <div>
      <Topbar />
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          marginTop={"4.5%"}
          padding={"10px"}
          borderRadius="10px"
          // bg={"white"}
          fontSize={"5xl"}
        >
          Add Subject
        </Text>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          width={{ base: "90%", md: "60%", lg: "30%" }}
          marginTop={"3%"}
          bg="white"
          padding={"15px"}
          borderRadius={"10px"}
        >
          <FormControl isRequired marginBottom={"5%"}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <Select
            margin={"auto"}
            placeholder="Semester"
            marginBottom={"5%"}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option vakue={3}>3</option>
            <option vakue={4}>4</option>
            <option vakue={5}>5</option>
            <option vakue={6}>6</option>
            <option vakue={7}>7</option>
            <option vakue={8}>8</option>
          </Select>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddSubject;
