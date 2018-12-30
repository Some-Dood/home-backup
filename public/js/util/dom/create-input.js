import createDirectory from '/js/util/api/create-directory.js';

/**
 * Creates an `<input>` tag.
 * @param {string} placeholder - Placeholder for the `<input>` element
 * @returns {HTMLInputElement} Resulting `<input>` element
 */
function createInput(placeholder) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;

  input.addEventListener('keyup', function(event) {
    if (
      event.key === 'Enter'
      || event.key === 'Escape'
    ) this.blur();
  });
  input.addEventListener('blur', function() {
    const folderName = (this.value === '') ? this.placeholder : this.value;
    const PATH_TO_NEW_FOLDER = encodeURIComponent(window.location.pathname + folderName);

    // Send a request to the server to create a new directory
    createDirectory(PATH_TO_NEW_FOLDER)
      .then(({ status, json }) => {
        if (json.isSuccessful && status === 201) {
          // Handle successful folder creation
          /** @type {HTMLAnchorElement} */
          const wrapperRow = (this.parentElement.parentElement);
          const cellDate = wrapperRow.children[3];
          const noFileParagraphElement = document.getElementById('no-files');

          wrapperRow.href = decodeURIComponent(PATH_TO_NEW_FOLDER);
          cellDate.appendChild(
            document.createTextNode(
              new Date(json.mtime).toString()
            )
          );

          // Swap element <input> for TextNode
          this.replaceWith(document.createTextNode(`${folderName}/`));
    
          // Check if there are no files in the current directory
          if (noFileParagraphElement) noFileParagraphElement.remove();
        } else if (
          !json.isSuccessful
            && (status === 400 || status === 409)
        ) {
          this.focus();
          this.select();
        }
      });
  });

  return input;
}

export default createInput;
