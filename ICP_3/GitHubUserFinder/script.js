
function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/search/users?q=' + user, true);
    request.send();
    return request;
}

function showUser(user) {

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    var info = user.items[0];
    $('h2').text(info.login);
    $('.avatar').prepend('<img class="clearable" src="' + info.avatar_url + '">');
    $('.information').prepend('<a class="clearable" href="' + info.html_url + '">GitHub Link</a>');



}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $('h2').text("User '" + username + "' not found");
    $('.avatar').prepend('<img class="clearable" src="Images/sad_panda.png">');
    $('.information').prepend('<a class="clearable" href="' + 'index.html' + '">Try again</a>');

}

function clear(){
    $('.clearable').remove();
}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            clear();
            //get the user's information and store the respsonse
            let response = getGithubInfo(username);
            //if the response is successful show the user's details
            response.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200){
                    json = JSON.parse(response.responseText);
                    if (json.total_count > 0 ){
                        // Typical action to be performed when the document is ready:
                        showUser(JSON.parse(response.responseText));
                    } else {
                        noSuchUser(username);
                    }

                } //else display suitable message

                else if (this.readyState == 4){
                    noSuchUser(username);
                }
            };//{


            //} else {
              //
            //}


        }
    })
});
