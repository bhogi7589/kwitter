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

window.addEventListener('load', function(){
    if (user == null){
        window.location = "login.html";
    }
    document.getElementById("prof_pic").src = user.photoURL;
    document.getElementById("name").innerHTML = user.displayName;
    document.getElementById("head_name").innerHTML = user.displayName;
    document.getElementById("email").innerHTML = user.email;
    databaseref.child("all_posts").on('value', function(snap){
        document.getElementById("home").innerHTML = "";
        snap.forEach(function(snapshot){
            document.getElementById("home").innerHTML = snapshot.val() + document.getElementById("home").innerHTML;
        });
    });
    databaseref.child(user.email.replace(".", "-")).child("rooms").on('value', function(snap){
        document.getElementById("rooms").innerHTML = "";
        var rooms = snap.val().toString().split(",");
        for (var i = 0; i < rooms.length; i++){
            var key = rooms[i];
            if (key != ""){
                console.log(key);
                databaseref.child("all_rooms").child(key).child("name").on('value', function(snapshot){
                    var name = snapshot.val().toString();
                    document.getElementById("rooms").innerHTML += '<a class="btn btn-primary btn-block" target="_blank" href="chat.html?id=' + key + '">' + name + '</a>';    
                });
            }
        }
    });
});

function logout(){
    auth.signOut().then(function(){
        window.alert("Logged out successfully.");
        window.location = "login.html";
    });
}

function changeprofile(){
    var img = window.prompt("Please enter image URL:", user.photoURL);
    if (img != ""){
        auth.currentUser.updateProfile({
            photoURL : img
        }).then(function(){
            document.getElementById("prof_pic").src = user.photoURL;
        }).catch(function(error){
            console.log(error.message);
        });
    }
}

function change(){
    auth.sendPasswordResetEmail(window.localStorage.getItem("email")).then(function(){
        window.alert("Password reset email sent.");
    }).catch(function(error){
        window.alert(error.message);
    });
}

function reply(elem, id){
    id = id.toString();
    var text = elem.parentElement.previousSibling.value.trim();
    if (text == ""){
        return;
    }
    var innerhtml = '<div class="media text-left p-3 mt-1"><img src="' + user.photoURL + '" class="profile"><div class="media-body"><h4>' + user.displayName + '</h4><p>' + text + '</p></div></div>';
    databaseref.child("all_posts").child(id).once('value').then(function(snap){
        var html = snap.val().split("");
        var toadd = html.slice(0, html.length - 12).join("") + innerhtml + '</div></div>';
        databaseref.child("all_posts").update({
            [id] : toadd
        });
    });
}

function createroom(){
    var room = window.prompt("Enter room name:").trim();
    if (room != ""){
        var id = databaseref.child("all_rooms").push().key.toString();
        databaseref.child("all_rooms").child(id).update({
            name : room
        });
        databaseref.child(user.email.replace(".", "-")).child("rooms").once('value').then(function(snap){
            var rooms = snap.val().toString().split(",");
            rooms.push(id);
            var str_rooms = rooms.join(",");
            databaseref.child(user.email.replace(".", "-")).update({
                rooms : str_rooms
            });
        });
    }
}