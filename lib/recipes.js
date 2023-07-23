class RecipeStep {
  constructor(
    recipeId,
    stepId,
    picture,
    title,
    necessaryIngredients,
    necessaryUtensils,
    description
  ) {
    if (
      !recipeId ||
      !stepId ||
      !title ||
      !necessaryIngredients ||
      !description
    ) {
      throw new Error(
        "RecipeId, StepId, title, necessaryIngredients and description must be provided for RecipeStep"
      );
    }
    this.recipeId = recipeId;
    this.stepId = stepId;
    this.picture = picture || "placeholder.png";
    this.title = title;
    this.necessaryIngredients = necessaryIngredients;
    this.necessaryUtensils = necessaryUtensils;
    this.description = description;
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
    this.picture = picture || "placeholder.png";
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
    description
  ) {
    const newStep = new RecipeStep(
      recipeId,
      stepId,
      picture,
      title,
      necessaryIngredients,
      necessaryUtensils,
      description
    );
    this.steps.push(newStep);
  }
}

const recipe1 = new RecipeClass(
  1,
  "Sojabällchen-Curry",
  "Rezept aus Indien, mit Reis und Kartoffeln",
  "recipe-1.png",
  25,
  75
);
recipe1.addStep(
  recipe1.id,
  1,
  null,
  "Vorbereitung",
  "500g Sojabällchen",
  "Schüssel (groß)",
  "Die Schüssel mit Wasser füllen, sodass die Sojabällchen bedeckt sind. Für eine Stunde einweichen lassen. Das Wasser ggf. zwischendurch austauschen."
);
recipe1.addStep(recipe1.id, 2, null, "TBD", "TBD", null, "TBD");
recipe1.addStep(recipe1.id, 3, null, "TBD", "TBD", null, "TBD");

const recipe2 = new RecipeClass(
  2,
  "Schokoladenkuchen",
  "Vegan und ohne Mehl, einfach gemacht",
  "recipe-2.png",
  20,
  90
);
recipe2.addStep(recipe2.id, 1, null, "TBD", "TBD", null, "TBD");
recipe2.addStep(recipe2.id, 2, null, "TBD", "TBD", null, "TBD");

const recipe3 = new RecipeClass(
  3,
  "Kürbis-Ingwer-Suppe",
  "Mit Kokosmilch und Kürbiskernen",
  "recipe-3.png",
  35,
  20
);
recipe3.addStep(recipe3.id, 1, null, "TBD", "TBD", null, "TBD");
recipe3.addStep(recipe3.id, 2, null, "TBD", "TBD", null, "TBD");

const recipe4 = new RecipeClass(
  4,
  "Blaubeer-Crumble",
  "Mit Vanilleeis",
  "recipe-4.png",
  55,
  100
);
recipe4.addStep(recipe4.id, 1, null, "TBD", "TBD", null, "TBD");
recipe4.addStep(recipe4.id, 2, null, "TBD", "TBD", null, "TBD");

const recipe5 = new RecipeClass(
  5,
  "Gnocchi-Salat",
  "Mit selbstgemachten Pesto",
  "recipe-5.png",
  25
);
recipe5.addStep(recipe5.id, 1, null, "TBD", "TBD", null, "TBD");
recipe5.addStep(recipe5.id, 2, null, "TBD", "TBD", null, "TBD");

const recipe6 = new RecipeClass(
  6,
  "Sommerrollen",
  "Rezept aus Viatnam, perfekt für heiße Tage",
  "recipe-6.png",
  45
);
recipe6.addStep(recipe6.id, 1, null, "TBD", "TBD", null, "TBD");
recipe6.addStep(recipe6.id, 2, null, "TBD", "TBD", null, "TBD");

const recipe7 = new RecipeClass(
  7,
  "Käsekuchen",
  "Klassisches Rezept mit Frischkäse",
  "recipe-7.png",
  45,
  170
);
recipe7.addStep(recipe7.id, 1, null, "TBD", "TBD", null, "TBD");
recipe7.addStep(recipe7.id, 2, null, "TBD", "TBD", null, "TBD");

const recipes = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7];

export { recipes };
