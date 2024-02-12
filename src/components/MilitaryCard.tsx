import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Military } from "../types";
import EditMilitary from "./EditMilitary";

export default function MilitaryCard({
  military,
  isEditable,
}: {
  military: Military;
  isEditable: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading size="md">{military.military_serial}</Heading>
          {isEditable && <EditMilitary military={military} />}
        </HStack>
      </CardHeader>
      <CardBody>
        <Text fontWeight="bold">{military.release_date}</Text>
        <Text>{military.comment}</Text>
      </CardBody>
    </Card>
  );
}
