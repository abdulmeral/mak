'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail } from 'lucide-react';
import { Student } from '@/lib/types';

interface StudentsProps {
  onPageChange: (page: string) => void;
}

export default function Students({ onPageChange }: StudentsProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    goals: '',
    medicalConditions: '',
    emergencyContact: '',
    membershipType: 'basic'
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = async () => {
    if (newStudent.name && newStudent.email) {
      try {
        const response = await fetch('/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newStudent.name,
            email: newStudent.email,
            phone: newStudent.phone || null,
            age: newStudent.age ? parseInt(newStudent.age) : null,
            gender: newStudent.gender || null,
            goals: newStudent.goals || null,
            medicalConditions: newStudent.medicalConditions || null,
            emergencyContact: newStudent.emergencyContact || null,
            membershipType: newStudent.membershipType,
            status: 'active'
          }),
        });

        if (response.ok) {
          const newStudentData = await response.json();
          setStudents([newStudentData, ...students]);
          setNewStudent({
            name: '',
            email: '',
            phone: '',
            age: '',
            gender: '',
            goals: '',
            medicalConditions: '',
            emergencyContact: '',
            membershipType: 'basic'
          });
          setIsAddModalOpen(false);
        }
      } catch (error) {
        console.error('Error creating student:', error);
      }
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setStudents(students.filter(s => s.id !== id));
        }
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const toggleStudentStatus = async (id: number) => {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const newStatus = student.status === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStudents(students.map(s => 
          s.id === id 
            ? { ...s, status: newStatus }
            : s
        ));
      }
    } catch (error) {
      console.error('Error updating student status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Öğrenci Yönetimi</h1>
          <p className="text-gray-400">Öğrencilerinizi ekleyin, düzenleyin ve takip edin</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary px-6 py-3 rounded-lg text-white font-semibold flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Öğrenci</span>
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Öğrenci ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="bg-dark-200 p-4 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{students.filter(s => s.status === 'active').length}</div>
            <div className="text-sm text-gray-400">Aktif Öğrenci</div>
          </div>
        </div>
        <div className="bg-dark-200 p-4 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400">{students.length}</div>
            <div className="text-sm text-gray-400">Toplam Öğrenci</div>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-400">Öğrenciler yükleniyor...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-dark-200 rounded-xl p-6 border border-gray-800 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">{student.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>{student.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                student.status === 'active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {student.status === 'active' ? 'Aktif' : 'Pasif'}
              </div>
              <button
                onClick={() => toggleStudentStatus(student.id)}
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                {student.status === 'active' ? 'Pasif Yap' : 'Aktif Yap'}
              </button>
            </div>

            {student.currentProgram && (
              <div className="mt-4 p-3 bg-dark-300 rounded-lg">
                <div className="text-sm font-medium text-white">Mevcut Program</div>
                <div className="text-xs text-gray-400">{student.currentProgram.name}</div>
              </div>
            )}
          </div>
        ))}
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-200 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Yeni Öğrenci Ekle</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="Öğrenci adı ve soyadı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="+90 555 123 4567"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Yaş
                  </label>
                  <input
                    type="number"
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cinsiyet
                  </label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({...newStudent, gender: e.target.value})}
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="">Seçiniz</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hedefler
                </label>
                <textarea
                  value={newStudent.goals}
                  onChange={(e) => setNewStudent({...newStudent, goals: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="Kilo verme, kas kazanma, kondisyon artırma..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sağlık Durumu
                </label>
                <textarea
                  value={newStudent.medicalConditions}
                  onChange={(e) => setNewStudent({...newStudent, medicalConditions: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="Bilinen sağlık sorunları, alerjiler..."
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
                onClick={handleAddStudent}
                className="btn-primary px-6 py-3 rounded-lg text-white font-semibold"
              >
                Öğrenci Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-200 rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Öğrenci Detayları</h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedStudent.name}</h3>
                  <p className="text-gray-400">
                    Kayıt: {selectedStudent.startDate ? new Date(selectedStudent.startDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">E-posta</label>
                  <div className="text-white">{selectedStudent.email}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Telefon</label>
                  <div className="text-white">{selectedStudent.phone}</div>
                </div>
              </div>

              {selectedStudent.goals && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Hedefler</label>
                  <div className="text-white bg-dark-300 p-3 rounded-lg">{selectedStudent.goals}</div>
                </div>
              )}

              {selectedStudent.medicalConditions && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Sağlık Durumu</label>
                  <div className="text-white bg-dark-300 p-3 rounded-lg">{selectedStudent.medicalConditions}</div>
                </div>
              )}

              {selectedStudent.programs && selectedStudent.programs.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Atanmış Programlar</label>
                  <div className="space-y-2">
                    {selectedStudent.programs.map((program) => (
                      <div key={program.id} className="bg-dark-300 p-4 rounded-lg">
                        <h4 className="font-semibold text-white">{program.name}</h4>
                        <p className="text-gray-400 text-sm">{program.description}</p>
                        <p className="text-primary-400 text-sm mt-2">
                          Süre: {program.durationWeeks} hafta
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => onPageChange('programs')}
                  className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Program Ata
                </button>
                <button
                  onClick={() => onPageChange('messages')}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                >
                  Mesaj Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 