class Album {

    static all = []

    constructor(id, artist_id, name, likes, img) {
        this.id = id; 
        this.artist_id = artist_id;
        this.name = name; 
        this.likes = likes; 
        this.img = img;
        Album.all.push(this)
    }
    
    static handleAlbums() {

        Album.all.forEach(a => {
            a.putAlbumOnDom()
        });
        Album.all.forEach(a => {
            a.likesEventListener()
            a.albumButtonEventListener()
        });
    }

    addEventListenerToCreateButton() {
        let submitAlbum = document.getElementById("album-submit")
        submitAlbum.addEventListener("click", (e) => handleSubmit(e))
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(e.target)
    }


    putAlbumOnDom() {
        container.innerHTML += `
        <div> 
            <ul>
                <li><h2> Album: ${this.name} </h2></li>
                <li><img src= ${this.img}></li>
                <li><button id= "albumLikeButton-${this.id}"> Likes <span> ${this.likes} </span></li>
                <li><button id= "albumButton-${this.id}"> Show me more about ${this.name}</li>
            </ul> 
        </div>
        `
    }

    putAlbumOnDomWithoutButton() {
        container.innerHTML += `
        <div> 
            <ul>
                <li><h2 > Album: ${this.name} </h2></li>
                <li><img src= ${this.img}></li>
            </ul> 
        </div>
        <div>
            <form id="songForm">
                <label> Name </label>
                <input type="text" name="name" id="form-song-name">
                <input type="submit" value="New Song" id="song-submit">
            </form>
        </div>
        `
    }

    addEventListenerToSongCreateButton = () => {
        let submitSong = document.getElementById("songForm")
        // submitSong.addEventListener("submit", () => {debugger})
        submitSong.addEventListener("submit", (e) => this.handleSubmitOfSong(e))
    }

    handleSubmitOfSong = e => {
        e.preventDefault();
        let songInfo = {
            name: document.getElementById("form-song-name").value,
            album_id: this.id
        }
    
        fetch( albumUrl + `/${this.id}/songs`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(songInfo)
        })
            .then(r => r.json())
            .then(data => {
                let song = new Song(data.id, data.album_id, data.name, data.likes);
                song.putSongOnDom();
                song.likesEventListener()
            })       
    }

    likesEventListener(){
        let likeButton = document.getElementById(`albumLikeButton-${this.id}`)
        likeButton.addEventListener("click", this.handleLikes)
    }

    handleLikes = (e) => {
        let likes = parseInt(e.target.children[0].innerText)
        fetch(albumUrl + `/${this.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({likes: likes += 1 })
        })
    
            .then(r => r.json())
            .then(data => this.updateDom(data))
    }

    updateDom(data) {
        let button = document.getElementById(`albumLikeButton-${this.id.toString()}`)   
        button.children[0].innerText = data.likes.toString()
    }

    albumButtonEventListener() {
        let albumButton = document.getElementById(`albumButton-${this.id}`)
        albumButton.addEventListener("click", this.handleAlbumButton.bind(this))
    }

    handleAlbumButton = (e) => {
        fetch(albumUrl + `/${this.id}`)
            .then(r => r.json())
            .then(data => {
                container.innerHTML = ""
                let album = Album.all.find(a => a.id == this.id)
                album.putAlbumOnDomWithoutButton();
                if (Song.all.filter(function(x) { return x.album_id === this.id; }).length > 0) {
                    let songs = Song.all.filter(function(x) { return x.album_id == this.id; })
                     Song.handleSongs(songs)
                     this.addEventListenerToSongCreateButton()
                } else {
                    data.songs.forEach( s => {
                        new Song(s.id, s.album_id, s.name, s.likes)
                    })
                    let songs = Song.all.filter(function(x) { return x.album_id == album.id; })
                     Song.handleSongs(songs)
                     this.addEventListenerToSongCreateButton()
                }
            })
    }
}

