'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Clock, Target, Dumbbell } from 'lucide-react';
import { Program } from '@/lib/types';

interface ProgramsProps {
  onPageChange: (page: string) => void;
}

export default function Programs({ onPageChange }: ProgramsProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [newProgram, setNewProgram] = useState({
    name: '',
    description: '',
    durationWeeks: 8,
    difficultyLevel: 'beginner',
    category: 'strength',
    price: 0,
    maxParticipants: 10
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      if (response.ok) {
        const data = await response.json();
        setPrograms(data);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (program.description && program.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddProgram = async () => {
    if (newProgram.name && newProgram.description) {
      try {
        const response = await fetch('/api/programs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newProgram.name,
            description: newProgram.description,
            durationWeeks: newProgram.durationWeeks,
            difficultyLevel: newProgram.difficultyLevel,
            category: newProgram.category,
            price: newProgram.price,
            maxParticipants: newProgram.maxParticipants,
            exercises: [],
            schedule: [],
            status: 'active'
          }),
        });

        if (response.ok) {
          const newProgramData = await response.json();
          setPrograms([newProgramData, ...programs]);
          setNewProgram({
            name: '',
            description: '',
            durationWeeks: 8,
            difficultyLevel: 'beginner',
            category: 'strength',
            price: 0,
            maxParticipants: 10
          });
          setIsAddModalOpen(false);
        }
      } catch (error) {
        console.error('Error creating program:', error);
      }
    }
  };

  const handleDeleteProgram = async (id: number) => {
    if (confirm('Bu programı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/programs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPrograms(programs.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error('Error deleting program:', error);
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'powerlifting':
        return <Dumbbell className="h-4 w-4" />;
      case 'cardio':
        return <Target className="h-4 w-4" />;
      case 'strength':
        return <Dumbbell className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'powerlifting':
        return 'text-red-400 bg-red-500/10';
      case 'cardio':
        return 'text-blue-400 bg-blue-500/10';
      case 'strength':
        return 'text-green-400 bg-green-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-400">Programlar yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Program Yönetimi</h1>
          <p className="text-gray-400">Antrenman programları oluşturun ve düzenleyin</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary px-6 py-3 rounded-lg text-white font-semibold flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Program</span>
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Program ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="bg-dark-200 p-4 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{programs.filter(p => p.status === 'active').length}</div>
            <div className="text-sm text-gray-400">Aktif Program</div>
          </div>
        </div>
        <div className="bg-dark-200 p-4 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{programs.length}</div>
            <div className="text-sm text-gray-400">Toplam Program</div>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-dark-200 rounded-xl p-6 border border-gray-800 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                    <Dumbbell className="h-5 w-5 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    program.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {program.status === 'active' ? 'Aktif' : 'Tamamlandı'}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{program.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{program.description}</p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{program.durationWeeks} hafta</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Target className="h-4 w-4" />
                  <span>{program.category}</span>
                </div>
              </div>

              {program.price && (
                <div className="mt-4 p-3 bg-dark-300 rounded-lg">
                  <div className="text-sm font-medium text-white">Fiyat</div>
                  <div className="text-primary-400 font-bold">{program.price} ₺</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">Henüz program eklenmemiş</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            İlk programı ekle
          </button>
        </div>
      )}

      {/* Add Program Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-200 rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-800 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">Yeni Program Oluştur</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Program Adı *
                  </label>
                  <input
                    type="text"
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    placeholder="Program adı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Süre (Hafta) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={newProgram.durationWeeks}
                    onChange={(e) => setNewProgram({...newProgram, durationWeeks: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kategori
                  </label>
                  <select
                    value={newProgram.category}
                    onChange={(e) => setNewProgram({...newProgram, category: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="strength">Güç Antrenmanı</option>
                    <option value="cardio">Kardiyovasküler</option>
                    <option value="powerlifting">Powerlifting</option>
                    <option value="flexibility">Esneklik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zorluk Seviyesi
                  </label>
                  <select
                    value={newProgram.difficultyLevel}
                    onChange={(e) => setNewProgram({...newProgram, difficultyLevel: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="beginner">Başlangıç</option>
                    <option value="intermediate">Orta</option>
                    <option value="advanced">İleri</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newProgram.price}
                    onChange={(e) => setNewProgram({...newProgram, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maksimum Katılımcı
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newProgram.maxParticipants}
                    onChange={(e) => setNewProgram({...newProgram, maxParticipants: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Açıklama *
                </label>
                <textarea
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="Program açıklaması..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleAddProgram}
                className="btn-primary px-6 py-3 rounded-lg text-white font-semibold"
              >
                Program Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-200 rounded-xl p-6 w-full max-w-4xl mx-4 border border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Program Detayları</h2>
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedProgram.name}</h3>
                  <p className="text-gray-400 mb-4">{selectedProgram.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedProgram.durationWeeks} hafta</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span className="capitalize">{selectedProgram.category}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`px-4 py-2 rounded-lg text-center ${
                    selectedProgram.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedProgram.status === 'active' ? 'Aktif Program' : 'Tamamlanmış Program'}
                  </div>
                  
                  {selectedProgram.price && (
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Fiyat</div>
                      <div className="text-white font-bold">{selectedProgram.price} ₺</div>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-sm text-gray-400">Zorluk Seviyesi</div>
                    <div className="text-white capitalize">{selectedProgram.difficultyLevel}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => onPageChange('students')}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Öğrenciye Ata
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 