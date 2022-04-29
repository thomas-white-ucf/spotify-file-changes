const readNewSpotify = require("./readNewSpotify");

test("reads file to see if Data is GOOD", () => {
  expect(readNewSpotify()).toBe("GOOD");
});
