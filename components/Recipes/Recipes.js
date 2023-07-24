import Recipe from "../Recipe/Recipe";
import styled from "styled-components";
import { recipes } from "../../lib/recipes";
import { useRecipesSelection } from "../../contexts/RecipesSelectionContext";

const RecipesList = styled.div`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding-top: 40px;
  margin: 20px;

  @media (max-width: 500px) {
    padding-top: 22px;
  }
}`;

const RecipesListElement = styled.li`
  width: 150px;
  min-width: 50px;

  @media (min-width: 500px) {
    width: 300px;
  }
`;

export default function Recipes() {
  const { isSelectionMode, recipesSelection, handleToggleSelection } =
    useRecipesSelection();

  return (
    <RecipesList>
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipesListElement key={recipe.id}>
            <Recipe
              key={recipe.id}
              recipe={recipe}
              isSelected={
                recipesSelection?.find(
                  (selection) => selection.id === recipe.id
                )?.isSelected
              }
              onToggleSelection={() => handleToggleSelection(recipe.id)}
              isSelectionMode={isSelectionMode}
            />
          </RecipesListElement>
        ))
      ) : (
        <RecipesListElement>Keine Rezepte gefunden</RecipesListElement>
      )}
    </RecipesList>
  );
}
