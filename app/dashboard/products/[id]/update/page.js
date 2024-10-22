'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { allCats } from '@/features/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { updateProducts, getByIdProducts } from '@/features/slices/productSlice';
import { toast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';

const UpdateProductForm = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.categories?.all);
  const product = useSelector((state) => state.products?.product?.product);

  useEffect(() => {
    if (id) {
      dispatch(getByIdProducts(id));
    }
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      discount: product?.discount || false,
      hit: product?.hit || false,
      images: [],
      categories: product?.categories?.map((cat) => cat.id) || [],
    },
    enableReinitialize: true, // This will reset the form with new values when the product is loaded
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      description: Yup.string().required('Description is required'),
      price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
      stock: Yup.number().min(0, 'Stock must be positive').required('Stock is required'),
      images: Yup.array(),
      categories: Yup.array().min(1, 'At least one category is required'),
    }),
    onSubmit: async (values) => {
      const appForm = new FormData();
      appForm.append('name', values.name);
      appForm.append('description', values.description);
      appForm.append('price', values.price);
      appForm.append('stock', values.stock);
      appForm.append('discount', values.discount);
      appForm.append('hit', values.hit);

      values.categories.forEach((category) => {
        appForm.append('categories[]', category); // Append categories properly
      });

      values.images.forEach((image) => {
        appForm.append('images[]', image); // Append new images properly
      });

      const result = await dispatch(updateProducts({ id, data: appForm }));

      if (updateProducts.rejected.match(result)) {
        toast({
          title: 'Update failed',
          description: result.payload || 'Something went wrong with updating',
        });
      } else if (result?.payload?.product) {
        toast({
          title: 'Product updated',
          description: `Updated Product ${result.payload.product.name}`,
        });
        setTimeout(() => {
          router.push('/dashboard/products');
        }, 1000);
      }
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('images', files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(imageUrls);
  };

  useEffect(() => {
    dispatch(allCats());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  useEffect(() => {
    if (product?.images) {
      setExistingImages(product.images);
    }
  }, [product]);

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-6 space-y-4 rounded shadow">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          className="mt-1 w-full border-gray-300 rounded-md"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && <p className="text-red-600 text-sm">{formik.errors.name}</p>}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Input
          id="description"
          name="description"
          type="text"
          className="mt-1 w-full border-gray-300 rounded-md"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description && (
          <p className="text-red-600 text-sm">{formik.errors.description}</p>
        )}
      </div>

      {/* Categories Field */}
      {cats?.length > 0 ? (
        <div>
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <select
            id="categories"
            name="categories"
            multiple={true}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map(
                (option) => option.value,
              );
              formik.setFieldValue('categories', selectedOptions);
            }}
            value={formik.values.categories}
            className="mt-1 w-full border-gray-300 rounded-md">
            {cats.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.errors.categories && (
            <p className="text-red-600 text-sm">{formik.errors.categories}</p>
          )}
        </div>
      ) : (
        <Link href="/dashboard/categories/add">Add category</Link>
      )}

      {/* Price Field */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <Input
          id="price"
          name="price"
          type="number"
          className="mt-1 w-full border-gray-300 rounded-md"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.errors.price && <p className="text-red-600 text-sm">{formik.errors.price}</p>}
      </div>

      {/* Stock Field */}
      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
          Stock
        </label>
        <Input
          id="stock"
          name="stock"
          type="number"
          className="mt-1 w-full border-gray-300 rounded-md"
          onChange={formik.handleChange}
          value={formik.values.stock}
        />
        {formik.errors.stock && <p className="text-red-600 text-sm">{formik.errors.stock}</p>}
      </div>

      {/* Discount Field */}
      <div className="flex items-center">
        <label htmlFor="discount" className="mr-2 text-sm font-medium text-gray-700">
          Discount
        </label>
        <Input
          id="discount"
          name="discount"
          type="checkbox"
          className="h-4 w-4"
          onChange={formik.handleChange}
          checked={formik.values.discount}
        />
      </div>

      {/* Hit Field */}
      <div className="flex items-center">
        <label htmlFor="hit" className="mr-2 text-sm font-medium text-gray-700">
          Hit
        </label>
        <Input
          id="hit"
          name="hit"
          type="checkbox"
          className="h-4 w-4"
          onChange={formik.handleChange}
          checked={formik.values.hit}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Images
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-1 w-full"
        />
        {formik.errors.images && <p className="text-red-600 text-sm">{formik.errors.images}</p>}
      </div>

      {/* Existing Image Previews */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {existingImages.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Existing image ${index}`}
              className="h-24 w-24 object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* New Image Previews */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {imagePreviews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`New preview ${index}`}
            className="h-24 w-24 object-cover rounded"
          />
        ))}
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="secondary" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Updating...' : 'Update Product'}
      </Button>
    </form>
  );
};

export default UpdateProductForm;
