let songList=document.querySelector('#song-list')
let progress=document.querySelector('#progress')
let playBtn=document.querySelector('#play-btn')
let nextBtn=document.querySelector('#next-btn')
let prvBtn=document.querySelector('#prv-btn')
let Head=document.querySelector("h1")

Head.classList.add("first")
songList.classList.add("secound")


let songs=[{
  name:"song1",
  id:1
},{
  name:"song2",
  id:2
},{
  name:"song3",
  id:3
},{
  name:"song4",
  id:4
}]


let audio=new Audio('/media/song1.mp3')

////display songs

for(let song of songs){
  let li=document.createElement('li')
  li.innerText=song.name;
  li.setAttribute('id',song.id)
  songList.append(li)
}

//////////playBtn function
playBtn.addEventListener('click',(event)=>{
  audio.paused?audio.play():audio.pause();
  if(playBtn.children[0].classList.contains('fa-play')){
    playBtn.children[0].classList.remove('fa-play')
    playBtn.children[0].classList.add('fa-pause')
  }else{
    playBtn.children[0].classList.remove('fa-pause')
    playBtn.children[0].classList.add('fa-play')
  }
})

////// showing current time of song //timeupdate trigger when audio.currentTime change
audio.addEventListener("timeupdate",(event)=>{
  let currentProgress=(audio.currentTime*100)/audio.duration
  progress.value=currentProgress
})

////////////// manually changing the song value //change event trigger in case of <input>, <select>, and <textarea> elements when the user modifies the element's value. 
progress.addEventListener("change",(event)=>{
  let updatedTime=(progress.value*audio.duration)/100
  audio.currentTime=updatedTime
})

///////////play the selected song

songList.addEventListener('click',(event)=>{
  let songId=event.target.getAttribute('id')
  audio.src=`/media/song${songId}.mp3`  ///.src to change media url
  audio.currentTime=0
  audio.play()
  playBtn.children[0].classList.remove('fa-pause')
  playBtn.children[0].classList.add('fa-play')

})

////////////functionality of next button
nextBtn.addEventListener('click',(event)=>{
  const url=audio.getAttribute('src') 
  const match = url.match(/song(\d+)\.mp3/);  // Looks for "song" followed by a number, then ".mp3"
  let songNumber = match ? match[1] : null;
  if(songNumber<songs.length){
    let newNumber=Number(songNumber)+1
    audio.src=`/media/song${newNumber}.mp3`
    audio.play()
    playBtn.children[0].classList.remove('fa-pause')
    playBtn.children[0].classList.add('fa-play')
  }else{
    newNumber=1
    audio.src=`/media/song${newNumber}.mp3`
    audio.play()
    playBtn.children[0].classList.remove('fa-pause')
    playBtn.children[0].classList.add('fa-play')

  }
})

////////////////functionality of previous btn

prvBtn.addEventListener("click",(event)=>{
  const url=audio.getAttribute('src')
  const match = url.match(/song(\d+)\.mp3/);  // Looks for "song" followed by a number, then ".mp3"
  let songNumber = match ? match[1] : null;
  if(songNumber>1){
    let newNumber=Number(songNumber)-1
    audio.src=`/media/song${newNumber}.mp3`
    audio.play()
    playBtn.children[0].classList.remove('fa-pause')
    playBtn.children[0].classList.add('fa-play')
  }else{
    newNumber=songs.length
    audio.src=`/media/song${newNumber}.mp3`
    audio.play()
    playBtn.children[0].classList.remove('fa-pause')
    playBtn.children[0].classList.add('fa-play')

  }

})
