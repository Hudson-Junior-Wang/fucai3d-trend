/* 福彩3D走势图 — 纯静态前端，可直接部署到 GitHub Pages
 * 数据来源：内置示例 data/draws.json + 浏览器本地保存（localStorage）。
 * 没有后端，所有计算都在浏览器里完成。*/
'use strict';

const STORE_KEY = 'fucai3d_user_draws_v1';
const PRIMES = new Set([1, 2, 3, 5, 7]);

// 兜底数据：当用 file:// 直接打开、fetch 不到 data/draws.json 时仍可显示
const FALLBACK = {
  updated: '2026-06-15', source: 'sample',
  draws: [
    { issue: '2026154', date: '2026-06-11', n: [3, 0, 8] },
    { issue: '2026155', date: '2026-06-12', n: [9, 4, 1] },
    { issue: '2026156', date: '2026-06-13', n: [2, 2, 7] },
    { issue: '2026157', date: '2026-06-14', n: [5, 8, 6] },
    { issue: '2026158', date: '2026-06-15', n: [7, 6, 4] }
  ]
};

const state = {
  base: [],      // 内置数据
  user: [],      // 用户新增/导入
  draws: [],     // 合并后（按期号升序）
  view: 'bai',
  period: 30,
  meta: { source: 'sample', updated: '' }
};

/* ---------- 工具 ---------- */
const $ = (sel) => document.querySelector(sel);
const digitsOf = (d) => d.n;
const sumOf = (d) => d.n[0] + d.n[1] + d.n[2];
const spanOf = (d) => Math.max(...d.n) - Math.min(...d.n);
const roadOf = (v) => v % 3; // 012路

function shapeOf(d) {
  const [a, b, c] = d.n;
  if (a === b && b === c) return { key: 'bao', label: '豹子' };
  if (a === b || b === c || a === c) return { key: 'z3', label: '组三' };
  return { key: 'z6', label: '组六' };
}

function toast(msg) {
  let el = $('#toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- 数据加载与合并 ---------- */
function loadUser() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    state.user = raw ? JSON.parse(raw) : [];
  } catch { state.user = []; }
}
function saveUser() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state.user));
}

function mergeDraws() {
  const map = new Map();
  for (const d of state.base) map.set(d.issue, d);
  for (const d of state.user) map.set(d.issue, d); // 用户数据优先
  state.draws = [...map.values()].sort((a, b) => a.issue.localeCompare(b.issue, undefined, { numeric: true }));
}

