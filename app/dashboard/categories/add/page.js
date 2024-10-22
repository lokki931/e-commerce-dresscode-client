'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCats } from '@/features/slices/categorySlice';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const CategoryForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(createCats(values));

      if (createCats.rejected.match(result)) {
        toast({
          title: 'Created category failed',
          description: result.payload || 'You input bad data',
        });
      } else {
        toast({
          title: 'Created category',
          description: `Created category ${result?.payload.category.name}`,
        });
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

export default CategoryForm;
