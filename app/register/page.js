'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { userRegister } from '@/features/users/userSlice';

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { toast } = useToast();
  // Formik and Yup setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      const dataObj = {
        email: values.email,
        password: values.password,
        orders: {
          connect: [],
        },
      };

      const result = await dispatch(userRegister(dataObj));

      if (userRegister.rejected.match(result)) {
        // Handle registration error
        toast({
          title: 'Registration failed',
          description: result.payload || 'An error occurred during registration',
        });
      } else {
        // Handle registration success
        toast({
          title: 'Welcome',
          description: 'Your account has been successfully created',
        });

        // Optionally, redirect to a different page after registration
        router.push('/signin');
      }
    },
  });

  return (
    <div className="flex-grow grid place-items-center">
      <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-sm w-full">
        <h1 className="text-center mx-3 text-4xl font-bold">Register</h1>
        {/* Email Field */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="outline">
          Register
        </Button>
      </form>
    </div>
  );
}
