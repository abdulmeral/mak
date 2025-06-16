import { getDatabase } from './database';
import { Program } from './types';

export async function createProgram(programData: Omit<Program, 'id'>): Promise<Program> {
  const db = await getDatabase();
  
  const result = await db.run(`
    INSERT INTO programs (
      name, description, duration_weeks, difficulty_level, category,
      exercises, schedule, price, max_participants, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    programData.name,
    programData.description || null,
    programData.durationWeeks || null,
    programData.difficultyLevel || null,
    programData.category || null,
    JSON.stringify(programData.exercises || []),
    JSON.stringify(programData.schedule || []),
    programData.price || null,
    programData.maxParticipants || null,
    programData.status || 'active'
  ]);

  const program = await db.get('SELECT * FROM programs WHERE id = ?', result.lastID);
  return mapDbProgramToProgram(program);
}

export async function getAllPrograms(): Promise<Program[]> {
  const db = await getDatabase();
  const programs = await db.all('SELECT * FROM programs WHERE status = "active" ORDER BY created_at DESC');
  return programs.map(mapDbProgramToProgram);
}

export async function getProgramById(id: number): Promise<Program | null> {
  const db = await getDatabase();
  const program = await db.get('SELECT * FROM programs WHERE id = ?', id);
  return program ? mapDbProgramToProgram(program) : null;
}

export async function updateProgram(id: number, programData: Partial<Program>): Promise<Program | null> {
  const db = await getDatabase();
  
  const updateFields = [];
  const updateValues = [];
  
  if (programData.name) {
    updateFields.push('name = ?');
    updateValues.push(programData.name);
  }
  if (programData.description !== undefined) {
    updateFields.push('description = ?');
    updateValues.push(programData.description);
  }
  if (programData.durationWeeks !== undefined) {
    updateFields.push('duration_weeks = ?');
    updateValues.push(programData.durationWeeks);
  }
  if (programData.difficultyLevel !== undefined) {
    updateFields.push('difficulty_level = ?');
    updateValues.push(programData.difficultyLevel);
  }
  if (programData.category !== undefined) {
    updateFields.push('category = ?');
    updateValues.push(programData.category);
  }
  if (programData.exercises !== undefined) {
    updateFields.push('exercises = ?');
    updateValues.push(JSON.stringify(programData.exercises));
  }
  if (programData.schedule !== undefined) {
    updateFields.push('schedule = ?');
    updateValues.push(JSON.stringify(programData.schedule));
  }
  if (programData.price !== undefined) {
    updateFields.push('price = ?');
    updateValues.push(programData.price);
  }
  if (programData.maxParticipants !== undefined) {
    updateFields.push('max_participants = ?');
    updateValues.push(programData.maxParticipants);
  }
  if (programData.status !== undefined) {
    updateFields.push('status = ?');
    updateValues.push(programData.status);
  }
  
  updateFields.push('updated_at = ?');
  updateValues.push(new Date().toISOString());
  updateValues.push(id);

  await db.run(`
    UPDATE programs 
    SET ${updateFields.join(', ')} 
    WHERE id = ?
  `, updateValues);

  return getProgramById(id);
}

export async function deleteProgram(id: number): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.run('UPDATE programs SET status = "deleted" WHERE id = ?', id);
  return (result.changes || 0) > 0;
}

export async function assignProgramToStudent(studentId: number, programId: number, startDate?: string): Promise<boolean> {
  const db = await getDatabase();
  
  // Önce aynı öğrenci-program kombinasyonunun aktif olup olmadığını kontrol et
  const existing = await db.get(`
    SELECT id FROM student_programs 
    WHERE student_id = ? AND program_id = ? AND status = 'active'
  `, [studentId, programId]);
  
  if (existing) {
    return false; // Zaten atanmış
  }
  
  const result = await db.run(`
    INSERT INTO student_programs (student_id, program_id, start_date, status)
    VALUES (?, ?, ?, 'active')
  `, [studentId, programId, startDate || new Date().toISOString()]);
  
  return (result.changes || 0) > 0;
}

export async function getStudentPrograms(studentId: number): Promise<Program[]> {
  const db = await getDatabase();
  const programs = await db.all(`
    SELECT p.* FROM programs p
    JOIN student_programs sp ON p.id = sp.program_id
    WHERE sp.student_id = ? AND sp.status = 'active' AND p.status = 'active'
    ORDER BY sp.start_date DESC
  `, [studentId]);
  
  return programs.map(mapDbProgramToProgram);
}

function mapDbProgramToProgram(dbProgram: any): Program {
  return {
    id: dbProgram.id,
    name: dbProgram.name,
    description: dbProgram.description,
    durationWeeks: dbProgram.duration_weeks,
    difficultyLevel: dbProgram.difficulty_level,
    category: dbProgram.category,
    exercises: dbProgram.exercises ? JSON.parse(dbProgram.exercises) : [],
    schedule: dbProgram.schedule ? JSON.parse(dbProgram.schedule) : [],
    price: dbProgram.price,
    maxParticipants: dbProgram.max_participants,
    status: dbProgram.status,
    participants: [] // Bu ayrı bir sorgu ile doldurulacak
  };
} 