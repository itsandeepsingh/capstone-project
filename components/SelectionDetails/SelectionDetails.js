import styled from "styled-components";
import CookingButton from "../CookingButton/CookingButton";
import { useRecipesSelection } from "../../contexts/RecipesSelectionContext";
import { useCookingSteps } from "../../contexts/CookingStepsContext";

const Footer = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  bottom: 0px;
  background-color: rgba(249, 225, 217, 0.95);
  width: 100%;
  justify-content: space-between;
  padding: 10px;

  @media (max-width: 500px) {
    padding: 10px;
  }
`;

const Text = styled.p`
  margin: 0px;
  font-size: 16px;
  text-align: ${(props) => (props.$isSelectionCount ? "left" : " right")};

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export default function SelectionDetails() {
  const { selectedRecipesCount, totalCookingTime } = useRecipesSelection();
  const { optimizedTotalCookingTime } = useCookingSteps();

  return (
    <>
      {selectedRecipesCount > 0 && (
        <>
          <CookingButton />
          <Footer>
            <div>
              <Text $isSelectionCount>Ausgewählt:</Text>
              {selectedRecipesCount > 1 ? (
                <Text $isSelectionCount>{selectedRecipesCount} Rezepte</Text>
              ) : (
                <Text $isSelectionCount>{selectedRecipesCount} Rezept</Text>
              )}
            </div>
            {optimizedTotalCookingTime > 0 ? (
              <div>
                <Text>Optimierte Gesamtzeit: </Text>
                <Text>
                  <span style={{ textDecoration: "line-through" }}>
                    {totalCookingTime} Min.
                  </span>{" "}
                  {optimizedTotalCookingTime} Min.
                </Text>
              </div>
            ) : (
              <div>
                <Text>Gesamtzeit: </Text>
                <Text> {totalCookingTime} Min.</Text>
              </div>
            )}
          </Footer>
        </>
      )}
    </>
  );
}
