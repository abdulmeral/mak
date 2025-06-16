'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, Mail, TrendingUp, Plus, Eye } from 'lucide-react';
import { Student, Program } from '@/lib/types';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

export default function Dashboard({ onPageChange }: DashboardProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsResponse, programsResponse] = await Promise.all([
        fetch('/api/students'),
        fetch('/api/programs')
      ]);

      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      }

      if (programsResponse.ok) {
        const programsData = await programsResponse.json();
        setPrograms(programsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeStudents = students.filter(s => s.status === 'active').length;
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const unreadMessages = 0; // Bu daha sonra mesaj sistemi ile entegre edilecek

  const stats = [
    {
      title: 'Aktif Öğrenciler',
      value: activeStudents,
      total: students.length,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Aktif Programlar',
      value: activePrograms,
      total: programs.length,
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Okunmamış Mesajlar',
      value: unreadMessages,
      total: 0,
      icon: Mail,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Bu Ay Yeni Kayıt',
      value: 2,
      total: 5,
      icon: TrendingUp,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/10',
    },
  ];

  const recentStudents = students.slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-400">Dashboard yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="hero-gradient rounded-2xl p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">EĞİTMENE ADANMIŞ</span>
          <br />
          <span className="text-white">BİR PLATFORM</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Öğrencilerinizi takip edin, programlar oluşturun ve başarıya giden yolda onlara rehberlik edin.
        </p>
        <button
          onClick={() => onPageChange('students')}
          className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center space-x-2 mx-auto"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Öğrenci Ekle</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-dark-200 rounded-xl p-6 border border-gray-800 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">/{stat.total}</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${stat.color.replace('text-', 'bg-')}`}
                  style={{ width: `${(stat.value / stat.total) * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Students & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Students */}
        <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Son Eklenen Öğrenciler</h2>
            <button
              onClick={() => onPageChange('students')}
              className="text-primary-400 hover:text-primary-300 transition-colors flex items-center space-x-1"
            >
              <span>Tümünü Gör</span>
              <Eye className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentStudents.length > 0 ? (
              recentStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center space-x-4 p-4 bg-dark-300 rounded-lg hover:bg-dark-400 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{student.name}</h3>
                    <p className="text-gray-400 text-sm">{student.email}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {student.status === 'active' ? 'Aktif' : 'Pasif'}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Henüz öğrenci eklenmemiş</p>
                <button
                  onClick={() => onPageChange('students')}
                  className="mt-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  İlk öğrenciyi ekle
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => onPageChange('students')}
              className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg hover:bg-primary-500/20 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <Plus className="h-6 w-6 text-primary-400" />
                <div>
                  <h3 className="text-white font-semibold">Yeni Öğrenci Ekle</h3>
                  <p className="text-gray-400 text-sm">Sisteme yeni öğrenci kaydı yapın</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => onPageChange('programs')}
              className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-green-400" />
                <div>
                  <h3 className="text-white font-semibold">Program Oluştur</h3>
                  <p className="text-gray-400 text-sm">Yeni antrenman programı hazırlayın</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => onPageChange('messages')}
              className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="text-white font-semibold">Mesaj Gönder</h3>
                  <p className="text-gray-400 text-sm">Öğrencilerinizle iletişim kurun</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 