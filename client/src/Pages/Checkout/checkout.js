import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { selectedItems = [] } = location.state || {};

  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 10;

  const [orderData, setOrderData] = useState({
    shippingInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Vietnam",
    },
    paymentMethod: "credit_card",
    billingAddress: {
      sameAsShipping: true,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Vietnam",
    },
  });

  const handleInputChange = (section, field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBillingToggle = (sameAsShipping) => {
    setOrderData((prev) => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        sameAsShipping,
      },
    }));
  };

  const calculateFinalTotal = () => {
    return subtotal + shipping;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const orderPayload = {
        items: selectedItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          product_title: item.product_title,
          product_image: item.product_image,
        })),
        shipping_info: orderData.shippingInfo,
        billing_info: orderData.billingAddress.sameAsShipping
          ? orderData.shippingInfo
          : orderData.billingAddress,
        payment_method: orderData.paymentMethod,
        subtotal: subtotal,
        shipping: shipping,
        total: calculateFinalTotal(),
      };

      // TODO: Implement order submission API call
      console.log("Order payload:", orderPayload);

      // For now, just show success message
      alert(
        "Order placed successfully! (This is a demo - no actual order was processed)"
      );

      // Redirect to success page or home
      navigate("/");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="checkout-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Checkout</h2>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="row">
            {/* Shipping Information */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h4>Shipping Information</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={orderData.shippingInfo.firstName}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingInfo",
                            "firstName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={orderData.shippingInfo.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingInfo",
                            "lastName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={orderData.shippingInfo.email}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingInfo",
                            "email",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={orderData.shippingInfo.phone}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingInfo",
                            "phone",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={orderData.shippingInfo.address}
                      onChange={(e) =>
                        handleInputChange(
                          "shippingInfo",
                          "address",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={orderData.shippingInfo.city}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingInfo",
                            "city",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="state">State/Province *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={orderData.shippingInfo.state}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingInfo",
                            "state",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="zipCode">ZIP Code *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        value={orderData.shippingInfo.zipCode}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingInfo",
                            "zipCode",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Billing Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h4>Billing Information</h4>
                </div>
                <div className="card-body">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sameAsShipping"
                      checked={orderData.billingAddress.sameAsShipping}
                      onChange={(e) => handleBillingToggle(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sameAsShipping"
                    >
                      Same as shipping address
                    </label>
                  </div>

                  {!orderData.billingAddress.sameAsShipping && (
                    <div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="billingFirstName">First Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="billingFirstName"
                            value={orderData.billingAddress.firstName}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress",
                                "firstName",
                                e.target.value
                              )
                            }
                            required={!orderData.billingAddress.sameAsShipping}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="billingLastName">Last Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="billingLastName"
                            value={orderData.billingAddress.lastName}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress",
                                "lastName",
                                e.target.value
                              )
                            }
                            required={!orderData.billingAddress.sameAsShipping}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="billingAddress">Address *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="billingAddress"
                          value={orderData.billingAddress.address}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress",
                              "address",
                              e.target.value
                            )
                          }
                          required={!orderData.billingAddress.sameAsShipping}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <label htmlFor="billingCity">City *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="billingCity"
                            value={orderData.billingAddress.city}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress",
                                "city",
                                e.target.value
                              )
                            }
                            required={!orderData.billingAddress.sameAsShipping}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label htmlFor="billingState">State/Province *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="billingState"
                            value={orderData.billingAddress.state}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress",
                                "state",
                                e.target.value
                              )
                            }
                            required={!orderData.billingAddress.sameAsShipping}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label htmlFor="billingZipCode">ZIP Code *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="billingZipCode"
                            value={orderData.billingAddress.zipCode}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress",
                                "zipCode",
                                e.target.value
                              )
                            }
                            required={!orderData.billingAddress.sameAsShipping}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="card mb-4">
                <div className="card-header">
                  <h4>Payment Method</h4>
                </div>
                <div className="card-body">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="credit_card"
                      checked={orderData.paymentMethod === "credit_card"}
                      onChange={(e) =>
                        setOrderData((prev) => ({
                          ...prev,
                          paymentMethod: e.target.value,
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      Credit Card
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      value="paypal"
                      checked={orderData.paymentMethod === "paypal"}
                      onChange={(e) =>
                        setOrderData((prev) => ({
                          ...prev,
                          paymentMethod: e.target.value,
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="cod"
                      checked={orderData.paymentMethod === "cod"}
                      onChange={(e) =>
                        setOrderData((prev) => ({
                          ...prev,
                          paymentMethod: e.target.value,
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h4>Order Summary</h4>
                </div>
                <div className="card-body">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div className="d-flex align-items-center">
                        {/* <img
                          src={item.product_image}
                          alt={item.product_title}
                          className="checkout-item-image"
                        /> */}
                        <div className="ml-2">
                          <h6 className="mb-0">{item.product_title}</h6>
                          <small className="text-muted">
                            Qty: {item.quantity}
                          </small>
                        </div>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)} (Estimated)</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong>${calculateFinalTotal().toFixed(2)}</strong>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </button>

                  <Link
                    to="/cart"
                    className="btn btn-outline-secondary w-100 mt-2"
                  >
                    Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Checkout;
