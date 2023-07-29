import { createContext, useContext, useState } from "react";

const TimersContext = createContext();

export const useTimers = () => {
  return useContext(TimersContext);
};

export function TimersProvider({ children }) {
  const [updatedTimersStateList, setUpdatedTimersStateList] = useState([]);

  function startTimer(timer, timersStateList) {
    if (!timer.isRunning) {
      const updatedTimersStateList = timersStateList.map((prevTimer) => {
        if (prevTimer.id === timer.id) {
          return { ...prevTimer, isRunning: true };
        }
        return prevTimer;
      });

      const intervalId = setInterval(() => {
        setUpdatedTimersStateList((prevTimers) =>
          prevTimers.map((prevTimer) => {
            if (prevTimer.id === timer.id) {
              const remainingTimeInSeconds = convertTimeToSeconds(
                prevTimer.remainingTime
              );
              if (remainingTimeInSeconds > 0) {
                const updatedRemainingTime = convertSecondsToTime(
                  remainingTimeInSeconds - 1
                );
                return { ...prevTimer, remainingTime: updatedRemainingTime };
              } else {
                clearInterval(prevTimer.intervalId);
                return { ...prevTimer, isRunning: false, intervalId: null };
              }
            }
            return prevTimer;
          })
        );
      }, 1000);

      const updatedTimersStateListWithId = updatedTimersStateList.map(
        (prevTimer) => {
          if (prevTimer.id === timer.id) {
            return { ...prevTimer, intervalId: intervalId };
          }
          return prevTimer;
        }
      );

      setUpdatedTimersStateList(updatedTimersStateListWithId);
    }
  }

  function pauseTimer(timerState, timersStateList) {
    if (timerState.isRunning) {
      clearInterval(timerState.intervalId);

      const updatedTimerState = { ...timerState, isRunning: false };
      const timerIndex = timersStateList.findIndex(
        (timer) => timer.id === timerState.id
      );
      const updatedTimersStateList = [...timersStateList];
      updatedTimersStateList[timerIndex] = updatedTimerState;

      setUpdatedTimersStateList(updatedTimersStateList);
    }
  }

  function convertTimeToSeconds(time) {
    const timeParts = time.split(":").map((timePart) => parseInt(timePart));

    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      return hours * 3600 + minutes * 60 + seconds;
    } else if (timeParts.length === 2) {
      const [minutes, seconds] = timeParts;
      return minutes * 60 + seconds;
    } else {
      throw new Error("Ungültiges Zeitformat");
    }
  }

  function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }
  }

  const timersContextValue = {
    updatedTimersStateList,
    startTimer,
    pauseTimer,
  };

  return (
    <TimersContext.Provider value={timersContextValue}>
      {children}
    </TimersContext.Provider>
  );
}
