import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <HStack
      borderBottomWidth={2}
      borderColor="gray.200"
      py={6}
      px={12}
      alignItems="center"
      justifyContent="space-between"
      gap={4}
    >
      <HStack gap={4}>
        <Link to="/citizens">
          <Button variant="link" size="lg">
            Граждане
          </Button>
        </Link>
        <Link to="/departments">
          <Button variant="link" size="lg">
            Отделения
          </Button>
        </Link>
      </HStack>
      <Link to="/sign-in">
        <Button variant="ghost">Войти</Button>
      </Link>
    </HStack>
  );
}
