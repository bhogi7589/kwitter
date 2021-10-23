const firebaseConfig = {
    apiKey: "AIzaSyC-Chsq9HzfjK81mYYYx7KO1BgT7QPPNMI",
    authDomain: "kwitter-f5ee6.firebaseapp.com",
    databaseURL: "https://kwitter-f5ee6-default-rtdb.firebaseio.com",
    projectId: "kwitter-f5ee6",
    storageBucket: "kwitter-f5ee6.appspot.com",
    messagingSenderId: "67887733929",
    appId: "1:67887733929:web:ca4ec486e579a36e061db8",
    measurementId: "G-C7PJFZFBW8"
};

firebase.initializeApp(firebaseConfig);

databaseref = firebase.database().ref("/").child("Kwitter");
auth = firebase.auth();
user = JSON.parse(window.localStorage.getItem("firebase:authUser:AIzaSyC-Chsq9HzfjK81mYYYx7KO1BgT7QPPNMI:[DEFAULT]"));

function create(){
    var text = document.getElementById("post").innerHTML.trim();
    if (text == ""){
        return;
    }
    var id = databaseref.child("all_posts").push().key.toString();
    var innerhtml = '<div class="media border rounded text-left p-3 mt-1"><img src="' + user.photoURL + '" class="profile"><div class="media-body"><h4>' + user.displayName + '</h4><p>' + text + '</p><div class="input-group"><input type="text" class="form-control" placeholder="Enter Reply"><div class="input-group-append"><button class="btn btn-success" type="button" onclick="reply(this, \'' + id + '\')">Post Reply</button></div></div></div></div>';
    databaseref.child("all_posts").update({
        [id] : innerhtml
    });
    window.alert("Post created successfully.")
}