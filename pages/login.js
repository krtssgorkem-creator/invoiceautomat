import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage('Hata: ' + error.message)
    else setMessage('Giriş linki e-posta adresine gönderildi!')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20%' }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>InvoiceAutomat Giriş</h1>
      <input
        type="email"
        placeholder="E-posta adresin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc', width: 250, marginBottom: 10 }}
      />
      <button onClick={handleLogin} style={{ backgroundColor: '#4f46e5', color: 'white', padding: 10, borderRadius: 5 }}>
        Giriş Linki Gönder
      </button>
      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  )
}
