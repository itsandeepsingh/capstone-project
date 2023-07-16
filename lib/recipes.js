class RecipeClass {
  constructor(id, title, subtitle, picture, workingTime, waitingTime) {
    if (!id || !title || !subtitle) {
      throw new Error("Id, title, subtitle and workingTime must be provided");
    }
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.picture = picture || "recipe-placeholder.png";
    this.workingTime = workingTime;
    this.waitingTime = waitingTime || 0;
  }
}

const recipes = [
  new RecipeClass(
    1,
    "Sojabällchen-Curry",
    "Rezept aus Indien, mit Reis und Kartoffeln",
    "recipe-1.png",
    25,
    75
  ),
  new RecipeClass(
    2,
    "Schokoladenkuchen",
    "Vegan und ohne Mehl, einfach gemacht",
    "recipe-2.png",
    20,
    90
  ),
  new RecipeClass(
    3,
    "Kürbis-Ingwer-Suppe",
    "Mit Kokosmilch und Kürbiskernen",
    "recipe-3.png",
    35,
    20
  ),
  new RecipeClass(
    4,
    "Blaubeer-Crumble",
    "Mit Vanilleeis",
    "recipe-4.png",
    55,
    100
  ),
  new RecipeClass(
    5,
    "Gnocchi-Salat",
    "Mit selbstgemachten Pesto",
    "recipe-5.png",
    25
  ),
  new RecipeClass(
    6,
    "Sommerrollen",
    "Rezept aus Viatnam, perfekt für heiße Tage",
    "recipe-6.png",
    45
  ),
  new RecipeClass(
    7,
    "Käsekuchen",
    "Klassisches Rezept mit Frischkäse",
    "recipe-7.png",
    45,
    170
  ),
];

export { RecipeClass, recipes };
