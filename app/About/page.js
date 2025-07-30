import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-amber-700 to-red-700 min-h-screen text-white px-8 py-12">
        
        <h1 className="text-3xl font-bold text-center font-mono mb-8">About Us</h1>

        <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
          <p>
            Welcome to <span className="logo-font text-2xl">Cook-It!</span> - your intelligent cooking companion. This project was created with the goal of making recipe generation smarter, easier, and more personalized.
          </p>

          <p>
            At the heart of Cook-It! is a powerful AI engine that generates unique recipes based on ingredients <strong>you already have.</strong> Just enter what's in your kitchen, and Cook-It! will suggest creative, tasty recipes in seconds.
          </p>

          <p>
            This platform was built as part of our task-based learning journey, combining creativity with technology. It showcases how modern tools like <strong>OpenAI, Supabase, and React</strong> can come together to build real-world applications that solve real problems.
          </p>

          <p>
            Whether you're a beginner or an aspiring chef, Cook-It! helps you explore the joy of cooking while learning about AI and modern web development.
          </p>

          <p className="text-center text-white/70 italic mt-10">
            "Good food starts with good ideas — and now, good AI."
          </p>
        </div>
      </div>

      <div className="fixed z-30 top-[32rem] left-5">
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

export default About