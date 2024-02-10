import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function AddCitizenButton({ ...props }: ButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={<AddIcon />} {...props} onClick={onOpen}>
        Добавить
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить Гражданина</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Готово
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
