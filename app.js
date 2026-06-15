/* 福彩3D走势图 — 纯静态前端，外观/功能对齐 zjt-cp 移动走势图。
 * 数据：内置 data/draws.json（来自 data.17500.cn，云端每日自动更新）+ 本地新增。*/
'use strict';

const STORE_KEY = 'fucai3d_user_draws_v1';
const PRIMES = new Set([1, 2, 3, 5, 7]);
const FALLBACK = { updated: '2026-06-14', source: 'data.17500.cn', draws: [
  { issue: '2026151', date: '2026-06-10', n: [6, 3, 1] },
  { issue: '2026152', date: '2026-06-11', n: [2, 2, 0] },
  { issue: '2026153', date: '2026-06-12', n: [8, 8, 7] },
  { issue: '2026154', date: '2026-06-13', n: [3, 7, 7] },
  { issue: '2026155', date: '2026-06-14', n: [4, 0, 9] },
]};

const state = { base: [], user: [], draws: [], view: 'base', period: 30, meta: { source: '', updated: '' } };
let regionMeta = [];  // 当前视图各连线区

const $ = (s) => document.querySelector(s);
const sumOf = (d) => d.n[0] + d.n[1] + d.n[2];
const spanOf = (d) => Math.max(...d.n) - Math.min(...d.n);
const road = (v) => v % 3;
const zone = (v) => (v <= 3 ? 0 : v <= 6 ? 1 : 2);
const ZL = ['一', '二', '三'];

function shapeOf(d) {
  const [a, b, c] = d.n;
  if (a === b && b === c) return { k: 'bao', t: '豹子' };
  if (a === b || b === c || a === c) return { k: 'z3x', t: '组三' };
  return { k: 'z6', t: '组六' };
}
function acOf(d) {
  const s = new Set();
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) { const x = Math.abs(d.n[i] - d.n[j]); if (x) s.add(x); }
  return Math.max(0, s.size - 2);
}
const ratio = (d, pred) => { const k = d.n.filter(pred).length; return `${k}:${3 - k}`; };
const roadRatio = (d) => { const c = [0, 0, 0]; d.n.forEach((v) => c[road(v)]++); return c.join(':'); };

