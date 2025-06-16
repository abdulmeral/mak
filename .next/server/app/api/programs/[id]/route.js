"use strict";(()=>{var e={};e.id=546,e.ids=[546],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},5514:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>m,originalPathname:()=>g,patchFetch:()=>A,requestAsyncStorage:()=>p,routeModule:()=>c,serverHooks:()=>R,staticGenerationAsyncStorage:()=>l,staticGenerationBailout:()=>N});var a={};r.r(a),r.d(a,{DELETE:()=>d,GET:()=>u,PUT:()=>T});var s=r(5419),i=r(9108),n=r(9678),E=r(8070),o=r(9853);async function u(e,{params:t}){try{let e=parseInt(t.id),r=await (0,o.EG)(e);if(!r)return E.Z.json({error:"Program not found"},{status:404});return E.Z.json(r)}catch(e){return console.error("Error fetching program:",e),E.Z.json({error:"Failed to fetch program"},{status:500})}}async function T(e,{params:t}){try{let r=parseInt(t.id),a=await e.json(),s=await (0,o.DC)(r,a);if(!s)return E.Z.json({error:"Program not found"},{status:404});return E.Z.json(s)}catch(e){return console.error("Error updating program:",e),E.Z.json({error:"Failed to update program"},{status:500})}}async function d(e,{params:t}){try{let e=parseInt(t.id);if(!await (0,o.Vl)(e))return E.Z.json({error:"Program not found"},{status:404});return E.Z.json({success:!0})}catch(e){return console.error("Error deleting program:",e),E.Z.json({error:"Failed to delete program"},{status:500})}}let c=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/programs/[id]/route",pathname:"/api/programs/[id]",filename:"route",bundlePath:"app/api/programs/[id]/route"},resolvedPagePath:"/Users/abdul.meral/Desktop/projects/mk/app/api/programs/[id]/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:p,staticGenerationAsyncStorage:l,serverHooks:R,headerHooks:m,staticGenerationBailout:N}=c,g="/api/programs/[id]/route";function A(){return(0,n.patchFetch)({serverHooks:R,staticGenerationAsyncStorage:l})}},7078:(e,t,r)=>{r.d(t,{N:()=>u});let a=require("sqlite3");var s=r.n(a),i=r(8290),n=r(1017),E=r.n(n);let o=null;async function u(){if(o)return o;let e=E().join(process.cwd(),"data","trainer.db");return o=await (0,i.bA)({filename:e,driver:s().Database}),await T(),o}async function T(){o&&(await o.exec(`
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
  `),await o.exec(`
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
  `),await o.exec(`
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
  `),await o.exec(`
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
  `),console.log("Database tables initialized successfully"))}},9853:(e,t,r)=>{r.d(t,{DC:()=>E,EG:()=>n,HO:()=>s,NI:()=>i,Vl:()=>o});var a=r(7078);async function s(e){let t=await (0,a.N)(),r=await t.run(`
    INSERT INTO programs (
      name, description, duration_weeks, difficulty_level, category,
      exercises, schedule, price, max_participants, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,[e.name,e.description||null,e.durationWeeks||null,e.difficultyLevel||null,e.category||null,JSON.stringify(e.exercises||[]),JSON.stringify(e.schedule||[]),e.price||null,e.maxParticipants||null,e.status||"active"]);return u(await t.get("SELECT * FROM programs WHERE id = ?",r.lastID))}async function i(){let e=await (0,a.N)();return(await e.all('SELECT * FROM programs WHERE status = "active" ORDER BY created_at DESC')).map(u)}async function n(e){let t=await (0,a.N)(),r=await t.get("SELECT * FROM programs WHERE id = ?",e);return r?u(r):null}async function E(e,t){let r=await (0,a.N)(),s=[],i=[];return t.name&&(s.push("name = ?"),i.push(t.name)),void 0!==t.description&&(s.push("description = ?"),i.push(t.description)),void 0!==t.durationWeeks&&(s.push("duration_weeks = ?"),i.push(t.durationWeeks)),void 0!==t.difficultyLevel&&(s.push("difficulty_level = ?"),i.push(t.difficultyLevel)),void 0!==t.category&&(s.push("category = ?"),i.push(t.category)),void 0!==t.exercises&&(s.push("exercises = ?"),i.push(JSON.stringify(t.exercises))),void 0!==t.schedule&&(s.push("schedule = ?"),i.push(JSON.stringify(t.schedule))),void 0!==t.price&&(s.push("price = ?"),i.push(t.price)),void 0!==t.maxParticipants&&(s.push("max_participants = ?"),i.push(t.maxParticipants)),void 0!==t.status&&(s.push("status = ?"),i.push(t.status)),s.push("updated_at = ?"),i.push(new Date().toISOString()),i.push(e),await r.run(`
    UPDATE programs 
    SET ${s.join(", ")} 
    WHERE id = ?
  `,i),n(e)}async function o(e){let t=await (0,a.N)();return((await t.run('UPDATE programs SET status = "deleted" WHERE id = ?',e)).changes||0)>0}function u(e){return{id:e.id,name:e.name,description:e.description,durationWeeks:e.duration_weeks,difficultyLevel:e.difficulty_level,category:e.category,exercises:e.exercises?JSON.parse(e.exercises):[],schedule:e.schedule?JSON.parse(e.schedule):[],price:e.price,maxParticipants:e.max_participants,status:e.status,participants:[]}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,789],()=>r(5514));module.exports=a})();