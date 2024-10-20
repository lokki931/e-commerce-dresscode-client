'use client';

import { allCats, getAllCategoriesMemoized } from '@/features/users/categorySlice';
import { allProducts, getAllProductsMemoized } from '@/features/users/productSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../_component/Product';
import { Input } from '@/components/ui/input';

const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsMemoized);
  const categories = useSelector(getAllCategoriesMemoized);

  useEffect(() => {
    dispatch(allProducts()).then(() => setLoading(false));
    dispatch(allCats());
  }, [dispatch]);

  if (loading) {
    return <div>Loading products...</div>; // Handle loading state
  }

  if (!products || products.length === 0) {
    return <div>No products available.</div>; // Handle no products available
  }
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((cat) => cat !== categoryId) : [...prev, categoryId],
    );
  };

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        product.categories.some((category) => selectedCategories.includes(category.id)),
    )
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="grid sm:grid-cols-[15%_1fr] gap-5">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Filter</h3>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className=""
        />
        <div className="flex flex-col max-sm:inline-flex max-sm:items-baseline max-sm:flex-row max-sm:flex-wrap gap-3">
          <h3 className="text-md font-semibold">Categories: </h3>
          {/* Category Checkboxes */}
          {categories?.map((category) => (
            <div key={'categoryKey_' + category.id} className="inline-flex gap-2 items-baseline">
              <input
                id={'category_' + category.id}
                type="checkbox"
                value={category.id}
                onChange={() => handleCategoryChange(category.id)}
                checked={selectedCategories.includes(category.id)}
              />
              <label htmlFor={'category_' + category.id}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts?.map((product) => (
          <Product key={'product_' + product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Collection;
