import { EditIcon } from "@chakra-ui/icons";
import { ButtonProps, IconButton } from "@chakra-ui/react";

export default function EditButton({ ...props }: ButtonProps) {
  return (
    <IconButton
      {...props}
      aria-label="Edit military"
      icon={<EditIcon w={5} h={5} />}
      variant="ghost"
    />
  );
}
