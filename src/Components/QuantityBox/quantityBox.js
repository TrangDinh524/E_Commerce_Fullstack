import { useState } from "react";
import Button from "@mui/material/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./quantityBox.css";

const QuantityBox = () => {
  const [inputValue, setInputValue] = useState(1);

  const minus = () => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1);
    }
  };
  const plus = () => {
    setInputValue(inputValue + 1);
  };
  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <FaMinus />
      </Button>
      <input type="number" value={inputValue} />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
