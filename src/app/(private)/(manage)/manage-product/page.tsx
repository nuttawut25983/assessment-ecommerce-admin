'use client';

import React, { Fragment, useEffect, useState } from 'react';
import productService from '@/services/product';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useProductStore } from '@/store/slices/product';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductItemState } from '@/store/type/product';
import CardTableData from '@/components/shared/card';
import { CardHeaderType } from '@/components/shared/type';
import Swal from 'sweetalert2';
import CreateProductModal from '@/components/manage/product/CreateProductModal';
import { usePaginationStore } from '@/store/slices/paginations';
import { isUndefined } from 'lodash';
import { dateTimeFormat } from '@/utils/dateTimeFormat';

type FetchData = {
  pageIndex: number;
  pageSize: number;
  sortField: string;
  ascending: boolean;
};

const Brand = () => {
  const product = useProductStore((state) => state.product.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const pagination = usePaginationStore((state) => state.pagination);
  const setPagination = usePaginationStore((state) => state.setPagination);
  const [action, setAction] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState<any>();
  const [sortField, setSortField] = useState<string>('id');
  const [ascending, setAscending] = useState<boolean>(true);

  const fetchData = async (data?: FetchData) => {
    const options: FetchData = !isUndefined(data)
      ? { ...data }
      : {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sortField: sortField,
          ascending: ascending,
        };

    const res = await productService.getProductPagination({ ...options });
    if (res.status === 200) {
      const { content, pageable, totalPages, first, last } = res.data;
      setProducts(content);
      console.log(pagination);
      setPagination({
        ...pagination,
        pageIndex: pageable.pageNumber,
        pageSize: pageable.pageSize,
        totalPage: totalPages,
        firstPage: first,
        lastPage: last,
        ascending: ascending,
        sortField: sortField,
      });
    } else {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: res.message,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: '#000000',
        confirmButtonText: 'OK',
      }).then();
    }
  };

  const handleSort = (field: string) => {
    setSortField(field);
    if (sortField == field) {
      console.log('setAscending', !ascending);
      setAscending(!ascending);
    }
    fetchData({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sortField: field,
      ascending: ascending,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const header: CardHeaderType = {
    title: 'ผลิตภัณฑ์',
    description: 'จัดการหมวดหมู่ผลิตภัณฑ์ทั้งหมด',
  };
  const columns: ColumnDef<ProductItemState>[] = [
    {
      accessorKey: 'imageUrl',
      header: 'รูปภาพ',
      cell: ({ row }) => (
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={row.getValue('imageUrl')}
          width="64"
          placeholder={'empty'}
          priority={true}
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'ชื่อผลิตภัณฑ์',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: () => (
        <button
          className="font-medium text-left"
          onClick={() => handleSort('price')}
        >
          ราคา
        </button>
      ),
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue('price')}</div>;
      },
    },
    {
      accessorKey: 'createDate',
      header: () => (
        <button
          className="font-medium text-left"
          onClick={() => handleSort('createDate')}
        >
          สร้างเมื่อ
        </button>
      ),
      cell: ({ row }) => (
        <div className="hidden md:table-cell">
          {dateTimeFormat(row.getValue('createDate'), 'DD MMM YYYY HH:mm')}
        </div>
      ),
    },
    {
      accessorKey: 'modifiedDate',
      header: () => (
        <button
          className="font-medium text-left"
          onClick={() => handleSort('modifiedDate')}
        >
          แก้ไขเมื่อ
        </button>
      ),
      cell: ({ row }) => (
        <div className="hidden md:table-cell">
          {dateTimeFormat(row.getValue('modifiedDate'), 'DD MMM YYYY HH:mm')}
        </div>
      ),
    },
    {
      accessorKey: 'brand',
      header: () => (
        <button
          className="font-medium text-left"
          onClick={() => handleSort('brand')}
        >
          แบรนด์
        </button>
      ),
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue('brand').name}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>จัดการ</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(rowData)}>
                แก้ไข
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(rowData.id)}>
                ลบ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleCreate = () => {
    setAction('create');
    setOpenModal(true);
    setRowData(undefined);
  };

  const handleEdit = (data: any) => {
    setAction('edit');
    setRowData(data);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'ลบผลิตภัณฑ์!',
      text: 'คุณต้องการลบผลิตภัณฑ์นี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#000000',
      cancelButtonColor: '#DAE2E5',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await productService.deleteProduct(id);
        if (res.status === false) {
          Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: res.message,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: '#000000',
            confirmButtonText: 'OK',
          }).then();
        } else {
          Swal.fire({
            title: 'สำเร็จ',
            text: res.message,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#000000',
            confirmButtonText: 'OK',
          }).then();
          await fetchData();
        }
      }
    });
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end items-center">
          <Button size="sm" onClick={() => handleCreate()}>
            <PlusCircle className="h-3.5 w-3.5 mr-2" />
            <span>เพิ่มผลิตภัณฑ์</span>
          </Button>
        </div>
        <CardTableData
          header={header}
          dada={product}
          columns={columns}
          fetch={fetchData}
        />
      </div>
      <CreateProductModal
        action={action}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setReload={fetchData}
        data={rowData}
      />
    </Fragment>
  );
};

export default Brand;
