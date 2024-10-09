import { useSelector } from "react-redux";
import ProductCard from "./ProductCards";

function ElectronicsPage() {
  const data = useSelector((state) => state.state);
console.log(data,'data_____')
  return (
    <div style={{ margin: "50px" }}>
      <ProductCard products={data.products} />
    </div>
  );
}

export default ElectronicsPage;
