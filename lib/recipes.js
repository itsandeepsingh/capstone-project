class RecipeStep {
  constructor(
    recipeId,
    stepId,
    picture,
    title,
    necessaryIngredients,
    necessaryUtensils,
    description,
    totalTime,
    isWaitingTime,
    dependentPreviousSteps,
    dependentNextSteps
  ) {
    if (
      !recipeId ||
      !stepId ||
      !title ||
      !necessaryIngredients ||
      !description ||
      !totalTime
    ) {
      throw new Error(
        "RecipeId, StepId, title, necessaryIngredients, description and totalTime must be provided for RecipeStep"
      );
    }
    this.recipeId = recipeId;
    this.stepId = stepId;
    this.picture = picture || "cookingSteps/cooking-placeholder.png";
    this.title = title;
    this.necessaryIngredients = necessaryIngredients;
    this.necessaryUtensils = necessaryUtensils;
    this.description = description;
    this.totalTime = totalTime;
    this.isWaitingTime = isWaitingTime || false;
    this.dependentPreviousSteps = dependentPreviousSteps || [];
    this.dependentNextSteps = dependentNextSteps || [];
  }
}

class RecipeClass {
  constructor(id, title, subtitle, picture, workingTime, waitingTime) {
    if (!id || !title || !subtitle) {
      throw new Error("Id, title, subtitle and workingTime must be provided");
    }
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.picture = picture || "recipes/recipe-placeholder.png";
    this.workingTime = workingTime;
    this.waitingTime = waitingTime || 0;
    this.steps = [];
  }

  addStep(
    recipeId,
    stepId,
    picture,
    title,
    necessaryIngredients,
    necessaryUtensils,
    description,
    totalTime,
    isWaitingTime,
    dependentPreviousSteps,
    dependentNextSteps
  ) {
    const newStep = new RecipeStep(
      recipeId,
      stepId,
      picture,
      title,
      necessaryIngredients,
      necessaryUtensils,
      description,
      totalTime,
      isWaitingTime,
      dependentPreviousSteps,
      dependentNextSteps
    );
    this.steps.push(newStep);
  }
}

const recipe1 = new RecipeClass(
  1,
  "Sojabällchen-Curry",
  "Rezept aus Indien, mit Reis und Kartoffeln",
  "recipes/recipe-1.png",
  15,
  110
);
recipe1.addStep(
  recipe1.id,
  1,
  "cookingSteps/recipe-1/recipe1_1.png",
  "Sojabällchen einweichen",
  "500g Sojabällchen",
  "Schüssel (groß)",
  "Die Schüssel mit Wasser füllen, sodass die Sojabällchen bedeckt sind. Für eine Stunde in warmen Wasser einweichen lassen. Das Wasser ggf. zwischendurch austauschen. warmes Wasser einweichen. Nach dem Absorbieren des Wassers werden die Sojabällchen weich und expandiert.",
  60,
  true,
  null,
  [3]
);
recipe1.addStep(
  recipe1.id,
  2,
  "cookingSteps/recipe-1/recipe1_2.png",
  "Zutaten vorbereiten",
  "2 Tomaten - 3 Zwiebeln - 1 Knblauchzehe - 5 Kartoffeln - 1 kleines Stück Ingwer",
  "Messer - Schneidebrett",
  "Alle aufgelisteten Zutaten in Würfel schneiden.",
  15,
  false,
  null,
  [3]
);
recipe1.addStep(
  recipe1.id,
  3,
  "cookingSteps/recipe-1/recipe1_3.png",
  "Curry kochen lassen",
  "Wasser - indische Gewürze - die gewürfelten Tomaten, Zwiebeln, Knblauchzehen, Kartoffeln und Ingwer - Sojabällchen",
  "ein großer Kochtopf",
  "Zutaten in einen Topf geben und 35 Minuten kochen lassen. Den Herd auf höchster Stufe stellen.",
  35,
  true,
  [1, 2],
  null
);
recipe1.addStep(
  recipe1.id,
  4,
  "cookingSteps/recipe-1/recipe1_4.png",
  "Reis kochen",
  "1 Tasse Basmatireis - 2 Tassen Wasser - 1 TL Salz",
  "ein mittlerer Kochtopf",
  "Zutaten in einen Topf geben und 15 Minuten kochen lassen. Den Herd auf mittlerer Stufe stellen. Den Topf abdecken.",
  15,
  true,
  null,
  null
);

