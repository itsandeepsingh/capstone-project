import GlobalStyle from "../styles";
import { RecipesSelectionProvider } from "../contexts/RecipesSelectionContext";
import { CookingStepsProvider } from "../contexts/CookingStepsContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <RecipesSelectionProvider>
        <CookingStepsProvider>
          <Component {...pageProps} />
        </CookingStepsProvider>
      </RecipesSelectionProvider>
    </>
  );
}
