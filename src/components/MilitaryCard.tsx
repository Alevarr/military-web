import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { Military } from "../types";

export default function MilitaryCard({ military }: { military: Military }) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{military.military_serial}</Heading>
      </CardHeader>
      <CardBody>
        <Text fontWeight="bold">{military.release_date}</Text>
        <Text>{military.comment}</Text>
      </CardBody>
    </Card>
  );
}
