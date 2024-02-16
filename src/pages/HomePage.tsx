import { Button, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <VStack alignItems="flex-start" gap={4}>
      <Heading>Военный Учетный Стол</Heading>
      <Link to="/citizens">
        <Button variant="outline">Перейти к списку</Button>
      </Link>
    </VStack>
  );
}
