import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Military } from "../types";
import EditMilitary from "./EditMilitary";
import DeleteConfirm from "./DeleteConfirm";
import { API_ENDPOINTS } from "../api-endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";

export default function MilitaryCard({
  military,
  isEditable,
}: {
  military: Military;
  isEditable: boolean;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();
  return (
    <Card maxW="300px">
      <CardHeader>
        <HStack justifyContent="space-between">
          <Heading size="md">{military.military_serial}</Heading>
          {isEditable && (
            <HStack>
              <EditMilitary military={military} />
              <DeleteConfirm
                isIconOnly
                onConfirm={async () => {
                  const url =
                    import.meta.env.VITE_API_URL +
                    API_ENDPOINTS.DELETE_MILITARY(military.id.toString());

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
                    queryKey: ["citizen", military.citizen_id.toString()],
                  });
                }}
              />
            </HStack>
          )}
        </HStack>
      </CardHeader>
      <CardBody>
        <Text fontWeight="bold">{military.release_date}</Text>
        <Text>{military.comment}</Text>
      </CardBody>
    </Card>
  );
}
