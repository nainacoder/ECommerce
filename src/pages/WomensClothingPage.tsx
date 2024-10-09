import React from 'react';
import { useSelector } from "react-redux";
import ProductCard from "./ProductCards";
import { useCateogry } from "../api";

const WomensClothingPage:React.FC=()=> {

  useCateogry("women's clothing")
  const data = useSelector((state:any) => state.state);

console.log('data+++++++',data)
  return (
    <div style={{ margin: "50px" }}>
      <ProductCard products={data.products} />
    </div>
  );
}

export default WomensClothingPage;
