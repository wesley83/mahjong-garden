// Original vector environments: presentation only, never an editable game model.
export const gardens = [
  {name:'The first path',place:'Dawn at the pavilion',sky:'#b99d88',mist:'#7faaa0',mountain:'#385e61',water:'#254b47',leaf:'#294b3d',accent:'#dcaa7e'},
  {name:'By the water',place:'The lotus water garden',sky:'#b5c1b1',mist:'#8eb8b5',mountain:'#376a72',water:'#265c62',leaf:'#255c50',accent:'#e2baab'},
  {name:'Above the clouds',place:'The mountain sanctuary',sky:'#b8b1c4',mist:'#a7b9c8',mountain:'#53667e',water:'#3b5365',leaf:'#394f60',accent:'#e5cead'},
  {name:'Autumn whispers',place:'The amber maple grove',sky:'#c5a17e',mist:'#b3a68b',mountain:'#686650',water:'#394b41',leaf:'#9e543d',accent:'#e4ac65'},
  {name:'Under the stars',place:'The moonlit courtyard',sky:'#282e4c',mist:'#525d7c',mountain:'#273b53',water:'#1b3545',leaf:'#233f40',accent:'#e8c28d'},
  {name:'The hidden garden',place:'Beyond the garden gate',sky:'#bda99d',mist:'#91aaa1',mountain:'#4c6861',water:'#294c48',leaf:'#3d5942',accent:'#d2b598'}
];

const pine=(x,y,size,color)=>`<g transform="translate(${x} ${y}) scale(${size})" fill="${color}"><path d="M-5 12 0-165 7 12Z"/><path d="M0-185c-16 26-35 25-52 34l38 2c-16 17-42 22-57 36l50 1c-24 17-52 25-65 42l63-3c-29 20-65 28-83 47 40 2 81-6 106-16 28 12 69 17 105 12-24-20-56-27-85-44l62 1c-22-17-42-23-68-39l48-2c-18-17-42-19-61-36l37-3c-20-11-37-13-52-32Z"/></g>`;
const pavilion=(x,y,scale,accent)=>`<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-105 0h210v13h-210z" fill="#293e38"/><path d="M-83-122h9V0h-9zm157 0h9V0h-9zM-9-122h9V0h-9z" fill="#323c33"/><path d="M-71-108h57v84h-57zm83 0h55v84H12z" fill="${accent}" opacity=".65"/><path d="M-67-107h3v81h-3zm12 0h3v81h-3zm12 0h3v81h-3zm12 0h3v81h-3zm50 0h3v81h-3zm12 0h3v81h-3zm12 0h3v81h-3zm12 0h3v81h-3z" fill="#46483b"/><path d="M-128-121q73-12 128-82 55 70 128 82l-13 13H-115Z" fill="#2c403c"/><path d="M-128-121q73-12 128-82 55 70 128 82" fill="none" stroke="#8c9476" stroke-width="4"/><path d="M-101-134H101M-78-148H78M-51-165H51M-24-184H24" stroke="#617360" opacity=".5"/><path d="M-2-204v-11m-8 9h16" stroke="#283c35" stroke-width="4"/><path d="M-115 16h230v10h-230zM-126 29h252v9h-252z" fill="#60716a"/><path d="M-88-52H88M-80-52v29m18-29v29m18-29v29m18-29v29m18-29v29m18-29v29m18-29v29m18-29v29m18-29v29m18-29v29" stroke="#34463c" stroke-width="5"/></g>`;

