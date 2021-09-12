/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [];
    const classes = [];

    let ul = document.createElement("ul");
    for(let i=0; i<5; i++)
    {
        if(arguments[i] === arguments[4]) //convert duration to mm:ss format
        {
            arguments[i] = durationConvert(arguments[4]);
        }
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    let a= document.createElement("img");
    a.src= arguments[5];
    ul.appendChild(a);
    children.push(ul);
    classes.push(["song"]);
    const attrs = { onclick: `playSong(${id})`,id : "song" +id }

    return createElement("div", children, classes, attrs)
}
// const children = songList({id : id , title : title , album:album , artist:artist ,duration :durationConverter(duration),coverArt:coverArt});
// const classes = ["song"]
// const attrs = { onclick: `playSong(${id})` }
/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}

    const ul= document.createElement("ul");
    for(let i=0; i<3; i++)
    {
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }

    let li= document.createElement("li");
    li.innerHTML = durationConvert(playlistDuration(arguments[0]));  
    ul.appendChild(li);
    children.push(ul);

    classes.push(["playlists"])
    return createElement("div", children, classes, attrs)
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
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {

    const element = document.createElement(tagName);
    if(children && typeof children !== "object") children = [children];
    element.append(...children);
    if (classes && typeof classes !== "object") classes = [classes];
    element.classList.add(...classes);
    for( let attr in attributes){
        element.setAttribute(attr,attributes[attr]);
    }
    return element;
}

// You can write more code below this line
