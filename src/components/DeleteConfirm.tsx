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
} from "@chakra-ui/react";

interface Props extends ButtonProps {
  onConfirm: () => void;
}

export default function DeleteConfirm({ onConfirm, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...props} onClick={onOpen} colorScheme="red">
        Удалить
      </Button>
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
