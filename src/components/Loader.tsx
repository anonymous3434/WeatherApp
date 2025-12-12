import React from "react";
import { Cloud, Sun } from "lucide-react";

function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white">
      <div className="flex flex-col items-center">
        {/* Sun + Cloud Animation */}
        <div className="relative">
          <div className="animate-bounce">
            <Sun className="w-24 h-24 text-yellow-300" />
          </div>
          <Cloud className="w-20 h-20 text-white/80 absolute top-8 left-12 animate-pulse" />
        </div>
        <p className="mt-6 text-lg text-white/80 font-medium tracking-wide">
          Fetching the latest weather...
        </p>
      </div>
    </div>
  );
}

export default Loader;
