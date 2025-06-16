'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Send, Mail, User } from 'lucide-react';
import { Student } from '@/lib/types';

interface Message {
  id: string;
  studentId: number;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'email' | 'notification';
}

interface MessagesProps {
  onPageChange: (page: string) => void;
}

export default function Messages({ onPageChange }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'sent'>('all');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({
    recipientId: '',
    subject: '',
    content: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsResponse = await fetch('/api/students');
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
        
        // Mock messages for now - will be replaced with real API later
        if (studentsData.length > 0) {
          setMessages([
            {
              id: '1',
              studentId: studentsData[0].id,
              subject: 'Antrenman Programı Hakkında',
              content: 'Merhaba, yeni antrenman programım hakkında sorularım var...',
              timestamp: new Date(),
              read: false,
              type: 'email'
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'unread') return matchesSearch && !message.read;
    if (filterType === 'sent') return matchesSearch; // Will be implemented later
    return matchesSearch;
  });

  const handleSendMessage = () => {
    if (newMessage.recipientId && newMessage.subject && newMessage.content) {
      const message: Message = {
        id: Date.now().toString(),
        studentId: parseInt(newMessage.recipientId),
        subject: newMessage.subject,
        content: newMessage.content,
        timestamp: new Date(),
        read: true, // Sent messages are marked as read
        type: 'email'
      };
      
      setMessages([message, ...messages]);
      setNewMessage({ recipientId: '', subject: '', content: '' });
      setIsComposeModalOpen(false);
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, read: true } : m
    ));
  };

  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Bilinmeyen Öğrenci';
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-400">Mesajlar yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mesajlar</h1>
          <p className="text-gray-400">Öğrencilerinizle iletişim kurun ve mesajları yönetin</p>
        </div>
        <button
          onClick={() => setIsComposeModalOpen(true)}
          className="btn-primary px-6 py-3 rounded-lg text-white font-semibold flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Mesaj</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Mesaj ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
          >
            <option value="all">Tüm Mesajlar</option>
            <option value="unread">Okunmamış</option>
            <option value="sent">Gönderilen</option>
          </select>
        </div>
        <div className="bg-dark-200 p-4 rounded-lg border border-gray-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{unreadCount}</div>
            <div className="text-sm text-gray-400">Okunmamış</div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 bg-dark-200 rounded-xl border border-gray-800">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Mesaj bulunamadı</h3>
            <p className="text-gray-400">Henüz hiç mesaj yok veya arama kriterlerinize uygun mesaj bulunamadı.</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-dark-200 rounded-xl p-6 border border-gray-800 cursor-pointer transition-all hover:bg-dark-300 ${
                !message.read ? 'border-primary-500/30 bg-primary-500/5' : ''
              }`}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.read) markAsRead(message.id);
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{getStudentName(message.studentId)}</h3>
                    <p className="text-sm text-gray-400">{message.timestamp.toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!message.read && (
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  )}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    message.type === 'email'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {message.type === 'email' ? 'E-posta' : 'Bildirim'}
                  </div>
                </div>
              </div>
              
              <h4 className="font-semibold text-white mb-2">{message.subject}</h4>
              <p className="text-gray-400 line-clamp-2">{message.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Compose Message Modal */}
      {isComposeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-200 rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Yeni Mesaj</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Alıcı *
                </label>
                <select
                  value={newMessage.recipientId}
                  onChange={(e) => setNewMessage({...newMessage, recipientId: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Öğrenci seçin...</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Konu *
                </label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="Mesaj konusu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mesaj *
                </label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  placeholder="Mesajınızı yazın..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsComposeModalOpen(false)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSendMessage}
                className="btn-primary px-6 py-3 rounded-lg text-white font-semibold flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Gönder</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-200 rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Mesaj Detayı</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-dark-300 rounded-lg">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{getStudentName(selectedMessage.studentId)}</h3>
                  <p className="text-sm text-gray-400">{selectedMessage.timestamp.toLocaleDateString('tr-TR')}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedMessage.type === 'email'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {selectedMessage.type === 'email' ? 'E-posta' : 'Bildirim'}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">{selectedMessage.subject}</h4>
                <div className="bg-dark-300 p-4 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedMessage(null)}
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