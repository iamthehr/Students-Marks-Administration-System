import React, { useEffect, useState } from "react";
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
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

export const Addmarks = () => {
  const [semester, setSemester] = useState(0);
  const [registrationNumber, setRegistrationNumber] = useState();
  const [subjects, setSubjects] = useState([]);
  const [marksObtained, setMarksObtained] = useState();
  const [totalMarks, settotalMarks] = useState();
  const [subject, setSubject] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (
      !semester ||
      !registrationNumber ||
      !subject ||
      !marksObtained ||
      !totalMarks
    ) {
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
      const { data } = await axios.post("http://localhost:5000/uploadMarks", {
        registrationNumber: registrationNumber,
        subject: subject,
        semester: semester,
        totalMarks: totalMarks,
        gainMarks: marksObtained,
      });
      // console.log(data);
      setRegistrationNumber("");
      settotalMarks("");
      setMarksObtained("");
      if (data) {
        toast({
          title: "Marks Uploaded Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Can't upload Marks",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const getSubjects = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/getSubjects", {
        semester: semester,
      });
      // console.log(data);
      setSubjects(data);
    } catch (error) {}
  };

  useEffect(() => {
    getSubjects();
  }, [semester]);

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
          marginTop={"3%"}
          padding={"10px"}
          borderRadius="10px"
          // bg={"white"}
          fontSize={"5xl"}
        >
          Add Marks
        </Text>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          width="30%"
          marginTop={"1%"}
          bg="white"
          padding={"15px"}
          borderRadius={"10px"}
        >
          <FormControl isRequired marginBottom={"5%"}>
            <FormLabel>Registration Number</FormLabel>
            <Input
              value={registrationNumber}
              placeholder="Registration Number"
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired marginBottom={"5%"}>
            <FormLabel>Marks Obtained</FormLabel>
            <Input
              value={marksObtained}
              placeholder="Marks Obtained"
              onChange={(e) => setMarksObtained(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired marginBottom={"5%"}>
            <FormLabel>Total Marks</FormLabel>
            <Input
              value={totalMarks}
              placeholder="Total Marks"
              onChange={(e) => settotalMarks(e.target.value)}
            />
          </FormControl>
          <Select
            marginBottom={"5%"}
            placeholder="Semester"
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
          <Select
            margin={"auto"}
            placeholder="Subjects"
            onChange={(e) => setSubject(e.target.value)}
            marginBottom={"5%"}
          >
            {subjects.map((value) => (
              <option value={value.name}>{value.name}</option>
            ))}
          </Select>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
    </div>
  );
};
