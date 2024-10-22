'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getByIdProducts } from '@/features/slices/productSlice';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Button } from '@/components/ui/button';

const CollectionSiglePage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.product?.product);
  useEffect(() => {
    if (id) {
      dispatch(getByIdProducts(id));
    }
  }, [dispatch, id]);

  return (
    <div className="grid sm:grid-cols-[45%_1fr] gap-5 mb-10">
      <div>
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mb-2">
          {product?.images?.map((img) => (
            <SwiperSlide key={'img_key' + img.id}>
              <img src={img.url} alt={'product img' + img.id} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper">
          {product?.images?.map((img) => (
            <SwiperSlide key={'img_key_thumb' + img.id}>
              <img src={img.url} alt={'product thumb img' + img.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
        <div className="inline-flex gap-3 my-2 items-baseline">
          <span>Stock: {product?.stock}</span>
          <span>Price: {product?.price}$</span>
          <Button type="button" variant="outline">
            Add to cart
          </Button>
        </div>
        {product?.categories?.length > 0 && (
          <div className="inline-flex gap-3">
            <div className="font-semibold">Categories:</div>
            {product?.categories?.map((cat, index, arr) => {
              return (
                <div key={'category_' + cat.id}>
                  {cat.name}
                  {arr.length !== index + 1 ? ',' : ''}
                </div>
              );
            })}
          </div>
        )}
        <p className="my-2">{product?.description}</p>
      </div>
    </div>
  );
};
export default CollectionSiglePage;
