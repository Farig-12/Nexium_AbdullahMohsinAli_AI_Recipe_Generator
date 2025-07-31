import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, X, Timer, CookingPot, ShoppingBasket, Cross, Zap } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function RecipeCard({ recipes, onDelete, onRemove }) {
  const [isViewed, setIsViewed] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const isOnFavouritesPage = pathname === "/Favourite";

  const handleDelete = async (id) =>{
    setDeletingId(id);
    const res = await fetch(`/api/deleteRecipe?id=${id}`, {
      method: "DELETE",
    });

    //console.log(res);

    if (res.ok) {
      toast.success("Recipe deleted");
      if (onDelete) onDelete(id); 
      setDeletingId(null);
    } else {
      toast.error("Failed to delete");
      setDeletingId(null);
    }
  };

  const handleFavourite = async(id) =>{
    setIsLoading(true);
     try {
      const res = await fetch("/api/updateFavourite", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: id, favourite: true }),
      });

      if (res.ok) {
        toast.success("Added to favourites");
        setIsViewed({...isViewed, favourite: true});
        setIsLoading(false);
      } else {
        toast.error("Failed to update favourite");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Error updating favourite");
      //console.error(err);
      setIsLoading(false);
    }
  }

 const handleRemoveFav = async (id) => {
  setDeletingId(id);
  try {
    const res = await fetch("/api/deleteFavRecipe", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id }), 
    });

    if (res.ok) {
      toast.success("Removed from favourites");
      if (onRemove) onRemove(id);
      setDeletingId(null);
    } else {
      toast.error("Failed to remove from favourites");
      setDeletingId(null);
    }
  } catch (err) {
    toast.error("Error removing favourite");
    console.error(err);
    setDeletingId(null);
  }
};


  if (!recipes || recipes.length === 0) {
    return (<div className="flex flex-col items-center">
              <Image src="/images/chef-looking.png" alt="Chef" className="h-80 drop-shadow-2xl" />
              <span className="font-medium text-3xl">No Recipes Found!</span>
            </div>);
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {recipes.map((recipe) => (
        <Card
          key={recipe._id}
          className="w-full shadow-xl hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-xl bg-gradient-to-r from-white/80 to-green-200 backdrop-blur-md text-gray-800 border-none"
        >
          <CardHeader className="text-xl font-semibold text-gray-800">
            {recipe.recipeName}
          </CardHeader>

          <CardContent className={'flex-grow'}>
            <div className="flex items-center text-gray-600 text-sm gap-2">
              <Clock className="w-4 h-4" />
              <span>Cooking Time: {recipe.cookingTime}</span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsViewed(recipe)} className={'hover:bg-gradient-to-r hover:from-orange-300 hover:to-white transition-colors duration-200 ease-in-out'}>View</Button>
            {
              !isOnFavouritesPage && (<Button variant="destructive" onClick={() => handleDelete(recipe._id)} className={'hover:bg-red-700 transition-colors duration-200 ease-in-out'}>
              {deletingId === recipe._id ? (
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-20"></div>
                  </div>
                ) : (
                  "Delete"
                )}
            </Button>)
            }

            {/* Favourite Removal */
              recipe.favourite && isOnFavouritesPage && (<Button variant="destructive" onClick={() => handleRemoveFav(recipe._id)} className={'hover:bg-red-700 transition-colors duration-200 ease-in-out'}>
              {deletingId === recipe._id ? (
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-20"></div>
                  </div>
                ) : (
                  "Remove"
                )}
            </Button>)}
            
          </CardFooter>
        </Card>
      ))}

     <AnimatePresence>
        {isViewed && (
          <motion.div key = "modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
            <motion.div initial={{ y: 50, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 50, scale: 0.9, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="bg-[#e7d8c2] rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] relative grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Close Button */}
              <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-600 hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
                    onClick={() => setIsViewed(null)}
                  >
                    <X size={24} />
              </button>

              {/* Chef Image */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-yellow-400">
                    <Image
                      src="/images/chef-smelling.png"
                      alt="Chef"
                      className="w-64 h-auto rounded-xl drop-shadow-xl -translate-y-2"
                    />
                    <p className="text-center mt-4 font-semibold text-white font-mono text-2xl -translate-y-7">
                      Chef Gusteau's Kitchen!
                    </p>

                    {/*Favourite */}
                  {!isViewed.favourite && (
                    isLoading ? (
                     <div className="flex justify-center items-center h-[20px]">
                      <div className="relative w-6 h-6">
                        <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-20"></div>
                      </div>
                    </div>
                    ) : (
                      <Button
                        onClick={() => handleFavourite(isViewed._id)}
                        className="w-50 py-2 -translate-y-4 bg-transparent border text-white font-mono rounded-md hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:border-none transition-colors duration-300 ease-in-out"
                      >
                        Add to Favourite
                      </Button>
                    )
                  )}
              </div>

              {/* Recipe Details */}
              <div className="flex flex-col justify-start text-black overflow-y-auto max-h-[80vh] p-4 scroll-transparent">
                <h2 className="text-2xl font-bold mb-4">{isViewed.recipeName}</h2>

                <p className="mb-2 flex items-center gap-10">
                  <span className="flex items-center gap-1">
                    <Timer size={20} /> {isViewed.cookingTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={20} color="limegreen" /> {isViewed.calories} kcal
                  </span>
                </p>
                <p className="mb-4 flex flex-col gap-1"><strong className="flex gap-1">Health Tip <Cross size={22} color="red"/>:</strong> {isViewed.healthTip}</p>

                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2 flex gap-1">Ingredients <ShoppingBasket size={22} color="orange"/>:</h3>
                  <ul className="list-disc ml-5">
                        {Array.isArray(isViewed.ingredients) ? (
                          isViewed.ingredients.map((ingredient, i) => (
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
                        {Array.isArray(isViewed.instructions) ? (
                          isViewed.instructions.map((step, i) => (
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
    </div>
  );
}
