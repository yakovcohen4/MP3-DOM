/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 function playSong(songId) {

  alert("You are playing song number " + songId);
  const ya = document.getElementById(`song-${songId}`);
  ya.style.backgroundColor="green";
  setTimeout(() =>{
    ya.style.backgroundColor="lightgray";
  },1000)
}

/**
* Removes a song from the player, and updates the DOM to match.
*
* @param {Number} songId - the ID of the song to remove
*/
function removeSong(songId) {

  // remove song from DOM and from player
document.getElementById(`song-${songId}`).remove();

let songIndex = player.songs.indexOf(getSongID(songId));
player.songs.splice(songIndex,1);

  // remove song from DOM and player.playlist
for (let i=0; i<player.playlists.length; i++){
  for (let j=0; j<player.playlists[i].songs.length; j++){
    if (player.playlists[i].songs[j] === songId){
      // remove song from player.playlist
      player.playlists[i].songs.splice(j,1);

      // remove song from DOM and change duration
      const playlistId = player.playlists[i].id;
      const playlistSongEl = document.getElementById(`songs-${playlistId}`);
      playlistSongEl.innerHTML = player.playlists[i].songs;
      const playlistDurationEl = document.getElementById(`duration-${playlistId}`);
      playlistDurationEl.innerHTML = durationConvert(playlistDuration(playlistId));

      // if playlist have not songs delete playlist
      if (player.playlists[i].songs.length === 0) 
      {
        player.playlists.splice(i,1);
        const playlistEl = document.getElementById(`playlist-${playlistId}`).remove();
      }
    } 
  }
}

}
/**
 * Adds a song to the player, and updates the DOM to match.
 */
 function addSong({ title, album, artist, duration, coverArt }) {
  
  // give an id and push to player.songs
  const id = maxID(player.songs) + 1;
  const newSong = { id, title, album, artist, duration, coverArt };
  player.songs.push(newSong);
  //  update to dom
  const songElm = createSongElement(newSong);
  document.getElementById("songs").insertBefore(songElm, null);
  
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
 function handleSongClickEvent(event) {
  // Your code here
  const songId = Number(event.target.parentElement.id.split("-")[1]);
  const target = event.target.innerText;

  if (target === "🗑️") {
      removeSong(songId);
  }
  if (target === "▶️") {
      playSong(songId);
  }  
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {Mouse Event} event - the click event
 */
function handleAddSongEvent(event) {

  const userInputs = inputs.children;
  const songInputs = 
  { title: userInputs[0].value,
    album: userInputs[1].value,
    artist: userInputs[2].value,
    duration: userInputs[3].value,
    coverArt: userInputs[4].value
  }

  songInputs.duration = songInputs.duration.split(":");
  songInputs.duration = parseInt(songInputs.duration[0] *60) + parseInt(songInputs.duration[1]);

  for(const att in songInputs){
    if(att !== "duration" && att !== "coverArt" && songInputs[att]===""){
        songInputs[att] = `Generic ${att}`;
    }
  }
  addSong(songInputs);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [];
    const classes = [];
    
    // children
    const titleEL = createElement("div", ["Title: " + title] ,["title"]);
    const albumEL = createElement("div", ["Album: " + album] ,["album"]);
    const artistEl = createElement("div", ["Artist: " + artist], ["artist"]);
    const durationEl = createElement("div", ["" + durationConvert(duration)] ,["duration",durationColor(duration)]);
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});
    const removeEL = createElement("div", ["🗑️"], ["button"], {}, {});
    const addEL = createElement("div", ["▶️"], ["button"], {}, {});

    children.push(imgEl, titleEL, albumEL, artistEl, durationEl, removeEL, addEL)
    classes.push(["song"]);

    const attrs = { id: `song-${id}` };
    const eventListeners = {};

    return createElement("div", children, classes, attrs, eventListeners);

}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = { id: `playlist-${id}`}
    const eventListeners = {};

    // children
    const nameEl = createElement("div", ["" + name] );
    const songsEl = createElement("span", ["" + songs] ,["songs"],{id: `songs-${id}`});
    const durationEl = createElement("div", ["" + durationConvert(playlistDuration(id))] ,["duration", "short-duration"],{id: `duration-${id}`});

    // push childrens and classes
    children.push( nameEl, "The playlist songs: ",songsEl, durationEl);
    classes.push("playlist")

    return createElement("div", children, classes, attrs, eventListeners)
}
/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {

  const element = document.createElement(tagName);
  // Children
  for(const child of children) {
    element.append(child);
  }
  // Classes
  for(const cls of classes) {
    element.classList.add(cls);
  }
  // Attributes
  for (const attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  // Event
  for (act in eventListeners) {
    element.addEventListener(act, eventListeners[act]);
}
  return element;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
  const songsDiv = document.getElementById("songs");
  for (let song of player.songs) {
      songsDiv.append(createSongElement(song));
  }
  songsDiv.addEventListener("click", handleSongClickEvent);
}
/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
 function generatePlaylists() {
  for (let pl of player.playlists) {
      document.getElementById("playlists").append(createPlaylistElement(pl));
  }
}

/**
Creating the page structure
*/
generateSongs();
generatePlaylists();

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)


// convert to mm:ss
function durationConvert(duration)
{
  let min = Math.floor(duration / 60);
  let sec = duration % 60;
  
  if (min < 10){
    min = "0" + String(min);
  }
  if (sec < 10) {
    sec = "0" + String(sec);
  }
  return min+':'+sec
}
//gets the songs duration 
function playlistDuration(id) {
let sum=0;
const playlistSongs=GetPlaylistById(id)["songs"]; 
for(let i of playlistSongs) 
{
    let songduration= GetsongById(i)["duration"]; 
    sum+=songduration;
}
return sum;
}
function durationColor(duration){
  if (duration<120){
    return "short-duration";
  }
  if(duration>420 ){
      return "durationMore"
  }
  if (duration>=120&&duration<=420){
      return "durationBetween"
  }
}
// find max ID in song/playlist
function maxID (arr)
{
  let max=0;
  for (let i = 0; i < arr.length; i++) 
  {
    if (arr[i].id > max) 
      max = arr[i].id;
  }
  return max;
}
//return playlist object by id
function GetPlaylistById(id) 
{
  let playObj= player.playlists.find(x=> x["id"]===id);
  return playObj;
}
//return song object by id
function GetsongById(id) 
{
  let songObj= player.songs.find(x=> x["id"]===id);
  return songObj;
}

// sort the song and the playlist
function sortedSongs () {
    player.songs.sort((a,b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
}
function sortedPlaylists () {
    player.playlists.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
}
sortedSongs();
sortedPlaylists();

function getSongID(id)
{
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id){
      return player.songs[i]
    }
  }
  throw new Error("No such ID");
}

function editPlaylist(playlistId, songId) {
  
  let indexPlaylist = player.playlists.findIndex(i => i.id===playlistId);
  let songIndex = player.songs.findIndex(i => i.id === songId);
  let songIndexInPlaylist = player.playlists[indexPlaylist].songs.indexOf(songId);

  if (songIndex === -1)
  {
    throw("There isn't a song with that ID");
  }
  if (indexPlaylist === -1)
  {
    throw("There isn't a playlist with that ID")
  }

  if (player.playlists[indexPlaylist].songs.includes(songId) === false)
  {
    player.playlists[indexPlaylist].songs.push(songId);
  }  
  else 
  {
    player.playlists[indexPlaylist].songs.splice(songIndexInPlaylist,1);
  }

  if (player.playlists[indexPlaylist].songs.length === 0) 
  {
    player.playlists.splice(indexPlaylist,1);
  }
}