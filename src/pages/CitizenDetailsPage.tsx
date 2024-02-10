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
} from "@chakra-ui/react";
import FeasibilityBadge from "../components/FeasibilityBadge";
import MilitaryCard from "../components/MilitaryCard";
import RecordCard from "../components/RecordCard";

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
      <Divider borderColor="gray.300" />
      <HStack
        divider={<StackDivider borderColor="gray.300" />}
        justifyContent="stretch"
        w="100%"
      >
        <Flex gap={2} flexWrap="wrap" flex="1">
          {data?.militaries.map((military) => (
            <MilitaryCard military={military} />
          ))}
        </Flex>
        <Flex gap={2} flexWrap="wrap" flex="1">
          {data?.records.map((record) => (
            <RecordCard record={record} />
          ))}
        </Flex>
      </HStack>
    </VStack>
  );
}
