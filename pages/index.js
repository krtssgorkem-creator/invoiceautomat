import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h1>Hoş Geldiniz!</h1>
        <p>İşinizi Kolaylaştıran, Hızlı ve Güvenli Faturalarla Tanışın!</p>
        <p>Faturalarınızı saniyeler içinde oluşturun ve tüm işlerinizi kolaylaştırın.</p>
        <a href="/login">
          <button style={{ backgroundColor: '#4f46e5', color: 'white', padding: '10px 20px', borderRadius: 5 }}>
            Giriş Sayfasına Git
          </button>
        </a>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>InvoiceAutomat</h1>
      <p>Hoş geldin, {user.email}</p>
      <a href="/new-invoice">
        <button style={{ backgroundColor: '#16a34a', color: 'white', padding: '10px 20px', borderRadius: 5 }}>
          Yeni Fatura Oluştur
        </button>
      </a>
    </div>
  );
}
