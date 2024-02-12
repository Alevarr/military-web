import {
  Button,
  ButtonProps,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { CitizenFormValues, CitizenSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { API_ENDPOINTS } from "../api-endpoints";
import { fetcher } from "../utils/fetcher";
import { useQueryClient } from "@tanstack/react-query";
import AddButton from "./AddButton";

export default function AddCitizen({ ...props }: ButtonProps) {
  const toast = useToast();

  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CitizenFormValues>({ resolver: zodResolver(CitizenSchema) });

  const onSubmit = async (data: CitizenFormValues) => {
    // if (data.middle_name === "") data.middle_name = undefined;
    // const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.CREATE_CITIZEN;
    // const res = await fetcher(url, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    // onClose();
    // if (!res.ok)
    //   return toast({
    //     position: "bottom-right",
    //     title: "Ошибка при выполнении запроса",
    //     status: "error",
    //     isClosable: true,
    //   });
    // toast({
    //   position: "bottom-right",
    //   title: "Запрос выполнен успешно",
    //   status: "success",
    //   isClosable: true,
    // });
    // queryClient.invalidateQueries({ queryKey: ["citizens"] });
  };

  return (
    <>
      <AddButton {...props} onClick={onOpen}>
        Добавить
      </AddButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить Гражданина</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                {/* <FormControl id="type" isInvalid={!!errors.type} isRequired>
                  <FormLabel htmlFor="type">Тип учета</FormLabel>
                  <Select {...register("type")}>
                    <option value="registered">Поставлен</option>
                    <option value="removed">Снят</option>
                  </Select>
                  {errors.type && <Box color="red">{errors.type.message}</Box>}
                </FormControl>
                <FormControl
                  id="department_id"
                  isInvalid={!!errors.department_id}
                  isRequired
                >
                  <FormLabel htmlFor="department_id">Тип учета</FormLabel>
                  <Select {...register("department_id")}>
                    <option value="registered">Поставлен</option>
                    <option value="removed">Снят</option>
                  </Select>
                  {errors.department_id && (
                    <Box color="red">{errors.department_id.message}</Box>
                  )}
                </FormControl> */}
                <FormControl
                  id="deferement_end_date"
                  isInvalid={!!errors.deferment_end_date}
                  isRequired
                >
                  <FormLabel htmlFor="deferement_end_date">
                    Дата окончания отсрочки
                  </FormLabel>
                  <Controller
                    name="deferment_end_date"
                    control={control}
                    defaultValue={undefined}
                    rules={{ required: "Exemption end date is required" }}
                    render={({ field }) => (
                      <SingleDatepicker
                        name="deferment_end_date"
                        date={field.value}
                        onDateChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </FormControl>
                <Button type="submit">Готово</Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
