import styled from "styled-components";
import CookingButton from "../CookingButton/CookingButton";
import { useRecipesSelection } from "../../contexts/RecipesSelectionContext";

const Footer = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  bottom: 0px;
  background-color: rgba(249, 225, 217, 0.95);
  width: 100%;
  justify-content: space-between;
`;
const Text = styled.p`
  margin: 10px;

  padding: 3px 20px;
  font-size: 16px;

  @media (max-width: 500px) {
    margin: 5px;
    padding: 3px 5px;
    font-size: 14px;
  }
`;

export default function SelectionDetails() {
  const { selectedRecipesCount, totalCookingTime } = useRecipesSelection();

  return (
    <>
      {selectedRecipesCount > 0 && (
        <>
          <CookingButton />
          <Footer>
            <Text>Ausgewählt: {selectedRecipesCount}</Text>
            <Text>Gesamtzeit: {totalCookingTime} Min.</Text>
          </Footer>
        </>
      )}
    </>
  );
}
