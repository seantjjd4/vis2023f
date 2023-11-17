function _1(md){return(
md`# HW2 strong baseline (2pt)`
)}

function _yCounts(){return(
[]
)}

function _constellationMap(){return(
['牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座']
)}

function _constellations(data){return(
data.map(item => item.Constellation)
)}

function _5(yCounts,constellations,constellationMap,data)
{
  yCounts.length = 0; //將yCounts清空
  var minConstellation = Math.min(...constellations); //最早出生年
  var maxConstellation = Math.max(...constellations); //最晚出生年
  for (var y=minConstellation; y<=maxConstellation; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({constellation:y, constellationName:constellationMap[y],gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({constellation:y, constellationName:constellationMap[y], gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minConstellation)*2 + (x.Gender== "男" ? 0 : 1);
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _6(Plot,constellationMap,yCounts){return(
Plot.plot({
  grid: true,
  y: {label: "count"},
  x: {label: "constellation", tickFormat: (d) => constellationMap[d]},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts,
              {
                x: "constellation",
                y: "count",
                fill:"gender",
                channels: {gender: "gender", constellationName: "constellationName"},
                tip: { format: { x: false, gender: true, y: true, constellationName: true }}
              }),
  ]
})
)}

function _histogramData(){return(
[]
)}

function _8(data,constellationMap,histogramData)
{
  data.forEach (x=> {
    let index = x.Constellation;
    x.constellationName = constellationMap[index];
    histogramData.push(x);
  })

  return histogramData;
}


function _9(Plot,constellationMap,histogramData){return(
Plot.plot({  
  y: {grid: true, label: "count"},
  x: {label: "constellation", ticks: 12, tickFormat: (d) => constellationMap[d]},
  marks: [
    Plot.rectY(histogramData, Plot.binX({y:"count"}, { 
      x:"Constellation", 
      interval: 1, 
      fill:"Gender",
      tip: true,
      title: d => `Constellation: ${constellationMap[d.Constellation]}\nGender: ${d.Gender}`
    })),
    Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 }),
  ]
})
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["../data.json", {url: new URL("./files/2259824662fb612853b8873b8814ace51e8cbac39ba881850d66e26df63f1897b01d1bd3459af6529669fd912da9dd607a30666a93278d7fdfa10bbe22b8913d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("constellationMap")).define("constellationMap", _constellationMap);
  main.variable(observer("constellations")).define("constellations", ["data"], _constellations);
  main.variable(observer()).define(["yCounts","constellations","constellationMap","data"], _5);
  main.variable(observer()).define(["Plot","constellationMap","yCounts"], _6);
  main.variable(observer("histogramData")).define("histogramData", _histogramData);
  main.variable(observer()).define(["data","constellationMap","histogramData"], _8);
  main.variable(observer()).define(["Plot","constellationMap","histogramData"], _9);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  return main;
}
