'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
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
import CreateBrandModel from '@/components/manage/brand/CreateBrandModel';
import brandService from '@/services/brand';
import { useBrandStore } from '@/store/slices/brand';

const Brand = () => {
  const brands = useBrandStore((state) => state.brand.brands);
  const setBrands = useBrandStore((state) => state.setBrands);
  const [action, setAction] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState<any>();

  const fetchData = async () => {
    const res = await brandService.getBrandsAdmin();
    if (res.status === 200) {
      const content = res.data;
      setBrands(content);
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

  useEffect(() => {
    fetchData();
  }, []);

  const header: CardHeaderType = {
    title: 'แบรนด์',
    description: 'จัดการหมวดหมู่แบรนด์',
  };
  const columns: ColumnDef<ProductItemState>[] = [
    {
      accessorKey: 'name',
      header: 'ชื่อแบรนด์',
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'productCount',
      header: () => (
        <span className="flex justify-center items-center">จำนวนสินค้า</span>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          {row.getValue('productCount')}
        </div>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <div className="text-right mr-10">
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
          </div>
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
      title: 'ลบแบรนด์!',
      text: 'คุณต้องการลบแบรนด์นี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#000000',
      cancelButtonColor: '#DAE2E5',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await brandService.deleteBrand(id);
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
            <span>เพิ่มแบรนด์</span>
          </Button>
        </div>
        <CardTableData
          header={header}
          dada={brands}
          columns={columns}
          fetch={fetchData}
        />
      </div>
      <CreateBrandModel
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
