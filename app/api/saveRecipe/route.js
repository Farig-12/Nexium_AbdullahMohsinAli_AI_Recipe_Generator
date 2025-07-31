import { connectToDatabase } from "@/lib/Mongodb"
import UserRecipe from "@/models/Recipe"

export async function POST(req) {
  try {
    const body = await req.json();
    const { recipeName, cookingTime, healthTip, ingredients, instructions, userId, favourite, calories } = body;

    if (!userId) {
      return new Response(JSON.stringify({ message: "Missing user ID" }), { status: 400 });
    }

    await connectToDatabase();

    const existingRecipe = await UserRecipe.findOne({ recipeName, userId });
    if (existingRecipe) {
      return new Response(JSON.stringify({ message: "Recipe with this name already exists!" }), { status: 409 });
    }

    const newRecipe = await UserRecipe.create({
      recipeName,
      cookingTime,
      healthTip,
      ingredients,
      instructions,
      userId,
      favourite,
      calories,
    });

    return new Response(JSON.stringify(newRecipe), { status: 200 });
  } catch (error) {
    console.error("Save recipe error:", error);
    return new Response(JSON.stringify({ message: "Failed to save recipe" }), { status: 500 });
  }
}
