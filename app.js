var music = []; //Create an empty array that we will use to store all the music objects created.

/*check to see if the page has loaded previously. if not start a new sessionStorage, if the page has loaded we know that there should be some data */
function myLoad() {
  let htmlTable = document.getElementById("musicList");
  htmlTable.style.visibility = "hidden";
  let = musicHeading = document.getElementById("favSongID");
  musicHeading.style.visibility = "hidden";

  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    // let arrayOfMusicObjects = [];
    sessionStorage.setItem("favMusic", JSON.stringify(music));
    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
    music = JSON.parse(sessionStorage.getItem("favMusic")); //Get the array of objects from sessionStorage and assign it to the array 'favMusic'
    let i = 0;
    music.forEach(function (track, index) {
      //Loop through each (track) in the music array
      /*For each new entry in the array create a table element that displays 
                  the music object in the table element on the HTML page */
      let tableItem = document.createElement("tbody");
      tableItem.innerHTML = `<li><input type="text" id="artist${index}" value= "${track.artistName}"></li> <li><input type="text" id="song${index}" value= "${track.songName}"></li> <li><input type="text" id="album${index}" value= ${track.albumName}></li> <li><input type="text" id="genre${index}" value= ${track.genreType}></li> <button value=${i} class="deleteBtn" onclick="deleteMusic(event)">Delete Entry</button><button value =${i}id="editBtn" onclick="editMusic(${index})">Edit Entry</button><hr>`;
      tableItem.value = i;
      tableItem.id = index;
      i = i + 1;
      htmlTable.appendChild(tableItem);
    });
    if (i > 0) {
      //Only make the element visible once there is at least one object added.
      htmlTable.style.visibility = "visible";
      musicHeading.style.visibility = "visible";
    }
  }
}

//Below we create the constructor function that will be used to create all music objects.
function Music(artistName, songName, albumName, genreType) {
  this.artistName = artistName;
  this.songName = songName;
  this.albumName = albumName;
  this.genreType = genreType;
}

/* the function below will be called every time the user clicks on the button to add a new song on the HTML page. */
function addMusic() {
  music = JSON.parse(sessionStorage.getItem("favMusic"));
  let newMusic = new Music(
    document.getElementById("artistName").value,
    document.getElementById("songName").value,
    document.getElementById("albumName").value,
    document.getElementById("genreType").value
  );
  music.push(newMusic);
  sessionStorage.setItem("favMusic", JSON.stringify(music));
}

function deleteMusic(event) {
  let i = event.target.value;
  music = JSON.parse(sessionStorage.getItem("favMusic"));
  music.splice(i, 1);
  sessionStorage.setItem("favMusic", JSON.stringify(music));
  location.reload(true);
}

//to save the edited entry from the user
function editMusic(index) {
  music = JSON.parse(sessionStorage.getItem("favMusic"));
  music[index].artistName = document.getElementById("artist" + index).value;
  music[index].songName = document.getElementById("song" + index).value;
  music[index].albumName = document.getElementById("album" + index).value;
  music[index].genreType = document.getElementById("genre" + index).value;
  sessionStorage.setItem("favMusic", JSON.stringify(music));
  console.log(music[index]);
}
