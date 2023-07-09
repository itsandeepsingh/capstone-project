import React from "react";
import Recipe from "../Recipe";
import styled from "styled-components";
import { RecipeClass, recipes } from "../../lib/recipes";

const RecipesList = styled.div`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 20px;

  li {
    width: 150px;
    min-width: 50px;
  }

  @media (min-width: 500px) {
    li {
      width: 300px;
    }
  }
`;

export default function Recipes() {
  return (
    <RecipesList>
      {recipes?.map((recipe) => (
        <li key={recipe.id}>
          <Recipe key={recipe.id} recipe={recipe} />
        </li>
      ))}
    </RecipesList>
  );
}
