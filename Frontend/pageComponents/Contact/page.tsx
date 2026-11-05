'use client'

import { useState } from 'react'
import { offbit, offbitDot } from '@/components/utils/utils'

const CONTACT_EMAIL = 'connect.ecobug@gmail.com'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Updated for both light and dark mode to match Figma
  const inputCls =
    'w-full h-[60px] md:h-[70px] rounded-full bg-[#D9D9D9] dark:bg-[#D9D9D9] border-[3px] border-[#6D6D6D] dark:border-[#5FA463] px-6 font-geist-sans text-[16px] text-black dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-600 outline-none focus:border-black dark:focus:border-[#EAF2E4] transition-colors'
    
  const labelCls = `${offbit.className} font-bold text-[16px] md:text-[18px] leading-[22px] tracking-[-0.02em] text-left text-black dark:text-[#9BAE95] pl-4`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setSubmitError(null)
    setSent(false)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)
      let res: Response
      try {
        res = await fetch(`${API_URL}/api/contact/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
          }),
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeout)
      }

      const result = await res.json()

      if (result.success) {
        setSent(true)
        setSending(false)
        return
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (err) {
      // Fallback to mailto when backend is down or mail fails
      const mailSubject = encodeURIComponent(
        `Website enquiry${subject.trim() ? `: ${subject.trim()}` : ''}`
      )
      const mailBody = encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
      )
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`
      setSent(true)
      setSending(false)
    }
  }

  return (
    // Card background adjusted for dark mode
    <div className='w-full max-w-[800px] bg-[#B3D69A] dark:bg-[#1B2F1E] rounded-[32px] px-6 py-10 md:px-12 lg:px-16 lg:py-12 flex flex-col items-center gap-4 shadow-sm'>
      
      <h1
        className={`${offbitDot.className} text-[48px] md:text-[64px] lg:text-[80px] leading-none tracking-[-0.03em] text-center text-black dark:text-[#EAF2E4] select-none mb-4`}
      >
        CONTACT US
      </h1>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[600px] flex flex-col items-center gap-5'
      >
        <div className='w-full flex flex-col gap-1.5'>
          <label htmlFor='contact-name' className={labelCls}>
            Full Name
          </label>
          <input
            id='contact-name'
            type='text'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Jane Fern'
            autoComplete='name'
            className={inputCls}
          />
        </div>

        <div className='w-full flex flex-col gap-1.5'>
          <label htmlFor='contact-email' className={labelCls}>
            E-mail
          </label>
          <input
            id='contact-email'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='jane@example.com'
            autoComplete='email'
            className={inputCls}
          />
        </div>

        <div className='w-full flex flex-col gap-1.5'>
          <label htmlFor='contact-subject' className={labelCls}>
            Subject
          </label>
          <input
            id='contact-subject'
            type='text'
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder='How can we help?'
            className={inputCls}
          />
        </div>

        <div className='w-full flex flex-col gap-1.5'>
          <label htmlFor='contact-message' className={labelCls}>
            Message
          </label>
          <textarea
            id='contact-message'
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Tell us about your project...'
            rows={5}
            className='w-full h-[180px] md:h-[220px] rounded-[32px] bg-[#D9D9D9] dark:bg-[#D9D9D9] border-[3px] border-[#6D6D6D] dark:border-[#5FA463] px-6 py-5 font-geist-sans text-[16px] text-black dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-600 outline-none resize-none focus:border-black dark:focus:border-[#EAF2E4] transition-colors'
          />
        </div>

        <div className='pt-4 flex flex-col items-center gap-3 w-full'>
          <button
            type='submit'
            disabled={sending}
            className={`${offbit.className} font-bold w-[180px] h-[60px] md:w-[200px] md:h-[70px] rounded-full bg-black text-white dark:bg-[#EAF5C8] dark:text-black text-[24px] md:text-[28px] leading-[28px] tracking-[-0.03em] inline-flex items-center justify-center select-none cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_rgba(0,0,0,0.35)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.35)]`}
          >
            {sending ? 'SENDING…' : 'SEND'}
          </button>
          {sent && (
            <p className='font-geist-sans text-sm text-black dark:text-[#9BAE95] text-center font-bold'>
              {submitError ? submitError : 'Thanks! Your message has been sent.'}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}