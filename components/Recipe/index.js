import React from "react";
import styled from "styled-components";

const RecipeContainer = styled.div`
  flex-basis: calc(50% - 10px);
  display: flex;
  flex-direction: column;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeTitle = styled.p`
  font-weight: bold;
  text-align: left;
`;

const RecipeSubtitle = styled.p`
  font-style: italic;
  text-align: left;
`;

export default function Recipe({ recipe }) {
  return (
    <RecipeContainer>
      <RecipeImage src={recipe.picture} alt={recipe.title} />
      <div>
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RecipeSubtitle>{recipe.subtitle}</RecipeSubtitle>
      </div>
    </RecipeContainer>
  );
}
