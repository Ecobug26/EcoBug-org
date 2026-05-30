import { pixelifySans } from '../utils/utils'

export default function Footer() {
  return (
    <footer className='bg-[#1c642a] text-white py-12 px-10 md:px-16 flex flex-col'>
      <div
        className={`${pixelifySans.className} text-4xl text-white mb-8 ml-0 sm:ml-0 md:ml-20 lg:ml-24`}
      >
        SOCIALS
      </div>
      <div
        className='flex flex-col md:flex-row justify-between w-full max-w-7xl mx-auto gap-12'
      >
        <div className='flex flex-col items-start'>
          <h3 className={`${pixelifySans.className} text-2xl uppercase tracking-widest `}>INSTAGRAM</h3>
          <a
            className='hover:text-gray-300 transition-colors break-all'
            href='https://www.instagram.com/we.ecobug/'
            target='_blank'
            rel='noopener noreferrer'
          >
            @we.ecobug
          </a>
        </div>

        <div className='flex flex-col items-start'>
          <h3 className={`${pixelifySans.className} text-2xl uppercase tracking-widest `}>LINKEDIN</h3>
          <a
            className='hover:text-gray-300 transition-colors break-all'
            href='https://www.linkedin.com/in/ecobug-landscape-consultant-919a973b5/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Ecobug Landscape Consultant
          </a>
        </div>

        <div className='flex flex-col items-start'>
          <h3 className={`${pixelifySans.className} text-2xl uppercase tracking-widest `}>email:</h3>
          <a
            className='hover:text-gray-300 transition-colors break-all'
            href='mailto:connect.ecobug@gmail.com'
          >
            connect.ecobug@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
