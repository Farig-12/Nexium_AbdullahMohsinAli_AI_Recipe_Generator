"use client"
import RecipeCard from "@/components/RecipeCard"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/SupabaseClient"
import Loading from "@/components/Loading"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoginContext } from "@/context"
import Link from "next/link"

const SaveMyRecipe = () => {

   const [recipes, setRecipes] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const { isloggedin } = useLoginContext();
   
   //Auth Guard
   const router = useRouter();
   useEffect(() => {
   if (!isloggedin) {
    setTimeout(() => {
      router.push("/");
    }, 1000);
   } }, [isloggedin]);

    useEffect(() => {
      const fetchUserAndRecipes = async () => {

        setIsLoading(true);

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error || !session?.user?.id) {
          setIsLoading(false)
          return
        }

        const userId = session.user.id

        try {
          const res = await fetch("/api/getRecipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          })

          const data = await res.json()
          setRecipes(data)
        } catch (err) {
          console.error("Error fetching recipes:", err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchUserAndRecipes()
    }, [])

    const handleDeleteRender = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
  };

     if (!isloggedin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="bg-white text-red-600 rounded-xl px-6 py-4 shadow-lg text-lg font-mono text-center">
          Please log in to view your saved recipes.
        </div>
      </div>
    );
  }


    return (
      <>
        <div className="font-sans min-h-screen bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-10">
                  {isLoading ? (
                  <Loading/>
              ) : (
                  <RecipeCard recipes={recipes} onDelete={handleDeleteRender} />
              )}
        </div>

        <div className="fixed z-30 top-[36rem] md:top-[32rem]  left-5">
          <Link href="/" passHref>
            <div className="flex items-center gap-2 shadow-xl rounded-xl px-4 py-2 w-fit cursor-pointer hover:shadow-2xl bg-gradient-to-r from-black/40 to-red-600 hover:from-red-600 hover:to-black/40 hover:scale-105 transition-colors duration-300 ease-in-out">
              <ArrowLeft className="text-white" />
              <span className="text-white font-medium text-lg">Back</span>
            </div>
          </Link>
        </div>
      </>
    )
}

export default SaveMyRecipe