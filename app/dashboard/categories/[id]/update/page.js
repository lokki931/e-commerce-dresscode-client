'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getByIdCats, resetCatId, updateCats } from '@/features/users/categorySlice';
import { toast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const CategoryUpdateForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const cat = useSelector((state) => state.categories?.category?.category);

  useEffect(() => {
    if (id) {
      dispatch(getByIdCats(id));
    }
  }, [dispatch, id]);
  const formik = useFormik({
    initialValues: {
      name: cat?.name || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
    }),
    onSubmit: async (values) => {
      const data = {
        id: id,
        name: values.name,
      };
      const result = await dispatch(updateCats(data));
      if (updateCats.rejected.match(result)) {
        toast({
          title: 'Update category failed',
          description: result.payload || 'You input bad data',
        });
      } else {
        toast({
          title: 'Update category',
          description: `Update category ${id}`,
        });
        dispatch(resetCatId());
        setTimeout(() => {
          router.push('/dashboard/categories');
        }, 1000);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-6 space-y-4 rounded shadow">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Category Name
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
      {/* Submit Button */}
      <Button type="submit" variant="secondary" className="mt-4">
        Submit
      </Button>
    </form>
  );
};

export default CategoryUpdateForm;
