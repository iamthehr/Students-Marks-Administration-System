import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PlusSquareIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const LogOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        height={"4rem"}
      >
        <Button variant="ghost" alignSelf={"flex-start"} onClick={onOpen}>
          <Text display={"flex"} transform="" px="4px">
            <HamburgerIcon fontSize={"3xl"} />
          </Text>
        </Button>
        <Text fontSize="4xl" fontFamily="Work sans" alignSelf={"center"}>
          MIS
        </Text>
        <Button variant={"ghost"} onClick={LogOutHandler}>
          Log Out
        </Button>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Admin</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder="Type here..." />
             */}

            <Button
              marginBottom={"2"}
              variant={"ghost"}
              width="100%"
              onClick={() => {
                onClose();
                navigate("/Dashboard");
              }}
              rightIcon={<EditIcon />}
            >
              Dashboard
            </Button>
            <Button
              marginBottom={"2"}
              variant={"ghost"}
              width="100%"
              onClick={() => {
                onClose();
                navigate("/Add-Students");
              }}
              rightIcon={<PlusSquareIcon />}
            >
              Add Student
            </Button>
            <Button
              marginBottom={"2"}
              variant={"ghost"}
              width="100%"
              onClick={() => {
                onClose();
                navigate("/Add-Subject");
              }}
              rightIcon={<PlusSquareIcon />}
            >
              Add Subject
            </Button>
            <Button
              marginBottom={"2"}
              variant={"ghost"}
              width="100%"
              onClick={() => {
                onClose();
                navigate("/Add-Marks");
              }}
              rightIcon={<PlusSquareIcon />}
            >
              Add Marks
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Topbar;
