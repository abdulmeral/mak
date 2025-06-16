import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  const dbPath = path.join(process.cwd(), 'data', 'trainer.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Tabloları oluştur
  await initializeTables();
  
  return db;
}

async function initializeTables() {
  if (!db) return;

  // Öğrenciler tablosu
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      age INTEGER,
      gender TEXT,
      goals TEXT,
      medical_conditions TEXT,
      emergency_contact TEXT,
      membership_type TEXT,
      start_date TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Programlar tablosu
  await db.exec(`
    CREATE TABLE IF NOT EXISTS programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      duration_weeks INTEGER,
      difficulty_level TEXT,
      category TEXT,
      exercises TEXT, -- JSON string
      schedule TEXT, -- JSON string
      price REAL,
      max_participants INTEGER,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Öğrenci-Program ilişki tablosu
  await db.exec(`
    CREATE TABLE IF NOT EXISTS student_programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      program_id INTEGER,
      start_date TEXT,
      end_date TEXT,
      status TEXT DEFAULT 'active',
      progress INTEGER DEFAULT 0,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students (id),
      FOREIGN KEY (program_id) REFERENCES programs (id)
    )
  `);

  // Mesajlar tablosu
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      sender_type TEXT, -- 'trainer' or 'student'
      message TEXT NOT NULL,
      message_type TEXT DEFAULT 'text',
      read_status BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students (id)
    )
  `);

  console.log('Database tables initialized successfully');
}

export async function closeDatabase() {
  if (db) {
    await db.close();
    db = null;
  }
} 