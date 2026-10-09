'use client'

import { useState } from 'react'
import { offbit, offbitDot } from '@/components/utils/utils'

const CONTACT_EMAIL = 'connect.ecobug@gmail.com'

/**
 * Contact form — matches Figma Contact Frame 102-106 (195:3926-195:3935):
 * white 1234w card (r26, pad 173/83), dot-matrix CONTACT US title
 * (OffBit Dot Bold 96), right-aligned OffBit Bold 29 labels, grey pill
 * inputs (70h, r54, 4px #6D6D6D stroke; message 252h), black 212x78
 * SEND button. Submit opens a pre-filled email to the EcoBug inbox.
 */
export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const inputCls =
    'w-full h-[60px] md:h-[70px] rounded-full bg-[#D9D9D9] dark:bg-black/30 border-4 border-[#6D6D6D] dark:border-line px-6 font-geist-sans text-[16px] text-ink placeholder:text-ink-muted/70 outline-none focus:border-black dark:focus:border-white transition-colors'
  const labelCls = `${offbit.className} font-bold text-[18px] sm:text-[20px] md:text-[29px] leading-[22px] md:leading-[29px] tracking-[-0.03em] text-center sm:text-right text-[#646464] dark:text-ink-muted`

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const mailSubject = encodeURIComponent(
      `Website enquiry${subject.trim() ? `: ${subject.trim()}` : ''}`
    )
    const mailBody = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`
    setSent(true)
  }

  return (
    <div className='w-full max-w-[1234px] bg-white dark:bg-panel rounded-[26px] px-6 py-10 md:px-16 lg:px-[173px] lg:py-[82px] flex flex-col items-center gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]'>
      <h1
        className={`${offbitDot.className} text-[52px] md:text-[72px] lg:text-[96px] leading-none tracking-[-0.03em] text-center text-black dark:text-[#EAF2E4] select-none`}
      >
        CONTACT US
      </h1>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[682px] flex flex-col items-center gap-3'
      >
        <div className='w-full flex flex-col gap-2'>
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

        <div className='w-full flex flex-col gap-2'>
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

        <div className='w-full flex flex-col gap-2'>
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

        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='contact-message' className={labelCls}>
            Message
          </label>
          <textarea
            id='contact-message'
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Tell us about your project…'
            rows={6}
            className='w-full h-[200px] md:h-[252px] rounded-[32px] md:rounded-[54px] bg-[#D9D9D9] dark:bg-black/30 border-4 border-[#6D6D6D] dark:border-line px-6 py-5 font-geist-sans text-[16px] text-ink placeholder:text-ink-muted/70 outline-none resize-none focus:border-black dark:focus:border-white transition-colors'
          />
        </div>

        <div className='pt-2 flex flex-col items-center gap-3'>
          <button
            type='submit'
            className={`${offbit.className} font-bold w-[212px] h-[78px] rounded-full bg-black text-white text-[29px] leading-[29px] tracking-[-0.03em] inline-flex items-center justify-center select-none cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_rgba(0,0,0,0.35)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.35)]`}
          >
            SEND
          </button>
          {sent && (
            <p className='font-geist-sans text-sm text-ink-muted text-center'>
              Thanks! Your mail app should open — we&apos;ll get back to you
              soon.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
