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
    if (user !== null){
        window.location = "index.html";
    }
});

document.getElementById("loginform").addEventListener('submit', login);

function login(){
    if (document.getElementById("loginform").checkValidity() === false){
        return;
    }
    var email = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, pwd).then(function(usercredential){
        window.location = "index.html";
    }).catch(function(error){
        var message = error.message;
        document.getElementById("error").innerHTML = message;
    });
}

function change(){
    auth.sendPasswordResetEmail(document.getElementById("username").value).then(function(){
        window.alert("Password reset email sent.");
    }).catch(function(error){
        window.alert(error.message);
    });
}