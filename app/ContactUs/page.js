import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const ContactUs = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-amber-700 to-red-700 min-h-screen text-white px-8 py-12">
        
        <h1 className="text-3xl font-bold text-center font-mono mb-8">Contact Us</h1>

        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
          <p>
            We would love to hear from you - whether it is feedback, suggestions, or just a hello!
          </p>

          <p>
            This project was built by a passionate learner who combined AI and creativity to make recipe generation smart and fun. If you have any questions about my work or want to collaborate, feel free to reach out.
          </p>

          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-md space-y-4 mt-8">
            <div>
              <span className="font-semibold">📧 Email:</span>
              <p>abdullahmohsin4132@gmail.com</p>
            </div>
            <div>
              <span className="font-semibold">🔗 GitHub:</span>
              <a href="https://github.com/your-repo-url" target="_blank" className="underline text-white hover:text-gray-400">
                github.com/your-repo-url
              </a>
            </div>
          </div>

          <p className="text-center text-white/60 italic mt-10">
            "From idea to innovation - we are cooking up something awesome."
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

export default ContactUs