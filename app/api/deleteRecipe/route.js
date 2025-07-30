import { connectToDatabase } from "@/lib/Mongodb"
import UserRecipe from "@/models/Recipe"
import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid or missing recipe ID" }), { status: 400 });
    }

    await connectToDatabase();

    const deletedRecipe = await UserRecipe.findByIdAndDelete(new mongoose.Types.ObjectId(id));

    if (!deletedRecipe) {
      return new Response(JSON.stringify({ message: "Recipe not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Recipe deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ message: "Failed to delete recipe" }), { status: 500 });
  }
}
