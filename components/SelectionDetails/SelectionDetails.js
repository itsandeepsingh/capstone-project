import styled from "styled-components";

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

export default function SelectionDetails({
  selectedRecipesCount,
  totalCookingTime,
}) {
  return (
    <Footer>
      <Text>Ausgewählt: {selectedRecipesCount}</Text>
      <Text>Gesamtzeit: {totalCookingTime} Min.</Text>
    </Footer>
  );
}
