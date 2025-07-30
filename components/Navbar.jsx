"use client"

import { ChefHat, User, X, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { supabase } from '@/lib/SupabaseClient'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useLoginContext } from "@/context"


const Navbar = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const {isloggedin, setIsloggedin} = useLoginContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //To get user session and timed out his session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsloggedin(!!session)
    }

    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsloggedin(!!session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, []);

  const handleRender = (e) => {
    e.preventDefault();

    const path = e.currentTarget.getAttribute("data-path");

    if(!isloggedin){
      toast.error("Please log in first");
    }
    else{
      router.push(path || "/")
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if(error){
      toast.error("Login Failed: " + error.message);
      setEmail('');
      setPassword('');
      setIsLoading(false);
    }
    else{
      toast.success("Login Successful!");
      setIsLoading(false);
      setIsloggedin(true); 
      setShowProfileCard(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    setIsLoading(true);

    if(error){
      toast.error("Logout failed " + error.message);
      setIsLoading(false);
    }
    else{
      toast.success("Logout Successful!");
      setIsLoading(false);
      router.push("/");
    }
  }



  return (
    <>
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo Section */}
          <Link href = "/">
            <div className="flex items-center gap-2">
              <ChefHat size={55} />
              <span className="logo-font text-[2.5rem] translate-y-[6px]">Cook-It</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className={`flex ${isloggedin ? 'gap-10' : 'gap-4'} justify-between text-lg translate-y-[1px] font-medium text-gray-50`}>
            <li>
              <Link href = "/About" className="relative cursor-pointer after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-50 after:transition-all after:duration-300 hover:after:w-full">About Us</Link>
            </li>
            <li>
              {isloggedin && (<Link href = "/Favourite" onClick = {handleRender} data-path="/Favourite" className="relative cursor-pointer after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-50 after:transition-all after:duration-300 hover:after:w-full">Favourite</Link>)}
            </li>
            <li>
                <Link href = "/ContactUs" className="relative cursor-pointer after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-50 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link>
            </li>
            <li>
              {isloggedin && (<Link href = "/saveRecipe" className="relative cursor-pointer after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-50 after:transition-all after:duration-300 hover:after:w-full">My Recipes</Link>)}
            </li>
          </ul>

          {/* User Login/Logout ; do ui changes in button */}
          {!isloggedin && (<button onClick={() => setShowProfileCard(true)} className="hover:cursor-pointer flex gap-2 text-lg font-medium rounded-4xl px-3 py-1 bg-gradient-to-r from-black/40 to-red-600 hover:from-red-600 hover:to-black/40 hover:scale-105 transition-colors duration-300 ease-in-out shadow-lg">
            <span className="mt-0.5">Login</span> <User size={32} />
          </button>)}

          {isloggedin && (<button
              onClick={handleLogOut}
              className="hover:cursor-pointer flex gap-2 text-lg font-medium rounded-4xl px-3 py-1 bg-gradient-to-r from-red-600 to-black/40 hover:from-black/40 hover:to-red-600 hover:scale-105 transition-colors duration-300 ease-in-out shadow-lg"
            >
              <span className="mt-0.5">Logout</span>
              <LogOut size={30} className="text-gray-400" />
            </button>)}
        </div>
      </div>

      {showProfileCard && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-red-600 hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out" onClick={() => setShowProfileCard(false)}>
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Get Ready to Cook!</h2>

            {/* Input fields */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full mb-3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full mb-4 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-md hover:scale-105 transition-all duration-300 flex items-center justify-center h-12">
                {isLoading ? (
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-20"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-sm mt-4 text-center text-gray-700">
              Don't have an account?{" "}
              <Link
                href="/Signup"
                onClick={() => setShowProfileCard(false)}
                className="text-orange-600 relative cursor-pointer after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
