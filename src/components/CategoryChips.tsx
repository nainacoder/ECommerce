import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllProducts } from "../redux/userSlice";
import ProductCard from "../pages/ProductCards";
import { Chip, Stack } from "@mui/material";

function CategoryChips() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeChip, setActiveChip] = useState("All Products");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state:any) => state.state);

  const fetchCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(["All Products", ...json]));
  };

  const fetchProducts = () => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((json) => dispatch(setAllProducts(json)));
  };

  const handleFetchProductsCategory = (category) => {
    if (category === "All Products") {
      fetchProducts();
      navigate(`/home}`);
    } else {
      // fetch(`https://fakestoreapi.com/products/category/${category}`)
      //   .then((res) => res.json())
      //   .then((json) => dispatch(setAllProducts(json)));

      navigate(`/${category}`);
    }
    setActiveChip(category);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
console.log('categories_______', categories)
  return (
    <div style={{ margin: "50px" }}>
      {/* Category Chips Section */}
      
      <Stack direction="row" spacing={1} sx={{ marginBottom: "30px" }}>
        {categories?.map((category, index) => (
          <Chip
            key={index}
            label={category}
            clickable
            onClick={() => handleFetchProductsCategory(category)}
            variant={activeChip === category ? "filled" : "outlined"}
            color={activeChip === category ? "primary" : "default"}
          />
        ))}
      </Stack>
      <ProductCard products={data.products} />
    </div>
  );
}

export default CategoryChips;
