import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  recipeName: String,
  cookingTime: String,
  healthTip: String,
  ingredients: [String],
  instructions: [String],
  userId: { type: String, required: true },      // Supabase UUID   
  favourite: { type: Boolean, default: false },  
  calories: Number, 
}, {
  timestamps: true,
  collection: "UserRecipes",
});

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
