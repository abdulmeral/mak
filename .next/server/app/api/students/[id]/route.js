"use strict";(()=>{var e={};e.id=294,e.ids=[294],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},6378:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>R,originalPathname:()=>h,patchFetch:()=>N,requestAsyncStorage:()=>p,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>l,staticGenerationBailout:()=>g});var s={};a.r(s),a.d(s,{DELETE:()=>T,GET:()=>o,PUT:()=>d});var n=a(5419),r=a(9108),i=a(9678),E=a(8070),u=a(3992);async function o(e,{params:t}){try{let e=parseInt(t.id),a=await (0,u.KD)(e);if(!a)return E.Z.json({error:"Student not found"},{status:404});return E.Z.json(a)}catch(e){return console.error("Error fetching student:",e),E.Z.json({error:"Failed to fetch student"},{status:500})}}async function d(e,{params:t}){try{let a=parseInt(t.id),s=await e.json(),n=await (0,u.Gc)(a,s);if(!n)return E.Z.json({error:"Student not found"},{status:404});return E.Z.json(n)}catch(e){return console.error("Error updating student:",e),E.Z.json({error:"Failed to update student"},{status:500})}}async function T(e,{params:t}){try{let e=parseInt(t.id);if(!await (0,u.MA)(e))return E.Z.json({error:"Student not found"},{status:404});return E.Z.json({success:!0})}catch(e){return console.error("Error deleting student:",e),E.Z.json({error:"Failed to delete student"},{status:500})}}let c=new n.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/students/[id]/route",pathname:"/api/students/[id]",filename:"route",bundlePath:"app/api/students/[id]/route"},resolvedPagePath:"/Users/abdul.meral/Desktop/projects/mk/app/api/students/[id]/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:p,staticGenerationAsyncStorage:l,serverHooks:m,headerHooks:R,staticGenerationBailout:g}=c,h="/api/students/[id]/route";function N(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:l})}},7078:(e,t,a)=>{a.d(t,{N:()=>o});let s=require("sqlite3");var n=a.n(s),r=a(8290),i=a(1017),E=a.n(i);let u=null;async function o(){if(u)return u;let e=E().join(process.cwd(),"data","trainer.db");return u=await (0,r.bA)({filename:e,driver:n().Database}),await d(),u}async function d(){u&&(await u.exec(`
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
  `),await u.exec(`
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
  `),await u.exec(`
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
  `),await u.exec(`
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
  `),console.log("Database tables initialized successfully"))}},3992:(e,t,a)=>{a.d(t,{Gc:()=>E,KD:()=>i,LK:()=>n,MA:()=>u,uH:()=>r});var s=a(7078);async function n(e){let t=await (0,s.N)(),a=await t.run(`
    INSERT INTO students (
      name, email, phone, age, gender, goals, 
      medical_conditions, emergency_contact, membership_type, start_date, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,[e.name,e.email,e.phone||null,e.age||null,e.gender||null,e.goals||null,e.medicalConditions||null,e.emergencyContact||null,e.membershipType||null,e.startDate||new Date().toISOString(),e.status||"active"]);return o(await t.get("SELECT * FROM students WHERE id = ?",a.lastID))}async function r(){let e=await (0,s.N)();return(await e.all('SELECT * FROM students WHERE status = "active" ORDER BY created_at DESC')).map(o)}async function i(e){let t=await (0,s.N)(),a=await t.get("SELECT * FROM students WHERE id = ?",e);return a?o(a):null}async function E(e,t){let a=await (0,s.N)(),n=[],r=[];return t.name&&(n.push("name = ?"),r.push(t.name)),t.email&&(n.push("email = ?"),r.push(t.email)),void 0!==t.phone&&(n.push("phone = ?"),r.push(t.phone)),void 0!==t.age&&(n.push("age = ?"),r.push(t.age)),void 0!==t.gender&&(n.push("gender = ?"),r.push(t.gender)),void 0!==t.goals&&(n.push("goals = ?"),r.push(t.goals)),void 0!==t.medicalConditions&&(n.push("medical_conditions = ?"),r.push(t.medicalConditions)),void 0!==t.emergencyContact&&(n.push("emergency_contact = ?"),r.push(t.emergencyContact)),void 0!==t.membershipType&&(n.push("membership_type = ?"),r.push(t.membershipType)),void 0!==t.status&&(n.push("status = ?"),r.push(t.status)),n.push("updated_at = ?"),r.push(new Date().toISOString()),r.push(e),await a.run(`
    UPDATE students 
    SET ${n.join(", ")} 
    WHERE id = ?
  `,r),i(e)}async function u(e){let t=await (0,s.N)();return((await t.run('UPDATE students SET status = "deleted" WHERE id = ?',e)).changes||0)>0}function o(e){return{id:e.id,name:e.name,email:e.email,phone:e.phone,age:e.age,gender:e.gender,goals:e.goals,medicalConditions:e.medical_conditions,emergencyContact:e.emergency_contact,membershipType:e.membership_type,startDate:e.start_date,status:e.status,programs:[]}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[638,789],()=>a(6378));module.exports=s})();