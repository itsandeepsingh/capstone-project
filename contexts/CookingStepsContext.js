import { useState, createContext, useContext, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { recipes } from "../lib/recipes";
import { useRecipesSelection } from "./RecipesSelectionContext";

const CookingStepsContext = createContext();

export const useCookingSteps = () => {
  return useContext(CookingStepsContext);
};

export function CookingStepsProvider({ children }) {
  const { recipesSelection } = useRecipesSelection();

  const [currentStepIndex, setCurrentStepIndex] = useLocalStorageState(
    "currentStepIndex",
    0
  );

  const [stepList, setStepList] = useState([]);
  const [optimizedTotalCookingTime, setOptimizedTotalCookingTime] = useState(0);
  const [initialTimersStateList, setInitialTimersStateList] = useState([]);

  useEffect(() => {
    let newStepList = createStepList(recipesSelection);
    setOptimizedTotalCookingTime(0);
    if (recipesSelection.length > 1) {
      const highestStartTime = determineHighestStartTime(newStepList);
      const stepsWithHighestStartTime = getStepsWithHighestStartTime(
        newStepList,
        highestStartTime
      );
      const newOptimizedTotalCookingTime =
        highestStartTime +
        Math.max(...stepsWithHighestStartTime.map((step) => step.totalTime));

      newStepList = determineStepList(
        highestStartTime,
        newOptimizedTotalCookingTime,
        newStepList
      );

      const timersStateList = addTimersToSteps(newStepList);
      setInitialTimersStateList(timersStateList);
      setOptimizedTotalCookingTime(newOptimizedTotalCookingTime);
    }

    setStepList(newStepList);
  }, [recipesSelection]);

  function getRecipeOfId(recipeId) {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    return selectedRecipe;
  }

  function addTimersToSteps(stepList) {
    const timersStateList = [];
    for (let i = 0; i < stepList.length; i++) {
      const step = stepList[i];
      step.timers = [];

      if (i > 0 && stepList[i - 1].timers.length > 0) {
        step.timers = [...stepList[i - 1].timers];
      }

      if (step.isWaitingTime) {
        const timer = {
          id: step.recipeId + "_" + step.stepId,
          title: step.title,
        };
        step.timers.push(timer);
        const timerForTimerList = {
          id: step.recipeId + "_" + step.stepId,
          isRunning: false,
          remainingTime: formatTime(step.totalTime),
        };
        timersStateList.push(timerForTimerList);
      }
    }
    return timersStateList;
  }
  const cookingStepsState = {
    currentStepIndex,
    setCurrentStepIndex,
    stepList,
    getRecipeOfId,
    optimizedTotalCookingTime,
    initialTimersStateList,
  };

  return (
    <CookingStepsContext.Provider value={cookingStepsState}>
      {children}
    </CookingStepsContext.Provider>
  );
}

function formatTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = 0;

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours.toString().padStart(2, "0")}:`;
  }

  formattedTime += `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}

function determineStepList(highestStartTime, totalCookingTime, stepList) {
  changeStartTimeforIndependentStepsInStepList(
    stepList,
    totalCookingTime,
    highestStartTime
  );

  let groupedSteps = {};
  groupSteps(stepList, groupedSteps);

  let startTimeChanged =
    changeStartTimeIfMultipleWorkingStepsInAGroup(groupedSteps);

  if (startTimeChanged) {
    let updatedGroupedSteps = reorderGroupedSteps(groupedSteps);
    groupedSteps = updatedGroupedSteps;
  }

  sortGroupsInGroupedSteps(groupedSteps);

  return updateStepList(groupedSteps);
}

