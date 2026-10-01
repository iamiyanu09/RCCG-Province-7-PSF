const CONFIG={
  channelLink:"https://whatsapp.com/channel/0029VbDlhIFJ93wdQyfQ9O46",
  eventDate:"2026-10-14T00:00:00"
};
const $=id=>document.getElementById(id);

const verses=[
["Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.","1 Timothy 4:12"],
["Trust in the LORD with all thine heart; and lean not unto thine own understanding.","Proverbs 3:5"],
["Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.","Joshua 1:9"],
["Wherewithal shall a young man cleanse his way? by taking heed thereto according to thy word.","Psalm 119:9"],
["For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.","Jeremiah 29:11"]
];

if($("join")) $("join").href=CONFIG.channelLink;
if($("waContact")) $("waContact").href=CONFIG.channelLink;

if($("vtext")){
  let v=Math.floor(Date.now()/864e5)%verses.length;
  function showVerse(){$("vtext").textContent=verses[v][0];$("vref").textContent=verses[v][1]}
  $("next").addEventListener("click",()=>{v=(v+1)%verses.length;showVerse()});
  showVerse();
}

if($("share")){
  $("share").addEventListener("click",async()=>{
    const data={title:"RCCG Province 7 PSF",text:"Join our teens WhatsApp Channel!",url:location.href};
    try{
      if(navigator.share){await navigator.share(data)}
      else{await navigator.clipboard.writeText(location.href);$("share").textContent="Link copied"}
    }catch(e){}
  });
}

function renderCountdown(boxId,lineId){
  const box=$(boxId);
  if(!box) return;
  function tick(){
    const now=new Date();
    const target=new Date(CONFIG.eventDate);
    let diff=Math.max(0,target-now);
    const d=Math.floor(diff/864e5);
    const h=Math.floor(diff%864e5/36e5);
    const m=Math.floor(diff%36e5/6e4);
    const s=Math.floor(diff%6e4/1000);
    box.innerHTML=
      '<div><b>'+d+'</b><span>Days</span></div>'+
      '<div><b>'+h+'</b><span>Hrs</span></div>'+
      '<div><b>'+m+'</b><span>Min</span></div>'+
      '<div><b>'+s+'</b><span>Sec</span></div>';
    const line=$(lineId);
    if(line) line.textContent=d+" day"+(d===1?"":"s");
  }
  tick();
  setInterval(tick,1000);
}
renderCountdown("countdown","daysleft");
renderCountdown("countdown2","daysleft2");
