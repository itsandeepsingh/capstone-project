import Recipes from "../components/Recipes/Recipes";
import SelectionButton from "../components/SelectionButton/SelectionButton";
import SelectionDetails from "../components/SelectionDetails/SelectionDetails";

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
        recipesSelection={recipesSelection}
        onToggleSelection={onToggleSelection}
      />
      {selectedRecipesCount > 0 && (
        <SelectionDetails
          selectedRecipesCount={selectedRecipesCount}
          totalCookingTime={totalCookingTime}
        />
      )}
    </div>
  );
}
