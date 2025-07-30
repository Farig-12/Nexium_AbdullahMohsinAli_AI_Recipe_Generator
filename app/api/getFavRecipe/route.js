import { connectToDatabase } from "@/lib/Mongodb";
import UserRecipe from "@/models/Recipe";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ message: "Missing user ID" }), { status: 400 });
    }

    await connectToDatabase();

    const recipes = await UserRecipe.find({ userId, favourite: true });

    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    console.error("Fetch recipes error:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch recipes" }), { status: 500 });
  }
}
