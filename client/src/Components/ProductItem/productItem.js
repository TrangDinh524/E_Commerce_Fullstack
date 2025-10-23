import Rating from "@mui/material/Rating";
import { TfiFullscreen, TfiShoppingCart } from "react-icons/tfi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ProductModal from "../ProductModal/productModal";
import { addToCart } from "c:/Users/dinht/Documents/Ecommerce Project/client/src/services/cartService";

const ProductItem = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();
  const altImage = "https://via.placeholder.com/300x300?text=No+Image";

  const viewProductDetail = (id) => {
    setIsModalOpen(true);
  };
  // Format price
  const formatPrice = (price, currency) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "IDR" ? "IDR" : currency === "VND" ? "VND" : "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get first image from image array
  const getFirstImage = (imageData) => {
    if (!imageData) return altImage;

    try {
      return imageData || altImage;
    } catch (error) {
      console.log("error parsing image data", error);
      return altImage;
    }
  };

  const handleProductClick = (e) => {
    if (e.target.closest(".actions")) {
      return;
    }
    navigate(`/products/${product?.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!product?.id) return;

    try {
      setAddingToCart(true);
      await addToCart(product.id, 1);
      // toast
    } catch (error) {
      console.error("Error adding to Cart: ", error);
      // toast
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <>
      <div className="item productItem" onClick={handleProductClick}>
        <div className="imgWrapper">
          <img
            src={getFirstImage(product?.image)}
            className="w-100"
            alt={product?.title || "Product"}
            onError={(e) => {
              e.target.src = altImage;
            }}
          />
          {(product?.initial_price > 0) &
            (product?.initial_price !== product?.final_price) && (
            <span className="badge badge-primary">
              {Math.round(
                (100 * (product?.initial_price - product?.final_price)) /
                  product?.initial_price
              )}
              %
            </span>
          )}
          <div className="actions">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                viewProductDetail(product?.id);
              }}
            >
              <TfiFullscreen />
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={addingToCart || product?.stock === 0}
              color="primary"
            >
              {addingToCart ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <TfiShoppingCart />
              )}
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>{product?.title || "Product Title"}</h4>

          <span
            className={`d-block ${
              product?.stock > 0 ? "text-success" : "text-danger"
            }`}
          >
            {product?.stock > 0 ? "In stock" : "Out of stock"}
          </span>

          <Rating
            className="mt-2 mb-2"
            name="read-only"
            value={product?.rating || 0}
            readOnly
            size="small"
            precision={0.5}
          />
          <div className="d-flex">
            {product?.initial_price > 0 &&
              product?.initial_price !== product?.final_price && (
                <span className="oldPrice">
                  {formatPrice(product.initial_price, product.currency)}
                </span>
              )}
            <span className="netPrice text-danger ml-3">
              {formatPrice(product.final_price, product.currency)}
            </span>
          </div>
          {/* {product?.seller_name && (
            <div className="seller-info mt-2">
              <small className="text-muted">
                Sold by: {product.seller_name}
              </small>
            </div>
          )} */}
        </div>
      </div>

      {isModalOpen && <ProductModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default ProductItem;
