export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-600 to-orange-600 text-white">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-white opacity-20"></div>
      </div>
      <h1 className="text-2xl font-semibold animate-pulse tracking-wide">
        Cooking...
      </h1>
    </div>
  );
}
