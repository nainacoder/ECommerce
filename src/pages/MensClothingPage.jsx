import { useSelector } from "react-redux";
import ProductCard from "./ProductCards";

function MensClothingPage() {
  const data = useSelector((state) => state.state);

  return (
    <div style={{ margin: "50px" }}>
      <ProductCard products={data.products} />
    </div>
  );
}

export default MensClothingPage;
