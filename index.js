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
user = auth.currentUser;

window.addEventListener('load', function(){
    if (window.localStorage.getItem("email") === null){
        window.location = "login.html";
    }
    var name = window.localStorage.getItem("name");
    window.localStorage.removeItem("name");
    user.displayName = name;
    user.photoURL = "https://www.w3schools.com/bootstrap4/img_avatar3.png";
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
});

function logout(){
    auth.signOut().then(function(){
        window.alert("Logged out successfully.");
        window.location = "login.html";
    });
}

function changeprofile(){
    var img = window.prompt("Please enter image URL:", "https://www.w3schools.com/bootstrap4/img_avatar3.png");
    if (img != ""){
        user.photoURL = img;
    }
}

function change(){
    auth.sendPasswordResetEmail(window.localStorage.getItem("email")).then(function(){
        window.alert("Password reset email sent.");
    }).catch(function(error){
        window.alert(error.message);
    });
}