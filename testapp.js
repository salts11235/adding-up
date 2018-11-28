'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.ReadStream('./test-pref.csv');
const rl = readline.createInterface({'input': rs, 'output': {} });
const AMap = new Map(); 
rl.on('line', (lineString) => {
  const cut = lineString.split(',');
  const disc = cut[0];
  const point = parseInt(cut[1]);
  const stgen = parseInt(cut[2])
  let value = AMap.get(point);
  if (!value) {
    value = {
      A: 0,
      B: 0
    }
  };
  value.A += point;
  value.A += stgen;

  value.B += point;
  value.B += stgen;
  
  AMap.set(disc, value.A);

});

rl.resume();
rl.on('close', () => {
  for (let [Key, value] of AMap) {
    value.B += value.A;
  }
  console.log(AMap);
});

