export interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
  goals?: string;
  medicalConditions?: string;
  emergencyContact?: string;
  membershipType?: string;
  startDate?: string;
  status: 'active' | 'inactive' | 'deleted';
  programs: Program[];
}

export interface Program {
  id: number;
  name: string;
  description?: string;
  durationWeeks?: number;
  difficultyLevel?: string;
  category?: string;
  exercises: Exercise[];
  schedule: any[];
  price?: number;
  maxParticipants?: number;
  status: 'active' | 'inactive' | 'deleted';
  participants: Student[];
}

export interface Exercise {
  id: number;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'powerlifting';
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // minutes
  instructions?: string;
}

export interface Message {
  id: string;
  studentId: string;
  trainerId: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'email' | 'notification' | 'system';
} 