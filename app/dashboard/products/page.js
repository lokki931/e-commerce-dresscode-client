'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { allProducts, deleteProduct, getByIdProducts } from '@/features/slices/productSlice';
import { toast } from '@/hooks/use-toast';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const productsAll = useSelector((state) => state.products?.all);
  const handleDelete = async (id) => {
    const result = await dispatch(deleteProduct(id));

    if (deleteProduct.rejected.match(result)) {
      toast({
        title: 'Delete product failed',
        description: result.payload || 'Something went wrong',
      });
    } else {
      toast({
        title: 'Delete product',
        description: `Product with ID ${id} has been deleted successfully.`,
      });

      // Update local categories state after deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      dispatch(allProducts());
    }
  };
  const handleUpdate = (id) => {
    dispatch(getByIdProducts(id));
    router.push(`/dashboard/products/${id}/update`);
  };
  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(productsAll);
  }, [productsAll]);
  return (
    <div className="flex flex-col items-end">
      <Button
        type="button"
        variant="secondary"
        className="mb-2"
        onClick={() => router.push('/dashboard/products/add')}>
        Add
      </Button>
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="w-[50px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id + '_' + product.name}>
              <TableCell>
                <Image
                  width={50}
                  height={30}
                  alt={product.name}
                  unoptimized={true}
                  loader={() => product.images[0]?.url}
                  src={product.images[0]?.url}
                  className="h-24 w-24 object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="w-[50px] text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleUpdate(product.id)}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(product.id)}>
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardProducts;
