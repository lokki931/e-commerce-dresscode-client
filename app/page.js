'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { allProducts, getAllProductsMemoized } from '@/features/users/productSlice';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './_component/Product';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsMemoized); // Ensure products is an array

  useEffect(() => {
    // Fetch all products when the component is mounted
    dispatch(allProducts()).then(() => setLoading(false)); // Stop loading after fetch
  }, [dispatch]);

  if (loading) {
    return <div>Loading products...</div>; // Handle loading state
  }

  if (!products || products.length === 0) {
    return <div>No products available.</div>; // Handle no products available
  }

  // Sort and slice products
  const heroProducts = [...products].slice(0, 4);
  const hitProducts = [...products].filter((pruduct) => pruduct.hit === true);
  const discountProducts = [...products].filter((pruduct) => pruduct.discount === true);

  return (
    <div className="mb-3">
      <div className="w-full">
        <Swiper
          style={{
            '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper">
          {heroProducts.map((product, index) => (
            <SwiperSlide
              key={product.id + '_' + index}
              style={{ backgroundImage: `url(${product.images[0].url})`, height: '305px' }}
              className="bg-cover bg-center">
              <Link
                href={`collection/${product.id}`}
                className="inline-flex  mt-7 ml-7 bg-slate-400 shadow hover:opacity-80">
                {product.name}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-extrabold mb-3">Hit Products</h2>
        <div className="grid  grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hitProducts?.map((product) => (
            <Product key={product.id + '_hit'} product={product} />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-extrabold mb-3">Discount Products</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {discountProducts?.map((product) => (
            <Product key={product.id + '_discount'} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
