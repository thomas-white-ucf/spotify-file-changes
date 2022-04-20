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
  let currentSongs = spotifyData.songs;
  let currentUserPlaylists = spotifyData.playlists;
  let currentUsers = spotifyData.users;

  let updatedPlaylist = "";

  // * Update Songs
  if (newData?.add_songs) {
    newData.add_songs.forEach((song) => {
      let id = JSON.stringify(1 + currentSongs.length);
      let songWithId = {
        id: id,
        ...song,
      };
      currentSongs.push(songWithId);
    });
  }

  // * Update User Playlist
  if (newData?.add_playlists) {
    newData.add_playlists.forEach((newDataPlaylist) => {
      let ownerId = newDataPlaylist.owner_id;
      // log(ownerId);

      // ** update by matching playlist owner_id
      currentUserPlaylists = currentUserPlaylists.map((user_playlist) =>
        user_playlist.owner_id == ownerId
          ? user_playlist.song_ids.concat(newDataPlaylist.song_ids)
          : user_playlist
      );
      //   ? { ...user_playlist, newDataPlaylist }

      //   log(currentUserPlaylists);
    });
  }

  // * Update (remove) an existing playlist
  if (newData?.remove_playlists) {
    let removeList = newData.remove_playlists;
    // log(removeList)

    updatedPlaylist = removeList.forEach((removalItem) => {
      currentUserPlaylists.filter((playlist) => playlist.id !== removalItem.id);
    });

    // log(c);
  }

  // * convert to JSON string to write to file
  let newString = JSON.stringify({
    users: currentUsers,
    playlists: currentUserPlaylists,
    songs: currentSongs,
  });

  // * write updated data to output-file.json
  fs.writeFileSync(outputFileName, newString);
  log("Successful update, please see your output-file\n");
};

outputData();
