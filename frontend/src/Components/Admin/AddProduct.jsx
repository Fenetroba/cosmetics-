import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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

const Sider = () => {
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
      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'features') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append all images
      images.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      // TODO: Add your API call here
      console.log('Form data:', formData);
      console.log('Images:', images);

      // Reset form after successful submission
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
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
            className="w-full bg-primary text-white hover:bg-primary/90"
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