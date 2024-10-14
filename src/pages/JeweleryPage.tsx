import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCards";
import { useCateogry } from "../api";

function JeweleryPage() {
  useCateogry("jewelery");
  const data = useSelector((state: any) => state.state);
  return (
    <div style={{ margin: "50px" }}>
      <h1>Jewelery</h1>
      <ProductCard products={data.products} />
    </div>
  );
}

export default JeweleryPage;
