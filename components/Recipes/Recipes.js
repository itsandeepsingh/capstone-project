import Recipe from "../Recipe/Recipe";
import styled from "styled-components";
import { RecipeClass, recipes } from "../../lib/recipes";

const RecipesList = styled.div`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 20px;
  }`;

const RecipesListElement = styled.li`
  width: 150px;
  min-width: 50px;

  @media (min-width: 500px) {
    width: 300px;
  }
`;

export default function Recipes() {
  return (
    <RecipesList>
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipesListElement key={recipe.id}>
            <Recipe key={recipe.id} recipe={recipe} />
          </RecipesListElement>
        ))
      ) : (
        <RecipesListElement>Keine Rezepte gefunden</RecipesListElement>
      )}
    </RecipesList>
  );
}
