import Image from "next/image";
import styled from "styled-components";
import { RecipeClass, recipes } from "../../lib/recipes";
import CookingProgressBar from "../CookingProgressBar/CookingProgressBar";
import CloseButton from "../CloseButton/CloseButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  @media (min-width: 1000px) {
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
  }
`;

const StepContainer = styled.div`
  height: calc(100vh - 58px);
  border-radius: 15px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 500px) {
    height: calc(100vh - 100px);
  }
`;

const CookingStepImage = styled(Image)`
  height: 230px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  width: 100%;
`;

const Text = styled.p`
  margin: 10px;
  text-align: ${(props) => (props.$isTitle ? "center" : "left")};
  font-weight: ${(props) => (props.$isTitle ? "bold" : "normal")};
  color: ${(props) => (props.$isTitle ? "black" : "#565656")};

  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export default function cookingStep({}) {
  const cookingStep = recipes[0].steps[0];
  const currentStepIndex = 0;
  return (
    <PageContainer>
      <CookingProgressBar
        recipeSteps={recipes[0].steps}
        currentStepIndex={currentStepIndex}
      />
      <CloseButton />
      <StepContainer>
        <CookingStepImage
          src={require(`/assets/${cookingStep.picture}`).default}
          alt={cookingStep.title}
          width={300}
          height={230}
        />
        <Text $isTitle>{cookingStep.title}</Text>
        <Text>{cookingStep.necessaryIngredients}</Text>
        <Text>{cookingStep.necessaryUtensils}</Text>
        <Text>{cookingStep.description}</Text>
      </StepContainer>
    </PageContainer>
  );
}
