import { useSelector } from "react-redux";
import ProductCard from "./ProductCards";

function WomensClothingPage() {
  const data = useSelector((state) => state.state);
console.log('data+++++++',data)
  return (
    <div style={{ margin: "50px" }}>
      <ProductCard products={data.products} />
    </div>
  );
}

export default WomensClothingPage;
