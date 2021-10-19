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

window.addEventListener('load', function(){
    if (window.localStorage.getItem("email") === null){
        window.location = "login.html";
    }
    databaseref.child(window.localStorage.getItem("email").replace(".", "-")).child('profileimg').on('value', function(snap){
        document.getElementById("prof_pic").src = snap.val();
        window.localStorage.setItem("img", snap.val());
    });
    databaseref.child(window.localStorage.getItem("email").replace(".", "-")).child('name').on('value', function(snap){
        document.getElementById("name").innerHTML = snap.val();
        document.getElementById("head_name").innerHTML = snap.val();
        window.localStorage.setItem("name", snap.val());
    });
    document.getElementById("email").innerHTML = window.localStorage.getItem("email");
    databaseref.child("all_posts").on('value', function(snap){
        document.getElementById("home").innerHTML = "";
        snap.forEach(function(snapshot){
            document.getElementById("home").innerHTML = snapshot.val() + document.getElementById("home").innerHTML;
        });
    });
});

function logout(){
    auth.signOut().then(function(){
        window.alert("Logged out successfully.");
        window.localStorage.removeItem("email");
        window.location = "login.html";
        window.localStorage.removeItem("img");
        window.localStorage.removeItem("name");
    });
}

function changeprofile(){
    var img = window.prompt("Please enter image URL:", "https://www.w3schools.com/bootstrap4/img_avatar3.png");
    if (img != ""){
        var email = window.localStorage.getItem("email").replace(".", "-");
        databaseref.child(email).update({
            profileimg : img
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