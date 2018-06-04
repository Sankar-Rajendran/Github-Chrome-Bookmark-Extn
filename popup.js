document.addEventListener('DOMContentLoaded', function () {

    var saveButton = document.getElementById('save_link');

    //var saveButton = $('#save_link');

    function saveURL(url) {
        var ownerName = localStorage.getItem("owner_name");
        var repoName = localStorage.getItem("repo_name");
        var fileName = localStorage.getItem("file_name");
        var accessToken = localStorage.getItem("access_token");

        if (!((ownerName !== null && ownerName !== '') &&
            (repoName !== null && repoName !== '') &&
            (fileName !== null && fileName !== '') &&
            (accessToken !== null && accessToken !== ''))) {
            chrome.tabs.create({ 'url': chrome.extension.getURL('change_settings.html') });
            return false;
        }

        var newLink = url;

        var saveButton1 = $('#save_link');

        $.ajax({
            url: `https://api.github.com/repos/${ownerName}/${repoName}/contents/${fileName}`,
            success: function (results) {
                var sha, updateContent;
                var content = results.content;
                sha = results.sha;
                var decode = atob(content);
                updateContent = decode + '\n' + newLink + '\n';

                var dataObject = {
                    'message': `A link ${newLink} has been added`,
                    'content': btoa(updateContent),
                    'sha': sha
                };

                $.ajax({
                    url: `https://api.github.com/repos/${ownerName}/${repoName}/contents/${fileName}`,
                    type: 'PUT',
                    data: JSON.stringify(dataObject),
                    success: function (result) {
                        console.log(result);
                        $('#popup_content').html('<p class="message">Your link has been saved successfully...!!!</p>');
                        setTimeout(function () {
                            window.close();
                        }, 3000);
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'BEARER ' + accessToken);
                    },
                    error: function (error) {
                        console.log(error);
                        $('#popup_content').html('<p class="message">Oops...Something went wrong,Kindly check you repo details...!!!</p>');
                    }
                });

            },
            error: function (error) {
                console.log(error);
                $('#popup_content').html('<p class="message">Oops..Something went wrong.Kindly check you repo details...!!!</p>');
            }
        });
    }






    saveButton.addEventListener('click', function (event) {
        var tablink;
        chrome.tabs.getSelected(null, function (tab) {
            saveURL(tab.url);
        });
    });

    var changeButton = document.getElementById('change_settings');

    changeButton.addEventListener('click', function () {
        chrome.tabs.create({ 'url': chrome.extension.getURL('change_settings.html') });
        return false;
    });


});