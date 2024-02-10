import { Badge } from "@chakra-ui/react";
import { Citizen } from "../types";

const colorMap = {
  А: "green",
  Б: "green",
  В: "yellow",
  Г: "yellow",
  Д: "red",
};

export default function FeasibilityBadge({
  feasibilityCategory,
}: {
  feasibilityCategory: Citizen["feasibility_category"];
}) {
  return (
    <Badge
      colorScheme={colorMap[feasibilityCategory]}
      py={1}
      px={4}
      borderRadius={4}
    >
      {feasibilityCategory}
    </Badge>
  );
}
