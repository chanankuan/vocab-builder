'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clsx } from 'clsx/lite';

import InfoMessage from './info-message';
import { signin } from '@/app/api';
import { LoginSchema } from '@/app/lib/utils';
import type { SigninRequest } from '@/app/lib/definitions';

import eyesOff from '@/public/images/eye-off.svg';
import eyesOn from '@/public/images/eye.svg';
import Loader from '../loader';

export default function LoginForm() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  async function onSubmitHandler(formData: SigninRequest) {
    try {
      setIsLoading(true);
      await signin(formData);

      router.push('/dictionary');
      setErrorMessage('');
      // reset();
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  }

  return (
    <>
      <form className="mb-4" onSubmit={handleSubmit(onSubmitHandler)}>
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
                'block w-full px-[18px] py-4 bg-green-light border border-solid stroke-2 outline-none rounded-[15px] placeholder:text-mainFont focus:border-green-dark',
                errors.password ? 'border-danger' : 'border-gray-main'
              )}
              {...register('password')}
              id="password"
              name="password"
              type={isPasswordShown ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="current-password"
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

        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <button
          className="flex justify-center items-center w-full py-4 bg-green-dark border border-none rounded-[30px] text-base font-bold text-secondaryFont hover:bg-green-main transition-colors duration-300"
          type="submit"
        >
          {isLoading ? <Loader /> : 'Login'}
        </button>
      </form>

      <div className="text-center">
        <Link
          className="font-bold text-gray-dark underline hover:text-mainFont transition-colors duration-300"
          href="/register"
        >
          Register
        </Link>
      </div>
    </>
  );
}
