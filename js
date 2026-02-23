// Songs array supports SoundCloud embed URLs and local uploads
let songs = [
  {title:"SoundCloud Track 1",src:"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/85250820&color=%23bf40bf"},
  {title:"SoundCloud Track 2",src:"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&color=%23bf40bf"}
];

let current=0,playMode=0; // 0=random,1=playlist,2=one
const audio=document.getElementById("audio");
const bar=document.getElementById("bar");
const timeDisplay=document.getElementById("time");
const loopBtn=document.getElementById("loopBtn");

function renderSongs(arr){
  const list=document.getElementById("songList");
  list.innerHTML="";
  arr.forEach((s,i)=>{
    const card = document.createElement('div');
    card.className="card";
    card.innerHTML=`<h3>${s.title}</h3>`;
    card.onclick = ()=> selectSong(i);
    list.appendChild(card);
  });
}
function selectSong(i){current=i; loadSong(); audio.play();}
function loadSong(){audio.src=songs[current].src;}
function togglePlay(){if(audio.paused) audio.play(); else audio.pause();}
function nextSong(){if(playMode===0) current=Math.floor(Math.random()*songs.length); else if(playMode===1) current=(current+1)%songs.length; loadSong(); audio.play();}
function prevSong(){current=(current-1+songs.length)%songs.length; loadSong(); audio.play();}
function toggleLoop(){playMode++; if(playMode>2) playMode=0;}
function skipForward(){audio.currentTime+=10;}
function skipBack(){audio.currentTime-=10;}
audio.addEventListener("timeupdate",()=>{
  if(audio.duration){
    bar.style.width=(audio.currentTime/audio.duration)*100+"%";
    timeDisplay.innerText=format(audio.currentTime)+" / "+format(audio.duration);
  }
});
function seek(e){audio.currentTime=(e.offsetX/e.currentTarget.clientWidth)*audio.duration;}
function format(s){let m=Math.floor(s/60),sec=Math.floor(s%60);if(sec<10)sec="0"+sec;return m+":"+sec;}
function toggleDark(){document.body.classList.toggle("light");}
document.getElementById("fileInput").addEventListener("change",(e)=>{
  for(let f of e.target.files){
    songs.push({title:f.name,src:URL.createObjectURL(f)});
  }
  renderSongs(songs);
});
function lyrics(){
  window.open(`https://www.musixmatch.com/search/${encodeURIComponent(songs[current].title)}`,'_blank');
}

// Initial render
renderSongs(songs);
loadSong();