import Image from "next/image";
import styled from "styled-components";

const StepDetails = styled.div`
  width: 90%;
  margin: 10px auto;
`;

const Separator = styled.div`
  height: 1px;
  background-color: lightgray;
`;

const Icon = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 10px;

  @media (max-width: 500px) {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
`;

const Text = styled.p`
  display: flex;
  text-align: left;
  align-items: center;
  font-family: "Arial Rounded MT", sans-serif;
  color: ${(props) => (props.$isRecipeDescription ? "#424242" : "#919191")};

  @media (max-width: 500px) {
    font-size: 13px;
    margin: 8px;
  }
`;

export default function CookingStepDetails({ cookingStep }) {
  return (
    <StepDetails>
      <Separator />
      <Text>
        <Icon
          src={require(`/assets/cookingSteps/ingredients.png`).default}
          alt="Ingredients Icon"
          width={18}
          height={18}
        />
        {cookingStep.necessaryIngredients}
      </Text>
      {cookingStep.necessaryUtensils && (
        <Text>
          <Icon
            src={require(`/assets/cookingSteps/utensils.png`).default}
            alt="Utensils Icon"
            width={20}
            height={20}
          />
          {cookingStep.necessaryUtensils}
        </Text>
      )}
      <Separator />
      <Text $isRecipeDescription>{cookingStep.description}</Text>
    </StepDetails>
  );
}
