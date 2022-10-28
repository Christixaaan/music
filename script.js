window.addEventListener("load", () => {
	document.getElementById("wrapper").style.display = "block";
	document.getElementById("loader").style.display = "none";
});

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playlistSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");
//index for songs
let index;
//initially loop=true(loop the playlist)
let loop = true;
const songsList = [
	{
		name: "No Lie",
		link: "songs/Sean Paul  No Lie Lyrics ft Dua Lipa.mp3",
		artists: "Sean Paul & Dua Lipa",
		image: "https://i.imgur.com/YcpeBDy.png"
	},
	{
		name: "LGBT",
		link: "songs/CupcakKe  LGBT.mp3",
		artists: "Cupcakke",
		image: "https://i.imgur.com/1DlsRIY.png"
	},
	{
		name: "Colors of You (Nick & Charlie Version)",
		link: "songs/Baby Queen  Colours of You Nick and Charlie Version.mp3",
		artists: "Baby Queen",
		image: "https://i.imgur.com/ZyB0rzb.png"
	},
	{
		name: "GUY.exe",
		link: "songs/GUYEXE  by SUPERFRUIT.mp3",
		artists: "Superfruit",
		image: "https://i.imgur.com/yDjmSUk.png"
	},
	{
		name: "Happier",
		link: "songs/Marshmello ft Bastille  Happier Official Lyric Video.mp3",
		artists: "Marshmello ft. Bastille",
		image: "https://i.imgur.com/YTJFscn.png"
	},
	{
		name: "Brother",
		link: "songs/Kodaline  Brother Lyrics And youre under fire I will cover you TikTok Song.mp3",
		artists: "Kodaline",
		image: "https://i.imgur.com/MyXz5Y1.png"
	},
	{
		name: "Dandelions",
		link: "songs/ruth b  dandelions  lyrics.mp3",
		artists: "Ruth B.",
		image: "https://i.imgur.com/NFBehY9.png"
	},
	{
		name: "you broke me first",
		link: "songs/Tate McRae  you broke me first Official Video.mp3",
		artists: "Tate McRae",
		image: "https://i.imgur.com/62QIHqq.png"
	},
	{
		name: "In The Stars",
		link: "songs/Benson Boone   In the Stars Official Lyric Video.mp3",
		artists: "Benson Boone",
		image: "https://i.imgur.com/GtFTqLx.png"
	},
	{
		name: "Photograph (Sped Up)",
		link: "songs/Ed Sheeran  Photograph  sped up  lyrics.mp3",
		artists: "Ed Sheeran",
		image: "https://i.imgur.com/Y7grrjW.png"
	},
	{
		name: "Ohne Benzin (Sped Up)",
		link: "songs/Domiziana  Ohne Benzin 11x Speed Version.mp3",
		artists: "Domiziana",
		image: "https://i.imgur.com/uiJGg1A.png"
	},
	{
		name: "Power",
		link: "songs/Little Mix  Power Official Video ft Stormzy.mp3",
		artists: "Little Mix",
		image: "https://i.imgur.com/fWolhHm.png"
	},
	{
		name: "SNAP (Sped Up)",
		link: "songs/SNAP High and Fast.mp3",
		artists: "Rosa Linn",
		image: "https://i.imgur.com/GuPo7Eb.png"
	},
	{
		name: "die first (Sped Up)",
		link: "songs/nessa barrett  die first sped up.mp3",
		artists: "nessa barrett",
		image: "https://i.imgur.com/xTJNlfH.png"
	},
	{
		name: "we made it (Sped Up)",
		link: "songs/tlow  we made it sped up.mp3",
		artists: "t-low",
		image: "https://i.imgur.com/JngyXs7.png"
	},
	{
		name: "Lights (Sped Up)",
		link: "songs/Lights  Ellie Goulding Sped up TikTok.mp3",
		artists: "Ellie Goulding",
		image: "https://i.imgur.com/lhTP46k.png"
	},
	{
		name: "Cool Kids (Sped Up)",
		link: "songs/Cool Kids  Echosmith sped up version.mp3",
		artists: "Echosmith",
		image: "https://i.imgur.com/5fNaR4q.png"
	},
	{
		name: "You Were There For Me",
		link: "songs/Henry Moodie  You Were There For Me Lyrics.mp3",
		artists: "Henry Moodie",
		image: "https://i.imgur.com/vcWV5Xy.png"
	},
	{
		name: "Devil doesn't bargain",
		link: "songs/Alec Benjamin  Devil Doesnt Bargain Official Audio.mp3",
		artists: "Alec Benjamin",
		image: "https://i.imgur.com/wyqryid.png"
	},
	{
		name: "Paro (Sped Up)",
		link: "songs/nej paro  tiktok version sped up.mp3",
		artists: "Nej",
		image: "https://i.imgur.com/WIzpuWF.png"
	},
	{
		name: "Boss B*tch",
		link: "songs/Doja Cat  Boss Btch from Birds of Prey The Album Official Music Video.mp3",
		artists: "Doja Cat",
		image: "https://i.imgur.com/hpAAaOp.png"
	},
	{
		name: "Middle of the Night",
		link: "songs/Elley Duhé  Middle of the Night Lyrics.mp3",
		artists: "Elley Duhé",
		image: "https://i.imgur.com/u8jh76B.png"
	}
	
];
//events object
let events = {
	mouse: {
		click: "click"
	},
	touch: {
		click: "touchstart"
	}
};
let deviceType = "";