function determineStartTime(step) {
  let startTime = 0;
  if (step.dependentPreviousSteps.length > 0) {
    const recipe = recipes.find((recipe) => recipe.id === step.recipeId);
    const previousStep = recipe.steps.find(
      (s) => s.stepId === step.dependentPreviousSteps[0]
    );

    if (step.dependentPreviousSteps.length === 1) {
      startTime = previousStep.totalTime;
    } else {
      //step with multiple previous steps
      let waitingTime = 0;
      let workingTime = 0;
      step.dependentPreviousSteps.forEach((stepId) => {
        const previousStep = recipe.steps.find((s) => s.stepId === stepId);
        if (previousStep.dependentPreviousSteps.length === 0) {
          if (previousStep.isWaitingTime) {
            waitingTime = waitingTime + previousStep.totalTime;
          } else {
            workingTime = workingTime + previousStep.totalTime;
          }
        } else {
          startTime = startTime + previousStep.totalTime;
        }
      });
      //for steps with multiple previous steps
      if (waitingTime > 0 || workingTime > 0) {
        if (waitingTime >= workingTime) {
          startTime = startTime + waitingTime;
        } else {
          startTime = startTime + workingTime;
        }
      }
    }
  }
  return startTime;
}

function createStepList(selectedRecipes) {
  let stepList = [];
  selectedRecipes.forEach((recipe) => {
    const selectedRecipe = recipes.find((r) => r.id === recipe.id);
    if (selectedRecipe) {
      selectedRecipe.steps.forEach((step) => {
        let startTime = 0;
        if (selectedRecipes.length > 1) {
          startTime = determineStartTime(step);
        }
        stepList.push({
          ...step,
          startTime: startTime,
        });
      });
    }
  });
  return stepList;
}

function determineHighestStartTime(stepList) {
  return Math.max(...stepList.map((step) => step.startTime));
}

function getStepsWithHighestStartTime(stepList, highestStartTime) {
  return stepList
    .filter((step) => step.startTime === highestStartTime)
    .map((step) => ({
      startTime: step.startTime,
      totalTime: step.totalTime,
    }));
}

function changeStartTimeforIndependentStepsInStepList(
  stepList,
  totalCookingTime,
  highestStartTime
) {
  stepList.forEach((step) => {
    if (
      step.dependentPreviousSteps.length === 0 &&
      step.dependentNextSteps.length === 0
    ) {
      if (step.totalTime <= totalCookingTime - highestStartTime) {
        step.startTime = highestStartTime;
      }
    }
  });
}

function changeStartTimeIfMultipleWorkingStepsInAGroup(groupedSteps) {
  let startTimeChanged = false;
  Object.values(groupedSteps).forEach((group) => {
    const nonWaitingSteps = group.filter((step) => !step.isWaitingTime);

    if (nonWaitingSteps.length > 1) {
      for (let i = 0; i < nonWaitingSteps.length; i++) {
        for (let j = i + 1; j < nonWaitingSteps.length; j++) {
          const stepA = nonWaitingSteps[i];
          const stepB = nonWaitingSteps[j];

          if (stepA.totalTime <= stepB.totalTime) {
            stepA.startTime = stepA.startTime + stepB.totalTime;
            startTimeChanged = true;
          } else {
            stepB.startTime = stepB.startTime + stepA.totalTime;
            startTimeChanged = true;
          }
        }
      }
    }
  });
  return startTimeChanged;
}

function groupSteps(stepList, groupedSteps) {
  stepList.forEach((step) => {
    if (!groupedSteps[step.startTime]) {
      groupedSteps[step.startTime] = [step];
    } else {
      groupedSteps[step.startTime].push(step);
    }
  });
}

function reorderGroupedSteps(groupedSteps) {
  const newGroupedSteps = {};
  Object.values(groupedSteps).forEach((group) => {
    groupSteps(group, newGroupedSteps);
  });
  return newGroupedSteps;
}

function sortGroupsInGroupedSteps(groupedSteps) {
  Object.values(groupedSteps).forEach((group) => {
    const waitingSteps = group.filter((step) => step.isWaitingTime);
    const nonWaitingSteps = group.filter((step) => !step.isWaitingTime);

    //the steps with the highest totalTime should come first
    waitingSteps.sort((stepA, stepB) => stepB.totalTime - stepA.totalTime);
    nonWaitingSteps.sort((stepA, stepB) => stepB.totalTime - stepA.totalTime);
    group.length = 0;
    // waitings steps should come first --> funktuniert das wirklich ????
    group.push(...waitingSteps, ...nonWaitingSteps);
  });
}

function updateStepList(groupedSteps) {
  const newStepList = [];
  Object.values(groupedSteps).forEach((group) => {
    group.forEach((step) => {
      newStepList.push(step);
    });
  });
  return newStepList;
}
