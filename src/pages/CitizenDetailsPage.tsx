import { useNavigate, useParams } from "react-router-dom";
import useCitizen from "../hooks/useCitizen";
import {
  HStack,
  Heading,
  Text,
  StackDivider,
  VStack,
  Box,
  Flex,
  Divider,
  Spinner,
  useToast,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import FeasibilityBadge from "../components/FeasibilityBadge";
import MilitaryCard from "../components/MilitaryCard";
import RecordCard from "../components/RecordCard";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useUser from "../hooks/useUser";
import AddMilitary from "../components/AddMilitary";
import AddRecord from "../components/AddRecord";
import EditCitizen from "../components/EditCitizen";
import DeleteConfirm from "../components/DeleteConfirm";
import { fetcher } from "../utils/fetcher";
import { API_ENDPOINTS } from "../api-endpoints";
import { useQueryClient } from "@tanstack/react-query";

const actionsMap = {
  add: <ListIcon as={AddIcon} color="green" />,
  edit: <ListIcon as={EditIcon} color="yellow.500" />,
  delete: <ListIcon as={DeleteIcon} color="red" />,
};

export default function CitizenDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  const { data, isLoading, error } = useCitizen(id!);

  const user = useUser();

  if (isLoading) return <Spinner color="teal" />;

  if (error) {
    toast({
      position: "bottom-right",
      title: "Не удалось получить данные",
      status: "error",
      isClosable: true,
    });
    return <Heading size="md">Ошибка получения данных...</Heading>;
  }

  const queryClient = useQueryClient();

  return (
    <VStack alignItems="flex-start">
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <HStack gap={4}>
          <Heading>
            {data?.last_name} {data?.first_name} {data?.middle_name}
          </Heading>
          <FeasibilityBadge feasibilityCategory={data!.feasibility_category} />
        </HStack>
        {user?.role === "editor" && (
          <HStack>
            <EditCitizen citizen={data!} />
            <DeleteConfirm
              onConfirm={async () => {
                const url =
                  import.meta.env.VITE_API_URL +
                  API_ENDPOINTS.DELETE_CITIZEN(id!);

                const res = await fetcher(url, {
                  method: "DELETE",
                });
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
                queryClient.invalidateQueries({ queryKey: ["citizens"] });
                navigate("/citizens");
              }}
            />
          </HStack>
        )}
      </HStack>
      <Box>
        <Text>
          <b>Серия, номер паспорта: </b>
          {data?.passport.substring(0, 4) + " " + data?.passport.substring(4)}
        </Text>
        <Text>
          <b>Дата окончания отсрочки:</b>{" "}
          {data?.deferment_end_date
            ? new Date(data.deferment_end_date).toLocaleDateString()
            : "Нет"}
        </Text>
      </Box>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                История изменений
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List spacing={3}>
              {data?.actions.map((action) => (
                <ListItem key={action.id}>
                  {actionsMap[action.type]}
                  {action.user_email}
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider borderColor="gray.300" />
      <HStack
        divider={<StackDivider borderColor="gray.300" />}
        justifyContent="stretch"
        alignItems="flex-start"
        w="100%"
      >
        <VStack
          alignItems="flex-start"
          flex="1"
          justifyContent="flex-start"
          gap={8}
        >
          <Heading size="md" mt={4} ml={2}>
            Приписные свидетельства:
          </Heading>
          <Flex gap={2} flexWrap="wrap">
            {data?.militaries.map(
              (military) =>
                military.id && (
                  <MilitaryCard
                    military={military}
                    isEditable={user?.role === "editor"}
                    key={military.id}
                  />
                )
            )}
          </Flex>
          {user?.role === "editor" && <AddMilitary citizen={data!} />}
        </VStack>
        <VStack
          alignItems="flex-start"
          flex="1"
          justifyContent="flex-start"
          gap={8}
        >
          <Heading size="md" mt={4} ml={2}>
            История учета:
          </Heading>
          <Flex gap={2} flexWrap="wrap" flex="1">
            {data?.records.map(
              (record) =>
                record.id && (
                  <RecordCard
                    record={record}
                    key={record.id}
                    citizen_id={data.id.toString()}
                    isEditable={user?.role === "editor"}
                  />
                )
            )}
          </Flex>
          {user?.role === "editor" && <AddRecord citizen={data!} />}
        </VStack>
      </HStack>
    </VStack>
  );
}
