'use strict';

// NATIVE IMPORTS
const fs = require('fs');
const path = require('path');

// UTILITY FUNCTIONS
const getReadableFileSize = require('../util/getReadableFileSize');

/** Represents a directory or file object */
class FileEntry {
  /**
   * @param {string} type - Describes if an entry is a directory
   * or a certain file type (extension)
   * @param {string} fullPath - Absolute path to the directory or file
   */
  constructor(type, fullPath) {
    const { size, mtime } = fs.lstatSync(fullPath);
    this.name = path.basename(fullPath);
    this.type = type;
    this.size = size;
    this.readableFileSize = getReadableFileSize(size);
    this.mtime = mtime;
  }
}

module.exports = FileEntry;
