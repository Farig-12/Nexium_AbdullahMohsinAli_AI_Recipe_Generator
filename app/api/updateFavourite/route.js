import { connectToDatabase } from "@/lib/Mongodb";
import mongoose from "mongoose";
import UserRecipe from "@/models/Recipe";

export async function PUT(req) {
  try {
    const { recipeId, favourite } = await req.json();

    if (!recipeId) {
      return new Response(JSON.stringify({ message: "Missing recipe ID" }), { status: 400 });
    }
    
    await connectToDatabase();

    const updatedRecipe = await UserRecipe.findByIdAndUpdate(
      recipeId,
      { favourite },
      { new: true }
    );

    if (!updatedRecipe) {
      return new Response(JSON.stringify({ message: "Recipe not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedRecipe), { status: 200 });
  } catch (error) {
    console.error("Failed to update favourite:", error);
    return new Response(JSON.stringify({ message: "Failed to update" }), { status: 500 });
  }
}
