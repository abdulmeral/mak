'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Students from '@/components/Students';
import Programs from '@/components/Programs';
import Messages from '@/components/Messages';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'students':
        return <Students onPageChange={setCurrentPage} />;
      case 'programs':
        return <Programs onPageChange={setCurrentPage} />;
      case 'messages':
        return <Messages onPageChange={setCurrentPage} />;
      case 'settings':
        return <Settings onPageChange={setCurrentPage} />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8">
          {renderCurrentPage()}
        </div>
      </main>

      {/* Footer inspired by makinetalha.com */}
      <footer className="bg-dark-200 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold gradient-text mb-4">TrainerPlatform</h3>
              <p className="text-gray-400 mb-4">
                Eğitmenlerin öğrencilerini kontrol edebildiği modern platform. 
                Öğrencilerinizi takip edin, programlar oluşturun ve başarıya giden yolda onlara rehberlik edin.
              </p>
              <div className="flex space-x-4 text-sm text-gray-400">
                <span>+90 541 110 10 09</span>
                <span>trainer@platform.com</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('dashboard')} className="hover:text-primary-400 transition-colors">Dashboard</button></li>
                <li><button onClick={() => setCurrentPage('students')} className="hover:text-primary-400 transition-colors">Öğrenciler</button></li>
                <li><button onClick={() => setCurrentPage('programs')} className="hover:text-primary-400 transition-colors">Programlar</button></li>
                <li><button onClick={() => setCurrentPage('messages')} className="hover:text-primary-400 transition-colors">Mesajlar</button></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Özellikler</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Öğrenci Yönetimi</li>
                <li>Program Oluşturma</li>
                <li>İlerleme Takibi</li>
                <li>Mesajlaşma</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 TrainerPlatform. Tüm hakları saklıdır.</p>
            <p className="mt-2 text-sm">
              Eğitimde başarı için tasarlandı. 
              <span className="gradient-text font-semibold"> Bahane bulmak saatte sıfır kalori yakıyor!</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Settings component (simple placeholder)
function Settings({ onPageChange }: { onPageChange: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Ayarlar</h1>
        <p className="text-gray-400">Platform ayarlarını yönetin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Profil Bilgileri</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Eğitmen Adı</label>
              <input
                type="text"
                defaultValue="Trainer Platform"
                className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
              <input
                type="email"
                defaultValue="trainer@platform.com"
                className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
              <input
                type="tel"
                defaultValue="+90 541 110 10 09"
                className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Bildirim Ayarları</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-white">E-posta Bildirimleri</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white">Yeni Öğrenci Bildirimi</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-white">Mesaj Bildirimleri</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Platform İstatistikleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">12</div>
            <div className="text-sm text-gray-400">Toplam Öğrenci</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">8</div>
            <div className="text-sm text-gray-400">Aktif Program</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">45</div>
            <div className="text-sm text-gray-400">Gönderilen Mesaj</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">30</div>
            <div className="text-sm text-gray-400">Gün Aktif</div>
          </div>
        </div>
      </div>
    </div>
  );
} 