import localFont from 'next/font/local'

const pixelifySans = localFont({
  src: '../../public/fonts/pixelifySans.ttf',
})

export default function Signup() {
  return (
    <div className='min-h-screen flex items-center justify-center p-2 md:p-4'>
      <div className='bg-[#214330] w-full max-w-250 scale-80 rounded-2xl p-6 md:p-12'>
        <div className='border-b border-white/30 pb-4 mb-6 md:pb-6 md:mb-8'>
          <span
            className={`${pixelifySans.className} text-white text-5xl md:text-9xl tracking-[-0.002em]`}
          >
            ECOBUG
          </span>
        </div>
        <div className='flex flex-col gap-6 md:gap-8'>
          <div className='mb-2 md:mb-8'>
            <span
              className={`text-white text-2xl md:text-4xl ${pixelifySans.className}`}
            >
              Sign Up
            </span>
          </div>
          <div className='flex flex-col gap-5 md:gap-8'>
            <div className='flex flex-col gap-2 md:gap-3'>
              <span
                className={`text-white text-xl md:text-3xl ${pixelifySans.className}`}
              >
                Email
              </span>
              <input
                type='email'
                className='w-full bg-[#d9d9d9] h-12 md:h-20 rounded-xl px-4 md:px-6 text-base md:text-2xl outline-none focus:ring-4 focus:ring-[#7ec28d]/50 transition-all shadow-[0px_6px_1px_#000]'
                placeholder='Enter your email'
              />
            </div>
            <div className='flex flex-col gap-2 md:gap-3'>
              <span
                className={`text-white text-xl md:text-3xl ${pixelifySans.className}`}
              >
                Password
              </span>
              <input
                type='password'
                className='w-full bg-[#d9d9d9] h-12 md:h-20 rounded-xl px-4 md:px-6 text-base md:text-2xl outline-none focus:ring-4 focus:ring-[#7ec28d]/50 transition-all shadow-[0px_6px_1px_#000]'
                placeholder='Enter your password'
              />
            </div>
            <div>
              <button
                className={`w-full bg-[#4eb26d] hover:bg-[#4eb26d88] text-white h-12 md:h-20 rounded-xl text-xl md:text-4xl transition-colors cursor-pointer mt-2 md:mt-4 ${pixelifySans.className}`}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div
            className={`mt-2 md:mt-4 text-white text-base md:text-3xl flex flex-wrap gap-2 md:gap-3 ${pixelifySans.className}`}
          >
            <span>already have an account?</span>
            <a
              href='#'
              className='hover:text-[#7ec28d] transition-colors hover:underline'
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
