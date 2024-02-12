import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Cookies from "js-cookie";

export default function NavBar() {
  const user = useUser();
  const navigate = useNavigate();

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
      {user ? (
        <Menu>
          <MenuButton as={Avatar} bg="teal.500" cursor="pointer" />
          <MenuList>
            <MenuItem
              onClick={() => {
                Cookies.remove("token");
                navigate("/sign-in");
              }}
            >
              Выйти
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link to="/sign-in">
          <Button variant="ghost">Войти</Button>
        </Link>
      )}
    </HStack>
  );
}
