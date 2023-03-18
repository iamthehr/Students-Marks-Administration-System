import { Box, Button, Select, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
// import Student from "../../../backend/models/student";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [semester, setSemester] = useState(0);
  const [batch, setBatch] = useState(0);
  const [toDisplay, setToDisplay] = useState(false);
  const [info, setInfo] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    // console.log(semester);
    if (semester === 0 || batch === 0) {
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
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/getStudentsAndSubjects",
        {
          semester: semester,
          batch: batch,
        }
      );

      setError(null);
      // console.log(data);
      setInfo(data);
      setToDisplay(true);
    } catch (error) {
      setError(error);
      toast({
        title: "Students are not studying here!",
        description: "Consider admitting some students!",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Topbar />
      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection="row"
          justifyContent={"center"}
          alignItems={"center"}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          marginTop="8%"
          width="50%"
        >
          <Select
            bg={"white"}
            marginRight={"2%"}
            marginBottom={{ base: "3%", md: "0" }}
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
            marginBottom={{ base: "3%", md: "0" }}
            marginRight={"2%"}
            placeholder="Batch"
            bg={"white"}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
          </Select>

          <Button width={"40%"} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
      {isLoading && (
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          marginTop="4%"
        >
          <Spinner size="xl" />
        </Box>
      )}
      {toDisplay && !isLoading && !error ? (
        <Box
          display={"flex"}
          flexDirection="row"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            marginTop="10%"
            width={{ base: "90%", md: "50%" }}
            bg={"white"}
            borderRadius="15px"
          >
            <TableContainer width={"100%"}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Registration Number</Th>
                    <Th>Name</Th>
                    <Th>Marks</Th>
                    <Th>Percentage</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {info.map((student) => (
                    <Tr>
                      <Td>{student.registrationNumber}</Td>
                      <Td>{student.name}</Td>
                      <Td>{student.marks}</Td>
                      <Td>{student.percentage}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};
