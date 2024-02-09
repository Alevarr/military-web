import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
}
