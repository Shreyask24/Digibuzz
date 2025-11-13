import { useState, useEffect, useRef } from "react";

export default function MultiSelectDropdown() {
  const [options, setOptions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();
  const dropdownRef = useRef(); // 🟢 new ref for detecting outside clicks

  // Simulate async data load
  useEffect(() => {
    setTimeout(() => {
      const data = [
        "React",
        "Next.js",
        "Vue",
        "Angular",
        "Svelte",
        "Tailwind CSS",
        "TypeScript",
        "Node.js",
      ];
      setOptions(data);
      setFiltered(data);
    }, 1000);
  }, []);

  // Filter based on search
  useEffect(() => {
    const result = options.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, options]);

  // 🟢 Detect outside clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Toggle select / unselect
  const handleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
    setSearch("");
    inputRef.current.focus();
  };

  const clearAll = () => setSelected([]);

  return (
    <div className="w-full max-w-md mx-auto" ref={dropdownRef}>
      <div className="bg-gray-900 p-5 rounded-xl text-white shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Select Your Skills</h2>

        {/* Input with Selected Tags */}
        <div className="relative">
          <div
            className="flex flex-wrap items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-text"
            onClick={() => {
              setShowDropdown(true);
              inputRef.current.focus();
            }}
          >
            {/* Selected chips inside input */}
            {selected.map((item) => (
              <span
                key={item}
                className="bg-indigo-600 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {item}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                  className="text-xs hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}

            {/* Search input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm py-1"
            />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <ul className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-48 overflow-y-auto z-10">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect(item)}
                    className={`px-4 py-2 cursor-pointer hover:bg-indigo-600 rounded-md ${
                      selected.includes(item) ? "bg-indigo-700" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">No results found</li>
              )}
            </ul>
          )}
        </div>

        {/* Clear All Button */}
        {selected.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-4 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md text-sm font-medium"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
