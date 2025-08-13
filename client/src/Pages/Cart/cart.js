import "./cart.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import QuantityBox from "../../Components/QuantityBox/quantityBox";
import { IoIosClose } from "react-icons/io";

const Cart = () => {
  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="hd mb-4 mt-4"> Your Cart</h2>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th className="text-center">Unit Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper mr-3">
                            <div className="imgWrapper">
                              <img
                                src="https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg"
                                alt="product_img"
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3">
                              <h6>Zaaliqa Girls Black Handbag</h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="small"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center mr-3">
                          <QuantityBox />
                        </div>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <span className="remove">
                          <IoIosClose />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper">
                            <div className="imgWrapper">
                              <img
                                src="https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg"
                                alt="product_img"
                                className="w-100"
                              />
                            </div>
                            <div className="info">
                              <h6>Zaaliqa Girls Black Handbag</h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="small"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center">
                          <QuantityBox />
                        </div>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <span className="remove">
                          <IoIosClose />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper mr-3">
                            <div className="imgWrapper">
                              <img
                                src="https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg"
                                alt="product_img"
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3">
                              <h6>Zaaliqa Girls Black Handbag</h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="small"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center mr-3">
                          <QuantityBox />
                        </div>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <span className="remove">
                          <IoIosClose />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper mr-3">
                            <div className="imgWrapper">
                              <img
                                src="https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg"
                                alt="product_img"
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3">
                              <h6>Zaaliqa Girls Black Handbag</h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="small"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center mr-3">
                          <QuantityBox />
                        </div>
                      </td>
                      <td className="text-center">$7.25</td>
                      <td className="text-center">
                        <span className="remove">
                          <IoIosClose />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border p-3 cartSummary">
                <h4 className="card-title">Cart Summary</h4>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Subtotal</span>
                  <span className="ml-auto text-red">$7.25</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Estimate for</span>
                  <span className="ml-auto">Vietnam</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total</span>
                  <span className="ml-auto text-red">$7.25</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <button className="btn btn-primary w-100">
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
