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
  cursor: ${(props) => (props.$isSelectionMode ? "pointer" : "default")};
`;

const RecipeTitle = styled.p`
  text-align: left;
  margin: ${(props) => (props.$isTitle ? "5px 0" : "3px 0")};
  ${(props) => (props.$isTitle ? "font-weight:bold" : "font-style:italic")};
  color: ${(props) => (props.$isTitle ? "black" : "#565656")};

  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

const RecipeTime = styled.div`
  position: absolute;
  background-color: ${(props) =>
    props.$isWorkingTime
      ? "rgb(83, 134, 139, 0.85)"
      : "rgb(127, 144, 172, 0.85)"};

  color: white;

  font-size: 14px;
  left: 10px;
  top: ${(props) => (props.$isWorkingTime ? "10px" : "35px")};
  padding: 3px 10px;
  border-radius: 9px;

  @media (max-width: 500px) {
    font-size: 11px;
    left: 7px;
    top: ${(props) => (props.$isWorkingTime ? "7px" : "28px")};
    padding: 3px 5px;
    border-radius: 7px;
  }
`;

export default function Recipe({
  recipe,
  isSelected,
  onToggleSelection,
  isSelectionMode,
}) {
  return (
    <RecipeContainer>
      <div style={{ position: "relative" }}>
        <RecipeImage
          $isSelectionMode={isSelectionMode}
          src={require(`/assets/${recipe.picture}`).default}
          alt={recipe.title}
          width={300}
          height={200}
          onClick={onToggleSelection}
          aria-label={
            isSelected
              ? "Click here to select the recipe"
              : "Click here to unselect the recipe"
          }
        />
        {isSelected && (
          <SelectionHook
            onToggleSelection={onToggleSelection}
            isSelected={isSelected}
            isSelectionMode={isSelectionMode}
          />
        )}
        <RecipeTime $isWorkingTime>
          Arbeitszeit {recipe.workingTime} Min.
        </RecipeTime>
        {recipe.waitingTime > 0 && (
          <RecipeTime>
            <div>Wartezeit {recipe.waitingTime} Min.</div>
          </RecipeTime>
        )}
      </div>
      <RecipeTitle $isTitle>{recipe.title}</RecipeTitle>
      <RecipeTitle>{recipe.subtitle}</RecipeTitle>
    </RecipeContainer>
  );
}