//Detect touch device
const is_touch_device = () => {
	try {
		//We try to create TouchEvent (it would fail for desktops and throw error)
		document.createEvent("TouchEvent");
		deviceType = "touch";
		return true;
	} catch (e) {
		deviceType = "mouse";
		return false;
	}
};
//Format time(convert ms to seconds, minutes and add 0 if less than 10)
const timeFormatter = (timeInput) => {
	let minute = Math.floor(timeInput / 60);
	minute = minute < 10 ? "0" + minute : minute;
	let second = Math.floor(timeInput % 60);
	second = second < 10 ? "0" + second : second;
	return `${minute}:${second}`;
};
//pause song
const pauseAudio = () => {
	audio.pause();
	pauseButton.classList.add("hide");
	playButton.classList.remove("hide");
};
//play song
const playAudio = () => {
	audio.play();
	pauseButton.classList.remove("hide");
	playButton.classList.add("hide");
};
//repeat button
repeatButton.addEventListener("click", () => {
	if (repeatButton.classList.contains("active")) {
		repeatButton.classList.remove("active");
		audio.loop = false;
		console.log("Repeat Off");
	} else {
		repeatButton.classList.add("active");
		audio.loop = true;
		console.log("Repeat On");
	}
});
//set song
const setSong = (arrayIndex) => {
	//this extracts all the variables from the object
	let { name, link, artists, image } = songsList[arrayIndex];
	audio.src = link;
	songName.innerHTML = name;
	songArtist.innerHTML = artists;
	songImage.src = image;
	//display duration when metadata loads
	audio.onloadedmetadata = () => {
		maxDuration.innerText = timeFormatter(audio.duration);
	};
};
//next song
const nextSong = () => {
	//if loop is true then continue in normal order
	if (loop) {
		if (index == songsList.length - 1) {
			//if last song is being played
			index = 0;
		} else {
			index += 1;
		}
		setSong(index);
		playAudio();
	} else {
		//else find a random index and play that song
		let randIndex = Math.floor(Math.random() * songsList.length);
		console.log(randIndex);
		setSong(randIndex);
		playAudio();
	}
};
//previous song(you can't go back to a randomly played song)
const previousSong = () => {
	if (index > 0) {
		pauseAudio();
		index -= 1;
	} else {
		//if first song is being played
		index = songsList.length - 1;
	}
	setSong(index);
};

//next song when current song ends
audio.onended = () => {
	nextSong();
};

shuffleButton.addEventListener("click", () => {
	if (shuffleButton.classList.contains("active")) {
		shuffleButton.classList.remove("active");
		loop = true;
		console.log("shuffle Off");
	} else {
		shuffleButton.classList.add("active");
		loop = false;
		console.log("Shuffle On");
	}
});
//previous button
prevButton.addEventListener("click", previousSong);
//next button
nextButton.addEventListener("click", nextSong);
//pause button
pauseButton.addEventListener("click", pauseAudio);
//play button
playButton.addEventListener("click", playAudio);

//if user clicks on progress bar
is_touch_device();
progressBar.addEventListener(events[deviceType].click, (event) => {
	//start of progressBar
	let coordStart = progressBar.getBoundingClientRect().left;
	//mouse click position
	let coordEnd = !is_touch_device() ? event.clientX : event.touches[0].clientX;
	let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
	//set width to progress
	currentProgress.style.width = progress * 100 + "%";
	//set time
	audio.currentTime = progress * audio.duration;
	//play
	audio.play();
	pauseButton.classList.remove("hide");
	playButton.classList.add("hide");
});
//update progress every second
setInterval(() => {
	currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
	currentProgress.style.width =
		(audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);
//update timer
audio.addEventListener("timeupdate", () => {
	currentTimeRef.innerText = timeFormatter(audio.currentTime);
});
//display playlist
playlistButton.addEventListener("click", () => {
	playlistContainer.classList.remove("hide");
});
//hide playlist
closeButton.addEventListener("click", () => {
	playlistContainer.classList.add("hide");
});
//creates playlist
const initializePlaylist = () => {
	for (let i in songsList) {
		playlistSongs.innerHTML += `
      <li class='playlistSong' onclick='setSong(${i})'>
      <div class="playlist-image-container">
      <img src="${songsList[i].image}"/>
      </div>
      <div class="playlist-song-details">
      <span id="playlist-song-name">${songsList[i].name}</span>
      <span id="playlist-song-artist-album">${songsList[i].artists} </span>
      </div>
      </li>
      `;
	}
};

window.onload = () => {
	//initally first song
	index = 0;
	setSong(index);
	//create the playlist
	initializePlaylist();
};
