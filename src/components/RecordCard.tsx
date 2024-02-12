import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Record } from "../types";
import EditRecord from "./EditRecord";

const typeMap = {
  registered: "Поставлен",
  removed: "Снят",
};

export default function RecordCard({
  record,
  isEditable,
  citizen_id,
}: {
  record: Record;
  isEditable: boolean;
  citizen_id: string;
}) {
  return (
    <Card maxW="200px">
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading
            size="md"
            color={record.type == "registered" ? "green" : "red"}
          >
            {typeMap[record.type]}
          </Heading>
          {isEditable && <EditRecord record={record} citizen_id={citizen_id} />}
        </HStack>
      </CardHeader>
      <CardBody>
        <Text>{record.department.name}</Text>
        <Text fontWeight="bold">
          {new Date(record.date).toLocaleDateString()}
        </Text>
      </CardBody>
    </Card>
  );
}
