import React, { useState } from 'react'
import { Slider } from "@/Components/ui/slider"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Button } from "@/Components/ui/button"

export function Righit_filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    categories: [],
    brands: [],
    sortBy: 'newest'
  });

  const handlePriceChange = (value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleSortChange = (value) => {
    setFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 1000],
      categories: [],
      brands: [],
      sortBy: 'newest'
    });
    onFilterChange({
      priceRange: [0, 1000],
      categories: [],
      brands: [],
      sortBy: 'newest'
    });
  };

  return (
    <div className="max-sm:w-full p-4 space-y-17 shadow-amber-950 shadow sm:bg-white">
      <div className="space-y-4 ">
        <h3 className="text-lg font-semibold">Price Range</h3>
        <div className="space-y-2 cursor-pointer">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.priceRange[0]} Birr</span>
            <span>{filters.priceRange[1]} Birr</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="space-y-2">
          {['skincare', 'makeup', 'haircare', 'fragrance', 'bath', 'tools'].map((category) => (
            <div key={category} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sort By</h3>
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="cursor-pointer">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2">
        <Button 
          onClick={handleApplyFilters}
          className="flex-1 text-white hover:bg-primary/90 bg-[var(--two)] cursor-pointer"
        >
          Apply Filters
        </Button>
        <Button 
          onClick={handleReset}
          variant="outline"
          className="flex-1 cursor-pointer"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Righit_filter