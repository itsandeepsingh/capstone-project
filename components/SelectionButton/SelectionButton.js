import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  z-index: 2;
  top: 0px;
  right: 0px;
  background-color: white;
  width: 100%;
`;
const Button = styled.button`
  border: 1px solid black;
  border-radius: 12px;
  right: 0px;

  font-size: 14px;
  padding: 3px 15px;
  margin: 15px;

  @media (max-width: 500px) {
    font-size: 11px;
    padding: 3px 10px;
    margin: 10px;
  }
`;

export default function SelectionButton({
  isSelectionMode,
  handleToggleSelectionMode,
}) {
  return (
    <Header>
      <Button
        type="button"
        onClick={handleToggleSelectionMode}
        aria-label={isSelectionMode ? "selectionModeOff" : "selectionModeOn"}
      >
        {isSelectionMode ? "Abbrechen" : "Auswählen"}
      </Button>
    </Header>
  );
}
