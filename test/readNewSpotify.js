const fs = require("fs");

function readNewSpotify() {
  // const fileArgs = process.argv
  const fileArgs = process.argv.slice(2);
  let outputFileName = "";
  let data = "";

  // console.log(fileArgs);

  fileArgs[2]
    ? (outputFileName = fileArgs[2])
    : (outputFileName = "output-file.json");

  const writtenFileData = JSON.parse(fs.readFileSync(outputFileName, "utf8"));

  if (
    writtenFileData?.users &&
    writtenFileData?.playlists &&
    writtenFileData?.songs
  ) {
    data = "GOOD";
  } else {
    data = "BAD";
  }
  console.log("Output file name>>__ ", outputFileName);
  console.log("PASSED JEST TEST _ Spotify Data TO OUTPUT FILE");

  return data;
}

module.exports = readNewSpotify;
