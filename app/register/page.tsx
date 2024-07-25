import Image from 'next/image';

import RegisterForm from '../ui/auth/register-form';
import mainBg from '@/public/images/auth-bg.png';
import bgDesktop from '@/public/images/auth-bg-desktop.png';

export default function Register() {
  return (
    <main>
      <div className="md:bg-gradient-linear md:bg-no-repeat md:bg-[right_-400px_bottom_-300px] lg:bg-[right_-600px_bottom_-300px]">
        <div className="md:container relative md:min-h-[calc(100vh-88px)] md:pt-[140px] md:pb-[106px] md:flex md:flex-col lg:flex-row md:px-[70px] lg:gap-x-20  lg:items-center">
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
                Word &nbsp; · &nbsp; Translation &nbsp; · &nbsp; Grammar &nbsp;
                · &nbsp; Progress
              </p>
            </div>
          </div>

          <div className="lg:max-w-[620px]">
            <div className="max-md:container bg-green-light rounded-t-[25px] pt-8 pb-2 md:pb-4 md:px-16">
              <h1 className="text-2xl font-semibold md:text-2xl mb-4 md:mb-5">
                Register
              </h1>
              <p className="text-base md:text-lg">
                To start using our services, please fill out the registration
                form below. All fields are mandatory:
              </p>
            </div>

            <div className="max-md:container bg-green-light rounded-b-[25px] pt-2 md:pt-4 pb-14 md:px-16">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
