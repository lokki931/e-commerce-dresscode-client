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
import { allCats, deleteCats, getByIdCats } from '@/features/slices/categorySlice';
import { toast } from '@/hooks/use-toast';
import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardCategories = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const cats = useSelector((state) => state.categories?.all);

  const router = useRouter();

  const handleDelete = async (id) => {
    const result = await dispatch(deleteCats(id));

    if (deleteCats.rejected.match(result)) {
      console.log('Deletion Error:', result);
      toast({
        title: 'Delete category failed',
        description: result.payload || 'Something went wrong',
      });
    } else {
      toast({
        title: 'Delete category',
        description: `Category with ID ${id} has been deleted successfully.`,
      });

      // Update local categories state after deletion
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
      dispatch(allCats());
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(allCats());
  }, [dispatch]);

  useEffect(() => {
    setCategories(cats);
  }, [cats]);

  return (
    <div className="flex flex-col items-end">
      <Button
        type="button"
        variant="secondary"
        className="mb-2"
        onClick={() => router.push('/dashboard/categories/add')}>
        Add
      </Button>
      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[50px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((cat) => (
            <TableRow key={cat.id + '_' + cat.name}>
              <TableCell className="font-medium">{cat.name}</TableCell>
              <TableCell className="w-[50px] text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        dispatch(getByIdCats(cat.id));
                        router.push(`/dashboard/categories/${cat.id}/update`);
                      }}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(cat.id)}>Remove</DropdownMenuItem>
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

export default DashboardCategories;
