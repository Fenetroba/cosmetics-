import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/productSlice";
import { addToCart } from "../../redux/features/cartSlice";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Recommend_producrt = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null);
  const productsPerPage = 2;

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

  // Calculate pagination
  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get all products for desktop view
  const desktopProducts = products?.slice(0, 5);

  return (
    <motion.div ref={ref} className="mb-30 bg-[var(--two)]">
      <h1 className="text-[var(--six)] font-extrabold text-3xl p-7">
        RECOMMENDED FOR YOU
      </h1>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-4 p-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 2 }).map((_, index) => (
              <Card key={index} className="overflow-hidden w-[250px]">
                <div className="animate-pulse">
                  <div className="h-38 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </Card>
            ))
          ) : currentProducts?.length > 0 ? (
            currentProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-[250px] mx-auto"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-38 object-cover"
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
                      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                      <Badge variant="secondary" className="capitalize text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">
                        {product.price.toFixed(2)} Birr
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

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="overflow-hidden w-[250px]">
                <div className="animate-pulse">
                  <div className="h-38 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </Card>
            ))
          ) : desktopProducts?.length > 0 ? (
            desktopProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-[250px] mx-auto"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-38 object-cover"
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
                      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                      <Badge variant="secondary" className="capitalize text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">
                        {product.price.toFixed(2)} Birr
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
      </div>
    </motion.div>
  );
};

export default Recommend_producrt;