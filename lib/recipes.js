class RecipeClass {
  constructor(id, title, subtitle, picture) {
    if (!id || !title || !subtitle) {
      throw new Error("Id, title, and subtitle must be provided");
    }
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.picture = picture || "recipe-placeholder.png";
  }
}

const recipes = [
  new RecipeClass(
    1,
    "Sojabällchen-Curry",
    "Rezept aus Indien, mit Reis und Kartoffeln",
    "recipe-1.png"
  ),
  new RecipeClass(
    2,
    "Schokoladenkuchen",
    "Vegan und ohne Mehl, einfach gemacht",
    "recipe-2.png"
  ),
  new RecipeClass(
    3,
    "Kürbis-Ingwer-Suppe",
    "Mit Kokosmilch und Kürbiskernen",
    "recipe-3.png"
  ),
  new RecipeClass(4, "Blaubeer-Crumble", "Mit Vanilleeis", "recipe-4.png"),
  new RecipeClass(
    5,
    "Gnocchi-Salat",
    "Mit selbstgemachten Pesto",
    "recipe-5.png"
  ),
  new RecipeClass(
    6,
    "Sommerrollen",
    "Rezept aus Viatnam, perfekt für heiße Tage",
    "recipe-6.png"
  ),
  new RecipeClass(
    7,
    "Käsekuchen",
    "Klassisches Rezept mit Frischkäse",
    "recipe-7.png"
  ),
];

export { RecipeClass, recipes };
