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
url = new URL(window.location);
id = url.searchParams.get("id");

function scrollbottom(){
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
}

window.addEventListener('load', function(){
    databaseref.child("all_rooms").child(id).child("name").once('value').then(function(snap){
        document.getElementById("name").innerHTML = snap.val().toString();
    });
    databaseref.child("all_rooms").child(id).child("all_posts").on('value', function(snap){
        document.getElementById("chat").innerHTML = "";
        snap.forEach(function(snapshot){
            document.getElementById("chat").innerHTML += snapshot.val();
        });
        scrollbottom();
    });
});

function send(){
    var text = document.getElementById("message").value;
    if (text == ""){
        return;
    }
    var post_id = databaseref.child("all_rooms").child(id).child("all_posts").push().key.toString();
    var innerhtml = '<div class="media border rounded text-left p-3 mt-1"><img src="' + user.photoURL + '" class="profile"><div class="media-body"><h4>' + user.displayName + '</h4><p>' + text + '</p></div></div>';
    databaseref.child("all_rooms").child(id).child("all_posts").update({
        [post_id] : innerhtml
    });
}

function invite(){
    var email = window.prompt("Enter email of the user whom you want to invite:");
    if (email){
        databaseref.child(email.replace(".", "-")).child("rooms").once('value').then(function(snap){
            var rooms = snap.val().toString().split(",");
            rooms.push(id);
            var str_rooms = rooms.join(",");
            databaseref.child(email.replace(".", "-")).update({
                rooms : str_rooms
            });
        });
    }
}