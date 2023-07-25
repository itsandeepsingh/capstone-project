import styled from "styled-components";
import { useCookingSteps } from "../../contexts/CookingStepsContext";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 2;
  width: 100%;
  bottom: 70px;

  @media (max-width: 500px) {
    bottom: 60px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: 0px;
  background-color: #fa4a0a;
  color: white;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  font-size: 20px;
  padding: 12px 105px;
  border-radius: 40px;

  @media (max-width: 500px) {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
    font-size: 16px;
    padding: 9px 40px;
    border-radius: 30px;
  }
`;

export default function CookingButton() {
  const { stepList, setCurrentStepIndex } = useCookingSteps();
  const firstStep = stepList[0];
  const router = useRouter();

  const handleStartCooking = () => {
    if (firstStep) {
      const firstCookingStepURL = `/CookingStep${firstStep.recipeId}_${firstStep.stepId}`;
      router.push(firstCookingStepURL);
      setCurrentStepIndex(0);
    }
  };

  return (
    <Container>
      <Button
        type="button"
        onClick={handleStartCooking}
        aria-label={"Click here to start cooking"}
      >
        Jetzt kochen
      </Button>
    </Container>
  );
}
