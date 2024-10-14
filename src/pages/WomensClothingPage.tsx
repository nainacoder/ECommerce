import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCards";
import { useCateogry } from "../api";

const WomensClothingPage: React.FC = () => {
  useCateogry("women's clothing");
  const data = useSelector((state: any) => state.state);

  return (
    <div style={{ margin: "50px" }}>
      <h1>Women's Clothing</h1>
      <ProductCard products={data.products} />
    </div>
  );
};

export default WomensClothingPage;
