import {
  Button,
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
import {
  CitizenFormValues,
  CitizenSchema,
  EditCitizenModalProps,
} from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { API_ENDPOINTS } from "../api-endpoints";
import { fetcher } from "../utils/fetcher";
import { useQueryClient } from "@tanstack/react-query";
import { EditIcon } from "@chakra-ui/icons";

export default function EditCitizen({
  citizen,
  ...props
}: EditCitizenModalProps) {
  const toast = useToast();

  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CitizenFormValues>({
    defaultValues: {
      last_name: citizen.last_name,
      first_name: citizen.first_name,
      middle_name: citizen.middle_name,
      feasibility_category: citizen.feasibility_category,
      passport: citizen.passport,
      deferment_end_date: citizen.deferment_end_date
        ? new Date(citizen.deferment_end_date)
        : undefined,
    },
    resolver: zodResolver(CitizenSchema),
  });

  const onSubmit = async (data: CitizenFormValues) => {
    if (data.middle_name === "") data.middle_name = undefined;
    const url =
      import.meta.env.VITE_API_URL +
      API_ENDPOINTS.EDIT_CITIZEN(citizen.id.toString());
    const res = await fetcher(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    onClose();
    if (!res.ok)
      return toast({
        position: "bottom-right",
        title: "Ошибка при выполнении запроса",
        status: "error",
        isClosable: true,
      });
    toast({
      position: "bottom-right",
      title: "Запрос выполнен успешно",
      status: "success",
      isClosable: true,
    });
    queryClient.invalidateQueries({
      queryKey: ["citizen", citizen.id.toString()],
    });
  };

  return (
    <>
      <Button {...props} onClick={onOpen} leftIcon={<EditIcon />}>
        Изменить
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Рекдактировать Данные Гражданина</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl
                  id="last_name"
                  isInvalid={!!errors.last_name}
                  isRequired
                >
                  <FormLabel htmlFor="last_name">Фамилия</FormLabel>
                  <Input
                    {...register("last_name", { required: "This is required" })}
                  />
                  {errors.last_name && (
                    <Box color="red">{errors.last_name.message}</Box>
                  )}
                </FormControl>
                <FormControl
                  id="first_name"
                  isInvalid={!!errors.first_name}
                  isRequired
                >
                  <FormLabel htmlFor="first_name">Имя</FormLabel>
                  <Input
                    {...register("first_name", {
                      required: "This is required",
                    })}
                  />
                  {errors.first_name && (
                    <Box color="red">{errors.first_name.message}</Box>
                  )}
                </FormControl>
                <FormControl id="middle_name" isInvalid={!!errors.middle_name}>
                  <FormLabel htmlFor="middle_name">Отчество</FormLabel>
                  <Input {...register("middle_name")} />
                  {errors.middle_name && (
                    <Box color="red">{errors.middle_name.message}</Box>
                  )}
                </FormControl>
                <FormControl
                  id="passport"
                  isInvalid={!!errors.passport}
                  isRequired
                >
                  <FormLabel htmlFor="passport">
                    Паспорт (серия, номер):
                  </FormLabel>
                  <Input
                    type="number"
                    maxLength={10}
                    {...register("passport", {
                      required: "This is required",
                    })}
                  />
                  {errors.passport && (
                    <Box color="red">{errors.passport.message}</Box>
                  )}
                </FormControl>
                <FormControl
                  id="feasibility_category"
                  isInvalid={!!errors.feasibility_category}
                  isRequired
                >
                  <FormLabel htmlFor="feasibility_category">
                    Категория здоровья
                  </FormLabel>
                  <Select {...register("feasibility_category")}>
                    <option value="А">А</option>
                    <option value="Б">Б</option>
                    <option value="В">В</option>
                    <option value="Г">Г</option>
                    <option value="Д">Д</option>
                  </Select>
                  {errors.feasibility_category && (
                    <Box color="red">{errors.feasibility_category.message}</Box>
                  )}
                </FormControl>
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
