export type CuisineTypes = [
  "Global", "Acadian", "Afghan", "African Great Lakes", "Albanian", "American",
  "Andalusian", "Andean", "Angolan", "Argentinian", "Argentinian-Italian",
  "Armenian", "Aostan", "Ashkenazi Jewish", "Australian", "Austrian",
  "Balkan", "Balkan Jewish", "Bangladeshi", "Basque", "Belarusian",
  "Belgian", "Bashkir", "Bolivian", "Botswana", "Brazilian", "British",
  "British-American", "Bruneian", "Buryatian", "Bulgarian", "Burmese",
  "Cameroonian", "Canadian", "Cape Verdean", "Caribbean", "Cajun",
  "Cantonese", "Canarese", "Catalan", "Central American", "Central Asian",
  "Chadian", "Chaoshan", "Chilean", "Chinese", "Chinese American",
  "Chinese Indonesian", "Chinese Peruvian", "Crimean Tatar", "Croatian",
  "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican",
  "Dutch", "Ecuadorian", "Egyptian", "English", "English-American",
  "Eritrean", "Estonian", "Ethiopian", "European", "Fijian", "Filipino",
  "Finnish", "French", "French-American", "French-Canadian", "French-Swiss",
  "Fujian", "Gagauz", "Gambian", "Georgian", "German", "German-American",
  "Greek", "Grenadian", "Guatemalan", "Guyanese", "Haitian", "Hausa",
  "Hawaiian", "Hungarian", "Icelandic", "Igbo", "Indian", "Indian Subcontinent",
  "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian",
  "Italian-American", "Ivorian", "Jamaican", "Japanese", "Jewish",
  "Jordanian", "Kashmiri", "Kazakh", "Kenyan", "Korean", "Kurdish",
  "Latin American", "Latvian", "Lebanese", "Libyan", "Lithuanian",
  "Louisiana Creole", "Luxembourgish", "Macedonian", "Macanese", "Madagascan",
  "Maharashtrian", "Malian", "Malawian", "Malaysian", "Maltese",
  "Mediterranean", "Mexican", "Mexican-American", "Middle Eastern",
  "Moldovan", "Mongolian", "Moroccan", "Namibian", "Native American",
  "Nepalese", "New Zealand", "Nicaraguan", "Nigerian", "North American",
  "North Macedonian", "Norwegian", "Ottoman", "Oaxacan", "Pakistani",
  "Palestinian", "Paraguayan", "Peruvian", "Persian", "Polish", "Portuguese",
  "Portuguese-American", "Puerto Rican", "Punjabi", "Québec", "Romanian",
  "Russian", "Shaanxi", "Scottish", "Scandinavian", "Senegalese",
  "Serbian", "Seychellois", "Sicilian", "Singaporean", "Slavic",
  "Slovak", "Slovenian", "Somalian", "South African", "South American",
  "South Asian", "South Australian", "South East Asian", "South Korean",
  "Spanish", "Spanish-American", "Sri Lankan", "Sudanese", "Surinamese",
  "Swahili", "Swedish", "Swiss", "Syrian", "Taichung", "Tajik", "Tamil",
  "Tanzanian", "Texan", "Tex-Mex", "Thai", "Tibetan", "Tunisian",
  "Turkish", "Turkish-American", "Ukrainian", "Uzbek", "Venezuelan",
  "Vietnamese", "West African", "Welsh", "Western Saharan", "Yemenite Jewish",
  "Yemeni", "Yoruba", "Zambian", "Zimbabwean", "Zarma", "Songhai"
];
export type MealType = [
  "Default",
  "Breakfast",
  "Brunch",
  "Lunch",
  "Dinner",
  "Snack",
  "Appetizer / Starter",
  "Dessert",
  "Side Dish",
  "Soup",
  "Salad",
  "Smoothie",
  "Baking / Pastry",
  "Kid-friendly",
  "Party / Sharing Platter"
];
export type Allergens = [
  "None",
  "Wheat",
  "Barley",
  "Rye",
  "Oats",
  "Spelt",
  "Kamut",
  "Triticale",
  "Gluten",
  "Cow’s Milk",
  "Goat’s Milk",
  "Sheep’s Milk",
  "Lactose",
  "Casein",
  "Whey",
  "Eggs (Chicken)",
  "Eggs (Duck)",
  "Peanuts",
  "Almonds",
  "Walnuts",
  "Cashews",
  "Pecans",
  "Pistachios",
  "Hazelnuts",
  "Macadamia nuts",
  "Brazil nuts",
  "Pine nuts",
  "Sesame seeds",
  "Poppy seeds",
  "Sunflower seeds",
  "Chia seeds",
  "Flaxseeds",
  "Fish",
  "Salmon",
  "Tuna",
  "Cod",
  "Shellfish",
  "Shrimp",
  "Crab",
  "Lobster",
  "Mollusks",
  "Squid",
  "Scallops",
  "Soy",
  "Lupin",
  "Lentils",
  "Chickpeas",
  "Beans",
  "Green peas",
  "Mustard",
  "Sulfites"
];
export type DietaryPreferences = [
  "Default",
  "Vegan",
  "Vegetarian",
  "Pescatarian",
  "Flexitarian",
  "Omnivore",
  "Raw Food",
  "Whole30",
  "Paleo",
  "Keto",
  "Low-Carb",
  "High-Protein",
  "Low-Fat",
  "Low-Sodium",
  "Low-Sugar",
  "No Added Sugar",
  "DASH Diet",
  "Mediterranean Diet",
  "Diabetic-Friendly",
  "Heart-Healthy",
  "Anti-Inflammatory",
  "Gluten-Free",
  "Dairy-Free",
  "Lactose-Free",
  "Nut-Free",
  "Soy-Free",
  "Egg-Free",
  "Shellfish-Free",
  "Halal",
  "Kosher",
  "Ayurvedic",
  "Macrobiotic",
  "FODMAP-Friendly",
  "Sattvic Diet",
  "Alkaline Diet"
];

export interface Ingredient {
    name: string;
    quantity: string;
  }
  
  export interface Nutrition {
    name: string;
    nutrition: {
      calories: number;
      carbs: number;
      fat: number;
      protein: number;
    };
  }
  
  export interface TotalNutrition {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
  }
  
  export interface RecipeResponse {
    title: string;
    description: string;
    ingredients: Ingredient[];
    ingredients_additional: Ingredient[];
    recipe: string[];
    nutritions: Nutrition[];
    total_nutritions: TotalNutrition;
    estimated_time: string;
    image_64encode: string;
  }
  
  export interface Image {
    id: string;
    image_url: string;
    imageBase64: string;
    cuisine_type: CuisineTypes;
    meal_type: MealType;
    allergens: Allergens[];
    dietary: DietaryPreferences;
    created_at: string;
    recipe?: RecipeResponse;
    status: 'loading' | 'error' | 'success';
    objectUrl?: string;
    errorType?: 'invalid_image' | 'rate_limit';
    errorDetails?: {
      countdown?: {
        hours: number;
        minutes: number;
        seconds: number;
      };
    };
  }