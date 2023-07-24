import { createContext, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { recipes } from "../lib/recipes";

const RecipesSelectionContext = createContext();

export const useRecipesSelection = () => {
  return useContext(RecipesSelectionContext);
};

export function RecipesSelectionProvider({ children }) {
  const [isSelectionMode, setSelectionMode] = useLocalStorageState(
    "isSelectionMode",
    false
  );

  const [recipesSelection, setRecipesSelection] = useLocalStorageState(
    "recipes-selection",
    { defaultValue: [] }
  );

  function handleToggleSelectionMode() {
    if (isSelectionMode) {
      setRecipesSelection([]);
    }
    setSelectionMode(!isSelectionMode);
  }

  function handleToggleSelection(id) {
    if (isSelectionMode) {
      const recipeIndex = recipesSelection.findIndex(
        (recipe) => recipe.id === id
      );

      if (recipeIndex !== -1 && recipesSelection[recipeIndex].isSelected) {
        setRecipesSelection((prevSelection) => [
          ...prevSelection.slice(0, recipeIndex),
          ...prevSelection.slice(recipeIndex + 1),
        ]);
      } else {
        if (selectedRecipesCount >= 3) {
          alert("Maximal drei Rezepte können ausgewählt werden.");
          return;
        }
        setRecipesSelection((prevSelection) => [
          ...prevSelection,
          { id, isSelected: true },
        ]);
      }
    }
  }

  function calculateTotalCookingTime(recipesSelection) {
    return recipesSelection.reduce((total, recipe) => {
      if (recipe.isSelected) {
        const selectedRecipe = recipes.find((r) => r.id === recipe.id);
        if (selectedRecipe) {
          return (
            total + selectedRecipe.workingTime + selectedRecipe.waitingTime
          );
        }
      }
      return total;
    }, 0);
  }

  const totalCookingTime = calculateTotalCookingTime(recipesSelection);

  function calculateSelectedRecipesCount(recipesSelection) {
    return recipesSelection.filter((recipe) => recipe.isSelected).length;
  }

  const selectedRecipesCount = calculateSelectedRecipesCount(recipesSelection);

  const selectionState = {
    isSelectionMode,
    recipesSelection,
    handleToggleSelectionMode,
    handleToggleSelection,
    selectedRecipesCount,
    totalCookingTime,
  };

  return (
    <RecipesSelectionContext.Provider value={selectionState}>
      {children}
    </RecipesSelectionContext.Provider>
  );
}
