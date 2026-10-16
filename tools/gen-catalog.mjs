// catalog.json 생성기: node tools/gen-catalog.mjs [--check]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const a = html.indexOf('<script>') + 8, b = html.indexOf('차곡차곡 연산 — 화면(앱)');
if (b < 0) throw new Error('앱 구분 주석을 찾지 못했어요');
const engine = html.slice(a, b).replace(/\/\*[^*]*$/, '');   // 마지막 열린 주석 제거
const { UNITS, SEM_LABELS, SEM_NAMES } = new Function(engine.replace(/^\s*\(function \(\) \{/, '') + '\nreturn {UNITS, SEM_LABELS, SEM_NAMES};')();
const cat = { app: 'calc', name: '차곡차곡 연산', grade: '초1~중3',
  lessons: UNITS.map(u => ({ id: u.id, label: SEM_LABELS[u.sem], unit: SEM_NAMES[u.sem], title: u.name, el: '' })) };
const out = JSON.stringify(cat, null, 1) + '\n', file = path.join(root, 'catalog.json');
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (cur !== out) { console.error('catalog.json이 index.html과 달라요. node tools/gen-catalog.mjs 로 다시 만드세요.'); process.exit(1); }
  console.log('catalog.json OK (' + cat.lessons.length + '개)');
} else { fs.writeFileSync(file, out); console.log('catalog.json 생성: ' + cat.lessons.length + '개'); }