function toast(msg) {
  let el = $('#toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('show');
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ---------- 数据 ---------- */
function loadUser() { try { state.user = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { state.user = []; } }
function saveUser() { localStorage.setItem(STORE_KEY, JSON.stringify(state.user)); }
function merge() {
  const m = new Map();
  for (const d of state.base) m.set(d.issue, d);
  for (const d of state.user) m.set(d.issue, d);
  state.draws = [...m.values()].sort((a, b) => a.issue.localeCompare(b.issue, undefined, { numeric: true }));
}
async function loadBase() {
  try {
    const r = await fetch('data/draws.json', { cache: 'no-store' });
    if (!r.ok) throw 0;
    const j = await r.json();
    state.base = j.draws || []; state.meta.source = j.source || ''; state.meta.updated = j.updated || '';
  } catch { state.base = FALLBACK.draws; state.meta = { source: FALLBACK.source, updated: FALLBACK.updated }; }
}
function visible() { const a = state.draws; return state.period > 0 ? a.slice(Math.max(0, a.length - state.period)) : a; }

/* ---------- 通用：球轨道（区）+ 统计 + 右侧汇总列 ---------- */
/* regions: [{label,count,labels?,get(draw)->[vals],line,color,ballCls}]
   summary: [{label,get(draw)->text,bg}] 右侧附加列（和值/跨度/AC等） */
function renderRegions(rows, regions, summary) {
  regionMeta = [];
  summary = summary || [];
  const hasGroup = regions.length > 1 || summary.length > 0;
  const N = rows.length;
  const mk = () => regions.map((rg) => new Array(rg.count).fill(0));
  const cur = mk(), freq = mk(), maxMiss = mk(), maxRun = mk(), hitRun = mk(), totMiss = mk();

  let body = '';
  rows.forEach((d) => {
    body += '<tr>';
    body += `<td class="issue-cell">${d.issue.slice(-3)}<br><span class="date-cell">${d.date.slice(5)}</span></td>`;
    body += `<td class="num-cell">${d.n.join('')}</td>`;
    regions.forEach((rg, ri) => {
      const vals = rg.get(d);
      for (let c = 0; c < rg.count; c++) {
        if (vals.includes(c)) {
          cur[ri][c] = 0; freq[ri][c]++; hitRun[ri][c]++;
          if (hitRun[ri][c] > maxRun[ri][c]) maxRun[ri][c] = hitRun[ri][c];
          body += `<td class="ball hit v ${rg.ballCls || ''}" data-r="${ri}"><span class="b">${rg.labels ? rg.labels[c] : c}</span></td>`;
        } else {
          cur[ri][c]++; totMiss[ri][c]++; hitRun[ri][c] = 0;
          if (cur[ri][c] > maxMiss[ri][c]) maxMiss[ri][c] = cur[ri][c];
          body += `<td class="ball v">${cur[ri][c]}</td>`;
        }
      }
    });
    summary.forEach((s) => { body += `<td class="v" style="background:${s.bg || '#ffe9ee'};color:#7a1f33;font-weight:600;font-size:12px;padding:0 4px">${s.get(d)}</td>`; });
    body += '</tr>';
  });

  // 表头
  let head = '<thead>';
  if (hasGroup) {
    head += '<tr><th rowspan="2" class="issue-cell">期号</th><th rowspan="2" class="num-cell">开奖</th>';
    regions.forEach((rg) => { head += `<th class="grp" colspan="${rg.count}" style="background:${rg.color || 'var(--head)'}">${rg.label}</th>`; });
    summary.forEach((s) => { head += `<th rowspan="2" style="background:${s.bg || '#f7a8bb'};color:#5a1226;min-width:30px">${s.label}</th>`; });
    head += '</tr><tr>';
    regions.forEach((rg) => { for (let c = 0; c < rg.count; c++) head += `<th>${rg.labels ? rg.labels[c] : c}</th>`; });
    head += '</tr>';
  } else {
    head += '<tr><th class="issue-cell">期号</th><th class="num-cell">开奖</th>';
    const rg = regions[0];
    for (let c = 0; c < rg.count; c++) head += `<th>${rg.labels ? rg.labels[c] : c}</th>`;
    head += '</tr>';
  }
  head += '</thead>';

  // 页脚：完整统计
  const statRow = (label, fn, hot) => {
    let s = `<tr><td class="lbl issue-cell">${label}</td><td class="lbl num-cell"></td>`;
    regions.forEach((rg, ri) => {
      const vals = []; for (let c = 0; c < rg.count; c++) vals.push(fn(ri, c));
      const mx = Math.max(...vals);
      for (let c = 0; c < rg.count; c++) s += `<td class="${hot && vals[c] === mx && mx > 0 ? 'hot' : ''}">${vals[c]}</td>`;
    });
    summary.forEach(() => { s += '<td></td>'; });
    return s + '</tr>';
  };
  const avg = (ri, c) => (freq[ri][c] ? Math.round(N / freq[ri][c]) : N);
  const foot = '<tfoot>'
    + statRow('出现', (ri, c) => freq[ri][c], true)
    + statRow('平均遗漏', avg, false)
    + statRow('最大遗漏', (ri, c) => maxMiss[ri][c], true)
    + statRow('最大连出', (ri, c) => maxRun[ri][c], true)
    + statRow('当前遗漏', (ri, c) => cur[ri][c], true)
    + '</tfoot>';

  paint(`<table class="trend">${head}<tbody>${body}</tbody>${foot}</table>`);
  regionMeta = regions.map((rg, i) => ({ i, line: rg.line, color: rg.color || '#e53935' }));
  requestAnimationFrame(drawLines);
}

function paint(html) { $('#scrollInner').innerHTML = html; }

function drawLines() {
  const inner = $('#scrollInner');
  inner.querySelectorAll('.line-svg').forEach((s) => s.remove());
  if (!regionMeta.length) return;
  const base = inner.getBoundingClientRect();
  const w = inner.scrollWidth, h = inner.scrollHeight;
  let svg = `<svg class="line-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`;
  let any = false;
  regionMeta.forEach((rm) => {
    if (!rm.line) return;
    const balls = inner.querySelectorAll(`td.ball.hit[data-r="${rm.i}"]`);
    if (balls.length < 2) return;
    const pts = [];
    balls.forEach((b) => { const r = b.getBoundingClientRect(); pts.push(`${(r.left - base.left + r.width / 2).toFixed(1)},${(r.top - base.top + r.height / 2).toFixed(1)}`); });
    svg += `<polyline points="${pts.join(' ')}" stroke="${rm.color}"/>`; any = true;
  });
  svg += '</svg>';
  if (any) inner.insertAdjacentHTML('beforeend', svg);
}

/* ---------- 通用：标签/比例表 ---------- */
function renderPattern(rows, cols, rowFn) {
  let head = '<thead><tr><th class="issue-cell">期号</th><th class="num-cell">开奖</th>';
  cols.forEach((c) => { head += `<th>${c}</th>`; });
  head += '</tr></thead>';
  let body = '';
  rows.forEach((d) => {
    body += `<tr><td class="issue-cell">${d.issue.slice(-3)}<br><span class="date-cell">${d.date.slice(5)}</span></td><td class="num-cell">${d.n.join('')}</td>`;
    rowFn(d).forEach((cell) => { body += `<td class="v" style="background:#eef5fb;color:#1f2a37">${cell}</td>`; });
    body += '</tr>';
  });
  regionMeta = [];
  paint(`<table class="trend">${head}<tbody>${body}</tbody></table>`);
}

const tg = (cls, t) => `<span class="tag ${cls}">${t}</span>`;

/* ---------- 各视图 ---------- */
const VIEWS = {
  base: (rows) => renderRegions(rows, [
    { label: '百位', count: 10, get: (d) => [d.n[0]], line: true, color: '#e53935', ballCls: '' },
    { label: '十位', count: 10, get: (d) => [d.n[1]], line: true, color: '#1e88e5', ballCls: 'b-shi' },
    { label: '个位', count: 10, get: (d) => [d.n[2]], line: true, color: '#43a047', ballCls: 'b-ge' },
  ], [
    { label: '和值', get: (d) => sumOf(d), bg: '#ffb6c1' },
    { label: '跨度', get: (d) => spanOf(d), bg: '#ffc8a8' },
    { label: '奇偶', get: (d) => ratio(d, (v) => v % 2), bg: '#e3d1f0' },
    { label: '大小', get: (d) => ratio(d, (v) => v >= 5), bg: '#cfe8c9' },
    { label: '012路', get: (d) => roadRatio(d), bg: '#cfe5f7' },
    { label: 'AC', get: (d) => acOf(d), bg: '#f0e2b8' },
  ]),

  numDistri: (rows) => renderRegions(rows, [
    { label: '号码分布', count: 10, get: (d) => d.n, line: false, color: '#e53935' },
  ]),

  pos0: (rows) => renderRegions(rows, [{ label: '百位', count: 10, get: (d) => [d.n[0]], line: true, color: '#e53935' }]),
  pos1: (rows) => renderRegions(rows, [{ label: '十位', count: 10, get: (d) => [d.n[1]], line: true, color: '#1e88e5', ballCls: 'b-shi' }]),
  pos2: (rows) => renderRegions(rows, [{ label: '个位', count: 10, get: (d) => [d.n[2]], line: true, color: '#43a047', ballCls: 'b-ge' }]),

  heZhi: (rows) => renderRegions(rows, [{ label: '和值', count: 28, get: (d) => [sumOf(d)], line: true, color: '#d81b60' }]),
  span: (rows) => renderRegions(rows, [{ label: '跨度', count: 10, get: (d) => [spanOf(d)], line: true, color: '#d81b60' }]),

  luShuD: (rows) => renderRegions(rows, [
    { label: '百位路', count: 3, labels: ['0', '1', '2'], get: (d) => [road(d.n[0])], line: true, color: '#e53935' },
    { label: '十位路', count: 3, labels: ['0', '1', '2'], get: (d) => [road(d.n[1])], line: true, color: '#1e88e5', ballCls: 'b-shi' },
    { label: '个位路', count: 3, labels: ['0', '1', '2'], get: (d) => [road(d.n[2])], line: true, color: '#43a047', ballCls: 'b-ge' },
  ]),
  threeAreaD: (rows) => renderRegions(rows, [
    { label: '百位区', count: 3, labels: ZL, get: (d) => [zone(d.n[0])], line: true, color: '#e53935' },
    { label: '十位区', count: 3, labels: ZL, get: (d) => [zone(d.n[1])], line: true, color: '#1e88e5', ballCls: 'b-shi' },
    { label: '个位区', count: 3, labels: ZL, get: (d) => [zone(d.n[2])], line: true, color: '#43a047', ballCls: 'b-ge' },
  ]),

  bigSmall: (rows) => renderPattern(rows, ['百', '十', '个', '大小比'], (d) => {
    const t = d.n.map((v) => (v >= 5 ? tg('big', '大') : tg('small', '小')));
    const big = d.n.filter((v) => v >= 5).length;
    return [t[0], t[1], t[2], `${big}:${3 - big}`];
  }),
  oddEven: (rows) => renderPattern(rows, ['百', '十', '个', '奇偶比'], (d) => {
    const t = d.n.map((v) => (v % 2 ? tg('odd', '奇') : tg('even', '偶')));
    const odd = d.n.filter((v) => v % 2).length;
    return [t[0], t[1], t[2], `${odd}:${3 - odd}`];
  }),
  zhiHe: (rows) => renderPattern(rows, ['百', '十', '个', '质合比'], (d) => {
    const t = d.n.map((v) => (PRIMES.has(v) ? tg('prime', '质') : tg('comp', '合')));
    const p = d.n.filter((v) => PRIMES.has(v)).length;
    return [t[0], t[1], t[2], `${p}:${3 - p}`];
  }),
  luShuRate: (rows) => renderPattern(rows, ['百', '十', '个', '012路比'], (d) => {
    const r = d.n.map((v) => tg('r' + road(v), road(v)));
    const c = [0, 0, 0]; d.n.forEach((v) => c[road(v)]++);
    return [r[0], r[1], r[2], c.join(':')];
  }),
  threeAreaRate: (rows) => renderPattern(rows, ['百', '十', '个', '三区比'], (d) => {
    const r = d.n.map((v) => tg('z' + (zone(v) + 1), ZL[zone(v)]));
    const c = [0, 0, 0]; d.n.forEach((v) => c[zone(v)]++);
    return [r[0], r[1], r[2], c.join(':')];
  }),
  xingTai: (rows) => renderPattern(rows, ['和值', '跨度', '形态'], (d) => {
    const s = shapeOf(d); return [sumOf(d), spanOf(d), tg(s.k, s.t)];
  }),

  w5: (rows) => renderReco(rows, 5),
  w6: (rows) => renderReco(rows, 6),
  w7: (rows) => renderReco(rows, 7),

  other: () => renderOther(),
};

/* 万能N码：取“当前遗漏最大”的 N 个号码（最久没在任一位出现） */
function renderReco(rows, n) {
  const last = new Array(10).fill(-1);
  rows.forEach((d, i) => d.n.forEach((v) => { last[v] = i; }));
  const omit = last.map((idx, v) => ({ v, o: idx < 0 ? rows.length : rows.length - 1 - idx }));
  omit.sort((a, b) => b.o - a.o || a.v - b.v);
  const pick = omit.slice(0, n).map((x) => x.v).sort((a, b) => a - b);
  const balls = pick.map((v) => `<div class="rb">${v}</div>`).join('');
  const tableRows = omit.map((x) => `${x.v}号 遗漏 ${x.o} 期`).slice(0, 10).join('；');
  regionMeta = [];
  paint(`<div class="reco">
    <h3>万能 ${n} 码（遗漏最大优先）</h3>
    <div class="balls">${balls}</div>
    <div class="muted">基于近 ${rows.length} 期，挑出最久没出现的 ${n} 个号码作参考。<br>各号当前遗漏：${tableRows}。</div>
    <div class="muted" style="margin-top:8px;color:#b00">仅供参考，理性购彩。</div>
  </div>`);
}

function renderOther() {
  const all = state.draws; const last = all[all.length - 1];
  regionMeta = [];
  paint(`<div class="other">
    <div class="kv">当前数据：<b>${all.length}</b> 期；最新 <b>${last ? last.issue : '--'}</b> → <b>${last ? last.n.join(' ') : '--'}</b></div>
    <div class="kv">数据来源：<b>${state.meta.source || '本地'}</b>；更新日期：<b>${state.meta.updated || '--'}</b></div>
    <div class="row">
      <button class="primary" id="oAdd">新增一期</button>
      <button id="oImport">导入 CSV</button>
      <button id="oExport">导出 CSV</button>
      <button id="oReset">清除我新增的</button>
    </div>
    <div class="kv" style="margin-top:10px;line-height:1.8">说明：网站每天 23:12 / 00:05 / 00:30 自动抓取最新开奖（云端）。<br>你“新增/导入”的数据只存在本机浏览器，不会上传。</div>
  </div>`);
  $('#oAdd').onclick = openAdd;
  $('#oImport').onclick = () => $('#fileInput').click();
  $('#oExport').onclick = exportCSV;
  $('#oReset').onclick = () => { if (confirm('确定清除你新增/导入的数据吗？')) { state.user = []; saveUser(); merge(); render(); toast('已清除'); } };
}

/* ---------- 渲染入口 ---------- */
function render() {
  const all = state.draws;
  $('#latest').textContent = all.length ? `最新 第${all[all.length - 1].issue}期 ${all[all.length - 1].n.join(' ')}` : '暂无数据';
  const fn = VIEWS[state.view] || VIEWS.base;
  fn(visible());
}

/* ---------- 底部按钮 ---------- */
const INDEXS = [
  { name: 'base', t: '综合' }, { name: 'numDistri', t: '号码分布' }, { name: 'pos0', t: '百位' },
  { name: 'pos1', t: '十位' }, { name: 'pos2', t: '个位' }, { name: 'heZhi', t: '和值' },
  { name: 'span', t: '跨度' }, { name: 'bigSmall', t: '大小' }, { name: 'oddEven', t: '奇偶' },
  { name: 'zhiHe', t: '质合' }, { name: 'luShuRate', t: '012路比' }, { name: 'luShuD', t: '012路' },
  { name: 'threeAreaRate', t: '三区比' }, { name: 'threeAreaD', t: '三区定位' }, { name: 'w5', t: '万能5码' },
  { name: 'w6', t: '万能6码' }, { name: 'w7', t: '万能7码' }, { name: 'more', t: '更多' },
];

function buildIndexs() {
  const grid = document.createElement('div'); grid.className = 'grid';
  INDEXS.forEach((it) => {
    const b = document.createElement('div'); b.className = 'ix'; b.textContent = it.t; b.dataset.name = it.name;
    b.onclick = () => onIndexClick(it.name, b);
    grid.appendChild(b);
  });
  const box = $('#indexs'); box.innerHTML = ''; box.appendChild(grid);
}

function setActive(name) {
  document.querySelectorAll('.indexs .ix').forEach((e) => e.classList.toggle('on', e.dataset.name === name || (name !== 'more' && e.dataset.name === 'more' && isMoreView(name))));
}
function isMoreView(name) { return name === 'xingTai' || name === 'other'; }

function onIndexClick(name, el) {
  const old = $('.more-pop'); if (old) old.remove();
  if (name === 'more') { showMore(el); return; }
  state.view = name; render(); setActive(name);
}

function showMore(el) {
  const pop = document.createElement('div'); pop.className = 'more-pop';
  pop.innerHTML = `<span data-n="xingTai">形态</span><span data-n="other">其它</span><span data-n="cancel">取消</span>`;
  document.body.appendChild(pop);
  const r = el.getBoundingClientRect();
  pop.style.right = '2px';
  pop.style.bottom = (window.innerHeight - r.top + 4) + 'px';
  pop.querySelectorAll('span').forEach((s) => s.onclick = () => {
    const n = s.dataset.n;
    pop.remove();
    if (n === 'cancel') return;
    state.view = n; render();
    document.querySelectorAll('.indexs .ix').forEach((e) => e.classList.toggle('on', e.dataset.name === 'more'));
  });
}

/* ---------- 新增 / CSV ---------- */
function openAdd() {
  const last = state.draws[state.draws.length - 1];
  $('#inIssue').value = last ? String(parseInt(last.issue, 10) + 1) : '2026159';
  $('#inDate').value = new Date().toISOString().slice(0, 10);
  $('#inNum').value = '';
  $('#addModal').hidden = false; $('#inNum').focus();
}
function addDraw(issue, date, num) {
  issue = String(issue).trim(); num = String(num).trim();
  if (!/^\d{7}$/.test(issue)) { toast('期号应为7位，如 2026159'); return false; }
  if (!/^\d{3}$/.test(num)) { toast('开奖号应为3位，如 487'); return false; }
  if (!date) date = new Date().toISOString().slice(0, 10);
  state.user = state.user.filter((d) => d.issue !== issue);
  state.user.push({ issue, date, n: num.split('').map(Number) });
  saveUser(); merge(); render(); return true;
}
function exportCSV() {
  const lines = ['issue,date,number'];
  state.draws.forEach((d) => lines.push(`${d.issue},${d.date},${d.n.join('')}`));
  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `fucai3d_${state.meta.updated || 'export'}.csv`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast('已导出 CSV');
}
function importCSV(text) {
  let added = 0;
  text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).forEach((line) => {
    const p = line.split(/[,\t;]/).map((s) => s.trim());
    if (/issue|期/i.test(p[0])) return;
    let issue = (p[0] || '').replace(/\D/g, ''); let date = p[1] || '';
    let num = (p.length >= 5 ? (p[2] + p[3] + p[4]) : (p[2] || '')).replace(/\D/g, '');
    if (num.length === 2) num = '0' + num;
    if (!/^\d{7}$/.test(issue) || !/^\d{3}$/.test(num)) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) date = '';
    state.user = state.user.filter((d) => d.issue !== issue);
    state.user.push({ issue, date, n: num.split('').map(Number) }); added++;
  });
  if (added) { saveUser(); merge(); render(); }
  toast(added ? `导入 ${added} 期` : '没识别到有效数据');
}

/* ---------- 绑定 ---------- */
function bind() {
  $('#qiShu').addEventListener('change', (e) => { state.period = parseInt(e.target.value, 10) || 30; render(); });
  $('#canShu').addEventListener('click', () => toast('红球=当期中奖号，灰字=该号遗漏期数，彩线=各期中奖位置连线。'));
  $('#toTop').addEventListener('click', () => $('#trendArea').scrollTo({ top: 0, behavior: 'smooth' }));
  $('#toBottom').addEventListener('click', () => $('#trendArea').scrollTo({ top: $('#scrollInner').scrollHeight, behavior: 'smooth' }));
  $('#trendArea').addEventListener('scroll', () => { if (regionMeta.some((r) => r.line)) requestAnimationFrame(drawLines); }, { passive: true });
  window.addEventListener('resize', () => render());

  $('#addCancel').onclick = () => { $('#addModal').hidden = true; };
  $('#addModal').addEventListener('click', (e) => { if (e.target.id === 'addModal') $('#addModal').hidden = true; });
  $('#addSave').onclick = () => { if (addDraw($('#inIssue').value, $('#inDate').value, $('#inNum').value)) { $('#addModal').hidden = true; toast('已新增'); } };
  $('#fileInput').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (!f) return;
    const rd = new FileReader(); rd.onload = () => importCSV(String(rd.result)); rd.readAsText(f, 'utf-8'); e.target.value = '';
  });
}

async function main() {
  loadUser(); await loadBase(); merge(); buildIndexs(); bind();
  state.view = 'base'; render(); setActive('base');
  document.querySelector('.indexs .ix[data-name="base"]').classList.add('on');
}
main();
