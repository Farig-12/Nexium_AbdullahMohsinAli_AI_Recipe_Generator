"use client"

import { UtensilsCrossed, X, Timer, Cross, CookingPot, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useLoginContext } from "@/context"
import Link from "next/link"
import { toast } from "sonner"
import { supabase } from "@/lib/SupabaseClient"
import Loading from "@/components/Loading"
import { AnimatePresence, motion } from "framer-motion"
import ExamplePrompt from "@/components/ExamplePrompt"


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const {isloggedin} = useLoginContext();

  // Handles User Name fetching
  useEffect(() => {
    const fetchUsername = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Failed to get user", error);
        return;
      }

      const uname = user?.user_metadata?.name || user?.email?.split("@")[0];
      setUserName(uname.toUpperCase());
    };

    if(isloggedin){
      fetchUsername();
    }
  }, [isloggedin]);

  const handlePrompt = async () => {
    if(!isloggedin){
      toast.error("Please log in first");
      setPrompt("");
      return;
    }

    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("https://farig-12.app.n8n.cloud/webhook/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const result = await response.json();
      setRecipe(result);
      setPrompt("");
    } catch (error) {
      console.error("Error generating recipe:", error);
    }finally {
      setIsLoading(false); 
    }
  };

  const handleSave = async () => {

    setIsLoading(true);
    try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    const userId = user.id;   
    const favourite = false;   

    const res = await fetch("/api/saveRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...recipe,
        userId,
        favourite,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Recipe saved successfully!");
    } else {
      toast.error(data.message || "Failed to save recipe.");
    }
  } catch (error) {
    console.error("Save error:", error);
    toast.error("Something went wrong!");
  } finally{
    setIsLoading(false);
  }
  };

  if (isLoading) return <Loading />;


  return (
    <>
      <div className="font-sans min-h-screen bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Text and Form */}
          <div>
            <h1 className="text-5xl font-medium font-sans mb-6 px-4 translate-y-4">
              Cook smarter with <span className="text-white logo-font font-normal">Cook-It!</span>
            </h1>
            <p className="text-lg mb-6 px-4 ml-2">
              Discover recipes, save your favorites, and cook like a pro with the help of AI!
            </p>

            <div className="relative w-full max-w-xl focus-within:scale-105 transition-all duration-300 ease-in-out ml-3 -translate-y-2 ">
              <input
                type="text"
                placeholder="Enter ingredients and cook..."
                value = {prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-14 pl-4 pr-32 rounded-4xl bg-white text-gray-700 placeholder-gray-400 font-sans focus:ring-2 focus:ring-amber-600 focus:shadow-lg transition-all duration-300 ease-in-out outline-none"
              />

              <Button
                onClick = {handlePrompt}
                className="absolute right-2 top-[5px] rounded-3xl px-6 bg-gradient-to-r from-red-600 to-black/60 text-white hover:cursor-pointer hover:scale-105 animate-gradient-x font-sans text-[20px] h-auto"
              >
                Generate
              </Button>
            </div>
            <ExamplePrompt/>

          </div>

          {/* Recipe Card with IF condition */}
          <AnimatePresence>
            {recipe && (
              <motion.div key = "modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
                <motion.div initial={{ y: 50, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 50, scale: 0.9, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="bg-[#e7d8c2] rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] relative grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Close Button */}
                  <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-600 hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
                    onClick={() => setRecipe(null)}
                  >
                    <X size={24} />
                  </button>

                  {/* Chef Image */}
                  <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-yellow-400">
                    <img
                      src="/images/chef-smelling.png"
                      alt="Chef"
                      className="w-64 h-auto rounded-xl drop-shadow-xl -translate-y-2"
                    />
                    <p className="text-center mt-4 font-semibold text-white font-mono text-2xl -translate-y-7">
                      Chef Gusteau’s Kitchen!
                    </p>
                    <Button
                      onClick={handleSave}
                      className="w-50 py-2 -translate-y-4 bg-transparent border text-white font-mono rounded-md hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:border-none transition-colors duration-300 ease-in-out"
                    >
                      Add to my Recipe Book
                    </Button>
                  </div>

                  {/* Recipe Details */}
                  <div className="flex flex-col justify-start text-black overflow-y-auto max-h-[80vh] py-4 scroll-transparent">
                    <h2 className="text-2xl font-bold mb-4">{recipe.recipeName}</h2>

                    <p className="mb-2 flex gap-1"><Timer size={22}/> {recipe.cookingTime}</p>
                    <p className="mb-4 flex flex-col gap-1"><strong className="flex gap-1">Health Tip <Cross size={22} color="red"/>:</strong> {recipe.healthTip}</p>

                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2 flex gap-1">Ingredients <ShoppingBasket size={22} color="orange"/>:</h3>
                      <ul className="list-disc ml-5">
                        {Array.isArray(recipe.ingredients) ? (
                          recipe.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))
                        ) : (
                          <li>No ingredients available</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex gap-1">Instructions <CookingPot size={22} color="brown"/>:</h3>
                      <ol className="list-decimal ml-5 space-y-2">
                        {Array.isArray(recipe.instructions) ? (
                          recipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))
                        ) : (
                          <li>No instructions available</li>
                        )}
                      </ol>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
             )}
          </AnimatePresence>


          {/* Side Images */}
          <div className="flex justify-center items-start gap-4 mr-6 ml-4">
              {/* Column for chef and pan */}
              <div className="flex flex-col items-center">
                <img src="/images/chef.png" alt="Chef" className="h-80 drop-shadow-2xl animate-float" />
                <img src="/images/pan.png" alt="Pan" className="h-28 ml-3 -mt-3 rounded-4xl shadow-2xl border border-white/40 hover:scale-105 transition-all duration-200 ease-in-out animate-float" />
              </div>

              {/* Utensils icon and spices beside the column */}
              <div className="flex flex-col items-center mt-7">
                <UtensilsCrossed 
                  size={90} 
                  className="p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-800 hover:from-orange-800 hover:to-amber-500 transition-colors duration-200 ease-in-out translate-y-8 animate-float"
                />
                <img src="/images/spices.png" alt="Chef" className="h-48 w-24 mt-16 rounded-4xl shadow-2xl border border-white/40 hover:scale-105 transition-all duration-300 ease-in-out animate-float" />
              </div>
          </div>
        </div>
        
      </div>

      <div className="bg-gradient-to-r from-amber-700 to-red-700 min-h-screen text-white px-6 py-10">
      <p className="text-[4rem] logo-font font-medium ml-[20rem]">
        Become a Chef 
        <span className="text-[4rem] logo-font ml-8">
          {isloggedin ? userName : <Link href="/Signup"> Sign Up!</Link>}
        </span>
      </p>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center mt-8 px-6">

        <div className="flex flex-col items-center">
          <img src="/images/utensils.png" className="h-32 animate-float drop-shadow-xl" alt="Utensils" />
          <p className="mt-3 text-center text-lg font-mono ">Keep your tools clean & organized</p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/images/ingredients.png" className="h-32 animate-float delay-100 drop-shadow-xl" alt="Ingredients" />
          <p className="mt-3 text-center text-lg font-mono ">Use fresh and seasonal ingredients</p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/images/knife.png" className="h-32 animate-float delay-200 drop-shadow-xl" alt="Knife" />
          <p className="mt-3 text-center text-lg font-mono ">Master basic knife skills</p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/images/tasting.png" className="h-32 animate-float delay-150 drop-shadow-xl" alt="Tasting" />
          <p className="mt-3 text-center text-lg font-mono ">Taste as you go - adjust flavors!</p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/images/timer.png" className="h-32 animate-float delay-300 drop-shadow-xl" alt="Timer" />
          <p className="mt-3 text-center text-lg font-mono ">Time your steps - don't overcook</p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/images/plate.png" className="h-32 animate-float delay-500 drop-shadow-xl" alt="Plating" />
          <p className="mt-3 text-center text-lg font-mono ">Presentation is key - plate beautifully</p>
        </div>
      </div>

      <p className="mt-10 text-center text-xl font-light italic text-white/60">
        "Anyone can cook, but only the fearless can be great." - Gusteau
      </p>
    </div>


    </>

  );
}
