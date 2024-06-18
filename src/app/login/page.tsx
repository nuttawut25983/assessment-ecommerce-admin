'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import TextError from '@/components/shared/text-error';
import authService from '@/services/auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setLoading(true);
    const res: any = await authService.login({
      username: values.username,
      password: values.password,
    });
    console.log(res);
    if (res.status) {
      router.push('/');
    } else {
      console.log(res);
      await Swal.fire({
        title: `Login Failure!`,
        text: res.message,
        icon: 'error',
        showCloseButton: true,
        // showCancelButton: !isSuccess,
        // showConfirmButton: isSuccess,
        confirmButtonColor: '#F72860',
        cancelButtonColor: '#DAE2E5',
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        reverseButtons: true,
      });
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-6 rounded-md bg-white p-6 shadow-md dark:bg-gray-800 sm:p-10">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Sign in to Assignment Admin
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              placeholder="Username"
              className="mt-2"
              {...register('username', {
                required: '*Please insert an username',
              })}
            />
            <TextError errors={errors} name="username" />
          </div>
          <div>
            <Label htmlFor="username">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-2"
              {...register('password', {
                required: 'Please insert password',
              })}
            />
            <TextError errors={errors} name="password" />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign
            In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
