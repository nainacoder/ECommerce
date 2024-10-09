import React from 'react'
import { useSelector } from "react-redux";
import ProductCard from "./ProductCards";
import { useCateogry } from "../api";

const ElectronicsPage:React.FC=()=> {

  useCateogry("electronics")
  const data = useSelector((state:any) => state.state);
 
  return (
    <div style={{ margin: "50px" }}>
      <ProductCard products={data.products} />
    </div>
  );
}

export default ElectronicsPage;
