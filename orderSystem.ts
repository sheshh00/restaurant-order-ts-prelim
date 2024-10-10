// Meal interface (common for all meals)
interface Meal {
    describe(): string;
  }
  
  // Factory Method interface
  interface MealFactory {
    createMeal(): Meal;
  }
  
  // BurgerFactory
  class BurgerFactory implements MealFactory {
    createMeal(): Meal {
      return new Burger();
    }
  }
  
  // SandwichFactory
  class SandwichFactory implements MealFactory {
    createMeal(): Meal {
      return new Sandwich();
    }
  }
  
  // BurritoFactory
  class BurritoFactory implements MealFactory {
    createMeal(): Meal {
      return new Burrito();
    }
  }
  
  class Burger implements Meal {
    patties: number = 1; 
    cheese: boolean = false; 
    vegetables: string[] = []; 
    condiments: string[] = []; 
    bunType: string = ""; 
  
    describe(): string {
      return `Burger with ${this.patties} patties\n∙ Cheese: ${this.cheese ? "Yes" : "No"}\n∙ Vegetables: ${this.vegetables.join(", ")}\n∙ Condiments: ${this.condiments.join(", ")}\n∙ Bun Type: ${this.bunType}`;
    }
  }
  
  // BurgerBuilder
  class BurgerBuilder {
    private burger: Burger;
  
    constructor() {
      this.burger = new Burger();
    }
  
    setPatties(count: number): this {
      if (count < 1 || count > 3) {
        throw new Error("Invalid number of patties. Choose between 1 and 3.");
      }
      this.burger.patties = count;
      return this;
    }
  
    addCheese(cheese: boolean): this {
      this.burger.cheese = cheese;
      return this;
    }
  
    addVegetables(veggies: string[]): this {
      this.burger.vegetables = veggies;
      return this;
    }
  
    addCondiments(condiments: string[]): this {
      this.burger.condiments = condiments;
      return this;
    }
  
    setBunType(bun: string): this {
      this.burger.bunType = bun;
      return this;
    }
  
    build(): Burger {
      return this.burger;
    }
  }
  
  class Sandwich implements Meal {
    breadType: string = ""; 
    protein: string = ""; 
    cheese: boolean = false; 
    vegetables: string[] = []; 
    sauces: string[] = []; 
  
    describe(): string {
      return `Sandwich with ${this.protein} on ${this.breadType} bread\n∙ Cheese: ${this.cheese ? "Yes" : "No"}\n∙ Vegetables: ${this.vegetables.join(", ")}\n∙ Sauces: ${this.sauces.join(", ")}`;
    }
  }
  
  // SandwichBuilder
  class SandwichBuilder {
    private sandwich: Sandwich;
  
    constructor() {
      this.sandwich = new Sandwich();
    }
  
    setBreadType(bread: string): this {
      this.sandwich.breadType = bread;
      return this;
    }
  
    setProtein(protein: string): this {
      this.sandwich.protein = protein;
      return this;
    }
  
    addCheese(cheese: boolean): this {
      this.sandwich.cheese = cheese;
      return this;
    }
  
    addVegetables(veggies: string[]): this {
      this.sandwich.vegetables = veggies;
      return this;
    }
  
    addSauces(sauces: string[]): this {
      this.sandwich.sauces = sauces;
      return this;
    }
  
    build(): Sandwich {
      return this.sandwich;
    }
  }
  
  class Burrito implements Meal {
    beans: string = ""; 
    rice: string = ""; 
    protein: string = ""; 
    toppings: string[] = []; 
  
    describe(): string {
      return `Burrito with ${this.beans} beans ${this.rice} rice\n∙ Protein: ${this.protein}\n∙ Toppings: ${this.toppings.join(", ")}`;
    }
  }
  
  // BurritoBuilder
  class BurritoBuilder {
    private burrito: Burrito;
  
    constructor() {
      this.burrito = new Burrito();
    }
  
    setBeans(beans: string): this {
      this.burrito.beans = beans;
      return this;
    }
  
    setRice(rice: string): this {
      this.burrito.rice = rice;
      return this;
    }
  
    setProtein(protein: string): this {
      this.burrito.protein = protein;
      return this;
    }
  
    addToppings(toppings: string[]): this {
      this.burrito.toppings = toppings;
      return this;
    }
  
    build(): Burrito {
      return this.burrito;
    }
  }
  
  class ComboMeal {
    meal: Meal;
    drink: string = "";
    fries: string = "";
  
    constructor(meal: Meal) {
      this.meal = meal;
    }
  
    describe(): string {
      return `${this.meal.describe()}\n∙ Drink: ${this.drink}\n∙ Fries: ${this.fries}`;
    }
  }
  
  class ComboBuilder {
    private combo: ComboMeal;
  
    constructor(meal: Meal) {
      this.combo = new ComboMeal(meal);
    }
  
    addDrink(drink: string): this {
      this.combo.drink = drink;
      return this;
    }
  
    addFries(fries: string): this {
      this.combo.fries = fries;
      return this;
    }
  
    build(): ComboMeal {
      return this.combo;
    }
  }
     
  function main() {
    const mealFactories: { [key: string]: MealFactory } = {
      "1": new BurgerFactory(),
      "2": new SandwichFactory(),
      "3": new BurritoFactory()
    };
  
    console.log("Welcome to our restaurant! What would you like to order today?");
    console.log("1. Burger\n2. Sandwich\n3. Burrito");
  
    const mealChoice = prompt("Your choice: ");
  
    if (mealChoice && mealFactories[mealChoice]) {
      const factory = mealFactories[mealChoice];
      let meal: Meal | undefined;
  
      if (mealChoice === "1") {
       
        const builder = new BurgerBuilder();
        const patties = +prompt("How many patties? (1-3): ")!;
        const cheese = prompt("Would you like cheese? (Yes/No): ") === "Yes";
        const vegetables = prompt("Choose your vegetables (Lettuce, Tomato, Onion, Pickles): ")!.split(", ");
        const condiments = prompt("Choose your condiments (Ketchup, Mayo, Mustard): ")!.split(", ");
        const bun = prompt("Choose your bun type (Regular, Sesame, Whole Wheat): ")!;
  
        meal = builder.setPatties(patties).addCheese(cheese).addVegetables(vegetables).addCondiments(condiments).setBunType(bun).build();
        
      } else if (mealChoice === "2") {
        
        const builder = new SandwichBuilder();
        const bread = prompt("Choose your bread type (White, Whole Wheat, Sourdough): ")!;
        const protein = prompt("Choose your protein (Turkey, Ham, Chicken, Tuna): ")!;
        const cheese = prompt("Would you like cheese? (Yes/No): ") === "Yes";
        const vegetables = prompt("Choose your vegetables (Lettuce, Tomato, Onion, Pickles): ")!.split(", ");
        const sauces = prompt("Choose your sauces (Mayo, Mustard, Ranch): ")!.split(", ");
  
        meal = builder.setBreadType(bread).addCheese(cheese).addVegetables(vegetables).addSauces(sauces).build();
        
      } else if (mealChoice === "3") {
        
        const builder = new BurritoBuilder();
        const beans = prompt("Choose your beans (Black, Pinto, Refried): ")!;
        const rice = prompt("Choose your rice (White, Brown): ")!;
        const protein = prompt("Choose your protein (Beef, Chicken, Pork, Veggie): ")!;
        const toppings = prompt("Choose your toppings (Sour Cream, Guacamole, Cheese, Salsa): ")!.split(", ");
  
        meal = builder.setBeans(beans).setRice(rice).setProtein(protein).addToppings(toppings).build();
       
      }
      if (meal) {
        console.log("Your order: " + meal.describe());
        const comboChoice = prompt("Would you like to make it a combo meal? (Yes/No): ");
        if (comboChoice?.toLowerCase() === "yes") {
          const drink = prompt("Choose your drink (Soda, Water, Juice): ")!;
          const fries = prompt("Choose your fries (Regular, Sweet Potato, No Fries): ")!;
  
          const comboBuilder = new ComboBuilder(meal);
          const comboMeal = comboBuilder.addDrink(drink).addFries(fries).build();
          
          console.log("Your combo meal: " + comboMeal.describe());
        }
      }
    } else {
      console.log("Invalid choice.");
    }
  }
  
  main();
  
  