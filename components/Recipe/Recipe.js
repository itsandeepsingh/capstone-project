import Image from "next/image";
import styled from "styled-components";

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
  margin: ${(props) => (props.isTitle ? "5px 0" : "3px 0")};
  font-weight: ${(props) => (props.isTitle ? "bold" : "normal")};
  font-style: ${(props) => (props.isTitle ? "normal" : "italic")};
`;

export default function Recipe({ recipe }) {
  return (
    <RecipeContainer>
      <RecipeImage
        src={require(`/assets/${recipe.picture}`).default}
        alt={recipe.title}
        width={300}
        height={200}
      />
      <RecipeTitle isTitle>{recipe.title}</RecipeTitle>
      <RecipeTitle>{recipe.subtitle}</RecipeTitle>
    </RecipeContainer>
  );
}