const recipe2 = new RecipeClass(
  2,
  "Schokoladenkuchen",
  "Einfach gemacht und es schmeckt jedem",
  "recipes/recipe-2.png",
  35,
  70
);
recipe2.addStep(
  recipe2.id,
  1,
  "cookingSteps/recipe-2/recipe2_1.png",
  "Teig Vorbereitung",
  "250g Mehl - 350g Zucker - 300g Butter - 1 Päckchen Backpulver - 1 Päckchen Vanillezucker - 1 Prise Salz - 8 EL Kakaopulver",
  "Rührschüssel - Rührgerät",
  "Alle Zutaten in eine Schüssel geben und mit einem Rührgerät vermischen.",
  20,
  false,
  null,
  [2, 3, 4]
);
recipe2.addStep(
  recipe2.id,
  2,
  "cookingSteps/recipe-2/recipe2_2.png",
  "Teig ruhen lassen",
  "gekneteter Teig",
  "Frischhaltefolie - Kühlschrank",
  "Teig mit Frischhaltefolie umwickeln und in den Kühlschrank für 40 Minuten legen.",
  40,
  true,
  [1],
  [3, 4]
);
recipe2.addStep(
  recipe2.id,
  3,
  "cookingSteps/recipe-2/recipe2_3.png",
  "Kuchen Vorbereitung",
  "Teig - ... - ...",
  "Backform",
  " Teig ... und dann in eine Backform geben.",
  15,
  false,
  [1, 2],
  [4]
);
recipe2.addStep(
  recipe2.id,
  4,
  "cookingSteps/recipe-2/recipe2_4.png",
  "Kuchen backen",
  "Backform mit Teig",
  "Backofen",
  "Den Backofen auf 180°C stellen. Den Kuchen für 30 Minuten backen lassen bis er eine schöne Kruste bekommt.",
  30,
  true,
  [1, 2, 3],
  null
);

const recipe3 = new RecipeClass(
  3,
  "Kürbis-Ingwer-Suppe",
  "Mit Kokosmilch und Kürbiskernen",
  "recipes/recipe-3.png",
  35,
  20
);
recipe3.addStep(
  recipe3.id,
  1,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);
recipe3.addStep(
  recipe3.id,
  2,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);

const recipe4 = new RecipeClass(
  4,
  "Blaubeer-Crumble",
  "Mit Vanilleeis",
  "recipes/recipe-4.png",
  55,
  100
);
recipe4.addStep(
  recipe4.id,
  1,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);
recipe4.addStep(
  recipe4.id,
  2,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);

const recipe5 = new RecipeClass(
  5,
  "Gnocchi-Salat",
  "Mit selbstgemachten Pesto",
  "recipes/recipe-5.png",
  25
);
recipe5.addStep(
  recipe5.id,
  1,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);
recipe5.addStep(
  recipe5.id,
  2,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);

const recipe6 = new RecipeClass(
  6,
  "Sommerrollen",
  "Rezept aus Viatnam, perfekt für heiße Tage",
  "recipes/recipe-6.png",
  45
);
recipe6.addStep(
  recipe6.id,
  1,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);
recipe6.addStep(
  recipe6.id,
  2,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);

const recipe7 = new RecipeClass(
  7,
  "Käsekuchen",
  "Klassisches Rezept mit Frischkäse",
  "recipes/recipe-7.png",
  45,
  170
);
recipe7.addStep(
  recipe7.id,
  1,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);
recipe7.addStep(
  recipe7.id,
  2,
  null,
  "TBD",
  "TBD",
  null,
  "TBD",
  35,
  true,
  null,
  null
);

const recipes = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7];

export { recipes };
