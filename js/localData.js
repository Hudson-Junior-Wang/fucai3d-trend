/* 本地数据适配器：用 ../data/draws.json 驱动 zjt 原版渲染引擎，逐项对齐原站。*/
(function () {
  'use strict';
  var PRIMES = { 1: 1, 2: 1, 3: 1, 5: 1, 7: 1 };
  var W = {
    w5: ["01249", "01268", "01346", "01467", "01569", "02357", "02458", "03789", "12359", "12378", "12589", "13478", "14579", "23456", "24679", "34689", "35678"],
    w6: ["012346", "012359", "012489", "013789", "026789", "045678", "123457", "156789", "234568", "345679"],
    w7: ["0123489", "0345679", "0156789", "1234567", "0245678", "2356789"]
  };
  var drawsPromise = fetch('../data/draws.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); }).then(function (j) { return j.draws || []; }).catch(function () { return []; });

  function road(v) { return v % 3; }
  function zoneIdx(v) { return v <= 3 ? 0 : v <= 6 ? 1 : 2; }
  function q(d) { return d.issue.slice(-3); }
  function bs(v) { return v >= 5 ? '大' : '小'; }
  function oe(v) { return v % 2 ? '奇' : '偶'; }
  function zh(v) { return PRIMES[v] ? '质' : '合'; }
  function predOf(i) { return i === 'bigSmall' ? function (v) { return v >= 5 ? 1 : 0; } : i === 'oddEven' ? function (v) { return v % 2; } : function (v) { return PRIMES[v] ? 1 : 0; }; }
  function charOf(i) { return i === 'bigSmall' ? bs : i === 'oddEven' ? oe : zh; }
  function clr(t, c) { return "<span style='color:" + c + "'>" + t + "</span>"; }
  function lot(n) { return clr(n.join(' '), '#d40000'); }
  function shapeC(n) { var s = shapeOf(n); return s === '豹子' ? clr(s, '#d40000') : s === '组三' ? clr(s, '#e8730c') : s; }
  function bsC(v) { return v >= 5 ? clr('大', '#e53935') : clr('小', '#1565d8'); }
  function oeC(v) { return v % 2 ? clr('奇', '#e53935') : clr('偶', '#1565d8'); }
  function zhC(v) { return PRIMES[v] ? clr('质', '#e53935') : clr('合', '#1565d8'); }
  function roadC(v) { var r = road(v); return clr(r, ['#5c6bc0', '#e53935', '#43a047'][r]); }
  function zoneC(v) { var z = zoneIdx(v); return clr(z + 1, ['#e53935', '#fb8c00', '#43a047'][z]); }
  function lianHaoMaxGap(n) { var s = n.slice().sort(function (a, b) { return a - b; }); return Math.max(s[1] - s[0], s[2] - s[1]); }
  function shapeOf(n) { if (n[0] === n[1] && n[1] === n[2]) return '豹子'; if (n[0] === n[1] || n[1] === n[2] || n[0] === n[2]) return '组三'; return '组六'; }
  function sameNumOf(n) { if (n[0] === n[1] && n[1] === n[2]) return '' + n[0]; if (n[0] === n[1] || n[0] === n[2]) return '' + n[0]; if (n[1] === n[2]) return '' + n[1]; return '-'; }
  function lianOf(n) { var s = n.slice().sort(function (a, b) { return a - b; }); return (s[1] - s[0] === 1 && s[2] - s[1] === 1) ? 'lian3' : (s[1] - s[0] === 1 || s[2] - s[1] === 1) ? 'lian2' : 'lian0'; }

  // 标记：round=圆/方，bg=底色，block=连线分组
  function mk(block, txt, round, bg) {
    return "<span" + (block ? " block='" + block + "'" : "") + " style=\"display:inline-block;min-width:16px;height:16px;line-height:16px;text-align:center;color:#fff;background:" + bg + ";border-radius:" + (round ? "50%" : "3px") + ";padding:0 1px;font-size:11px;\">" + txt + "</span>";
  }

  /* 页脚：理论值用 000-999 全枚举 */
  function makeFooter(rows, groups, hitFn, N) {
    var cols = []; groups.forEach(function (g) { g.cols.forEach(function (f) { cols.push(f); }); });
    var act = {}; cols.forEach(function (f) { act[f] = { freq: 0, run: 0, max: 0, cur: 0 }; });
    rows.forEach(function (d) { var hs = {}; hitFn(d.n).forEach(function (x) { hs[x] = 1; }); cols.forEach(function (f) { var a = act[f]; if (hs[f]) { a.freq++; a.run++; if (a.run > a.max) a.max = a.run; a.cur = 0; } else { a.run = 0; a.cur++; } }); });
    var theo = {}; cols.forEach(function (f) { theo[f] = 0; });
    for (var b = 0; b < 10; b++) for (var s = 0; s < 10; s++) for (var g = 0; g < 10; g++) { hitFn([b, s, g]).forEach(function (f) { if (theo[f] !== undefined) theo[f]++; }); }
    var defs = [
      ['理论出现概率(%)', function (f) { return (theo[f] / 1000 * 100).toFixed(1); }],
      [N + '期理论出现(期)', function (f) { return (N * theo[f] / 1000).toFixed(1); }],
      [N + '期实际出现(期)', function (f) { return act[f].freq; }],
      [N + '期最大连出(期)', function (f) { return act[f].max; }],
      ['理论遗漏(期)', function (f) { return theo[f] ? Math.round((1000 - theo[f]) / theo[f]) : ''; }],
      [N + '期当前遗漏(期)', function (f) { return act[f].cur; }]
    ];
    return defs.map(function (def) {
      var row = { name: def[0] };
      groups.forEach(function (gp) { var obj = {}; gp.cols.forEach(function (f) { obj[f] = def[1](f); }); if (gp.parentKey) row[gp.parentKey] = obj; else gp.cols.forEach(function (f) { row[f] = def[1](f); }); });
      return row;
    });
  }

  /* 位置 0-9（红圆） */
  function gridPos(rows, P, N) {
    var items = rows.map(function (d) {
      var pos = {}; for (var c = 0; c < 10; c++) pos['pos' + P + c] = c === d.n[P] ? mk('block0', c, true, '#e60000') : '';
      return { qiHao: q(d), lottery: lot(d.n), weiLot: d.n[P], pos: pos, character: { bigSmall: bsC(d.n[P]), oddEven: oeC(d.n[P]), zhiHe: zhC(d.n[P]), luShu: roadC(d.n[P]), threeArea: zoneC(d.n[P]) }, _p: P };
    }).map(function (o) { var x = { qiHao: o.qiHao, lottery: o.lottery, weiLot: o.weiLot, character: o.character }; x['pos' + o._p] = o.pos; return x; });
    var cols = []; for (var c = 0; c < 10; c++) cols.push('pos' + P + c);
    return { items: items.concat(makeFooter(rows, [{ parentKey: 'pos' + P, cols: cols }], function (n) { return ['pos' + P + n[P]]; }, N)) };
  }

  /* 号码分布（红圆，非命中空白） */
  function gridNumDistri(rows, N) {
    var items = rows.map(function (d) {
      var cell = {}; for (var c = 0; c < 10; c++) cell['pos' + c] = d.n.indexOf(c) !== -1 ? mk('', c, true, '#e60000') : '';
      return { qiHao: q(d), lottery: lot(d.n), shape: { shape: shapeC(d.n), sameNum: sameNumOf(d.n) }, area0: { pos0: cell.pos0, pos1: cell.pos1, pos2: cell.pos2, pos3: cell.pos3 }, area1: { pos4: cell.pos4, pos5: cell.pos5, pos6: cell.pos6 }, area2: { pos7: cell.pos7, pos8: cell.pos8, pos9: cell.pos9 } };
    });
    var foot = makeFooter(rows, [{ parentKey: 'area0', cols: ['pos0', 'pos1', 'pos2', 'pos3'] }, { parentKey: 'area1', cols: ['pos4', 'pos5', 'pos6'] }, { parentKey: 'area2', cols: ['pos7', 'pos8', 'pos9'] }],
      function (n) { var s = {}; n.forEach(function (d) { s['pos' + d] = 1; }); return Object.keys(s); }, N);
    return { items: items.concat(foot) };
  }

  /* 和值 0-27（红方） */
  function gridHeZhi(rows, N) {
    var items = rows.map(function (d) {
      var s = d.n[0] + d.n[1] + d.n[2], hz = {}; for (var c = 0; c < 28; c++) hz['sum' + c] = c === s ? mk('block0', c, false, '#e60000') : '';
      return { qiHao: q(d), lottery: lot(d.n), sum: s, sumTail: s % 10, heZhi: hz };
    });
    var cols = []; for (var c = 0; c < 28; c++) cols.push('sum' + c);
    return { items: items.concat(makeFooter(rows, [{ parentKey: 'heZhi', cols: cols }], function (n) { return ['sum' + (n[0] + n[1] + n[2])]; }, N)) };
  }

  /* 跨度 0-9（红方） */
  function gridSpan(rows, N) {
    var items = rows.map(function (d) {
      var mx = Math.max.apply(null, d.n), mn = Math.min.apply(null, d.n), sp = mx - mn, sd = {}; for (var c = 0; c < 10; c++) sd['span' + c] = c === sp ? mk('block0', c, false, '#e60000') : '';
      return { qiHao: q(d), lottery: lot(d.n), kuaDu: sp, maxMin: { minNum: mn, maxNum: mx }, lingHaoLag: lianHaoMaxGap(d.n), span: sd };
    });
    var cols = []; for (var c = 0; c < 10; c++) cols.push('span' + c);
    return { items: items.concat(makeFooter(rows, [{ parentKey: 'span', cols: cols }], function (n) { return ['span' + (Math.max.apply(null, n) - Math.min.apply(null, n))]; }, N)) };
  }

  /* 012路/三区 定位（百红 十绿 个蓝 方块） */
  function gridLu(rows, kind, N) {
    var fn = kind === 'threeAreaD' ? zoneIdx : road;
    var colors = ['#e60000', '#0a9b34', '#1565d8'];
    var items = rows.map(function (d) {
      var o = { qiHao: q(d), lottery: lot(d.n), rate: (function () { var c = [0, 0, 0]; d.n.forEach(function (v) { c[fn(v)]++; }); return c.join(':'); })(), array: d.n.map(function (v) { return kind === 'threeAreaD' ? (fn(v) + 1) : fn(v); }).join('') };
      [0, 1, 2].forEach(function (p) { var val = fn(d.n[p]), cell = {}; for (var c = 0; c < 3; c++) cell['pos' + p + c] = c === val ? mk('block' + p, c, false, colors[p]) : ''; o['pos' + p] = cell; });
      return o;
    });
    var groups = [0, 1, 2].map(function (p) { return { parentKey: 'pos' + p, cols: ['pos' + p + 0, 'pos' + p + 1, 'pos' + p + 2] }; });
    return { items: items.concat(makeFooter(rows, groups, function (n) { return ['pos0' + fn(n[0]), 'pos1' + fn(n[1]), 'pos2' + fn(n[2])]; }, N)) };
  }

  /* 大小/奇偶/质合：rate(4)+paiWei(8) 红"是" */
  function gridBsOeZh(rows, idx, N) {
    var pred = predOf(idx), ch = charOf(idx);
    var rateCode = ["3", "12", "21", "30"], order = [0, 1, 10, 100, 11, 101, 110, 111];
    var items = rows.map(function (d) {
      var k = d.n.reduce(function (a, v) { return a + (pred(v) ? 1 : 0); }, 0);
      var pv = (pred(d.n[0]) ? 100 : 0) + (pred(d.n[1]) ? 10 : 0) + (pred(d.n[2]) ? 1 : 0);
      var rate = {}, paiWei = {};
      rateCode.forEach(function (rc, i) { rate[idx + 'Rate' + rc] = i === k ? mk('block0', '是', false, '#e60000') : ''; });
      order.forEach(function (ov) { paiWei[idx + ov] = ov === pv ? mk('block1', '是', false, '#0a9b34') : ''; });
      var pwc = idx === 'bigSmall' ? bsC : idx === 'oddEven' ? oeC : zhC;
      return { qiHao: q(d), lottery: lot(d.n), pW: d.n.map(pwc).join(''), rate: rate, paiWei: paiWei };
    });
    var groups = [{ parentKey: 'rate', cols: rateCode.map(function (rc) { return idx + 'Rate' + rc; }) }, { parentKey: 'paiWei', cols: order.map(function (ov) { return idx + ov; }) }];
    var hit = function (n) { var k = n.reduce(function (a, v) { return a + (pred(v) ? 1 : 0); }, 0); var pv = (pred(n[0]) ? 100 : 0) + (pred(n[1]) ? 10 : 0) + (pred(n[2]) ? 1 : 0); return [idx + 'Rate' + rateCode[k], idx + pv]; };
    return { items: items.concat(makeFooter(rows, groups, hit, N)) };
  }

  /* 012路比/三区比：rate(10) 红"是" */
  function gridLuRate(rows, idx, N) {
    var fn = idx === 'threeAreaRate' ? zoneIdx : road;
    var value = [3, 12, 21, 30, 102, 111, 120, 201, 210, 300];
    function code(n) { var c = [0, 0, 0]; n.forEach(function (v) { c[fn(v)]++; }); return c[0] * 100 + c[1] * 10 + c[2]; }
    var items = rows.map(function (d) {
      var cd = code(d.n), rate = {}; value.forEach(function (v) { rate[idx + v] = v === cd ? mk('block0', '是', false, '#e60000') : ''; });
      var c = [0, 0, 0]; d.n.forEach(function (v) { c[fn(v)]++; });
      return { qiHao: q(d), lottery: lot(d.n), v: c.join(':'), rate: rate };
    });
    var groups = [{ parentKey: 'rate', cols: value.map(function (v) { return idx + v; }) }];
    return { items: items.concat(makeFooter(rows, groups, function (n) { return [idx + code(n)]; }, N)) };
  }

  /* 综合（无页脚） */
  function tableBase(rows) {
    return { items: rows.map(function (d) {
      function r(pred) { var k = d.n.reduce(function (a, v) { return a + (pred(v) ? 1 : 0); }, 0); return k + ':' + (3 - k); }
      function rr(fn) { var c = [0, 0, 0]; d.n.forEach(function (v) { c[fn(v)]++; }); return c.join(':'); }
      return { qiHao: q(d), lottery: lot(d.n), shape: { shape: shapeC(d.n), sameNum: sameNumOf(d.n) }, sum: d.n[0] + d.n[1] + d.n[2], span: Math.max.apply(null, d.n) - Math.min.apply(null, d.n),
        shapeRate: { bigSmallRate: r(function (v) { return v >= 5; }), oddEvenRate: r(function (v) { return v % 2; }), zhiHeRate: r(function (v) { return PRIMES[v]; }), luShuRate: rr(road), threeAreaRate: rr(zoneIdx) } };
    }) };
  }

  /* 形态（红"是"） */
  function tableXingTai(rows, N) {
    var items = rows.map(function (d) {
      var sh = shapeOf(d.n), lian = lianOf(d.n);
      return { qiHao: q(d), lottery: lot(d.n), xingTai: sh,
        xt: { zuSan: sh === '组三' ? mk('', '是', false, '#e60000') : '', zuLiu: sh === '组六' ? mk('', '是', false, '#e60000') : '', baoZi: sh === '豹子' ? mk('', '是', false, '#e60000') : '' },
        lh: lian === 'lian3' ? '3连' : lian === 'lian2' ? '2连' : '不连',
        lianHao: { lian0: lian === 'lian0' ? mk('', '是', false, '#e60000') : '', lian2: lian === 'lian2' ? mk('', '是', false, '#e60000') : '', lian3: lian === 'lian3' ? mk('', '是', false, '#e60000') : '' } };
    });
    var hit = function (n) { var sh = shapeOf(n); return [sh === '组三' ? 'zuSan' : sh === '组六' ? 'zuLiu' : 'baoZi', lianOf(n)]; };
    return { items: items.concat(makeFooter(rows, [{ parentKey: 'xt', cols: ['zuSan', 'zuLiu', 'baoZi'] }, { parentKey: 'lianHao', cols: ['lian0', 'lian2', 'lian3'] }], hit, N)) };
  }

  /* 万能码（绿"是"） */
  function tableW(rows, idx, N) {
    var combos = W[idx];
    function covered(n, cb) { var set = {}; n.forEach(function (v) { set[v] = 1; }); return Object.keys(set).every(function (x) { return cb.indexOf(x) !== -1; }); }
    var items = rows.map(function (d) {
      var cell = {}; combos.forEach(function (cb) { cell['w' + cb] = covered(d.n, cb) ? mk('', '是', false, '#0a9b34') : ''; });
      var o = { qiHao: q(d), lottery: lot(d.n) }; o[idx] = cell; return o;
    });
    return { items: items.concat(makeFooter(rows, [{ parentKey: idx, cols: combos.map(function (cb) { return 'w' + cb; }) }], function (n) { return combos.filter(function (cb) { return covered(n, cb); }).map(function (cb) { return 'w' + cb; }); }, N)) };
  }

  /* 其它（无页脚）：二码/二位和/二位差(百十·百个·十个) + ac值/平均值/连号/0-9开出 */
  function tableOther(rows) {
    return { items: rows.map(function (d) {
      var n = d.n;
      var distinct = {}; n.forEach(function (v) { distinct[v] = 1; });
      var uniq = Object.keys(distinct).map(Number).sort(function (a, b) { return a - b; });
      var maxRun = 1, cur = 1; for (var i = 1; i < uniq.length; i++) { if (uniq[i] - uniq[i - 1] === 1) { cur++; if (cur > maxRun) maxRun = cur; } else cur = 1; }
      var lianStr = ['一连', '二连', '三连'][maxRun - 1];
      var ac = (function () { var s = {}; for (var a = 0; a < 3; a++) for (var b = a + 1; b < 3; b++) { var x = Math.abs(n[a] - n[b]); if (x) s[x] = 1; } return Math.max(0, Object.keys(s).length - 2); })();
      return {
        qiHao: q(d), lottery: lot(n),
        acValue: ac, average: ((n[0] + n[1] + n[2]) / 3).toFixed(1),
        lianHao: lianStr, differNum: uniq.length,
        erMa: { erMa01: '' + n[0] + n[1], erMa02: '' + n[0] + n[2], erMa12: '' + n[1] + n[2] },
        erWeiHe: { he01: n[0] + n[1], he02: n[0] + n[2], he12: n[1] + n[2] },
        erWeiCha: { cha01: Math.abs(n[0] - n[1]), cha02: Math.abs(n[0] - n[2]), cha12: Math.abs(n[1] - n[2]) }
      };
    }) };
  }

  function build(index, rowNumber) {
    return drawsPromise.then(function (all) {
      var N = rowNumber > 0 ? rowNumber : all.length;
      var rows = all.slice(Math.max(0, all.length - N)); N = rows.length;
      var r;
      if (index === 'base') r = tableBase(rows);
      else if (index === 'numDistri') r = gridNumDistri(rows, N);
      else if (index === 'pos0') r = gridPos(rows, 0, N);
      else if (index === 'pos1') r = gridPos(rows, 1, N);
      else if (index === 'pos2') r = gridPos(rows, 2, N);
      else if (index === 'heZhi') r = gridHeZhi(rows, N);
      else if (index === 'span') r = gridSpan(rows, N);
      else if (index === 'luShuD' || index === 'luShu') r = gridLu(rows, 'luShuD', N);
      else if (index === 'threeAreaD' || index === 'threeArea') r = gridLu(rows, 'threeAreaD', N);
      else if (index === 'bigSmall' || index === 'oddEven' || index === 'zhiHe') r = gridBsOeZh(rows, index, N);
      else if (index === 'luShuRate' || index === 'threeAreaRate') r = gridLuRate(rows, index, N);
      else if (index === 'xingTai') r = tableXingTai(rows, N);
      else if (index === 'w5' || index === 'w6' || index === 'w7') r = tableW(rows, index, N);
      else r = tableOther(rows);
      r.index = index; r.lotteryCategory = 'Magic3_Fc3D'; r.width = document.body.clientWidth; r.height = document.documentElement.clientHeight;
      return r;
    });
  }

  function install() {
    if (typeof HttpUtils === 'undefined') { setTimeout(install, 30); return; }
    HttpUtils.ajaxHttpGet = function (url, param, callBack) {
      if (String(url).indexOf('getTrend') !== -1) { build(param.index, Number(param.rowNumber) || 30).then(function (json) { json.fromCache = false; callBack(json, 'success', null); }); }
    };
  }
  install();
})();
