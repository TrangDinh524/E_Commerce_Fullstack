import { IoSearch } from "react-icons/io5";
import Button from "@mui/material/Button";
import { useState } from "react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`searchbar ml-3 mr-3 ${isFocused ? "focused" : ""}`}>
      <input
        type="text"
        placeholder="Search for products..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Button className="search-button">
        <IoSearch />
      </Button>
    </div>
  );
};

export default SearchBar;
