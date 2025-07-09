import { useState } from 'react'

export function useMinecraftProfile() {
  const [ign, setIgn] = useState<string>("")
  const [skinUrl, setSkinUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  // Crafatar API: https://crafatar.com/avatars/<username>
  const fetchSkin = async (username: string) => {
    setLoading(true)
    setError("")
    setIgn(username)
    try {
      // Just set the URL, Crafatar will 404 if not found
      setSkinUrl(`https://crafatar.com/avatars/${encodeURIComponent(username)}?overlay`)
    } catch (e) {
      setError("Could not fetch skin.")
      setSkinUrl("")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setIgn("")
    setSkinUrl("")
    setError("")
  }

  return { ign, skinUrl, loading, error, fetchSkin, logout }
}
