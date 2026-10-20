const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function refreshAccessToken(): Promise<string | null> {
  if (!API_URL || typeof window === 'undefined') return null

  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return null

  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      clearStoredAuth()
      return null
    }

    const data = await response.json()

    if (!data.accessToken || !data.refreshToken) {
      clearStoredAuth()
      return null
    }

    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)

    return data.accessToken
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  }
}

function clearStoredAuth() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('email')
}

export async function getCurrentUser() {
  if (!API_URL || typeof window === 'undefined') return null

  let token = localStorage.getItem('accessToken')
  if (!token) return null

  try {
    let response = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })

    if (response.status === 401) {
      token = await refreshAccessToken()
      if (!token) return null

      response = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
    }

    if (!response.ok) return null

    return await response.json()
  } catch (error) {
    console.error('Unable to fetch current user:', error)
    return null
  }
}