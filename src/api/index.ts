import { useEffect } from "react";
import { setAllProducts } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export function useCateogry(category: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => dispatch(setAllProducts(json)));
  }, []);
}
