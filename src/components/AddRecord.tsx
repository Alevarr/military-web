import {
  Button,
  FormControl,
  FormLabel,
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
  Heading,
  Spinner,
  HStack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import {
  EditCitizenModalProps,
  RecordFormValues,
  RecordSchema,
} from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { API_ENDPOINTS } from "../api-endpoints";
import { fetcher } from "../utils/fetcher";
import { useQueryClient } from "@tanstack/react-query";
import AddButton from "./AddButton";
import useDepartments from "../hooks/useDepartments";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function AddRecord({
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
  } = useForm<RecordFormValues>({
    resolver: zodResolver(RecordSchema),
  });

  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const onSubmit = async (data: RecordFormValues) => {
    const extendedData = {
      ...data,
      citizen_id: citizen.id,
      department_id: Number(data.department_id),
    };

    const url =
      import.meta.env.VITE_API_URL +
      (isSwitchChecked
        ? API_ENDPOINTS.CHECK_RECORD_CONCURRENT_ACCESS
        : API_ENDPOINTS.CREATE_RECORD);
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

  const {
    data: departments,
    isLoading: isDepartmentsLoading,
    error: departmentsError,
  } = useDepartments();
  if (departmentsError) {
    toast({
      position: "bottom-right",
      title: "Не удалось получить данные",
      status: "error",
      isClosable: true,
    });
    return <Heading size="md">Ошибка получения данных...</Heading>;
  }

  return (
    <>
      <AddButton {...props} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить Запись об Учете</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl id="type" isInvalid={!!errors.type} isRequired>
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
                  <Select
                    {...register("department_id")}
                    isDisabled={isDepartmentsLoading}
                    icon={
                      isDepartmentsLoading ? <Spinner /> : <ChevronDownIcon />
                    }
                  >
                    {departments?.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </Select>
                  {errors.department_id && (
                    <Box color="red">{errors.department_id.message}</Box>
                  )}
                </FormControl>
                <FormControl id="date" isInvalid={!!errors.date} isRequired>
                  <FormLabel htmlFor="date">Дата</FormLabel>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={undefined}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <SingleDatepicker
                        name="date"
                        date={field.value}
                        onDateChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </FormControl>
                <HStack w="100%" alignItems="center">
                  <Switch
                    colorScheme="teal"
                    isChecked={isSwitchChecked}
                    onChange={() => setIsSwitchChecked(!isSwitchChecked)}
                  />
                  <Text>Проверка одновременного доступа</Text>
                </HStack>
                <Button type="submit">Готово</Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
