import fs from "fs";

//* log = console Log function
const log = (arg) => {
  console.log(`\n`, arg);
};

const fileArgs = process.argv.slice(2);
let spotifyFileName = "";
let changesFileName = "";
let outputFileName = "";
// * Determine if files are passed in to node argument values/ or assign local file name.
fileArgs[0]
  ? (spotifyFileName = fileArgs[0])
  : (spotifyFileName = "spotify.json");
fileArgs[1]
  ? (changesFileName = fileArgs[1])
  : (changesFileName = "changes.json");
fileArgs[2]
  ? (outputFileName = fileArgs[2])
  : (outputFileName = "output-file.json");

// * Read file, get data
const spotifyData = JSON.parse(fs.readFileSync(spotifyFileName, "utf8"));
const newData = JSON.parse(fs.readFileSync(changesFileName, "utf8"));

const outputData = () => {
  //  log(spotifyData); log(newData);
  let newSongs = spotifyData.songs;
  let newUsers = spotifyData.users;
  let newPlaylists = spotifyData.playlists;

  // * Update Songs
  if (newData?.add_songs) {
    newData.add_songs.forEach((song) => {
      let id = JSON.stringify(1 + newSongs.length);
      let songWithId = {
        id: id,
        ...song,
      };
      newSongs.push(songWithId);
    });
  }

  // * Update User Playlist
  if (newData?.add_playlists) {
    newData.add_playlists.forEach((playlist) => {
      // log(playlist); log(owner_id, song_ids);
      // ** update by matching playlist owner_id
      // ! __was trying to add songs to existing playlist before

      let id = JSON.stringify(1 + newPlaylists.length);
      let playlistWithId = {
        id: id,
        owner_id: playlist.owner_id,
        song_ids: playlist.song_ids,
      };
      newPlaylists.push(playlistWithId);
    });
  }

  // * Remove Playlists
  if (newData?.remove_playlists) {
    let removeList = newData.remove_playlists;

    // set the newPlaylists = to the filtered newPlaylist array, filtered by removing matching ids
    removeList.forEach(
      ({ id }) => (newPlaylists = newPlaylists.filter((item) => item.id != id))
    );
  }

  // * convert to JSON string to write to file
  let newString = JSON.stringify({
    users: newUsers,
    playlists: newPlaylists,
    songs: newSongs,
  });

  // * write updated data to output-file.json
  fs.writeFileSync(outputFileName, newString);
  log("Successful update, please see your output-file\n");
};

outputData();
