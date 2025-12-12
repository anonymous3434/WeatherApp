import React from "react";
import { Search } from "lucide-react";
type CityProp = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
};
function SearchBar({ city, setCity }: CityProp) {
  return (
    <div className="flex items-center justify-between bg-white/20 rounded-full px-4 py-2 mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="bg-transparent w-full text-white placeholder-white/70 focus:outline-none"
      />
      <Search className="text-white" />
    </div>
  );
}

export default SearchBar;
