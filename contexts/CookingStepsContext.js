import { createContext, useContext } from "react";
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

  function createStepList(selectedRecipes) {
    const stepList = [];

    selectedRecipes.forEach((recipe) => {
      const selectedRecipe = recipes.find((r) => r.id === recipe.id);
      if (selectedRecipe) {
        selectedRecipe.steps.forEach((step, index) => {
          stepList.push({
            ...step,
            recipeTitle: selectedRecipe.title,
          });
        });
      }
    });

    return stepList;
  }

  const stepList = createStepList(recipesSelection);

  function getRecipeOfId(recipeId) {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    return selectedRecipe;
  }

  const cookingStepsState = {
    currentStepIndex,
    setCurrentStepIndex,
    stepList,
    getRecipeOfId,
  };

  return (
    <CookingStepsContext.Provider value={cookingStepsState}>
      {children}
    </CookingStepsContext.Provider>
  );
}
