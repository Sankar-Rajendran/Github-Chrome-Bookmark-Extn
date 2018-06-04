document.addEventListener('DOMContentLoaded', function () {

    var ownerNameElement, repoNameElement, fileNameElement, accessTokenElement;

    ownerNameElement = document.getElementById('owner_name_txt');
    repoNameElement = document.getElementById('repo_name_txt');
    fileNameElement = document.getElementById('file_name_txt');
    accessTokenElement = document.getElementById('access_token_txt');

    ownerNameElement.value = localStorage.getItem("owner_name");
    repoNameElement.value = localStorage.getItem("repo_name");
    fileNameElement.value = localStorage.getItem("file_name");
    accessTokenElement.value = localStorage.getItem("access_token");

    var clearFields = (fromButton) => {
        ownerNameElement.value = repoNameElement.value = fileNameElement.value = accessTokenElement.value = '';

        if (fromButton) {
            localStorage.removeItem('owner_name');
            localStorage.removeItem('repo_name');
            localStorage.removeItem('file_name');
            localStorage.removeItem('access_token');
        }
    }


    var clearButton = document.getElementById('clear_fields');

    clearButton.addEventListener('click', function () {
        clearFields(true);
    });


    var saveChangesButton = document.getElementById('save_changes');

    saveChangesButton.addEventListener('click', function () {
        var ownerName = ownerNameElement.value;
        var repoName = repoNameElement.value;
        var fileName = fileNameElement.value;
        var accessToken = accessTokenElement.value;

        localStorage.setItem("owner_name", ownerName);
        localStorage.setItem("repo_name", repoName);
        localStorage.setItem("file_name", fileName);
        localStorage.setItem("access_token", accessToken);

        clearFields(false);

        alert('Your changes are saved successfully');
    })

});

