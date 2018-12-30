/**
 * @typedef {Object} CreationSuccess
 * @property {boolean} isSuccessful - Status of
 * directory creation
 * @property {Date} mtime - Last modified time of
 * the directory
 */
/**
 * @typedef {Object} CreationFailure
 * @property {boolean} isSuccessful - Status of
 * directory creation
 * @property {string} [errCode] - NodeJS error code
 * @property {string} errMsg - Error message
 */
/**
 * @typedef {Object} DirectoryCreationResult
 * @property {number} status - Status code of response
 * @property {CreationSuccess|CreationFailure} json - Server response JSON
 */
/**
 * Tells the server to create a new directory based
 * on the given path.
 * @param {string} endpoint - Path to the
 * new folder relative to the website root
 * @returns {Promise<DirectoryCreationResult>}
 */
async function createDirectory(endpoint) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mkDir: true,
      pathToNewFolder: endpoint
    })
  });
  const { status } = response;
  const json = await response.json();

  return { status, json };

}

export default createDirectory;
