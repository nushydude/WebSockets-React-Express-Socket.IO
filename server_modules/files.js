const fs = require('fs');

const uuidV4 = require('uuid/v4');

const testDir = 'files';

function ReadFiles() {
  const filenames = fs.readdirSync(testDir);
  if (filenames) {
    return filenames.map(file => ({
      id: uuidV4(),
      name: file,
    }));
  }
  return null;
}

module.exports = {
  ReadFiles,
};
