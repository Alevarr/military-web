import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";

interface Props extends ButtonProps {
  onConfirm: () => void;
  isIconOnly?: boolean;
}

export default function DeleteConfirm({
  onConfirm,
  isIconOnly,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isIconOnly ? (
        <IconButton
          {...props}
          onClick={onOpen}
          colorScheme="red"
          aria-label="Delete citizen"
          icon={<DeleteIcon w={5} h={5} />}
          variant="ghost"
        />
      ) : (
        <Button
          {...props}
          onClick={onOpen}
          colorScheme="red"
          leftIcon={<DeleteIcon />}
        >
          Удалить
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Подвтердите удаление</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Вы точно хотите удалить данные?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Удалить
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
