"use strict";(()=>{var e={};e.id=393,e.ids=[393],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},4090:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>m,originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>c,routeModule:()=>d,serverHooks:()=>l,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>R});var s={};a.r(s),a.d(s,{GET:()=>u,POST:()=>o});var n=a(5419),r=a(9108),i=a(9678),E=a(8070),T=a(3992);async function u(){try{let e=await (0,T.uH)();return E.Z.json(e)}catch(e){return console.error("Error fetching students:",e),E.Z.json({error:"Failed to fetch students"},{status:500})}}async function o(e){try{let t=await e.json(),a=await (0,T.LK)(t);return E.Z.json(a,{status:201})}catch(e){return console.error("Error creating student:",e),E.Z.json({error:"Failed to create student"},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/students/route",pathname:"/api/students",filename:"route",bundlePath:"app/api/students/route"},resolvedPagePath:"/Users/abdul.meral/Desktop/projects/mk/app/api/students/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:c,staticGenerationAsyncStorage:p,serverHooks:l,headerHooks:m,staticGenerationBailout:R}=d,g="/api/students/route";function h(){return(0,i.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:p})}},7078:(e,t,a)=>{a.d(t,{N:()=>u});let s=require("sqlite3");var n=a.n(s),r=a(8290),i=a(1017),E=a.n(i);let T=null;async function u(){if(T)return T;let e=E().join(process.cwd(),"data","trainer.db");return T=await (0,r.bA)({filename:e,driver:n().Database}),await o(),T}async function o(){T&&(await T.exec(`
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
  `),await T.exec(`
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
  `),await T.exec(`
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
  `),await T.exec(`
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
  `),console.log("Database tables initialized successfully"))}},3992:(e,t,a)=>{a.d(t,{Gc:()=>E,KD:()=>i,LK:()=>n,MA:()=>T,uH:()=>r});var s=a(7078);async function n(e){let t=await (0,s.N)(),a=await t.run(`
    INSERT INTO students (
      name, email, phone, age, gender, goals, 
      medical_conditions, emergency_contact, membership_type, start_date, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,[e.name,e.email,e.phone||null,e.age||null,e.gender||null,e.goals||null,e.medicalConditions||null,e.emergencyContact||null,e.membershipType||null,e.startDate||new Date().toISOString(),e.status||"active"]);return u(await t.get("SELECT * FROM students WHERE id = ?",a.lastID))}async function r(){let e=await (0,s.N)();return(await e.all('SELECT * FROM students WHERE status = "active" ORDER BY created_at DESC')).map(u)}async function i(e){let t=await (0,s.N)(),a=await t.get("SELECT * FROM students WHERE id = ?",e);return a?u(a):null}async function E(e,t){let a=await (0,s.N)(),n=[],r=[];return t.name&&(n.push("name = ?"),r.push(t.name)),t.email&&(n.push("email = ?"),r.push(t.email)),void 0!==t.phone&&(n.push("phone = ?"),r.push(t.phone)),void 0!==t.age&&(n.push("age = ?"),r.push(t.age)),void 0!==t.gender&&(n.push("gender = ?"),r.push(t.gender)),void 0!==t.goals&&(n.push("goals = ?"),r.push(t.goals)),void 0!==t.medicalConditions&&(n.push("medical_conditions = ?"),r.push(t.medicalConditions)),void 0!==t.emergencyContact&&(n.push("emergency_contact = ?"),r.push(t.emergencyContact)),void 0!==t.membershipType&&(n.push("membership_type = ?"),r.push(t.membershipType)),void 0!==t.status&&(n.push("status = ?"),r.push(t.status)),n.push("updated_at = ?"),r.push(new Date().toISOString()),r.push(e),await a.run(`
    UPDATE students 
    SET ${n.join(", ")} 
    WHERE id = ?
  `,r),i(e)}async function T(e){let t=await (0,s.N)();return((await t.run('UPDATE students SET status = "deleted" WHERE id = ?',e)).changes||0)>0}function u(e){return{id:e.id,name:e.name,email:e.email,phone:e.phone,age:e.age,gender:e.gender,goals:e.goals,medicalConditions:e.medical_conditions,emergencyContact:e.emergency_contact,membershipType:e.membership_type,startDate:e.start_date,status:e.status,programs:[]}}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[638,789],()=>a(4090));module.exports=s})();