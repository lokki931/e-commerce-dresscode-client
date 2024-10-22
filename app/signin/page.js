'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userLogin, userMe } from '@/features/slices/userSlice';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import * as Yup from 'yup';

export default function SignIn() {
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
      const result = await dispatch(userLogin(values));

      if (userLogin.rejected.match(result)) {
        // Handle login error
        toast({
          title: 'Login failed',
          description: result.payload || 'You input bad email or password',
        });
      } else {
        // Handle login success
        toast({
          title: 'Welcome',
          description: 'Welcome back friend',
        });

        setTimeout(() => {
          dispatch(userMe());
          router.push('/dashboard');
        }, 1000);
      }
    },
  });

  return (
    <div className="flex-grow grid place-items-center">
      <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-sm w-full">
        {/* Email Field */}
        <h1 className="text-center mx-3 text-4xl font-bold">Sign In</h1>
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
          Login
        </Button>
      </form>
    </div>
  );
}
