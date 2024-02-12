import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Skeleton,
  useToast,
  Show,
  Heading,
} from "@chakra-ui/react";
import useCitizens from "../hooks/useCitizens";
import { Link } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";
import AddCitizen from "../components/AddCitizen";
import FeasibilityBadge from "../components/FeasibilityBadge";
import { Citizen } from "../types";
import useUser from "../hooks/useUser";
import { skeletons } from "../utils/skeletons";

export default function CitizensPage() {
  const { data, isLoading, error } = useCitizens();
  const toast = useToast();

  const user = useUser();

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
              <Th>ФИО</Th>
              <Show above="md">
                <Th>Категория годности</Th>
                <Th>Дата окончания отсрочки</Th>
              </Show>
              <Th>Действия</Th>
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
                    <Td>
                      <Skeleton w="100%" h="20px" />
                    </Td>
                  </Show>

                  <Td>
                    <Skeleton w="100%" h="20px" />
                  </Td>
                </Tr>
              ))}
            {data?.map(
              ({
                id,
                first_name,
                middle_name,
                last_name,
                feasibility_category,
                deferment_end_date,
              }: Citizen) => (
                <Tr key={id}>
                  <Td>
                    {last_name} {first_name} {middle_name}
                  </Td>
                  <Show above="md">
                    <Td>
                      <FeasibilityBadge
                        feasibilityCategory={feasibility_category}
                      />
                    </Td>
                    <Td>
                      {deferment_end_date
                        ? new Date(deferment_end_date).toLocaleDateString()
                        : "Нет"}
                    </Td>
                  </Show>
                  <Td>
                    <Link to={`/citizens/${id}`}>
                      <IconButton
                        aria-label="View the citizen"
                        icon={<ViewIcon />}
                        variant="ghost"
                      />
                    </Link>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoading ? (
        <Skeleton width="128px" height="40px" mt={4} />
      ) : (
        user?.role == "editor" && <AddCitizen mt={4} />
      )}
    </>
  );
}
