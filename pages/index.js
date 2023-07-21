import Recipes from "../components/Recipes/Recipes";
import SelectionButton from "../components/SelectionButton/SelectionButton";
import SelectionDetails from "../components/SelectionDetails/SelectionDetails";
import CookingButton from "../components/CookingButton/CookingButton";

export default function RecipesPage({
  isSelectionMode,
  handleToggleSelectionMode,
  recipesSelection,
  onToggleSelection,
  selectedRecipesCount,
  totalCookingTime,
}) {
  return (
    <div>
      <SelectionButton
        isSelectionMode={isSelectionMode}
        handleToggleSelectionMode={handleToggleSelectionMode}
      />
      <Recipes
        isSelectionMode={isSelectionMode}
        recipesSelection={recipesSelection}
        onToggleSelection={onToggleSelection}
      />
      {selectedRecipesCount > 0 && (
        <>
          <CookingButton />
          <SelectionDetails
            selectedRecipesCount={selectedRecipesCount}
            totalCookingTime={totalCookingTime}
          />
        </>
      )}
    </div>
  );
}
