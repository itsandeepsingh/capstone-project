import Image from "next/image";
import styled from "styled-components";
import CookingProgressBar from "../CookingProgressBar/CookingProgressBar";
import CloseButton from "../CloseButton/CloseButton";
import CookingStepDetails from "../CookingStepDetails/CookingStepDetails";
import { useCookingSteps } from "../../contexts/CookingStepsContext";
import CookingStepNavigation from "../CookingStepNavigation/CookingStepNavigation";

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
  position: relative;
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

const Title = styled.h3`
  text-align: center;
  font-family: "Arial Rounded MT", sans-serif;
  color: ${(props) => (props.$isRecipeTitle ? "#919191" : "#424242")};
  margin: 5px;
  font-size: ${(props) => (props.$isRecipeTitle ? "15px" : "25px")};

  @media (max-width: 500px) {
    font-size: ${(props) => (props.$isRecipeTitle ? "13px" : "17px")};
  }
`;

export default function CookingStep() {
  const { currentStepIndex, stepList, getRecipeOfId } = useCookingSteps();
  const currentStep = stepList[currentStepIndex];
  const currentRecipe = currentStep
    ? getRecipeOfId(currentStep.recipeId)
    : null;
  const totalSteps = stepList.length;

  return (
    <PageContainer>
      {currentStep && (
        <>
          <CookingProgressBar
            totalSteps={totalSteps}
            currentStepIndex={currentStepIndex}
          />
          <CloseButton />
          <StepContainer>
            <CookingStepImage
              src={require(`/assets/${currentStep.picture}`).default}
              alt={currentStep.title}
              width={300}
              height={230}
            />
            <Title $isRecipeTitle>
              {currentRecipe.title} ({currentStep.stepId}/
              {currentRecipe.steps.length})
            </Title>
            <Title>{currentStep.title}</Title>
            <CookingStepDetails cookingStep={currentStep} />
            <CookingStepNavigation />
          </StepContainer>
        </>
      )}
    </PageContainer>
  );
}
