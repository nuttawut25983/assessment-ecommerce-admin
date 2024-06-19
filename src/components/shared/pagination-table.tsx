'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { usePaginationStore } from '@/store/slices/paginations';

interface PaginationTableProps {
  fetch: (data?: any) => void;
}

const PaginationTable = ({ fetch }: PaginationTableProps) => {
  const pagination = usePaginationStore((state) => state.pagination);
  const pageSizeOptions = [10, 20, 50, 100];
  console.log(pagination);

  const handlePageSizeChange = (value: number) => {
    fetch({
      pageIndex: 0,
      pageSize: value,
      sortField: pagination.sortField,
      ascending: pagination.ascending,
    });
  };

  const handleNextPage = () => {
    fetch({
      pageIndex: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      sortField: pagination.sortField,
      ascending: pagination.ascending,
    });
  };

  const handlePreviousPage = () => {
    fetch({
      pageIndex: pagination.pageIndex - 1,
      pageSize: pagination.pageSize,
      sortField: pagination.sortField,
      ascending: pagination.ascending,
    });
  };

  return (
    <div className="flex w-full flex-col-reverse items-center justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={`${pagination.pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top" defaultValue="10">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex + 1} of {pagination.totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePreviousPage()}
            disabled={pagination.firstPage}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handleNextPage()}
            disabled={pagination.lastPage}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PaginationTable;
