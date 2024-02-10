import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Heading, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Heading>Что-то пошло не так</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "Страница не найдена"
            : "Неизвестная ошибка"}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
