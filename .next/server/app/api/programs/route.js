"use strict";(()=>{var e={};e.id=351,e.ids=[351],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},6749:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>N,originalPathname:()=>m,patchFetch:()=>g,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>l,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>R});var r={};a.r(r),a.d(r,{GET:()=>T,POST:()=>o});var s=a(5419),i=a(9108),E=a(9678),n=a(8070),u=a(9853);async function T(){try{let e=await (0,u.NI)();return n.Z.json(e)}catch(e){return console.error("Error fetching programs:",e),n.Z.json({error:"Failed to fetch programs"},{status:500})}}async function o(e){try{let t=await e.json(),a=await (0,u.HO)(t);return n.Z.json(a,{status:201})}catch(e){return console.error("Error creating program:",e),n.Z.json({error:"Failed to create program"},{status:500})}}let c=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/programs/route",pathname:"/api/programs",filename:"route",bundlePath:"app/api/programs/route"},resolvedPagePath:"/Users/abdul.meral/Desktop/projects/mk/app/api/programs/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:p,serverHooks:l,headerHooks:N,staticGenerationBailout:R}=c,m="/api/programs/route";function g(){return(0,E.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:p})}},7078:(e,t,a)=>{a.d(t,{N:()=>T});let r=require("sqlite3");var s=a.n(r),i=a(8290),E=a(1017),n=a.n(E);let u=null;async function T(){if(u)return u;let e=n().join(process.cwd(),"data","trainer.db");return u=await (0,i.bA)({filename:e,driver:s().Database}),await o(),u}async function o(){u&&(await u.exec(`
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
  `),console.log("Database tables initialized successfully"))}},9853:(e,t,a)=>{a.d(t,{DC:()=>n,EG:()=>E,HO:()=>s,NI:()=>i,Vl:()=>u});var r=a(7078);async function s(e){let t=await (0,r.N)(),a=await t.run(`
    INSERT INTO programs (
      name, description, duration_weeks, difficulty_level, category,
      exercises, schedule, price, max_participants, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,[e.name,e.description||null,e.durationWeeks||null,e.difficultyLevel||null,e.category||null,JSON.stringify(e.exercises||[]),JSON.stringify(e.schedule||[]),e.price||null,e.maxParticipants||null,e.status||"active"]);return T(await t.get("SELECT * FROM programs WHERE id = ?",a.lastID))}async function i(){let e=await (0,r.N)();return(await e.all('SELECT * FROM programs WHERE status = "active" ORDER BY created_at DESC')).map(T)}async function E(e){let t=await (0,r.N)(),a=await t.get("SELECT * FROM programs WHERE id = ?",e);return a?T(a):null}async function n(e,t){let a=await (0,r.N)(),s=[],i=[];return t.name&&(s.push("name = ?"),i.push(t.name)),void 0!==t.description&&(s.push("description = ?"),i.push(t.description)),void 0!==t.durationWeeks&&(s.push("duration_weeks = ?"),i.push(t.durationWeeks)),void 0!==t.difficultyLevel&&(s.push("difficulty_level = ?"),i.push(t.difficultyLevel)),void 0!==t.category&&(s.push("category = ?"),i.push(t.category)),void 0!==t.exercises&&(s.push("exercises = ?"),i.push(JSON.stringify(t.exercises))),void 0!==t.schedule&&(s.push("schedule = ?"),i.push(JSON.stringify(t.schedule))),void 0!==t.price&&(s.push("price = ?"),i.push(t.price)),void 0!==t.maxParticipants&&(s.push("max_participants = ?"),i.push(t.maxParticipants)),void 0!==t.status&&(s.push("status = ?"),i.push(t.status)),s.push("updated_at = ?"),i.push(new Date().toISOString()),i.push(e),await a.run(`
    UPDATE programs 
    SET ${s.join(", ")} 
    WHERE id = ?
  `,i),E(e)}async function u(e){let t=await (0,r.N)();return((await t.run('UPDATE programs SET status = "deleted" WHERE id = ?',e)).changes||0)>0}function T(e){return{id:e.id,name:e.name,description:e.description,durationWeeks:e.duration_weeks,difficultyLevel:e.difficulty_level,category:e.category,exercises:e.exercises?JSON.parse(e.exercises):[],schedule:e.schedule?JSON.parse(e.schedule):[],price:e.price,maxParticipants:e.max_participants,status:e.status,participants:[]}}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[638,789],()=>a(6749));module.exports=r})();