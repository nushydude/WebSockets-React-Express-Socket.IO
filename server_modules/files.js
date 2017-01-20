const fs = require('fs');

const uuidV4 = require('uuid/v4');

const path = require('path');

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

function CreateFile(filename) {
  try {
    fs.closeSync(fs.openSync(path.join(testDir, filename), 'w'));
    // console.log('File created successfully!');
    return true;
  } catch (e) {
    // console.log('File creattion failed!');
    return false;
  }
}

module.exports = {
  ReadFiles,
  CreateFile,
};
