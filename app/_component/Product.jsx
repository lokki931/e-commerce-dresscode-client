'use client';

import Link from 'next/link';

const Product = ({ product }) => {
  const { name, id, price, discount, hit } = product;
  return (
    <div className="shadow-sm flex flex-col items-start p-2 relative">
      <div className="absolute right-2 top-2 inline-flex gap-1">
        {hit && <span className="border px-2 py-1 bg-black text-cyan-50">HIT</span>}
        {discount && <span className="border px-2 py-1 bg-black text-cyan-50">SALE</span>}
      </div>
      <img className="grow" src={product.images[0].url} alt={name + ' product'} />
      <p className="my-2 truncate w-full">{name}</p>
      <p className="my-2">${price}</p>
      <Link href={`collection/${id}`} className="border py-1 px-2 rounded-sm hover:border-white">
        Detail
      </Link>
    </div>
  );
};

export default Product;
