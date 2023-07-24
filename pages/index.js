import Recipes from "../components/Recipes/Recipes";
import SelectionButton from "../components/SelectionButton/SelectionButton";
import SelectionDetails from "../components/SelectionDetails/SelectionDetails";

export default function RecipesPage() {
  return (
    <div>
      <SelectionButton />
      <Recipes />
      <SelectionDetails />
    </div>
  );
}
