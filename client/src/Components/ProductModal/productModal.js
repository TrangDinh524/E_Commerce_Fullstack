import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./productModal.css";
import Rating from "@mui/material/Rating";
import { CiHeart } from "react-icons/ci";
import QuantityBox from "../QuantityBox/quantityBox";

const ProductModal = ({ setIsModalOpen }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const productImages = [
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg",
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-1-202404151052.webp",
    "https://api.spicezgold.com/download/file_1734526995694_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-2-202404151052.jpg",
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg",
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-1-202404151052.webp",
    "https://api.spicezgold.com/download/file_1734526995694_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-2-202404151052.jpg",
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg",
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-1-202404151052.webp",
    "https://api.spicezgold.com/download/file_1734526995694_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-2-202404151052.jpg",
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg",
    "https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-1-202404151052.webp",
    "https://api.spicezgold.com/download/file_1734526995694_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-2-202404151052.jpg",
  ];
  const handleIMageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <Dialog
      open={true}
      className="productModal"
      onClose={() => setIsModalOpen(false)}
    >
      <div className="row">
        <h4 className="mb-0 font-weight-bold">
          KSC "KHATUSHYAM COLLECTION" Red Pu For Women Handheld Bag
        </h4>
        <Button className="close-button" onClick={() => setIsModalOpen(false)}>
          <MdClose />
        </Button>
      </div>

      <div className="row">
        <div className="rating d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Seller:</span>
            <span className="ml-2 mr-4 font-weight-bold">Channel</span>
          </div>
          <Rating value={5} precision={0.5} size="small" readOnly />
        </div>
      </div>

      <hr />
      <div className="row mt-2 product-details">
        <div className="image-container">
          <div className="main-image-container">
            <img
              className="img-fluid main-image"
              src={productImages[selectedImage]}
              alt="product"
            />
          </div>
          {/* Image Slider */}
          <div className="image-slider">
            <div className="slider-container">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`slider-thumbnail ${
                    index === selectedImage ? "active" : ""
                  }`}
                  onClick={() => handleIMageClick(index)}
                >
                  <img
                    src={image}
                    alt={`product-${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product-details-container">
          <div className="d-flex price align-items-center">
            <span className="oldPrice lg mr-2">9.5</span>
            <span className="netPrice lg text-danger">9.5</span>
          </div>
          <span className="badge bg-sucess">IN STOCK</span>
          <p className="productDescription mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="d-flex align-items-center">
            <QuantityBox />
            <Button className="add-to-cart-button">Add to Cart</Button>
          </div>
          <div className="add-wishlist-button mt-3">
            <Button className="add-wishlist-button-btn">
              <CiHeart /> Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
export default ProductModal;
