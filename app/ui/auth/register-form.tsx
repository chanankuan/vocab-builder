'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clsx } from 'clsx/lite';

import InfoMessage from './info-message';
import { signup } from '@/app/api/auth';
import { RegisterSchema } from '@/app/lib/utils';
import type { SignupRequest } from '@/app/lib/definitions';

import eyesOff from '@/public/images/eye-off.svg';
import eyesOn from '@/public/images/eye.svg';

export default function RegisterForm() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  async function onSubmitHandler(formData: SignupRequest) {
    try {
      const data = await signup(formData);
      localStorage.setItem('user', JSON.stringify(data));

      router.push('/');
      setErrorMessage('');
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  }

  return (
    <>
      <form className="mb-4" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-[14px] md:mb-[18px]">
          <input
            className={clsx(
              'block w-full px-4 py-[18px] mb-1 bg-green-light border border-solid outline-none rounded-[15px] placeholder:text-mainFont focus:border-green-dark',
              errors.name ? 'border-danger' : 'border-gray-main'
            )}
            {...register('name')}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="on"
          />
          {errors.name?.message && (
            <InfoMessage type="danger" message={errors.name.message} />
          )}
        </div>

        <div className="mb-[14px] md:mb-[18px]">
          <input
            className={clsx(
              'block w-full px-[18px] py-4 mb-1 bg-green-light border border-solid outline-none rounded-[15px] placeholder:text-mainFont focus:border-green-dark',
              errors.email ? 'border-danger' : 'border-gray-main'
            )}
            {...register('email')}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="on"
          />

          {errors.email?.message && (
            <InfoMessage type="danger" message={errors.email.message} />
          )}
        </div>

        <div className="mb-8">
          <div className="relative mb-1">
            <input
              className={clsx(
                'block w-full px-[18px] py-4 bg-green-light border border-solid outline-none rounded-[15px] placeholder:text-mainFont focus:border-green-dark',
                errors.password ? 'border-danger' : 'border-gray-main'
              )}
              {...register('password')}
              id="password"
              name="password"
              type={isPasswordShown ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute right-[18px] top-[18px]"
              onClick={() => setIsPasswordShown(prevState => !prevState)}
            >
              {isPasswordShown ? (
                <Image src={eyesOn} alt="eyes on" />
              ) : (
                <Image src={eyesOff} alt="eyes off" />
              )}
            </button>
          </div>

          {errors.password?.message && (
            <InfoMessage type="danger" message={errors.password.message} />
          )}
        </div>

        {errorMessage && (
          <p className="text-sm md:text-base text-danger mb-4">
            {errorMessage}
          </p>
        )}

        <button
          className="block w-full py-4 bg-green-dark border border-none rounded-[30px] text-base text-secondaryFont hover:bg-green-main transition-colors duration-300"
          type="submit"
        >
          Register
        </button>
      </form>

      <div className="text-center">
        <Link
          className="font-bold text-gray-dark underline hover:text-mainFont transition-colors duration-300"
          href="/login"
        >
          Login
        </Link>
      </div>
    </>
  );
}
