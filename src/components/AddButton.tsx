import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";

export default function AddButton({ ...props }: ButtonProps) {
  return (
    <Button {...props} leftIcon={<AddIcon />}>
      Добавить
    </Button>
  );
}
