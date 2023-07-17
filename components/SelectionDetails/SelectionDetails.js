import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  bottom: 0px;
  background-color: rgba(249, 225, 217, 0.85);
  width: 100%;
  justify-content: space-between;
`;
const Text = styled.p`
  padding: 3px 15px;
  margin: 15px;
  font-weight: bold;

  font-size: 16px;

  @media (max-width: 500px) {
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
