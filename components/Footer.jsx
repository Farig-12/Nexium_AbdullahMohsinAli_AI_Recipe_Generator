
import { ChefHat } from "lucide-react"
const Footer = () => {
  return (   
    <footer className= "bg-gradient-to-r from-amber-800 to-red-800 text-white py-6 text-center shadow-inner text-sm">
      <div className="mb-1 font-semibold tracking-wide flex gap-2 justify-center">
        <div className="flex gap-1">
              <ChefHat size={30} />
              <span className="logo-font text-[1.5rem] translate-y-[6px]">Cook-It</span>
        </div> 
        <span className="translate-y-2.5">Your AI-Powered Culinary Companion</span>
      </div>
      <p className="text-white/80">
        Built with care by a passionate developer as part of my AI project task.
      </p>
      <p className="text-white/60 mt-2 text-xs">
        &copy; {new Date().getFullYear()} Cook-It! All rights reserved.
      </p>
    </footer>  
  )
}

export default Footer