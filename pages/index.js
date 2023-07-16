import Recipes from "../components/Recipes/Recipes";
import SelectionButton from "../components/SelectionButton/SelectionButton";

export default function RecipesPage({
  isSelectionMode,
  handleToggleSelectionMode,
  recipesSelection,
  onToggleSelection,
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
    </div>
  );
}
