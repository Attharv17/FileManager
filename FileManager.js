window.onload = function () {
    console.log("Script loaded");

    const uploadInput = document.getElementById('uploadInput');
    const fileList = document.getElementById('file-list');
    const clearBtn = document.querySelector('.clear-btn');
    let selectedFiles = [];

    function toggleClearButton() {
        clearBtn.style.display = uploadInput.files.length > 0 ? 'inline-flex' : 'none';
    }

    function clearSelection() {
        uploadInput.value = '';
        toggleClearButton();
    }

    function renderFileList() {
        fileList.innerHTML = '';
        selectedFiles.forEach((file, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${file.name}</span>
                <button class="delete-btn" onclick="removeFile(${idx})">×</button>
            `;
            fileList.appendChild(li);
        });
    }

    function uploadFiles() {
        if (uploadInput.files.length === 0) {
            alert('Please select files to upload.');
            return;
        }
        for (const file of uploadInput.files) {
            selectedFiles.push(file);
        }
        clearSelection();
        renderFileList();
    }

    window.removeFile = function (idx) {
        selectedFiles.splice(idx, 1);
        renderFileList();
    };

    uploadInput.addEventListener('change', toggleClearButton);

    // Attach functions to window so onclick works from HTML buttons
    window.toggleClearButton = toggleClearButton;
    window.clearSelection = clearSelection;
    window.uploadFiles = uploadFiles;

    toggleClearButton();
    renderFileList();
};
