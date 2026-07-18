const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')

  if (!refreshToken) return null

  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken,
    }),
  })

  if (!response.ok) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return null
  }

  const data = await response.json()

  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)

  return data.accessToken
}

export async function getCurrentUser() {
  let token = localStorage.getItem('accessToken')

  if (!token) return null

  let response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 401) {
    token = await refreshAccessToken()

    if (!token) return null

    response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  if (!response.ok) {
    return null
  }

  return response.json()
}