export function gardenSVG(chapter=1){
  const index=Math.max(0,Math.min(5,chapter-1)),s=gardens[index],night=index===4;
  const stars=night?Array.from({length:35},(_,i)=>`<circle cx="${95+(i*137)%1280}" cy="${45+(i*67)%300}" r="${i%4===0?1.7:.8}" fill="#eadbbd" opacity="${.3+i%5*.1}"/>`).join(''):'';
  const branches=index===3?`<g fill="#b77647" opacity=".8">${Array.from({length:17},(_,i)=>`<path transform="translate(${90+(i*29)%220} ${200+(i*43)%260}) rotate(${i*27})" d="m0-12 4 7 7-3-2 8 8 4-9 2-3 8-4-7-8 3 3-8-7-5 8-2Z"/>`).join('')}</g>`:'';
  const special=index===1?'<path d="M980 572q155-115 300 0m-292-1v-29m24 10v-31m25 17v-32m26 20v-35m28 23v-35m29 35v-35m27 35v-31m26 44v-35m24 49v-32m22 46v-27" fill="none" stroke="#a69b77" stroke-width="10"/>':index===2?pavilion(1120,380,.64,s.accent):index===5?'<g fill="none" stroke="#718477" stroke-width="20"><path d="M1075 600V452a96 96 0 0 1 192 0v148"/><path d="M1060 608h225" stroke-width="26"/></g><path d="M1083 600V452a88 88 0 0 1 176 0v148" fill="#253f3a"/>':'';
  const lanterns=night||index===5?`<g stroke="#353c34" stroke-width="3"><path d="M110 90v155m1192-175v210"/><g fill="url(#lantern)"><ellipse cx="110" cy="260" rx="28" ry="42"/><ellipse cx="1302" cy="296" rx="25" ry="38"/></g><path d="M93 221h34m-34 78h34m1153-40h38m-38 73h38" stroke="#b7935b"/><path d="M110 302v22m1192 11v22" stroke="#a37f51"/></g>`:'';
  return `<svg class="world-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
    <linearGradient id="garden-sky" x2="0" y2="1"><stop stop-color="${s.sky}"/><stop offset=".75" stop-color="${s.mist}"/><stop offset="1" stop-color="${s.water}"/></linearGradient>
    <linearGradient id="garden-water" x2="0" y2="1"><stop stop-color="${s.water}"/><stop offset="1" stop-color="#132d2b"/></linearGradient>
    <radialGradient id="garden-glow"><stop stop-color="${s.accent}" stop-opacity=".45"/><stop offset="1" stop-color="${s.accent}" stop-opacity="0"/></radialGradient>
    <radialGradient id="lantern"><stop stop-color="#ffe6a5"/><stop offset=".7" stop-color="#e9b66f"/><stop offset="1" stop-color="#936147"/></radialGradient>
    <pattern id="garden-grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#f1e2bb" opacity=".05"/><circle cx="5" cy="4" r=".5" fill="#102f2c" opacity=".08"/></pattern>
  </defs><path fill="url(#garden-sky)" d="M0 0h1440v900H0z"/>
  <g class="garden-layer" data-parallax-depth="0.2"><circle cx="1050" cy="220" r="230" fill="url(#garden-glow)"/><circle cx="1050" cy="220" r="${night?51:43}" fill="${night?'#f3dfb1':'#e9ccaa'}" opacity="${night?.9:.7}"/>${stars}
  <path d="M-70 470 150 272 268 375 421 180 624 395 800 257 951 350 1140 184 1510 470v190H-70Z" fill="${s.mountain}" opacity=".26"/>
  <path d="m317 302 104-122 102 114-66-38-36-28-34 37Z" fill="#eee8d5" opacity=".35"/>
  <path d="M-30 516 167 380 274 447 491 324 648 463 812 371 1012 476 1195 320 1490 501v230H-30Z" fill="${s.mountain}" opacity=".45"/>
  </g><g class="garden-layer" data-parallax-depth="0.55"><path d="M-40 569q165-133 323-49 165-107 350-25 167-88 329-10 183-105 505 38v240H-40Z" fill="${s.mountain}" opacity=".72"/>
  <path d="M0 565q349-53 689 4t751-8v339H0Z" fill="url(#garden-water)"/>
  <path d="M0 585q170-89 352-43l-68 57-85 19-199 8ZM1440 537q-170-39-316 17l83 52 233 32Z" fill="#2c4c42"/>
  ${pavilion(index===2?160:205,index===2?566:558,index===2?.65:.85,s.accent)}${special}
  <path d="M0 663q140-111 317-29L254 713 0 770ZM1440 631q-123-44-226 10l43 62 183 46Z" fill="#1c3a31"/>
  <g fill="none" stroke="${s.mist}" opacity=".16"><path d="M300 625h216m-172 8h305m-24-18h350m39 41h213m-818 55h320m-60 26h366m-65-56h380m-632 99h248m98-16h322"/><path d="M975 256h150m-91 8h184M593 414h179m-49 9h170" opacity=".65"/></g>
  </g><g class="garden-layer" data-parallax-depth="1">${pine(40,595,1.7,s.leaf)}${pine(1360,630,1.8,s.leaf)}${pine(1285,557,.9,s.leaf)}${pine(345,529,.44,s.leaf)}${pine(1180,535,.4,s.leaf)}${branches}${lanterns}
  <path d="M0 863q129-110 322-55 158-35 282 31 160-58 309-13 236-84 527 23v51H0Z" fill="#152e29"/>
  <g fill="${s.leaf}" stroke="#203d32" stroke-width="3"><path d="M-35 715q153-2 206 185Q36 863-35 715Zm3 93Q94 748 244 875 91 910-32 808Zm1472-83q-147-4-202 175 133-40 202-175Zm5 105q-118-73-271 52 174 21 271-52Z"/></g>
  <g stroke="#809374" stroke-width="1" opacity=".26" fill="none"><path d="M0 770 117 900M0 835l186 47m1254-117-119 135m119-43-180 29"/></g>
  </g><path fill="url(#garden-grain)" d="M0 0h1440v900H0z"/></svg>`;
}
