import { AddIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { CitizenFormValues, CitizenSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

export default function AddCitizenButton({ ...props }: ButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CitizenFormValues>({ resolver: zodResolver(CitizenSchema) });

  const onSubmit = (data: CitizenFormValues) => {
    console.log(data);
    // Handle form submission here
    onClose();
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} {...props} onClick={onOpen}>
        Добавить
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить Гражданина</ModalHeader>
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
                  <Input
                    {...register("middle_name", {
                      required: "This is required",
                    })}
                  />
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
