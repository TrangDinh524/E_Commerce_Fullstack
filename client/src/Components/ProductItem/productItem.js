import Rating from "@mui/material/Rating";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";

import Button from "@mui/material/Button";
import ProductModal from "../ProductModal/productModal";

const ProductItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const viewProductDetail = (id) => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="item productItem">
        <div className="imgWrapper">
          <img
            src="https://api.spicezgold.com/download/file_1734526995692_zaaliqa-girls-black-handbag-product-images-rvd5gtvjgi-0-202404151052.jpg"
            className="w-100"
          />
          <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button onClick={() => viewProductDetail(1)}>
              <TfiFullscreen />
            </Button>
            <Button>
              <IoMdHeartEmpty style={{ fontSize: "20px" }} />
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>KSC "KHATUSHYAM COLLECTION" Red Pu For Women Handheld Bag</h4>

          <span className="text-success d-block">In stock</span>

          <Rating
            className="mt-2 mb-2"
            name="read-only"
            value={4.456}
            readOnly
            size="small"
            precision={0.5}
          />
          <div className="d-flex">
            <span className="oldPrice">$20.00</span>
            <span className="netPrice text-danger ml-3">$14.00</span>
          </div>
        </div>
      </div>

      {isModalOpen && <ProductModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default ProductItem;
