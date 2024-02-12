import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton,
  useToast,
  Show,
  Heading,
} from "@chakra-ui/react";
import { Department } from "../types";
import useDepartments from "../hooks/useDepartments";
import { skeletons } from "../utils/skeletons";

export default function DepartmentsPage() {
  const { data, isLoading, error } = useDepartments();
  const toast = useToast();

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
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Название</Th>
              <Show above="md">
                <Th>Адрес</Th>
              </Show>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading &&
              skeletons.map((skeleton) => (
                <Tr key={skeleton}>
                  <Td>
                    <Skeleton w="100%" h="20px" />
                  </Td>

                  <Show above="md">
                    <Td>
                      <Skeleton w="100%" h="20px" />
                    </Td>
                  </Show>
                </Tr>
              ))}
            {data?.map(({ id, name, address }: Department) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Show above="md">
                  <Td>{address}</Td>
                </Show>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
