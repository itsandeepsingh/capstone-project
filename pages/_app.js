import GlobalStyle from "../styles";
import { RecipesSelectionProvider } from "../contexts/RecipesSelectionContext";
import { CookingStepsProvider } from "../contexts/CookingStepsContext";
import { TimersProvider } from "../contexts/CookingTimerContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <RecipesSelectionProvider>
        <CookingStepsProvider>
          <TimersProvider>
            <Component {...pageProps} />
          </TimersProvider>
        </CookingStepsProvider>
      </RecipesSelectionProvider>
    </>
  );
}
