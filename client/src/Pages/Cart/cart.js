import "./cart.css";
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import QuantityBox from "../../Components/QuantityBox/quantityBox";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { getCart } from "../../services/cartService";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const cart = await getCart();
        setCart(cart.cart);
        setSelectedItems(cart.cart.map((item) => item.id));
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleItemSelection = (itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const calculateSelectedTotal = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    const selectedCartItems = cart.filter((item) =>
      selectedItems.includes(item.id)
    );
    if (selectedCartItems.length === 0) {
      alert("Please select at least one item to checkout");
      return;
    }

    navigate("/checkout", {
      state: {
        selectedItems: selectedCartItems,
      },
    });
  };

  const subtotal = calculateSelectedTotal();
  const shipping_fee = 10;
  const total = subtotal + shipping_fee;

  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <h2 className="hd mb-4 mt-4"> Your Cart</h2>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="selectAll"
                    checked={
                      selectedItems.length === cart.length && cart.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                  <label className="form-check-label" htmlFor="selectAll">
                    Select All ({selectedItems.length} items)
                  </label>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th width="5%">Select</th>
                      <th width="35%">Product</th>
                      <th className="text-center">Unit Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleItemSelection(item.id)}
                            className="form-check-input"
                          />
                        </td>
                        <td>
                          <Link to={`/products/${item.product_id}`}>
                            <div className="d-flex align-items-center cartItemImgWrapper mr-3">
                              <div className="imgWrapper">
                                <img
                                  src={item.product_image}
                                  alt="product_img"
                                  className="w-100"
                                />
                              </div>
                              <div className="info px-3">
                                <h6>{item.product_title}</h6>
                                <Rating
                                  name="read-only"
                                  value={item.product_rating}
                                  readOnly
                                  precision={0.5}
                                  size="small"
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="text-center">${item.price}</td>
                        <td className="text-center">
                          <div className="d-flex align-items-center mr-3">
                            <QuantityBox
                              quantity={item.quantity}
                              onQuantityChange={(newQuantity) =>
                                handleQuantityChange(item.id, newQuantity)
                              }
                            />
                          </div>
                        </td>
                        <td className="text-center">
                          ${item.price * item.quantity}
                        </td>
                        <td className="text-center">
                          <span
                            className="remove"
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <IoIosClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border p-3 cartSummary">
                <h4 className="card-title">Cart Summary</h4>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Subtotal</span>
                  <span className="ml-auto text-red">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Shipping</span>
                  <span>${shipping_fee}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Estimate for</span>
                  <span className="ml-auto">Vietnam</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total</span>
                  <span className="ml-auto text-red">${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                  >
                    <Link to="/checkout">Checkout</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Cart;
