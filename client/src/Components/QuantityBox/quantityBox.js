import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./quantityBox.css";

const QuantityBox = ({ quantity, onQuantityChange }) => {
  const [inputValue, setInputValue] = useState(quantity || 1);

  useEffect(() => {
    setInputValue(quantity || 1);
  }, [quantity]);

  const minus = () => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1);
      onQuantityChange && onQuantityChange(inputValue - 1);
    }
  };
  const plus = () => {
    setInputValue(inputValue + 1);
    onQuantityChange && onQuantityChange(inputValue + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1) {
      setInputValue(value);
      onQuantityChange && onQuantityChange(value);
    }
  };
  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <FaMinus />
      </Button>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min="1"
      />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
