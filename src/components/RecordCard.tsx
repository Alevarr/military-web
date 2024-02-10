import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { Record } from "../types";

const typeMap = {
  registered: "Поставлен",
  removed: "Снят",
};

export default function RecordCard({ record }: { record: Record }) {
  return (
    <Card maxW="200px">
      <CardHeader>
        <Heading
          size="md"
          color={record.type == "registered" ? "green" : "red"}
        >
          {typeMap[record.type]}
        </Heading>
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
