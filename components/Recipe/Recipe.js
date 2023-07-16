import Image from "next/image";
import styled from "styled-components";
import SelectionHook from "../SelectionHook/SelectionHook";

const RecipeContainer = styled.div`
  flex-basis: calc(50% - 10px);
  display: flex;
  flex-direction: column;
`;

const RecipeImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
`;

const RecipeTitle = styled.p`
  text-align: left;
  margin: ${(props) => (props.$isTitle ? "5px 0" : "3px 0")};
  ${(props) => (props.$isTitle ? "font-weight:bold" : "font-style:italic")};

  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export default function Recipe({ recipe, isSelected, onToggleSelection }) {
  return (
    <RecipeContainer>
      <div style={{ position: "relative" }}>
        <RecipeImage
          src={require(`/assets/${recipe.picture}`).default}
          alt={recipe.title}
          width={300}
          height={200}
          onClick={onToggleSelection}
          aria-label={isSelected ? "unselect" : "select"}
        />
        {isSelected && <SelectionHook />}
      </div>
      <RecipeTitle $isTitle>{recipe.title}</RecipeTitle>
      <RecipeTitle>{recipe.subtitle}</RecipeTitle>
    </RecipeContainer>
  );
}
