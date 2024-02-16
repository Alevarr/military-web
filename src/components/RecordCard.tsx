import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Record } from "../types";
import EditRecord from "./EditRecord";
import DeleteConfirm from "./DeleteConfirm";
import { API_ENDPOINTS } from "../api-endpoints";
import { fetcher } from "../utils/fetcher";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const toast = useToast();
  return (
    <Card maxW="300px">
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading
            size="md"
            color={record.type == "registered" ? "green" : "red"}
          >
            {typeMap[record.type]}
          </Heading>
          {isEditable && (
            <HStack>
              <EditRecord record={record} citizen_id={citizen_id} />
              <DeleteConfirm
                isIconOnly
                onConfirm={async () => {
                  const url =
                    import.meta.env.VITE_API_URL +
                    API_ENDPOINTS.DELETE_RECORD(record.id.toString());

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
                  queryClient.invalidateQueries({
                    queryKey: ["citizen", citizen_id.toString()],
                  });
                }}
              />
            </HStack>
          )}
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
