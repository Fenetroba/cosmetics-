import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/productSlice";
import { addToCart } from "../../redux/features/cartSlice";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Recommend_producrt = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Filter products to show only those with high ratings or discounts
  const recommendedProducts = products?.slice(0, 5); // Show first 5 products

  return (
    <motion.div ref={ref} className="mb-30 bg-[var(--two)]">
      <h1 className="text-[var(--six)] font-extrabold text-3xl p-7">
        RECOMMENDED FOR YOU
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5.5">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </Card>
          ))
        ) : recommendedProducts?.length > 0 ? (
          recommendedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute top-2 right-2"
                    >
                      {product.discount}% OFF
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Badge variant="secondary" className="capitalize">
                      {product.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.ratings?.average > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">
                          {product.ratings.average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => {
                      dispatch(addToCart({ productId: product._id, quantity: 1 }));
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-[var(--six)]">No recommended products found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Recommend_producrt;