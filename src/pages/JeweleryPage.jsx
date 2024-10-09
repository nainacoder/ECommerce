import { useSelector } from "react-redux";
import ProductCard from "../pages/ProductCards";

function JeweleryPage() {
  const data = useSelector((state) => state.state);

  return (
    <div style={{ margin: "50px" }}>
      <ProductCard products={data.products} />
    </div>
  );
}

export default JeweleryPage;
