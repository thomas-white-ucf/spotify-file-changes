# Project Use Case Details

Clone repository using (git clone)

To begin with node, in project root folder, run: node buildbook-exercise

To begin with yarn.

- yarn start:files

- yarn start "spotify.json" "changes-file..." "output-file.json"

yarn start:files - this specifies the adjacent files in this directory.
yarn start - runs - node buildbook-exercise

To see results, located the "output-file.json", or your specified file location.

## Design Methodology

Based on requirements this project was designed to have specified file inputs, or read adjacent files for ease of use.
This project reads an entered spotify and changes files, then parses the data for use in creating an output file.
Data is read from local files, then the main function - outPutData() - is defined and called.

Data Structure of your changes-file - key names chosen based on required functionality

- add_songs
- add_playlists
- remove_playlists

Function outPutData() -

- adds songs
- adds playlist to existing users
- removes playlists
- writes updated JSON data to an output file

## Next steps to Scale

Error handling

- Currently each New Data Update is checked to exist before starting the if-statement

testing, / another function that reads the output-file after being written

Add types for data types.

For very large files, async - await s for each step.

## Time Invested no this Interview Exercise / Thoughts

(update- fixed remove and add spotify playlist methods + 30 min)

(prior to update-) Another half hour of Time Invested, and the functionality of adding playlist / removing will be solved. Issue encountered - I did not initially build out robust enough. After adding UserPlaylists, I then tried to edit the UserPlaylist again to remove playlists. Need to redesign my update playlists methods to fix this.

This Exercise was a Great introduction to BuildBook. Project scope was realistic, with stated parameters for success.

2.5 focused hours Invested.

- update README.md  & array function errors described above

- updated + 30 minutes

- Other Previous Related Works:
- please see UCF Bootcamp project I completed
- <https://github.com/thomas-white-ucf/liri-node-app>

### **[Project Link](https://github.com/thomas-white-ucf/liri-node-app)**
