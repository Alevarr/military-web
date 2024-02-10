import { useParams } from "react-router-dom";
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

const actionsMap = {
  add: <ListIcon as={AddIcon} color="green" />,
  edit: <ListIcon as={EditIcon} color="yellow" />,
  delete: <ListIcon as={DeleteIcon} color="red" />,
};

export default function CitizenDetailsPage() {
  const { id } = useParams();
  const toast = useToast();

  const { data, isLoading, error } = useCitizen(id!);

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
  return (
    <VStack alignItems="flex-start" gap={8}>
      <HStack justifyContent="start" alignItems="center">
        <Heading>
          {data?.last_name} {data?.first_name} {data?.middle_name}
        </Heading>
        <FeasibilityBadge feasibilityCategory={data!.feasibility_category} />
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
          <Heading size="md">Приписные свидетельства:</Heading>
          <Flex gap={2} flexWrap="wrap">
            {data?.militaries.map((military) => (
              <MilitaryCard military={military} />
            ))}
          </Flex>
        </VStack>
        <VStack
          alignItems="flex-start"
          flex="1"
          justifyContent="flex-start"
          gap={8}
        >
          <Heading size="md">История учета:</Heading>
          <Flex gap={2} flexWrap="wrap" flex="1">
            {data?.records.map((record) => (
              <RecordCard record={record} />
            ))}
          </Flex>
        </VStack>
      </HStack>
    </VStack>
  );
}
