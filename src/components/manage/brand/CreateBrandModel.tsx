import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { isEmpty, isUndefined } from 'lodash';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import TextError from '@/components/shared/text-error';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FormInputStyle } from '@/styles/share.styled';
import brandService from '@/services/brand';

type FormValues = {
  name: string;
};

type Props = {
  action: string;
  setOpenModal: (e: boolean) => void;
  setReload: () => void;
  openModal: boolean;
  data: any;
};

const CreateBrandModel = ({
  action,
  openModal,
  setOpenModal,
  setReload,
  data,
}: Props) => {
  const onSubmit = async (values: FormValues) => {
    const brandData = {
      name: values.name,
    };

    const res =
      action === 'create'
        ? await brandService.createBrand(brandData)
        : await brandService.updateBrand(data.id, brandData);

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
    }
  }, [openModal, action, data]);

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
              {action === 'create' ? 'เพิ่มข้อมูลแบรนด์' : 'แก้ไขข้อมูลแบรนด์'}
            </DialogTitle>
          </DialogHeader>
          <FormInputStyle>
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

export default CreateBrandModel;
