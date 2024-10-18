'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { allProducts, getAllProductsMemoized } from '@/features/users/productSlice';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const heroProducts = products.slice(0, 4);

  return (
    <div className="">
      <div className="w-full h-64">
        <Swiper
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
              <p className="inline-flex  mt-7 ml-7 bg-slate-400 shadow">{product.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
