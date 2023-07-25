import Image from "next/image.js";
import styled from "styled-components";

const Hook = styled(Image)`
  position: absolute;
  z-index: 1;
  bottom: 10px;
  right: 10px;
  cursor: ${(props) => (props.$isSelectionMode ? "pointer" : "default")};

  width: 30px;
  height: 30px;

  @media (max-width: 500px) {
    width: 22px;
    height: 22px;
  }
`;

export default function SelectionHook({
  onToggleSelection,
  isSelected,
  isSelectionMode,
}) {
  return (
    <Hook
      $isSelectionMode={isSelectionMode}
      src={require(`/assets/hook.png`).default}
      width={22}
      height={22}
      alt=""
      onClick={onToggleSelection}
      aria-label={
        isSelected
          ? "Click here to select the recipe"
          : "Click here to unselect the recipe"
      }
    />
  );
}
