import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty, IoMdArrowBack } from "react-icons/io";
import { GetProductByID } from "../../services/productsService";
import QuantityBox from "../../Components/QuantityBox/quantityBox";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "./product.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const altImg = "https://via.placeholder.com/500x500?text=No+Image";

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await GetProductByID(productId);
      console.log("response", response);
      console.log("response.product", response.product);
      setProductDetails(response.product || response);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching product details:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImages = () => {
    console.log("image", productDetails?.image);
    if (!productDetails?.image) return [];

    try {
      console.log("typeof", typeof productDetails.image);
      if (typeof productDetails.image === "string") {
        return JSON.parse(productDetails.image);
      }
      return productDetails.image;
    } catch (error) {
      console.error("Error parsing images:", error);
      return [];
    }
  };

  const getVideos = () => {
    console.log("video", productDetails?.video);
    if (!productDetails?.video) return [];

    try {
      console.log("typeof video", typeof productDetails.video);
      if (typeof productDetails.video === "string") {
        return JSON.parse(productDetails.video);
      }
      return productDetails.video;
    } catch (error) {
      console.error("Error parsing videos:", error);
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
    if (!productDetails?.initial_price || !productDetails?.final_price)
      return 0;
    return Math.round(
      (100 * (productDetails.initial_price - productDetails.final_price)) /
        productDetails.initial_price
    );
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", { productId: id, quantity });
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading Product</h4>
            <p>{error}</p>
            <hr />
            <Button
              variant="contained"
              onClick={() => fetchProductDetails(id)}
              className="me-2"
            >
              Try Again
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const images = getImages();
  const videos = getVideos();

  return (
    <div className="product-page">
      <div className="container py-4">
        <div className="row">
          {/* Product Images and Videos */}
          <div className="col-md-6">
            <div className="product-media">
              <div className="main-media">
                {videos.length > 0 && selectedImage < videos.length ? (
                  <video
                    src={videos[selectedImage]}
                    controls
                    className="img-fluid"
                    style={{ maxHeight: "500px", width: "100%" }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={images[selectedImage - videos.length] || altImg}
                    alt={productDetails.title || "Product"}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = altImg;
                    }}
                  />
                )}
              </div>

              {/* Media thumbnails */}
              {(images.length > 1 || videos.length > 0) && (
                <div className="media-thumbnails mt-3">
                  {/* Video thumbnails */}
                  {videos.map((video, index) => (
                    <div
                      key={`video-${index}`}
                      className={`media-thumbnail video-thumbnail ${
                        selectedImage === index ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <video
                        src={video}
                        muted
                        className="thumbnail-video"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                      />
                      <div className="play-icon">▶</div>
                    </div>
                  ))}

                  {/* Image thumbnails */}
                  {images.map((image, index) => (
                    <img
                      key={`image-${index}`}
                      src={image}
                      alt={`Product ${index + 1}`}
                      className={`media-thumbnail image-thumbnail ${
                        selectedImage === index + videos.length ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(index + videos.length)}
                      onError={(e) => {
                        e.target.src = altImg;
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <div className="product-info">
              <h1 className="product-title">{productDetails.title}</h1>

              {productDetails.seller_name && (
                <div className="seller-info mb-3">
                  <p className="mb-1">
                    <strong>Sold by:</strong> {productDetails.seller_name}
                  </p>
                  {productDetails.seller_rating > 0 && (
                    <div className="seller-rating">
                      <Rating
                        value={productDetails.seller_rating}
                        readOnly
                        size="small"
                        precision={0.1}
                      />
                      <span className="ms-2">
                        {productDetails.seller_rating.toFixed(1)} seller rating
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="product-rating mb-3">
                <Rating
                  value={productDetails.rating || 0}
                  readOnly
                  precision={0.1}
                />
                <span className="ms-2">
                  {productDetails.rating?.toFixed(1) || "0.0"} (
                  {productDetails.reviews || 0} reviews)
                </span>
              </div>

              <div className="price-section mb-3">
                {productDetails.initial_price > 0 &&
                  productDetails.initial_price !==
                    productDetails.final_price && (
                    <div className="old-price">
                      {formatPrice(
                        productDetails.initial_price,
                        productDetails.currency
                      )}
                    </div>
                  )}
                <div className="current-price">
                  {formatPrice(
                    productDetails.final_price,
                    productDetails.currency
                  )}
                </div>
                {calculateDiscount() > 0 && (
                  <div className="discount-badge">
                    {calculateDiscount()}% OFF
                  </div>
                )}
              </div>

              <div className="stock-info mb-3">
                <span
                  className={`stock-status ${
                    productDetails.stock > 0 ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                {productDetails.stock > 0 && (
                  <span className="stock-count ms-2">
                    ({productDetails.stock} available)
                  </span>
                )}
              </div>

              {productDetails.product_description && (
                <div className="description mb-4">
                  <h4>Description</h4>
                  <p>{productDetails.product_description}</p>
                </div>
              )}

              <div className="quantity-section mb-4">
                <label className="form-label">Quantity:</label>
                <QuantityBox />
              </div>

              <div className="actions">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddToCart}
                  disabled={productDetails.stock === 0}
                  className="me-3"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                  {isFavorite ? " Remove from Wishlist" : " Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
