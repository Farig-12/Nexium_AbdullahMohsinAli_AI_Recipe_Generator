import { connectToDatabase } from "@/lib/Mongodb";
import UserRecipe from "@/models/Recipe";

export async function PUT(req) {
  try {
    const { recipeId } = await req.json();

    if (!recipeId) {
      return new Response(JSON.stringify({ message: "Missing recipeId" }), { status: 400 });
    }

    await connectToDatabase();

    const updatedRecipe = await UserRecipe.findByIdAndUpdate(
      recipeId,
      { favourite: false },
      { new: true }
    );

    if (!updatedRecipe) {
      return new Response(JSON.stringify({ message: "Recipe not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Removed from favourites", recipe: updatedRecipe }), { status: 200 });
  } catch (error) {
    console.error("Error removing favourite:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
