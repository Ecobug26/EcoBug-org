'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCheck() {
  useEffect(() => {
    async function check() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      console.log(user)
    }

    check()
  }, [])

  return null
}