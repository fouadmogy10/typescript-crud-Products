import { IProduct } from "../interfaces";
import Image from "./ui/Image";
import Button from "./ui/Button";

export interface IAppProps {
  product: IProduct;
  remove:(id:string|undefined)=>void
  edit:(id:string|undefined)=>void
  
}
const ProductCard = ({ product ,remove,edit}: IAppProps) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden border-2 border-gray-100 shadow-lg flex flex-col  ">
      <div className="shrink-0">
        <Image
          url={product.imageURL}
          className={" h-52  mt-2 mx-auto object-contain  rounded-lg"}
        />
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="px-6 min-h-[10px]">
        {product?.colors?.map((color) => (
          <span
            key={color}
            className="inline-block rounded-full p-2 text-sm font-semibold text-gray-700 mr-2"
            style={{ backgroundColor: `${color}` }}
          ></span>
        ))}
      </div>
      <div className="px-6 pt-2 pb-2 flex justify-between items-center gap-2 flex-wrap">
        <span className="rounded-full text-sm font-extrabold text-secondary mr-2">
          ${product.price}
        </span>
        <span className="flex items-center gap-1 text-sm font-extrabold  ">
          <Image
            url={product.category.imageURL}
            className={"rounded-full w-[30px] h-[30px]"}
          />
          {product.category.name}
        </span>
      </div>
      <span className="grow"></span>
      <div className="pb-2 mx-2 flex justify-center gap-2">
        <Button className="btn" onClick={()=>edit(product.id)}>Edit</Button>
        <Button className="btn-danger" onClick={()=>remove(product.id)}>Remove</Button>
      </div>
    </div>
  );
};

export default ProductCard;
