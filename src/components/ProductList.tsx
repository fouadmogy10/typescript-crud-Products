import { IProduct } from "../interfaces";
import ProductCard from "./ProductCard";

export interface IAppProps {
  data: IProduct[];
  remove:(id:string|undefined)=>void
  edit:(id:string|undefined)=>void
}
const ProductList = ({ data ,remove,edit}: IAppProps) => {
  return (
    <div className="py-5 w-[95%] mx-auto justify-center sm:gap-3 gap-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
      {data?.length > 0 ? (
        data.map((product) => (
          <ProductCard key={product.id} product={product}
          edit={edit}
          remove={remove}
          />
        ))
      ) : (
        <h2>No product Found</h2>
      )}
    </div>
  );
};

export default ProductList;
