import {existsSync,readFileSync} from 'node:fs';
for(const p of ['public/index.html','public/app.js','public/styles.css']) { if(!existsSync(p)||!readFileSync(p,'utf8').trim()) throw Error('Falta '+p); }
console.log('Build estático validado');
