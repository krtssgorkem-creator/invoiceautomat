import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function NewInvoice() {
  const [buyer, setBuyer] = useState('')
  const [seller, setSeller] = useState('')
  const [total, setTotal] = useState('')
  const [message, setMessage] = useState('')

  const createInvoice = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user

    if (!user) {
      setMessage('Lütfen giriş yapın.')
      return
    }

    const { error } = await supabase.from('invoices').insert({
      user_id: user.id,
      buyer: { name: buyer },
      seller: { name: seller },
      total: parseFloat(total),
      vat: parseFloat(total) * 0.18,
      subtotal: parseFloat(total) * 0.82,
      currency: 'USD',
      vat_rate: 18,
      items: [],
    })

    if (error) setMessage('Hata: ' + error.message)
    else setMessage('✅ Fatura başarıyla oluşturuldu!')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Yeni Fatura Oluştur</h1>

      <input placeholder="Alıcı" value={buyer} onChange={(e) => setBuyer(e.target.value)} style={{ display: 'block', padding: 8, width: 300, marginBottom: 10 }} />
      <input placeholder="Satıcı" value={seller} onChange={(e) => setSeller(e.target.value)} style={{ display: 'block', padding: 8, width: 300, marginBottom: 10 }} />
      <input placeholder="Toplam Tutar" type="number" value={total} onChange={(e) => setTotal(e.target.value)} style={{ display: 'block', padding: 8, width: 300, marginBottom: 20 }} />

      <button onClick={createInvoice} style={{ backgroundColor: '#16a34a', color: 'white', padding: 10, borderRadius: 5 }}>Fatura Oluştur</button>
      {message && <p style={{ marginTop: 15 }}>{messa
