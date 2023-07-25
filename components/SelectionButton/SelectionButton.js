import styled from "styled-components";
import { useRecipesSelection } from "../../contexts/RecipesSelectionContext";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  z-index: 2;
  top: 0px;
  background-color: rgba(255, 255, 255, 0.85);
  width: 100%;
`;
const Button = styled.button`
  border: 0px;
  right: 0px;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  font-size: 16px;
  padding: 6px 20px;
  margin: 15px;
  border-radius: 16px;

  @media (max-width: 500px) {
    font-size: 13px;
    padding: 3px 10px;
    margin: 10px;
    border-radius: 12px;
  }
`;

export default function SelectionButton({}) {
  const { isSelectionMode, handleToggleSelectionMode } = useRecipesSelection();

  return (
    <Header>
      <Button
        type="button"
        onClick={handleToggleSelectionMode}
        aria-label={
          isSelectionMode
            ? "Click here to start selecting recipes for cooking"
            : "Click here to stop selecting recipes for cooking"
        }
      >
        {isSelectionMode ? "Abbrechen" : "Auswählen"}
      </Button>
    </Header>
  );
}
