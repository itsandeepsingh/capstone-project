import styled from "styled-components";
import { useTimers } from "../../contexts/CookingTimerContext";

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  width: 27%;

  @media (min-width: 1000px) {
    width: 180px;
  }
`;

const Timer = styled.p`
  margin: 3px;
  font-family: "Arial Rounded MT", sans-serif;
  color: ${(props) => (props.$isTime ? "#424242" : "#919191")};
  text-align: center;
  font-size: ${(props) => (props.$isTime ? "20px" : "14px")};

  @media (max-width: 500px) {
    font-size: ${(props) => (props.$isTime ? "16px" : "10px")};
  }
`;

const Button = styled.button`
  margin: 3px;
  font-family: "Arial Rounded MT Bold", sans-serif;
  background-color: #919191;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 10px;
  cursor: pointer;

  @media (min-width: 500px) {
  }
`;
export default function CookingTimer({ timer, timerState, timerStateList }) {
  const { startTimer, pauseTimer } = useTimers();
  function handleTimerClick(timerState) {
    if (timerState && timerState.isRunning) {
      pauseTimer(timerState, timerStateList);
    } else if (timerState && !timerState.isRunning) {
      startTimer(timerState, timerStateList);
    }
  }
  return (
    <TimerContainer key={timer.id}>
      <Timer>{timer.title}</Timer>
      <Timer $isTime>{timerState ? timerState.remainingTime : ""}</Timer>
      <Button
        type="button"
        onClick={() => handleTimerClick(timerState)}
        aria-label={
          timerState && timerState.isRunning
            ? "Click here to pause timer"
            : "Click here to start timer"
        }
      >
        {timerState && timerState.isRunning ? "Pause" : "Start"}
      </Button>
    </TimerContainer>
  );
}
