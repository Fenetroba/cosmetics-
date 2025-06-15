import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../redux/features/productSlice'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import ImageUpload from './ImageUpload'
import { toast } from "sonner";

const Sider = () => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    features: {
      size: ''
    }
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare the product data
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: images // The images array should contain the Cloudinary URLs
      };

      // Dispatch the createProduct action
      const resultAction = await dispatch(createProduct(productData));
      
      if (createProduct.fulfilled.match(resultAction)) {
        toast.success("Product created successfully");
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          brand: '',
          stock: '',
          features: {
            size: ''
          }
        });
        setImages([]);
      } else {
        const errorMessage = resultAction.payload?.message || 'Failed to create product';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          ADD PRODUCT
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-6 font-bold">
        <SheetHeader>
          <SheetTitle className="text-2xl">Add New Product</SheetTitle>
          <SheetDescription>
            Fill in the product details below to add a new product to the store.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">

        <div className="space-y-2">
            <Label>Product Images</Label>
            <ImageUpload onImagesChange={setImages} />
          </div>


          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              value={formData.category}
              onValueChange={(value) => handleChange({ target: { name: 'category', value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skincare">Skincare</SelectItem>
                <SelectItem value="makeup">Makeup</SelectItem>
                <SelectItem value="haircare">Haircare</SelectItem>
                <SelectItem value="fragrance">Fragrance</SelectItem>
                <SelectItem value="bath">Bath</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features.size">Size</Label>
            <Input
              id="features.size"
              name="features.size"
              value={formData.features.size}
              onChange={handleChange}
              placeholder="Enter product size"
              required
            />
          </div>

         

          <Button 
            type="submit" 
            className="w-full bg-primary text-white hover:bg-primary/50 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default Sider