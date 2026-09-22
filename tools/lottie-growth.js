/* Run from the project root: node tools/lottie-growth.js

   Writes assets/animations/growth.json: a 4s loop of three bars growing and a
   trend line drawing across them, in the brand colours. Authored here so the
   file is ours — no stock licence or attribution attached to it. */
const fs = require('fs');

const BLUE = [1, 1, 1, 1];            // white: this sits on the navy panel
const BLUE_MID = [0.62, 0.78, 0.93, 1];
const CYAN = [0.329, 0.784, 0.855, 1];

const still = (v) => ({ a: 0, k: v });
const keys = (frames) => ({
  a: 1,
  k: frames.map((f, i) => {
    const kf = { t: f.t, s: f.s };
    if (i < frames.length - 1) {
      kf.i = { x: [0.3], y: [1] };
      kf.o = { x: [0.5], y: [0] };
    }
    return kf;
  }),
});

const keys2 = (frames) => ({
  a: 1,
  k: frames.map((f, i) => {
    const kf = { t: f.t, s: f.s };
    if (i < frames.length - 1) {
      kf.i = { x: [0.3, 0.3], y: [1, 1] };
      kf.o = { x: [0.5, 0.5], y: [0, 0] };
    }
    return kf;
  }),
});

function bar(ind, x, top, colour, inFrame, outFrame) {
  const bottom = 92;
  const h = bottom - top;
  return {
    ddd: 0, ind, ty: 4, nm: 'bar' + ind, sr: 1,
    ks: { o: still(100), r: still(0), p: still([0, 0, 0]), a: still([0, 0, 0]), s: still([100, 100, 100]) },
    ao: 0,
    shapes: [{
      ty: 'gr', nm: 'g', hd: false,
      it: [
        { ty: 'rc', d: 1, s: still([17, h]), p: still([x, top + h / 2]), r: still(7), nm: 'rect' },
        { ty: 'fl', c: still(colour), o: still(100), r: 1, nm: 'fill' },
        {
          ty: 'tr',
          p: still([x, bottom]), a: still([x, bottom]), r: still(0), o: still(100), sk: still(0), sa: still(0),
          s: keys2([
            { t: inFrame, s: [100, 0] },
            { t: inFrame + 16, s: [100, 100] },
            { t: outFrame, s: [100, 100] },
            { t: outFrame + 14, s: [100, 0] },
          ]),
        },
      ],
    }],
    ip: 0, op: 120, st: 0, bm: 0,
  };
}

const line = {
  ddd: 0, ind: 4, ty: 4, nm: 'trend', sr: 1,
  ks: { o: still(100), r: still(0), p: still([0, 0, 0]), a: still([0, 0, 0]), s: still([100, 100, 100]) },
  ao: 0,
  shapes: [{
    ty: 'gr', nm: 'g', hd: false,
    it: [
      {
        ty: 'sh', d: 1, nm: 'path',
        ks: still({
          i: [[0, 0], [0, 0], [0, 0], [0, 0]],
          o: [[0, 0], [0, 0], [0, 0], [0, 0]],
          v: [[20, 74], [44, 54], [68, 62], [100, 24]],
          c: false,
        }),
      },
      {
        ty: 'tm', nm: 'trim', m: 1, o: still(0),
        s: keys([{ t: 0, s: [0] }, { t: 86, s: [0] }, { t: 112, s: [100] }]),
        e: keys([{ t: 18, s: [0] }, { t: 52, s: [100] }]),
      },
      { ty: 'st', c: still(CYAN), o: still(100), w: still(7), lc: 2, lj: 2, nm: 'stroke' },
      { ty: 'tr', p: still([0, 0]), a: still([0, 0]), s: still([100, 100]), r: still(0), o: still(100), sk: still(0), sa: still(0) },
    ],
  }],
  ip: 0, op: 120, st: 0, bm: 0,
};

const dot = {
  ddd: 0, ind: 5, ty: 4, nm: 'dot', sr: 1,
  ks: {
    o: keys([{ t: 46, s: [0] }, { t: 54, s: [100] }, { t: 96, s: [100] }, { t: 108, s: [0] }]),
    r: still(0), p: still([100, 24, 0]), a: still([0, 0, 0]),
    s: keys2([{ t: 46, s: [40, 40] }, { t: 58, s: [118, 118] }, { t: 68, s: [100, 100] }]),
  },
  ao: 0,
  shapes: [{
    ty: 'gr', nm: 'g', hd: false,
    it: [
      { ty: 'el', d: 1, s: still([15, 15]), p: still([0, 0]), nm: 'circle' },
      { ty: 'fl', c: still(CYAN), o: still(100), r: 1, nm: 'fill' },
      { ty: 'tr', p: still([0, 0]), a: still([0, 0]), s: still([100, 100]), r: still(0), o: still(100), sk: still(0), sa: still(0) },
    ],
  }],
  ip: 0, op: 120, st: 0, bm: 0,
};

const anim = {
  v: '5.7.4', fr: 30, ip: 0, op: 120, w: 120, h: 120, nm: 'kavyro-growth', ddd: 0,
  assets: [],
  layers: [dot, line, bar(3, 92, 30, CYAN, 24, 104), bar(2, 60, 46, BLUE_MID, 12, 96), bar(1, 28, 62, BLUE, 0, 88)],
  markers: [],
};

fs.writeFileSync('assets/animations/growth.json', JSON.stringify(anim));
console.log('bytes:', fs.statSync('assets/animations/growth.json').size);
