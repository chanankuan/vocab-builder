import Image from 'next/image';

import LoginForm from '../ui/auth/login-form';
import mainBg from '@/public/images/auth-bg.png';
import bgDesktop from '@/public/images/auth-bg-desktop.png';

export default function Login() {
  return (
    <main>
      <div className="md:container relative md:h-[calc(100vh-88px)] md:pt-[140px] md:pb-[106px] md:flex md:flex-col lg:flex-row md:px-[70px] lg:gap-x-20 md:before:fixed md:before:bg-gradient-linear md:before:h-[597px] md:before:-right-[200px] md:before:-bottom-[300px] md:before:w-[693px] md:before:rotate-24 lg:before:rotate-14 lg:items-center">
        <div className="max-md:container md:order-last md:max-lg:mt-auto md:max-lg:px-16">
          <div className="max-md:pb-11">
            <div className="mx-auto max-md:w-64 max-md:h-48 lg:w-[498px] mb-2 md:max-lg:hidden lg:mb-4">
              <Image
                className="lg:hidden object-cover w-full h-full"
                src={mainBg}
                alt="A boy and a girl reading a book"
                priority
              />
              <Image
                className="hidden lg:block lg:-mt-20 object-cover w-full h-full"
                src={bgDesktop}
                alt="A boy and a girl reading a book"
                priority
              />
            </div>
            <p className="text-sm text-center">
              Word &nbsp; · &nbsp; Translation &nbsp; · &nbsp; Grammar &nbsp; ·
              &nbsp; Progress
            </p>
          </div>
        </div>

        <div className="lg:max-w-[620px]">
          <div className="max-md:container bg-green-light rounded-t-[25px] pt-8 pb-5 md:pb-4 md:px-16">
            <h1 className="text-xl font-semibold md:text-2xl mb-4 md:mb-5">
              Login
            </h1>
            <p className="text-base md:text-lg">
              Please enter your login details to continue using our service:
            </p>
          </div>

          <div className="max-md:container bg-green-light rounded-b-[25px] pt-5 md:pt-4 pb-14 md:px-16">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
