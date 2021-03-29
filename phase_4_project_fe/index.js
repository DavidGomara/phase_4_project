const baseUrl =  "http://localhost:3000/artists/1"
const albumUrl = "http://localhost:3000/albums"
const container = document.getElementById("container")

document.addEventListener("DOMContentLoaded", init)

function init() {
    getArtistInfo();
}

function getArtistInfo() {
    fetch(baseUrl)
        .then(r => r.json())
        .then(data => {
            let artist = new Artist(data.id, data.name, data.bio, data.img);
            data.albums.forEach( a => {
                new Album(a.id, a.artist_id, a.name, a.likes, a.img)
            })
            artist.putArtistOnDom();
            addEventListenerToCreateButton()
        })
}

function addEventListenerToCreateButton() {
    let submitAlbum = document.getElementById("album-submit")
    submitAlbum.addEventListener("click", handleSubmit)
}

function handleSubmit(e) {
    e.preventDefault();
    let albumInfo = {
        name: document.getElementById("form-name").value,
        img: e.target.previousElementSibling.value,
        artist_id: 1,
    }

    fetch(albumUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(albumInfo)
    })
        .then(r => r.json())
        .then(data => {
            let album = new Album(data.id, data.artist_id, data.name, data.likes, data.img);
            album.putAlbumOnDom();
            album.likesEventListener()
        })    
}


function doSomething(e) {
    e.preventDefault()
    debugger
}


