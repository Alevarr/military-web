import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Center,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInFormValues, SingInSchema } from "../types";
import { API_ENDPOINTS } from "../api-endpoints";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({ resolver: zodResolver(SingInSchema) });

  const onSubmit = async (data: SignInFormValues) => {
    const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.AUTH;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status == 400) {
        return toast({
          position: "bottom-right",
          title: `Неверный логин или пароль`,
          status: "error",
          isClosable: true,
        });
      } else {
        return toast({
          position: "bottom-right",
          title: `${res.status} ${await res.json()}`,
          status: "error",
          isClosable: true,
        });
      }
    }

    toast({
      position: "bottom-right",
      title: `Успешная авторизация`,
      status: "success",
      isClosable: true,
    });

    const token = await res.text();

    const now = new Date();
    now.setMinutes(now.getMinutes() + 3);
    Cookies.set("token", token, { expires: now });

    navigate("/citizens");
  };
  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl id="email" isInvalid={!!errors.email} isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input {...register("email", { required: "This is required" })} />
            {errors.email && <Box color="red">{errors.email.message}</Box>}
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password} isRequired>
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <Input
              {...register("password", {
                required: "This is required",
              })}
              type="password"
            />
            {errors.password && (
              <Box color="red">{errors.password.message}</Box>
            )}
          </FormControl>
          <Button type="submit">Готово</Button>
        </VStack>
      </form>
    </Center>
  );
}
