import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { IoMdClose, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import "./productModal.css";
import Rating from "@mui/material/Rating";
import QuantityBox from "../QuantityBox/quantityBox";
import { GetProductByID } from "../../services/productsService";

const ProductModal = ({ setIsModalOpen, product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productDetails, setProductDetails] = useState(product);

  const altImg = "https://via.placeholder.com/500x500?text=No+Image";

  useEffect(() => {
    if (product?.id && !productDetails?.product_description) {
      fetchProductDetails(product.id);
    } else {
      setProductDetails(product);
    }
  }, [product]);

  const fetchProductDetails = async (id) => {
    try {
      setLoading(true);
      const response = await GetProductByID(id);
      setProductDetails(response);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImages = () => {
    if (!productDetails?.image) return [];

    try {
      if (typeof productDetails.image === "string") {
        return JSON.parse(productDetails.image);
      }
      return productDetails.image;
    } catch (error) {
      console.error("Error parsing images:", error);
      return [];
    }
  };

  const formatPrice = (price, currency) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "IDR" ? "IDR" : currency === "VND" ? "VND" : "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!productDetails?.initialPrice || !productDetails?.finalPrice) return 0;
    return Math.round(
      (100 * (productDetails.initial_price - productDetails.final_price)) /
        productDetails.initial_price
    );
  };

  const images = getImages();

  if (loading) {
    return (
      <div className="productModal">
        <div className="modalContent">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="productModal">
      <div className="modalContent">
        <div className="modalHeader">
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="modalBody">
          <div className="row">
            <div className="col-md-6">
              <div className="productImages">
                <div className="mainImage">
                  <img
                    src={images[selectedImage] || altImg}
                    alt={productDetails?.title || "Product"}
                    onError={(e) => {
                      e.target.src = altImg;
                    }}
                  />
                </div>
                {images.length > 1 && (
                  <div className="thumbnailImages">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className={selectedImage === index ? "active" : ""}
                        onClick={() => setSelectedImage(index)}
                        onError={(e) => {
                          e.target.src = altImg;
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="productInfo">
                <h2>{productDetails?.title || "Product Title"}</h2>

                {productDetails?.seller_name && (
                  <p className="seller-info">
                    <strong>Sold by:</strong> {productDetails.seller_name}
                    {productDetails?.seller_rating > 0 && (
                      <span className="seller-rating">
                        ⭐ {productDetails.seller_rating.toFixed(1)}
                      </span>
                    )}
                  </p>
                )}

                <div className="product-rating">
                  <span className="rating-value">
                    {productDetails?.rating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="rating-count">
                    ({productDetails?.reviews || 0} reviews)
                  </span>
                </div>

                <div className="price">
                  {productDetails?.initialPrice > 0 &&
                    productDetails?.initialPrice !==
                      productDetails?.finalPrice && (
                      <span className="oldPrice">
                        {formatPrice(
                          productDetails?.initialPrice,
                          productDetails?.currency
                        )}
                      </span>
                    )}
                  <span className="currentPrice">
                    {formatPrice(
                      productDetails?.finalPrice,
                      productDetails?.currency
                    )}
                  </span>
                  {calculateDiscount() > 0 && (
                    <span className="discount">{calculateDiscount()}% OFF</span>
                  )}
                </div>

                <div className="stock">
                  <span
                    className={
                      productDetails?.stock > 0 ? "in-stock" : "out-of-stock"
                    }
                  >
                    {productDetails?.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  {productDetails?.stock > 0 && (
                    <span className="stock-count">
                      {productDetails.stock} available
                    </span>
                  )}
                </div>

                {productDetails?.description && (
                  <div className="description">
                    <h4>Description</h4>
                    <p>{productDetails.product_description}</p>
                  </div>
                )}

                <div className="quantity">
                  <label>Quantity:</label>
                  <QuantityBox />
                </div>

                <div className="actions">
                  <button className="addToCartBtn">Add to Cart</button>
                  <button
                    className="favorieBtn"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductModal;
