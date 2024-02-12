import { Box, useToast } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAutoCheckTokenExpiration from "../hooks/useAutoCheckTokenExpiration";

export default function Layout() {
  const toast = useToast();

  useAutoCheckTokenExpiration(() =>
    toast({
      position: "bottom-right",
      title: `Сессия зарегестрированного пользователя завершена`,
      status: "info",
      isClosable: true,
    })
  );

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
}
