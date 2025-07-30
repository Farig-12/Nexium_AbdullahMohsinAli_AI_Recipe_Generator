const ExamplePrompt = () => {
  return (
    <div className="bg-white/5 border border-white/20 p-6 rounded-xl shadow-md text-white max-w-xl space-y-4 mt-2 ml-4">
      <h3 className="text-lg font-semibold font-mono">Example Prompts</h3>
      <div className="flex flex-wrap gap-3">
        <span className="bg-white/10 px-4 py-2 rounded-full text-sm shadow-xl hover:scale-105 transition-all duration-200 ease-in-out">Eggs, spinach, and mushrooms</span>
        <span className="bg-white/10 px-4 py-2 rounded-full text-sm shadow-xl hover:scale-105 transition-all duration-200 ease-in-out">I have tomatoes, onions, and pasta.</span>
        <span className="bg-white/10 px-4 py-2 rounded-full text-sm shadow-xl hover:scale-105 transition-all duration-200 ease-in-out">Healthy recipe with lentils, kale, and carrots.</span>
        <span className="bg-white/10 px-4 py-2 rounded-full text-sm shadow-xl hover:scale-105 transition-all duration-200 ease-in-out">Vegan recipe with quinoa, chickpeas, and bell peppers.</span>
      </div>
    </div>
  );
};

export default ExamplePrompt;
