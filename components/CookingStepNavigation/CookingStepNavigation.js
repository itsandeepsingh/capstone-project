import styled from "styled-components";
import { useCookingSteps } from "../../contexts/CookingStepsContext";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  ${(props) => (props.$isNextStepButton ? "right: 10px" : "left: 10px")};
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: "Arial Rounded MT Bold", sans-serif;
  opacity: 0.5;

  font-size: 25px;
  margin: 4px 0;

  &:hover {
    opacity: 1;
  }

  @media (min-width: 500px) {
    font-size: 30px;
    margin: 8px 0;
  }
`;

export default function CookingStep() {
  const { currentStepIndex, stepList, setCurrentStepIndex } = useCookingSteps();
  const router = useRouter();

  const handlePreviousStep = () => {
    const prevStep = stepList[currentStepIndex - 1];
    if (prevStep) {
      const prevStepUrl = `/CookingStep${prevStep.recipeId}_${prevStep.stepId}`;
      router.push(prevStepUrl);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    const nextStep = stepList[currentStepIndex + 1];
    if (nextStep) {
      const nextStepUrl = `/CookingStep${nextStep.recipeId}_${nextStep.stepId}`;
      router.push(nextStepUrl);
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <>
      <Container>
        {currentStepIndex > 0 && (
          <Button
            onClick={handlePreviousStep}
            aria-label={"Click here to go back to the previous cooking step"}
          >
            {"<"}
          </Button>
        )}
      </Container>
      <Container $isNextStepButton>
        {currentStepIndex + 1 < stepList.length && (
          <Button
            onClick={handleNextStep}
            aria-label={"Click here to go to the next cooking step"}
          >
            {">"}
          </Button>
        )}
      </Container>
    </>
  );
}
