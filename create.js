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
//auth = firebase.auth();

function create(){
    var text = document.getElementById("post").innerHTML;
    databaseref.child("posts").once('value').then(function(snap){
        var id = snap.val();
        databaseref.update({
            posts : id + 1
        });
        databaseref.child(window.localStorage.getItem("email").replace(".", "-")).child("profileimg").once('value').then(function(snap){
            window.localStorage.setItem("img", snap.val());
        });
        databaseref.child(window.localStorage.getItem("email").replace(".", "-")).child("name").once('value').then(function(snap){
            window.localStorage.setItem("name", snap.val());
        });
        var innerhtml = '<div class="media border rounded text-left p-3 mt-1"><img src="' + window.localStorage.getItem("img") + '" class="mr-3 rounded-circle" style="width: 45px!important; height: 45px!important"><div class="media-body"><h4>' + window.localStorage.getItem("name") + '</h4><p>' + text + '</p></div></div>';
        window.localStorage.removeItem("img");
        window.localStorage.removeItem("name");
        id = id.toString();
        databaseref.child("all_posts").update({
            [id] : innerhtml
        });
    });
}