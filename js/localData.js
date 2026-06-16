/* 本地数据适配器：用我自己的可靠数据(../data/draws.json)驱动 zjt 原版渲染引擎。
 * 覆盖 HttpUtils.ajaxHttpGet 对 getTrend.action 的请求，按各 index 的字段(含父子嵌套)生成 items。*/
(function () {
  'use strict';
  var PRIMES = { 1: 1, 2: 1, 3: 1, 5: 1, 7: 1 };
  var W = {
    w5: ["01249", "01268", "01346", "01467", "01569", "02357", "02458", "03789", "12359", "12378", "12589", "13478", "14579", "23456", "24679", "34689", "35678"],
    w6: ["012346", "012359", "012489", "013789", "026789", "045678", "123457", "156789", "234568", "345679"],
    w7: ["0123489", "0345679", "0156789", "1234567", "0245678", "2356789"]
  };
  var drawsPromise = fetch('../data/draws.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (j) { return j.draws || []; })
    .catch(function () { return []; });

  function road(v) { return v % 3; }
  function zoneIdx(v) { return v <= 3 ? 0 : v <= 6 ? 1 : 2; }
  function ball(block, txt) { return "<span" + (block ? " block='" + block + "'" : "") + " class='bbb'>" + txt + "</span>"; }
  function ratioCounts(n, pred) { var c = [0, 0, 0]; n.forEach(function (v) { c[pred(v)]++; }); return c; }
  function shapeOf(n) {
    if (n[0] === n[1] && n[1] === n[2]) return '豹子';
    if (n[0] === n[1] || n[1] === n[2] || n[0] === n[2]) return '组三';
    return '组六';
  }
  function sameNumOf(n) {
    if (n[0] === n[1] && n[1] === n[2]) return '' + n[0] + n[0] + n[0];
    if (n[0] === n[1] || n[1] === n[2] || n[0] === n[2]) return '' + (n[0] === n[1] ? n[0] : n[1] === n[2] ? n[1] : n[0]) + (n[0] === n[1] ? n[0] : n[1] === n[2] ? n[1] : n[0]);
    return '';
  }
  function acOf(n) { var s = {}; for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) { var d = Math.abs(n[i] - n[j]); if (d) s[d] = 1; } return Math.max(0, Object.keys(s).length - 2); }
  function bs(v) { return v >= 5 ? '大' : '小'; }
  function oe(v) { return v % 2 ? '奇' : '偶'; }
  function zh(v) { return PRIMES[v] ? '质' : '合'; }
  function predOf(idx) { return idx === 'bigSmall' ? function (v) { return v >= 5 ? 1 : 0; } : idx === 'oddEven' ? function (v) { return v % 2; } : function (v) { return PRIMES[v] ? 1 : 0; }; }
  function charOf(idx) { return idx === 'bigSmall' ? bs : idx === 'oddEven' ? oe : zh; }

  /* 通用嵌套页脚：扫描 items 里的命中标记(球/●)算统计，输出 6 行嵌套页脚 */
  function isHit(v) { v = String(v); return v.indexOf('bbb') !== -1 || v.indexOf('●') !== -1; }
  function computeFoot(items, groups, n) {
    var allCols = [];
    groups.forEach(function (g) { g.cols.forEach(function (f) { allCols.push({ g: g, f: f }); }); });
    var st = {}; allCols.forEach(function (x) { st[x.g.parentKey + '|' + x.f] = { freq: 0, cur: 0, maxMiss: 0, maxRun: 0, run: 0 }; });
    items.forEach(function (it) {
      allCols.forEach(function (x) {
        var s = st[x.g.parentKey + '|' + x.f];
        var cell = x.g.parentKey ? (it[x.g.parentKey] || {})[x.f] : it[x.f];
        if (isHit(cell)) { s.freq++; s.cur = 0; s.run++; if (s.run > s.maxRun) s.maxRun = s.run; }
        else { s.cur++; s.run = 0; if (s.cur > s.maxMiss) s.maxMiss = s.cur; }
      });
    });
    var defs = [
      ['出现', function (s) { return s.freq; }],
      ['平均遗漏', function (s) { return s.freq ? Math.round(n / s.freq) : n; }],
      ['最大遗漏', function (s) { return s.maxMiss; }],
      ['最大连出', function (s) { return s.maxRun; }],
      ['当前遗漏', function (s) { return s.cur; }],
      ['理论', function (s, L) { return Math.round(n / L); }]
    ];
    return defs.map(function (def) {
      var row = { name: def[0] };
      groups.forEach(function (g) {
        var obj = {};
        g.cols.forEach(function (f) { obj[f] = def[1](st[g.parentKey + '|' + f], g.cols.length); });
        if (g.parentKey) row[g.parentKey] = obj; else g.cols.forEach(function (f) { row[f] = def[1](st['|' + f], g.cols.length); });
      });
      return row;
    });
  }

  /* 位置 0-9 */
  function gridPos(rows, P) {
    var miss = new Array(10).fill(0);
    var items = rows.map(function (d) {
      var pos = {};
      for (var c = 0; c < 10; c++) { var hit = c === d.n[P]; if (hit) { pos['pos' + P + c] = ball('block0', c); miss[c] = 0; } else { miss[c]++; pos['pos' + P + c] = miss[c]; } }
      var o = { qiHao: d.issue, lottery: d.n.join(' '), weiLot: d.n[P] };
      o['pos' + P] = pos;
      o.character = { bigSmall: d.n.map(bs).join(' '), oddEven: d.n.map(oe).join(' '), zhiHe: d.n.map(zh).join(' '), luShu: d.n.map(road).join(' '), threeArea: d.n.map(function (v) { return zoneIdx(v) + 1; }).join(' ') };
      return o;
    });
    var cols = []; for (var c = 0; c < 10; c++) cols.push('pos' + P + c);
    return { items: items.concat(computeFoot(items, [{ parentKey: 'pos' + P, cols: cols }], rows.length)) };
  }

  /* 号码分布 */
  function gridNumDistri(rows) {
    var miss = new Array(10).fill(0);
    var items = rows.map(function (d) {
      var cell = {};
      for (var c = 0; c < 10; c++) { var hit = d.n.indexOf(c) !== -1; if (hit) { cell['pos' + c] = ball('', c); miss[c] = 0; } else { miss[c]++; cell['pos' + c] = miss[c]; } }
      return { qiHao: d.issue, lottery: d.n.join(' '), shape: { shape: shapeOf(d.n), sameNum: sameNumOf(d.n) },
        area0: { pos0: cell.pos0, pos1: cell.pos1, pos2: cell.pos2, pos3: cell.pos3 }, area1: { pos4: cell.pos4, pos5: cell.pos5, pos6: cell.pos6 }, area2: { pos7: cell.pos7, pos8: cell.pos8, pos9: cell.pos9 } };
    });
    return { items: items.concat(computeFoot(items, [{ parentKey: 'area0', cols: ['pos0', 'pos1', 'pos2', 'pos3'] }, { parentKey: 'area1', cols: ['pos4', 'pos5', 'pos6'] }, { parentKey: 'area2', cols: ['pos7', 'pos8', 'pos9'] }], rows.length)) };
  }

  /* 和值 0-27 (子字段 sum0..sum27) */
  function gridHeZhi(rows) {
    var miss = new Array(28).fill(0);
    var items = rows.map(function (d) {
      var s = d.n[0] + d.n[1] + d.n[2], hz = {};
      for (var c = 0; c < 28; c++) { var hit = c === s; if (hit) { hz['sum' + c] = ball('block0', c); miss[c] = 0; } else { miss[c]++; hz['sum' + c] = miss[c]; } }
      return { qiHao: d.issue, lottery: d.n.join(' '), sum: s, sumTail: s % 10, heZhi: hz };
    });
    var cols = []; for (var c = 0; c < 28; c++) cols.push('sum' + c);
    return { items: items.concat(computeFoot(items, [{ parentKey: 'heZhi', cols: cols }], rows.length)) };
  }

  /* 跨度 0-9 */
  function gridSpan(rows) {
    var miss = new Array(10).fill(0);
    var items = rows.map(function (d) {
      var mx = Math.max.apply(null, d.n), mn = Math.min.apply(null, d.n), sp = mx - mn, sd = {};
      for (var c = 0; c < 10; c++) { var hit = c === sp; if (hit) { sd['span' + c] = ball('block0', c); miss[c] = 0; } else { miss[c]++; sd['span' + c] = miss[c]; } }
      return { qiHao: d.issue, lottery: d.n.join(' '), kuaDu: sp, maxMin: { minNum: mn, maxNum: mx }, lingHaoLag: '', span: sd };
    });
    var cols = []; for (var c = 0; c < 10; c++) cols.push('span' + c);
    return { items: items.concat(computeFoot(items, [{ parentKey: 'span', cols: cols }], rows.length)) };
  }

  /* 012路/三区 定位 */
  function gridLu(rows, kind) {
    var fn = kind === 'threeAreaD' ? zoneIdx : road;
    var miss = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    var items = rows.map(function (d) {
      var o = { qiHao: d.issue, lottery: d.n.join(' '), rate: ratioCounts(d.n, fn).join(':'), array: d.n.map(fn).join('-') };
      [0, 1, 2].forEach(function (p) {
        var val = fn(d.n[p]), cell = {};
        for (var c = 0; c < 3; c++) { var hit = c === val; if (hit) { cell['pos' + p + c] = ball('block' + p, c); miss[p][c] = 0; } else { miss[p][c]++; cell['pos' + p + c] = miss[p][c]; } }
        o['pos' + p] = cell;
      });
      return o;
    });
    var groups = [0, 1, 2].map(function (p) { return { parentKey: 'pos' + p, cols: ['pos' + p + 0, 'pos' + p + 1, 'pos' + p + 2] }; });
    return { items: items.concat(computeFoot(items, groups, rows.length)) };
  }

  /* 大小/奇偶/质合：rate(4) + paiWei(8) + pW */
  function gridBsOeZh(rows, idx) {
    var pred = predOf(idx), ch = charOf(idx);
    var rateCode = ["3", "12", "21", "30"];               // k=0,1,2,3
    var order = [0, 1, 10, 100, 11, 101, 110, 111];
    var missR = {}, missP = {};
    rateCode.forEach(function (rc) { missR[rc] = 0; }); order.forEach(function (ov) { missP[ov] = 0; });
    var items = rows.map(function (d) {
      var k = d.n.reduce(function (a, v) { return a + (pred(v) ? 1 : 0); }, 0);
      var pv = (pred(d.n[0]) ? 100 : 0) + (pred(d.n[1]) ? 10 : 0) + (pred(d.n[2]) ? 1 : 0);
      var rate = {}, paiWei = {};
      rateCode.forEach(function (rc, i) { var hit = i === k; if (hit) { rate[idx + 'Rate' + rc] = ball('block0', '0:3 1:2 2:1 3:0'.split(' ')[i]); missR[rc] = 0; } else { missR[rc]++; rate[idx + 'Rate' + rc] = missR[rc]; } });
      order.forEach(function (ov) { var hit = ov === pv; if (hit) { paiWei[idx + ov] = ball('block1', d.n.map(ch).join('')); missP[ov] = 0; } else { missP[ov]++; paiWei[idx + ov] = missP[ov]; } });
      return { qiHao: d.issue, lottery: d.n.join(' '), pW: d.n.map(ch).join(''), rate: rate, paiWei: paiWei };
    });
    var groups = [{ parentKey: 'rate', cols: rateCode.map(function (rc) { return idx + 'Rate' + rc; }) }, { parentKey: 'paiWei', cols: order.map(function (ov) { return idx + ov; }) }];
    return { items: items.concat(computeFoot(items, groups, rows.length)) };
  }

  /* 012路比/三区比：rate(10) + v */
  function gridLuRate(rows, idx) {
    var fn = idx === 'threeAreaRate' ? zoneIdx : road;
    var value = [3, 12, 21, 30, 102, 111, 120, 201, 210, 300];
    var text = ["0:0:3", "0:1:2", "0:2:1", "0:3:0", "1:0:2", "1:1:1", "1:2:0", "2:0:1", "2:1:0", "3:0:0"];
    var miss = {}; value.forEach(function (v) { miss[v] = 0; });
    var items = rows.map(function (d) {
      var c = ratioCounts(d.n, fn), code = c[0] * 100 + c[1] * 10 + c[2], rate = {};
      value.forEach(function (v, i) { var hit = v === code; if (hit) { rate[idx + v] = ball('block0', text[i]); miss[v] = 0; } else { miss[v]++; rate[idx + v] = miss[v]; } });
      return { qiHao: d.issue, lottery: d.n.join(' '), v: c.join(':'), rate: rate };
    });
    var groups = [{ parentKey: 'rate', cols: value.map(function (v) { return idx + v; }) }];
    return { items: items.concat(computeFoot(items, groups, rows.length)) };
  }

  /* 综合 */
  function tableBase(rows) {
    return { items: rows.map(function (d) {
      function r(pred) { var k = d.n.reduce(function (a, v) { return a + (pred(v) ? 1 : 0); }, 0); return k + ':' + (3 - k); }
      return { qiHao: d.issue, lottery: d.n.join(' '), shape: { shape: shapeOf(d.n), sameNum: sameNumOf(d.n) },
        sum: d.n[0] + d.n[1] + d.n[2], span: Math.max.apply(null, d.n) - Math.min.apply(null, d.n),
        shapeRate: { bigSmallRate: r(function (v) { return v >= 5; }), oddEvenRate: r(function (v) { return v % 2; }), zhiHeRate: r(function (v) { return PRIMES[v]; }), luShuRate: ratioCounts(d.n, road).join(':'), threeAreaRate: ratioCounts(d.n, zoneIdx).join(':') } };
    }) };
  }

  /* 形态 */
  function tableXingTai(rows) {
    var items = rows.map(function (d) {
      var sh = shapeOf(d.n), s = d.n.slice().sort(function (a, b) { return a - b; });
      var lian = (s[1] - s[0] === 1 && s[2] - s[1] === 1) ? '3连' : (s[1] - s[0] === 1 || s[2] - s[1] === 1) ? '2连' : '不连';
      return { qiHao: d.issue, lottery: d.n.join(' '), xingTai: sh,
        xt: { zuSan: sh === '组三' ? '●' : '', zuLiu: sh === '组六' ? '●' : '', baoZi: sh === '豹子' ? '●' : '' },
        lh: lian, lianHao: { lian0: lian === '不连' ? '●' : '', lian2: lian === '2连' ? '●' : '', lian3: lian === '3连' ? '●' : '' } };
    });
    return { items: items.concat(computeFoot(items, [{ parentKey: 'xt', cols: ['zuSan', 'zuLiu', 'baoZi'] }, { parentKey: 'lianHao', cols: ['lian0', 'lian2', 'lian3'] }], rows.length)) };
  }

  /* 万能 N 码 */
  function tableW(rows, idx) {
    var combos = W[idx];
    var items = rows.map(function (d) {
      var set = {}; d.n.forEach(function (v) { set[v] = 1; });
      var cell = {};
      combos.forEach(function (cb) { var cover = Object.keys(set).every(function (x) { return cb.indexOf(x) !== -1; }); cell['w' + cb] = cover ? ball('', '中') : ''; });
      var o = { qiHao: d.issue, lottery: d.n.join(' ') }; o[idx] = cell; return o;
    });
    return { items: items.concat(computeFoot(items, [{ parentKey: idx, cols: combos.map(function (cb) { return 'w' + cb; }) }], rows.length)) };
  }

  /* 其它 */
  function tableOther(rows) {
    return { items: rows.map(function (d) {
      var distinct = {}; d.n.forEach(function (v) { distinct[v] = 1; });
      return { qiHao: d.issue, lottery: d.n.join(' '),
        erMa: { erMa: d.n.join(''), he: [d.n[0] + d.n[1], d.n[0] + d.n[2], d.n[1] + d.n[2]].join(' '), cha: [Math.abs(d.n[0] - d.n[1]), Math.abs(d.n[0] - d.n[2]), Math.abs(d.n[1] - d.n[2])].join(' ') },
        acValue: acOf(d.n), average: ((d.n[0] + d.n[1] + d.n[2]) / 3).toFixed(1), lianHao: '', differNum: Object.keys(distinct).length };
    }) };
  }

  function build(index, rowNumber) {
    return drawsPromise.then(function (all) {
      var rows = rowNumber > 0 ? all.slice(Math.max(0, all.length - rowNumber)) : all, r;
      if (index === 'base') r = tableBase(rows);
      else if (index === 'numDistri') r = gridNumDistri(rows);
      else if (index === 'pos0') r = gridPos(rows, 0);
      else if (index === 'pos1') r = gridPos(rows, 1);
      else if (index === 'pos2') r = gridPos(rows, 2);
      else if (index === 'heZhi') r = gridHeZhi(rows);
      else if (index === 'span') r = gridSpan(rows);
      else if (index === 'luShuD' || index === 'luShu') r = gridLu(rows, 'luShuD');
      else if (index === 'threeAreaD' || index === 'threeArea') r = gridLu(rows, 'threeAreaD');
      else if (index === 'bigSmall' || index === 'oddEven' || index === 'zhiHe') r = gridBsOeZh(rows, index);
      else if (index === 'luShuRate' || index === 'threeAreaRate') r = gridLuRate(rows, index);
      else if (index === 'xingTai') r = tableXingTai(rows);
      else if (index === 'w5' || index === 'w6' || index === 'w7') r = tableW(rows, index);
      else r = tableOther(rows);
      r.index = index; r.lotteryCategory = 'Magic3_Fc3D';
      r.width = document.body.clientWidth; r.height = document.documentElement.clientHeight;
      return r;
    });
  }

  function install() {
    if (typeof HttpUtils === 'undefined') { setTimeout(install, 30); return; }
    HttpUtils.ajaxHttpGet = function (url, param, callBack) {
      if (String(url).indexOf('getTrend') !== -1) {
        build(param.index, Number(param.rowNumber) || 30).then(function (json) { json.fromCache = false; callBack(json, 'success', null); });
      }
    };
  }
  install();
})();
