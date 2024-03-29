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
  VStack,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import {
  EditCitizenModalProps,
  MilitaryFormValues,
  MilitarySchema,
} from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { API_ENDPOINTS } from "../api-endpoints";
import { fetcher } from "../utils/fetcher";
import { useQueryClient } from "@tanstack/react-query";
import AddButton from "./AddButton";

export default function AddMilitary({
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
  } = useForm<MilitaryFormValues>({ resolver: zodResolver(MilitarySchema) });

  const onSubmit = async (data: MilitaryFormValues) => {
    if (data.comment === "") data.comment = undefined;
    const extendedData = { ...data, citizen_id: citizen.id };
    const url = import.meta.env.VITE_API_URL + API_ENDPOINTS.CREATE_MILITARY;
    const res = await fetcher(url, {
      method: "POST",
      body: JSON.stringify(extendedData),
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
      <AddButton {...props} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить Приписное</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl
                  id="military_serial"
                  isInvalid={!!errors.military_serial}
                  isRequired
                >
                  <FormLabel htmlFor="military_serial">
                    Серийный номер
                  </FormLabel>
                  <Input
                    {...register("military_serial", {
                      required: "This is required",
                    })}
                  />
                  {errors.military_serial && (
                    <Box color="red">{errors.military_serial.message}</Box>
                  )}
                </FormControl>
                <FormControl id="comment" isInvalid={!!errors.comment}>
                  <FormLabel htmlFor="comment">Комментарий</FormLabel>
                  <Input
                    {...register("comment", {
                      required: "This is required",
                    })}
                  />
                  {errors.comment && (
                    <Box color="red">{errors.comment.message}</Box>
                  )}
                </FormControl>
                <FormControl
                  id="release_date"
                  isInvalid={!!errors.release_date}
                  isRequired
                >
                  <FormLabel htmlFor="release_date">Дата выпуска</FormLabel>
                  <Controller
                    name="release_date"
                    control={control}
                    defaultValue={undefined}
                    rules={{ required: "Exemption end date is required" }}
                    render={({ field }) => (
                      <SingleDatepicker
                        name="release_date"
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
