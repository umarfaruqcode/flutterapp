const ts2 = thermalComfortData.filter(d => d.temperatureC > 0);
ts2.forEach(d => {
  d.M = d.MR * 58;
  d.MW = d.M;
  d.TA = d.temperatureC;
  d.RH = d.humidity;
  d.CLO = d.clothingNumCumulative;
});
ts2.forEach(d => {
  d.FNPS = Math.pow(2.75, (16.6536 - 4030.183 / (d.TA + 235)));
  d.PA = d.RH * 10 * d.FNPS;
  d.ICL = 0.155 * d.CLO;
  d.FCL = d.ICL < 0.078 ? 1 + 1.29 * d.ICL : 1.05 + 0.645 * d.ICL;
});
ts2.forEach(d => {
  d.HCF = 12.1 * Math.pow(0.1, 0.5);
  d.TR = d.TA;
  d.TRA = d.TR + 273;
  d.TAA = d.TA + 273;
});
ts2.forEach(d => {
  d.TCLA = d.TAA + ((35.5 - d.TA) / (3.5 * (6.45 * d.ICL + 0.1)));
});
ts2.forEach(d => {
  d.P1 = d.ICL * d.FCL;
  d.P2 = d.P1 * 3.96;
  d.P3 = d.P1 * 100;
  d.P4 = d.P1 * d.TAA;
  d.P5 = 308.7 - 0.028 * d.MW + d.P2 * Math.pow((d.TRA / 100), 4);
});
ts2.forEach(d => {
  d.XN = d.TCLA / 100;
  d.XF = d.XN;
});
for (let N = 0; N < 150; N++) {
  ts2.forEach(d => {
    d.XF = (d.XF + d.XN) / 2;
    d.HCF = 12.1 * Math.pow(0.1, 0.5);
    d.HCN = 2.38 * Math.pow(Math.abs(100 * d.XF - d.TAA), 0.25);
    d.HC = d.HCF < d.HCN ? d.HCF : d.HCN;
    d.XN = (d.P5 + d.P4 * d.HC - d.P2 * Math.pow(d.XF, 4)) / (100 + d.P3 * d.HC);
  });
}
ts2.forEach(d => {
  d.S = d.XN - d.XF;
  d.TCL = 100 * d.XN - 273;
});
ts2.forEach(d => {
  d.HL1 = 3.05 * 0.001 * (5733 - (6.99 * d.MW) - d.PA);
});
ts2.forEach(d => {
  d.HL2 = d.MR > 58 ? 0.42 * (d.MR - 58) : 0;
});
ts2.forEach(d => {
  d.HL3 = 1.7 * 0.00001 * d.MR * (5867 - d.PA);
});
ts2.forEach(d => {
  d.HL4 = 0.0014 * d.MR * (34 - d.TA);
});
ts2.forEach(d => {
  d.HL5 = 3.96 * Math.pow(10, -8) * d.FCL * (Math.pow(d.XN, 4) - Math.pow((d.TRA / 100), 4));
});
ts2.forEach(d => {
  d.HL6 = d.FCL * d.HC * (d.TCL - d.TA);
});
ts2.forEach(d => {
  d.TS = 0.303 * Math.pow(2.76, -0.036 * d.M) + 0.028;
  d.PMV = d.TS * (d.MW - d.HL1 - d.HL2 - d.HL3 - d.HL4 - d.HL5 - d.HL6);
  d.E = d.PMV - d.thermalSensationNum + 4;
});

ts2 = ts2.filter(d => d.thermalSensationNum > 0);

console.log(ts2);

