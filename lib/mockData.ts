import { Student, TrainingProgram, Exercise, Message } from './types';

export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Squat',
    category: 'powerlifting',
    sets: 5,
    reps: 5,
    weight: 100,
    instructions: 'Derin squat pozisyonuna inin. Dizler ayak parmak ucunun arkasında kalmalı.'
  },
  {
    id: '2',
    name: 'Bench Press',
    category: 'powerlifting',
    sets: 5,
    reps: 5,
    weight: 80,
    instructions: 'Barı göğsünüze değene kadar indirin. Kontrollü bir şekilde yukarı itin.'
  },
  {
    id: '3',
    name: 'Deadlift',
    category: 'powerlifting',
    sets: 5,
    reps: 3,
    weight: 120,
    instructions: 'Barı yerden kaldırırken sırtınızı düz tutun. Kalçalarınızı arkaya itin.'
  },
  {
    id: '4',
    name: 'Koşu',
    category: 'cardio',
    duration: 30,
    instructions: '30 dakika orta tempoda koşu yapın. Nabzınızı takip edin.'
  }
];

export const mockPrograms: TrainingProgram[] = [
  {
    id: '1',
    name: 'Powerlifting Başlangıç',
    description: 'Squat, bench press ve deadlift temel hareketlerine odaklanan başlangıç programı',
    duration: 12,
    exercises: mockExercises.slice(0, 3),
    assignedDate: new Date('2024-01-15'),
    status: 'active',
    studentId: '1'
  },
  {
    id: '2',
    name: 'Kilo Verme Programı',
    description: 'Kardio ve kuvvet antrenmanı kombinasyonu',
    duration: 8,
    exercises: mockExercises,
    assignedDate: new Date('2024-02-01'),
    status: 'active',
    studentId: '2'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    dateJoined: new Date('2024-01-10'),
    currentProgram: mockPrograms[0],
    programHistory: [mockPrograms[0]],
    status: 'active',
    notes: 'Powerlifting sporuna yeni başladı. Teknik gelişimi iyi.'
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    phone: '+90 555 987 6543',
    dateJoined: new Date('2024-01-20'),
    currentProgram: mockPrograms[1],
    programHistory: [mockPrograms[1]],
    status: 'active',
    notes: 'Kilo verme hedefi var. Motivasyonu yüksek.'
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    phone: '+90 555 456 7890',
    dateJoined: new Date('2023-12-15'),
    programHistory: [],
    status: 'inactive',
    notes: 'Geçici olarak pasif durumda.'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    studentId: '1',
    trainerId: 'trainer1',
    subject: 'Squat Tekniği Hakkında',
    content: 'Merhaba, squat hareketinde diz pozisyonum konusunda sorularım var.',
    timestamp: new Date('2024-12-10T10:30:00'),
    read: false,
    type: 'email'
  },
  {
    id: '2',
    studentId: '2',
    trainerId: 'trainer1',
    subject: 'Bu Haftaki Program',
    content: 'Bu hafta ek kardyo seansı ekleyebilir miyiz?',
    timestamp: new Date('2024-12-09T14:15:00'),
    read: true,
    type: 'email'
  }
]; 