class Artist {


    constructor(id, name, bio, img) {
        this.id = id; 
        this.name = name; 
        this.bio = bio;
        this.img = img; 
    }

    putArtistOnDom() {
        container.innerHTML = `
        <div> 
            <li>
                <img src= ${this.img}>
                <h2> Biography: ${this.bio} </h2>
            </li> 
            <h2>Create a New Album</h2>
            <form id="AlbumForm">
                <label> Name </label>
                <input type="text" name="name" id="form-name">
                <label> Img </label>
                <input type="text" name="img" id="form-img">
                <input type="submit" value="New Album" id="album-submit">
            </form>
        </div>
        `
        Album.handleAlbums()
    }
}