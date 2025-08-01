"use client";

import { useState, useEffect } from "react"
import { supabase } from "@/lib/SupabaseClient"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useLoginContext } from "@/context"
import Link from "next/link"

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isloggedin } = useLoginContext();

  // Auth Guard
      useEffect(() => {
        if (isloggedin) {
           setTimeout(() => {
           router.push("/");
           }, 1000);
        }
      }, [isloggedin]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  setIsLoading(true);
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }, 
    },
  });

  if (signupError) {
    toast.error(signupError.message);
    setName('');
    setEmail('');
    setPassword('');
    setIsLoading(false);
    return;
  }

  const userId = signupData?.user?.id;

  if (!userId) {
    toast.warning('Signup succeeded but user ID was not returned.');
    setName('');
    setEmail('');
    setPassword('');
    setIsLoading(false);
    return;
  }

  const { error: insertError } = await supabase.from('UserInfo').insert([
    {
      id: userId,    
      Name: name,
      Email: email,
      Password: password
    },
  ]);

  if (insertError) {
    toast.error('Insert Error: ' + insertError.message);
    setName('');
    setEmail('');
    setPassword('');
    setIsLoading(false);
  } else {
    toast.success('Signup Success!');
    setName('');
    setEmail('');
    setPassword('');
    setIsLoading(false);
    router.push("/");
  }
};

      if (isloggedin) {
          return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-600 to-orange-600">
              <div className="bg-white text-red-600 rounded-xl px-6 py-4 shadow-lg text-lg font-mono text-center">
                You are already logged in. Please log out to sign up again.
              </div>
            </div>
        );
      }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center bg-gradient-to-r from-amber-600 to-orange-600 min-h-screen">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md relative -translate-y-20">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Become a Chef!</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full mb-3 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Create a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-md hover:scale-105 transition-all duration-300"
            >
             {isLoading ? (
                  <div className="relative w-6 h-6 ml-44">
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-20"></div>
                  </div>
                ) : (
                  "Sign Up"
                )}
            </button>
          </div>
        </div>
      </form>

      <div className="fixed z-30 top-[32rem] left-5">
        <Link href="/" passHref>
          <div className="flex items-center gap-2 shadow-xl rounded-xl px-4 py-2 w-fit cursor-pointer hover:shadow-2xl bg-gradient-to-r from-black/40 to-red-600 hover:from-red-600 hover:to-black/40 hover:scale-105 transition-colors duration-300 ease-in-out">
            <ArrowLeft className="text-white" />
            <span className="text-white font-medium text-lg">Back</span>
          </div>
        </Link>
      </div>

    </>
  );
};

export default SignUp;
