import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { isEmpty, isUndefined } from 'lodash';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import TextError from '@/components/shared/text-error';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import productService from '@/services/product';
import Swal from 'sweetalert2';
import { ImagePlus } from 'lucide-react';
import { FormInputStyle, ImageUploadStyled } from '@/styles/share.styled';
import { Textarea } from '@/components/ui/textarea';
import brandService from '@/services/brand';

type FormValues = {
  imageUrl: string;
  name: string;
  sku: string;
  price: number;
  description: string;
  brandId: number;
};

type Props = {
  action: string;
  setOpenModal: (e: boolean) => void;
  setReload: () => void;
  openModal: boolean;
  data: any;
};

const CreateProductModal = ({
  action,
  openModal,
  setOpenModal,
  setReload,
  data,
}: Props) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [brands, setBrands] = useState<any[]>([]);

  const onSubmit = async (values: FormValues) => {
    const productData = {
      productName: values.name,
      productSku: values.sku,
      price: values.price,
      description: values.description,
      imageUrl: values.imageUrl,
      brandId: values.brandId,
    };

    const res =
      action === 'create'
        ? await productService.createProduct(productData)
        : await productService.updateProduct(data.id, productData);

    if (res.status === 200) {
      Swal.fire({
        title: 'สำเร็จ',
        text: res.message,
        icon: 'success',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: '#000000',
        confirmButtonText: 'OK',
        reverseButtons: true,
      }).then(() => {
        setReload();
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
    setOpenModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset();

    if (action === 'edit' && !isEmpty(data) && !isUndefined(data)) {
      setValue('name', data.name);
      setValue('imageUrl', data.imageUrl);
      setValue('sku', data.sku);
      setValue('price', data.price);
      setValue('description', data.description);
      setValue('brandId', data.brand.id);
      setImageUrl(data.imageUrl);
    } else {
      setImageUrl('');
    }
  }, [openModal, action, data]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await brandService.getBrands();
      if (res.status === 200) {
        console.log(res);
        setBrands(res.data);
      }
    };

    fetchBrands();
  }, []);

  return (
    <Dialog
      onOpenChange={() => setOpenModal(false)}
      open={openModal}
      defaultOpen={openModal}
      modal
    >
      <DialogContent className="w-[330px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {action === 'create'
                ? 'เพิ่มข้อมูลผลิตภัณฑ์'
                : 'แก้ไขข้อมูลผลิตภัณฑ์'}
            </DialogTitle>
          </DialogHeader>
          <FormInputStyle>
            <ImageUploadStyled>
              {imageUrl ? (
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="100"
                  src={imageUrl}
                  width="100"
                  placeholder={'empty'}
                  priority={true}
                />
              ) : (
                <div className="image--empty">
                  <ImagePlus />
                </div>
              )}
            </ImageUploadStyled>
            <div className="input__list">
              <Label htmlFor="imageUrl" className="text-right">
                URL รูปภาพ
              </Label>
              <Input
                id="imageUrl"
                className="w-full"
                {...register('imageUrl', {
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: 'URL รูปภาพไม่ถูกต้อง',
                  },
                })}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {errors.imageUrl && <TextError errors={errors} name="imageUrl" />}
            </div>

            <div className="input__list">
              <Label htmlFor="name" className="text-right">
                ชื่อ
              </Label>
              <Input
                id="name"
                className="w-full"
                {...register('name', {
                  required: {
                    value: true,
                    message: `ระบุชื่อ`,
                  },
                })}
              />
              <TextError errors={errors} name="name" />
            </div>

            <div className="input__list">
              <Label htmlFor="sku" className="text-right">
                sku
              </Label>
              <Input
                id="sku"
                className="w-full"
                {...register('sku', {
                  required: {
                    value: true,
                    message: `sku`,
                  },
                })}
              />
              <TextError errors={errors} name="name" />
            </div>
            <div className="input__list">
              <Label htmlFor="price" className="text-right">
                ราคา
              </Label>
              <Input
                id="price"
                type="number" // เพิ่ม type="number" เพื่อให้รับค่าเป็นตัวเลขเท่านั้น
                className="w-full"
                {...register('price', {
                  // เปลี่ยนจาก 'name' เป็น 'price' เพื่อให้ตรงกับ id
                  required: {
                    value: true,
                    message: 'กรุณาระบุราคา',
                  },
                  min: {
                    // กำหนด validation ขั้นต่ำ
                    value: 0,
                    message: 'ราคาต้องมากกว่าหรือเท่ากับ 0',
                  },
                  pattern: {
                    // กำหนด pattern เพื่อให้รับเฉพาะตัวเลข
                    value: /^[0-9]+$/,
                    message: 'ราคาต้องเป็นตัวเลขเท่านั้น',
                  },
                })}
              />
              <TextError errors={errors} name="price" />
            </div>
            <div className="input__list">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="w-full"
                rows={4} // กำหนดจำนวนแถวเริ่มต้นของ textarea
                {...register('description', {
                  required: {
                    value: true,
                    message: 'กรุณาระบุรายละเอียดสินค้า',
                  },
                  maxLength: {
                    // กำหนดความยาวตัวอักษรสูงสุด
                    value: 500,
                    message: 'รายละเอียดสินค้าต้องไม่เกิน 500 ตัวอักษร',
                  },
                })}
              />
              <TextError errors={errors} name="description" />
              <div className="input__list">
                <Label htmlFor="brand" className="text-right">
                  แบรนด์
                </Label>
                <select
                  id="brand"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  {...register('brandId', {
                    required: {
                      value: true,
                      message: 'กรุณาเลือกแบรนด์',
                    },
                  })}
                >
                  <option value="">เลือกแบรนด์</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                <TextError errors={errors} name="brandId" />
              </div>
            </div>
          </FormInputStyle>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpenModal(false)}
            >
              ยกเลิก
            </Button>
            <Button type="submit">บันทึก</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
