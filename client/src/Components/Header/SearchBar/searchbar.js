import { IoSearch } from "react-icons/io5";
import Button from "@mui/material/Button";

const SearchBar = () => {
  return (
    <div className="searchbar ml-3 mr-3">
      <input type="text" placeholder="Search for products..." />
      <Button className="button">
        <IoSearch />
      </Button>
    </div>
  );
};
export default SearchBar;