async function loadBase() {
  try {
    const res = await fetch('data/draws.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('http ' + res.status);
    const json = await res.json();
    state.base = json.draws || [];
    state.meta.source = json.source || 'sample';
    state.meta.updated = json.updated || '';
  } catch {
    state.base = FALLBACK.draws;
    state.meta.source = FALLBACK.source;
    state.meta.updated = FALLBACK.updated;
  }
}

function visibleDraws() {
  const all = state.draws;
  if (!state.period || state.period <= 0) return all;
  return all.slice(Math.max(0, all.length - state.period));
}

/* ---------- 渲染：数字轨道视图（百/十/个/和值/跨度） ---------- */
function trackConfig() {
  switch (state.view) {
    case 'bai': return { count: 10, get: (d) => d.n[0], label: '百位' };
    case 'shi': return { count: 10, get: (d) => d.n[1], label: '十位' };
    case 'ge':  return { count: 10, get: (d) => d.n[2], label: '个位' };
    case 'sum': return { count: 28, get: sumOf, label: '和值' };
    case 'span':return { count: 10, get: spanOf, label: '跨度' };
    default: return null;
  }
}

function renderTrack() {
  const cfg = trackConfig();
  const rows = visibleDraws();
  const cols = cfg.count;

  // 计算每列遗漏（miss streak）与命中
  const miss = new Array(cols).fill(0);
  const rowData = rows.map((d) => {
    const val = cfg.get(d);
    const cells = new Array(cols);
    for (let c = 0; c < cols; c++) {
      if (c === val) { cells[c] = { hit: true }; miss[c] = 0; }
      else { miss[c] = miss[c] + 1; cells[c] = { hit: false, miss: miss[c] }; }
    }
    return { d, val, cells };
  });

  // 统计：出现次数 / 最大遗漏 / 当前遗漏
  const freq = new Array(cols).fill(0);
  const maxMiss = new Array(cols).fill(0);
  const curMiss = new Array(cols).fill(0);
  const run = new Array(cols).fill(0);
  for (const r of rowData) {
    for (let c = 0; c < cols; c++) {
      if (r.cells[c].hit) { freq[c]++; run[c] = 0; }
      else { run[c]++; if (run[c] > maxMiss[c]) maxMiss[c] = run[c]; }
    }
  }
  for (let c = 0; c < cols; c++) curMiss[c] = run[c];

  // 表头
  let html = '<thead><tr>';
  html += '<th class="col-issue sticky-l0">期号</th>';
  html += '<th class="col-num sticky-l1">开奖</th>';
  for (let c = 0; c < cols; c++) html += `<th>${c}</th>`;
  html += '</tr></thead><tbody>';

  for (const r of rowData) {
    html += '<tr>';
    html += `<td class="sticky-l0 issue-cell">${r.d.issue.slice(-3)}<br><span class="date-cell">${r.d.date.slice(5)}</span></td>`;
    html += `<td class="sticky-l1 num-cell">${r.d.n.join('')}</td>`;
    for (let c = 0; c < cols; c++) {
      const cell = r.cells[c];
      if (cell.hit) html += `<td class="ball hit" data-col="${c}"><span class="dot">${cfg.count > 10 ? c : c}</span></td>`;
      else html += `<td class="ball">${cell.miss}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody>';

  // 表尾统计
  const footRow = (label, arr, hotMax) => {
    let mx = hotMax ? Math.max(...arr) : -1;
    let s = `<tr><td class="lbl sticky-l0">${label}</td><td class="sticky-l1 lbl"></td>`;
    for (let c = 0; c < cols; c++) {
      const hot = hotMax && arr[c] === mx && mx > 0 ? ' hot' : '';
      s += `<td class="${hot.trim()}">${arr[c]}</td>`;
    }
    return s + '</tr>';
  };
  html += '<tfoot>';
  html += footRow('出现', freq, true);
  html += footRow('最大遗漏', maxMiss, true);
  html += footRow('当前遗漏', curMiss, true);
  html += '</tfoot>';

  paintTable(html, true);
}

/* ---------- 渲染：形态视图 ---------- */
function renderShape() {
  const rows = visibleDraws();
  let html = '<thead><tr>'
    + '<th class="col-issue sticky-l0">期号</th>'
    + '<th class="col-num sticky-l1">开奖</th>'
    + '<th>和值</th><th>跨度</th><th>形态</th>'
    + '<th>大小</th><th>奇偶</th><th>质合</th><th>012路</th>'
    + '</tr></thead><tbody>';

  for (const d of rows) {
    const sh = shapeOf(d);
    const bigSmall = d.n.map((v) => v >= 5
      ? '<span class="tag big">大</span>' : '<span class="tag small">小</span>').join(' ');
    const oddEven = d.n.map((v) => v % 2
      ? '<span class="tag odd">奇</span>' : '<span class="tag even">偶</span>').join(' ');
    const primeComp = d.n.map((v) => PRIMES.has(v)
      ? '<span class="tag prime">质</span>' : '<span class="tag comp">合</span>').join(' ');
    const road = d.n.map((v) => `<span class="tag r${roadOf(v)}">${roadOf(v)}</span>`).join(' ');

    html += '<tr>'
      + `<td class="sticky-l0 issue-cell">${d.issue.slice(-3)}<br><span class="date-cell">${d.date.slice(5)}</span></td>`
      + `<td class="sticky-l1 num-cell">${d.n.join('')}</td>`
      + `<td>${sumOf(d)}</td><td>${spanOf(d)}</td>`
      + `<td><span class="tag ${sh.key}">${sh.label}</span></td>`
      + `<td>${bigSmall}</td><td>${oddEven}</td><td>${primeComp}</td><td>${road}</td>`
      + '</tr>';
  }
  html += '</tbody>';
  paintTable(html, false, 'shape-table');
}

/* ---------- 表格挂载 + 连线 ---------- */
function paintTable(innerHTML, withLine, extraClass) {
  const scroll = $('#tableScroll');
  scroll.innerHTML = `<div class="scroll-inner"><table class="trend ${extraClass || ''}">${innerHTML}</table></div>`;
  if (withLine) requestAnimationFrame(drawLine);
}

function drawLine() {
  const inner = $('#tableScroll .scroll-inner');
  if (!inner) return;
  const balls = inner.querySelectorAll('td.ball.hit');
  if (!balls.length) return;
  const base = inner.getBoundingClientRect();
  const pts = [];
  balls.forEach((b) => {
    const r = b.getBoundingClientRect();
    pts.push([
      (r.left - base.left + r.width / 2).toFixed(1),
      (r.top - base.top + r.height / 2).toFixed(1)
    ]);
  });
  const w = inner.scrollWidth, h = inner.scrollHeight;
  const svg = `<svg class="line-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`
    + `<polyline points="${pts.map((p) => p.join(',')).join(' ')}"/></svg>`;
  inner.insertAdjacentHTML('beforeend', svg);
}

/* ---------- 顶部信息 ---------- */
function renderHeader() {
  const all = state.draws;
  if (!all.length) { $('#latest').textContent = '暂无数据'; return; }
  const last = all[all.length - 1];
  $('#latest').textContent = `第${last.issue}期  ${last.n.join(' ')}`;
}

function render() {
  renderHeader();
  if (state.view === 'shape') renderShape();
  else renderTrack();
  const srcTxt = state.meta.source === 'sample' ? '示例数据（请导入真实开奖数据）' : state.meta.source;
  $('#hint').innerHTML =
    `共 ${state.draws.length} 期；当前显示 ${visibleDraws().length} 期。`
    + `<br>红球为当期中奖号码，灰色数字为该号码的“遗漏”期数；红线连接各期中奖位置。`
    + `<br>数据来源：${srcTxt}。新增/导入的数据只保存在你这台设备的浏览器里。`;
}

/* ---------- 交互 ---------- */
function setView(v) {
  state.view = v;
  document.querySelectorAll('.tab').forEach((t) =>
    t.classList.toggle('active', t.dataset.view === v));
  render();
}

function addDraw(issue, date, numStr) {
  issue = String(issue).trim();
  const m = String(numStr).trim();
  if (!/^\d{7}$/.test(issue)) { toast('期号应为7位数字，如 2026159'); return false; }
  if (!/^\d{3}$/.test(m)) { toast('开奖号应为3位数字，如 487'); return false; }
  if (!date) date = new Date().toISOString().slice(0, 10);
  const n = m.split('').map(Number);
  // 覆盖同期号
  state.user = state.user.filter((d) => d.issue !== issue);
  state.user.push({ issue, date, n });
  saveUser();
  mergeDraws();
  render();
  return true;
}

function exportCSV() {
  const lines = ['issue,date,number'];
  for (const d of state.draws) lines.push(`${d.issue},${d.date},${d.n.join('')}`);
  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fucai3d_${state.meta.updated || 'export'}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('已导出 CSV');
}

function importCSV(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let added = 0;
  for (const line of lines) {
    const parts = line.split(/[,\t;]/).map((s) => s.trim());
    // 跳过表头
    if (/issue|期/i.test(parts[0])) continue;
    let issue, date, num;
    if (parts.length >= 3 && /^\d{1,3}$/.test(parts[2]) && parts.length === 3) {
      [issue, date, num] = parts;
    } else if (parts.length >= 5) {
      // issue,date,b,s,g
      issue = parts[0]; date = parts[1]; num = parts[2] + parts[3] + parts[4];
    } else if (parts.length >= 3) {
      [issue, date, num] = parts;
    } else { continue; }
    issue = issue.replace(/\D/g, '');
    num = (num || '').replace(/\D/g, '');
    if (num.length === 2) num = '0' + num;
    if (!/^\d{7}$/.test(issue) || !/^\d{3}$/.test(num)) continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) date = '';
    state.user = state.user.filter((d) => d.issue !== issue);
    state.user.push({ issue, date: date || '', n: num.split('').map(Number) });
    added++;
  }
  if (added) { saveUser(); mergeDraws(); render(); }
  toast(added ? `成功导入 ${added} 期` : '没有识别到有效数据');
}

/* 在线更新：GitHub Pages 上多数官方接口会被 CORS 拦截，这里只做“尽力尝试”。
   失败时提示用户改用导入 CSV，绝不破坏已有本地数据。*/
async function tryOnlineUpdate() {
  toast('正在尝试在线更新…');
  const api = 'https://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=3d&issueCount=30&systemType=PC';
  const proxies = [
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`
  ];
  for (const wrap of proxies) {
    try {
      const res = await fetch(wrap(api), { cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      const list = data.result || data.data || [];
      let added = 0;
      for (const item of list) {
        const issue = String(item.code || item.issue || '').replace(/\D/g, '');
        const red = String(item.red || item.number || '').replace(/[^\d]/g, '');
        if (!/^\d{7}$/.test(issue) || red.length < 3) continue;
        const num = red.slice(0, 3);
        const date = (item.date || '').slice(0, 10);
        state.user = state.user.filter((d) => d.issue !== issue);
        state.user.push({ issue, date, n: num.split('').map(Number) });
        added++;
      }
      if (added) {
        saveUser(); mergeDraws(); render();
        toast(`在线更新成功，更新 ${added} 期`);
        return;
      }
    } catch { /* 试下一个代理 */ }
  }
  toast('在线更新失败（官方接口限制）。请用“导入 CSV”更新数据。');
}

/* ---------- 事件绑定 ---------- */
function bind() {
  document.querySelectorAll('.tab').forEach((t) =>
    t.addEventListener('click', () => setView(t.dataset.view)));

  $('#periodSelect').addEventListener('change', (e) => {
    state.period = parseInt(e.target.value, 10) || 0;
    render();
  });

  // 更多菜单
  const menu = $('#moreMenu');
  $('#btnMore').addEventListener('click', (e) => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
  });
  document.addEventListener('click', () => { menu.hidden = true; });
  menu.addEventListener('click', (e) => {
    const act = e.target.dataset.act;
    if (!act) return;
    menu.hidden = true;
    if (act === 'export') exportCSV();
    else if (act === 'import') $('#fileInput').click();
    else if (act === 'online') tryOnlineUpdate();
    else if (act === 'status') {
      const last = state.draws[state.draws.length - 1];
      toast(`当前 ${state.draws.length} 期；最新 ${last ? last.n.join('') : '--'}；来源 ${state.meta.source}`);
    } else if (act === 'reset') {
      if (confirm('确定清除你新增/导入的数据吗？内置示例数据会保留。')) {
        state.user = []; saveUser(); mergeDraws(); render(); toast('已清除');
      }
    }
  });

  // 文件导入
  $('#fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => importCSV(String(reader.result));
    reader.readAsText(file, 'utf-8');
    e.target.value = '';
  });

  // 新增弹窗
  const modal = $('#addModal');
  $('#btnAdd').addEventListener('click', () => {
    const last = state.draws[state.draws.length - 1];
    const nextIssue = last ? String(parseInt(last.issue, 10) + 1) : '2026159';
    $('#inIssue').value = nextIssue;
    $('#inDate').value = new Date().toISOString().slice(0, 10);
    $('#inNum').value = '';
    modal.hidden = false;
    $('#inNum').focus();
  });
  $('#addCancel').addEventListener('click', () => { modal.hidden = true; });
  $('#addSave').addEventListener('click', () => {
    if (addDraw($('#inIssue').value, $('#inDate').value, $('#inNum').value)) {
      modal.hidden = true;
      toast('已新增');
    }
  });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });

  // 滚动时重画连线（保持对齐）
  let raf = 0;
  $('#tableScroll').addEventListener('scroll', () => {
    if (state.view === 'shape') return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const old = document.querySelector('.line-svg');
      if (old) old.remove();
      drawLine();
    });
  }, { passive: true });

  window.addEventListener('resize', () => { if (state.view !== 'shape') render(); });
}

/* ---------- 启动 ---------- */
async function main() {
  loadUser();
  await loadBase();
  mergeDraws();
  bind();
  render();
}
main();
