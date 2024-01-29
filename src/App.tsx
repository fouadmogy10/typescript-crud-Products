import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { categories, colors, formInputsList, productList } from "./data/dummy";
import { IProduct,ICategory } from "./interfaces";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import CircleColor from "./components/CircleColor";
import Select from "./components/ui/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import ErrorMessage from "./components/errorMsg";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const productSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  imageURL: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
  price: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Invalid price format")
    .required("Price is required"),
  colors: Yup.array().of(Yup.string()),
  category: Yup.object().shape({
    name: Yup.string(),
    imageURL: Yup.string(),
  }),
});
export default function App() {
  const initialValues: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      id: "",
      name: "",
      imageURL: "",
    },
  };

  const [Products, setProducts] = useState<IProduct[]>(productList);
  let [isOpen, setIsOpen] = useState(false);
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(categories[0]);
  const [editProductId, setEditProductId] = useState<string |undefined>("");

 
  function openModal() {
    setIsOpen(true);
  }

  const editProductHandler = (id: string | undefined) => {
    const productToEdit = Products.find((product) => product.id === id);
    console.log(productToEdit);
    
    if (productToEdit) {
      formik.setValues(productToEdit);
      setTempColor(productToEdit.colors || []);
      setSelectedCategory(productToEdit.category || categories[0]);
      setEditProductId(id || null ||undefined);
      openModal();
    }
  };
  const submitHandler = (values: IProduct) => {
    const updatedProducts = [...Products];
    const existingProductIndex = updatedProducts.findIndex(
      (product) => product.id === editProductId
    );

    if (existingProductIndex !== -1) {
      // Edit existing product
      updatedProducts[existingProductIndex] = { ...values, id: editProductId };
    } else {
      // Add new product
      updatedProducts.unshift({ ...values, id: uuidv4() });
    }

    setProducts(updatedProducts);
    setTempColor([])
    toast.success(editProductId ? "Product updated!" : "Product added!");
    closeModal();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit:submitHandler
  });

  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col mb-2" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        placeholder={input.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[input.name]}
      />
      {formik.touched[input.name] && formik.errors[input.name] && (
        <ErrorMessage msg={formik.errors[input.name]} />
      )}
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        // if (productToEdit.colors.includes(color)) {
        //   setTempColor(prev => prev.filter(item => item !== color));
        //   return;
        // }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));
  const removeProductHandler = (id: string  | undefined) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = Products.filter((product) => product.id !== id);
    setProducts(filtered);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      
      }
    });
    
   
  };


  const closeModal = () => {
    setEditProductId("");
    setTempColor([])
    setIsOpen(false);
    formik.resetForm();
  };

  useEffect(() => {
    formik.values.colors = tempColors;
    formik.values.category = selectedCategory;
  }, [tempColors, selectedCategory]);

  return (
    <div className="min-h-screen">
      <div className="flex sm:justify-between justify-center items-center p-5 flex-wrap gap-3">
        <span className="text-4xl font-bold">
          Latest <span className="text-secondary">Product</span>
        </span>
        <Button className="max-w-[210px] btn" onClick={openModal}>
          Add New Product
        </Button>
      </div>
      <ProductList data={Products} remove={removeProductHandler} edit={editProductHandler} />
      <Modal
        title={editProductId ? "Edit Product" : "Add New Product"}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <form onSubmit={formik.handleSubmit}>
          {renderFormInputList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center flex-wrap space-x-1 my-2">{renderProductColors}</div>
          <div className="flex items-center flex-wrap space-x-1  ">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex mt-5 gap-2 ">
            <Button className="btn" type="submit">
              {editProductId ? "Update" : "Submit"}
            </Button>
            <Button className="btn-danger" type="button" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* remove modal */}
    </div>
  );
}
