import { getDatabase } from './database';
import { Student } from './types';

export async function createStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
  const db = await getDatabase();
  
  const result = await db.run(`
    INSERT INTO students (
      name, email, phone, age, gender, goals, 
      medical_conditions, emergency_contact, membership_type, start_date, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    studentData.name,
    studentData.email,
    studentData.phone || null,
    studentData.age || null,
    studentData.gender || null,
    studentData.goals || null,
    studentData.medicalConditions || null,
    studentData.emergencyContact || null,
    studentData.membershipType || null,
    studentData.startDate || new Date().toISOString(),
    studentData.status || 'active'
  ]);

  const student = await db.get('SELECT * FROM students WHERE id = ?', result.lastID);
  return mapDbStudentToStudent(student);
}

export async function getAllStudents(): Promise<Student[]> {
  const db = await getDatabase();
  const students = await db.all('SELECT * FROM students WHERE status = "active" ORDER BY created_at DESC');
  return students.map(mapDbStudentToStudent);
}

export async function getStudentById(id: number): Promise<Student | null> {
  const db = await getDatabase();
  const student = await db.get('SELECT * FROM students WHERE id = ?', id);
  return student ? mapDbStudentToStudent(student) : null;
}

export async function updateStudent(id: number, studentData: Partial<Student>): Promise<Student | null> {
  const db = await getDatabase();
  
  const updateFields = [];
  const updateValues = [];
  
  if (studentData.name) {
    updateFields.push('name = ?');
    updateValues.push(studentData.name);
  }
  if (studentData.email) {
    updateFields.push('email = ?');
    updateValues.push(studentData.email);
  }
  if (studentData.phone !== undefined) {
    updateFields.push('phone = ?');
    updateValues.push(studentData.phone);
  }
  if (studentData.age !== undefined) {
    updateFields.push('age = ?');
    updateValues.push(studentData.age);
  }
  if (studentData.gender !== undefined) {
    updateFields.push('gender = ?');
    updateValues.push(studentData.gender);
  }
  if (studentData.goals !== undefined) {
    updateFields.push('goals = ?');
    updateValues.push(studentData.goals);
  }
  if (studentData.medicalConditions !== undefined) {
    updateFields.push('medical_conditions = ?');
    updateValues.push(studentData.medicalConditions);
  }
  if (studentData.emergencyContact !== undefined) {
    updateFields.push('emergency_contact = ?');
    updateValues.push(studentData.emergencyContact);
  }
  if (studentData.membershipType !== undefined) {
    updateFields.push('membership_type = ?');
    updateValues.push(studentData.membershipType);
  }
  if (studentData.status !== undefined) {
    updateFields.push('status = ?');
    updateValues.push(studentData.status);
  }
  
  updateFields.push('updated_at = ?');
  updateValues.push(new Date().toISOString());
  updateValues.push(id);

  await db.run(`
    UPDATE students 
    SET ${updateFields.join(', ')} 
    WHERE id = ?
  `, updateValues);

  return getStudentById(id);
}

export async function deleteStudent(id: number): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.run('UPDATE students SET status = "deleted" WHERE id = ?', id);
  return result.changes > 0;
}

function mapDbStudentToStudent(dbStudent: any): Student {
  return {
    id: dbStudent.id,
    name: dbStudent.name,
    email: dbStudent.email,
    phone: dbStudent.phone,
    age: dbStudent.age,
    gender: dbStudent.gender,
    goals: dbStudent.goals,
    medicalConditions: dbStudent.medical_conditions,
    emergencyContact: dbStudent.emergency_contact,
    membershipType: dbStudent.membership_type,
    startDate: dbStudent.start_date,
    status: dbStudent.status,
    programs: [] // Bu ayrı bir sorgu ile doldurulacak
  };
} 