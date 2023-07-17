import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [isSelectionMode, setSelectionMode] = useLocalStorageState(false);

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
      const selectedRecipesCount = recipesSelection.filter(
        (recipe) => recipe.isSelected
      ).length;
      if (
        selectedRecipesCount >= 3 &&
        !recipesSelection.find((recipe) => recipe.id === id)?.isSelected
      ) {
        alert("Maximal drei Rezepte können ausgewählt werden.");
        return;
      }

      const recipe = recipesSelection.find((recipe) => recipe.id === id);
      if (recipe) {
        setRecipesSelection(
          recipesSelection.map((recipeSelection) =>
            recipeSelection.id === id
              ? { id, isSelected: !recipeSelection.isSelected }
              : recipeSelection
          )
        );
      } else {
        setRecipesSelection([...recipesSelection, { id, isSelected: true }]);
      }
    }
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        isSelectionMode={isSelectionMode}
        handleToggleSelectionMode={handleToggleSelectionMode}
        recipesSelection={recipesSelection}
        onToggleSelection={handleToggleSelection}
      />
    </>
  );
}
