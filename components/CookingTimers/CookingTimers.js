import styled from "styled-components";
import { useCookingSteps } from "../../contexts/CookingStepsContext";
import { useTimers } from "../../contexts/CookingTimerContext";
import CookingTimer from "../CookingTimer/CookingTimer";

const TimersContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  border-radius: 15px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  align-items: flex-end;
  min-height: 100px;

  @media (min-width: 500px) {
    min-height: 100px;
  }
`;

export default function CookingTimers() {
  const { stepList, currentStepIndex, initialTimersStateList } =
    useCookingSteps();
  const { updatedTimersStateList } = useTimers();
  const currentStep = stepList[currentStepIndex];
  const currentStepTimers = currentStep.timers;

  let timerStateList = [];
  if (updatedTimersStateList && updatedTimersStateList.length > 0) {
    timerStateList = updatedTimersStateList;
  } else if (initialTimersStateList && initialTimersStateList.length > 0) {
    timerStateList = initialTimersStateList;
  }

  return (
    <TimersContainer>
      {currentStepTimers.map((timer) => {
        const timerState = timerStateList.find(
          (timerState) => timerState.id === timer.id
        );

        return currentStepTimers.length > 0 &&
          timerState.remainingTime !== "00:00" ? (
          <CookingTimer
            key={timer.id}
            timer={timer}
            timerState={timerState}
            timerStateList={timerStateList}
          />
        ) : null;
      })}
    </TimersContainer>
  );
}
