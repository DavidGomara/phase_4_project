class Song {

    static all = []

    constructor(id, album_id, name, likes) {
        this.id = id; 
        this.album_id = album_id
        this.name = name; 
        this.likes = likes; 
        Song.all.push(this)
    }

    static handleSongs(songs) {

        songs.forEach(s => {
            s.putSongOnDom()
        });
        songs.forEach(s => {
            s.likesEventListener()
        });
    }

    putSongOnDom() {
        container.innerHTML += `
        <div> 
            <ul>
                <li><h2> Song: ${this.name} </h2></li>
                <li><button id= "songLikeButton-${this.id}"> Likes <span> ${this.likes} </span></li><br>
            </ul> 
        </div>
        `
    }

    likesEventListener(){
        let likeButton = document.getElementById(`songLikeButton-${this.id}`)
        likeButton.addEventListener("click", this.handleLikes)
    }

    handleLikes = (e) => {
        let likes = parseInt(e.target.children[0].innerText)
        fetch( albumUrl + `/${this.album_id}/songs/${this.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({likes: likes += 1 })
        })
            .then(r => r.json())
            .then(data => this.updateDom(data))
    }

    updateDom = data => {
        let button = document.getElementById(`songLikeButton-${this.id.toString()}`)   
        button.children[0].innerText = data.likes.toString()
    }

}