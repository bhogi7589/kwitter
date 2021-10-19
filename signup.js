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

document.getElementById("signupform").addEventListener('submit', addUser)

function addUser(e){
    if (document.getElementById("signupform").checkValidity() === false){
        return;
    }
    var email = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;
    var confpwd = document.getElementById("confpassword").value;
    var name = document.getElementById("name").value;
    if (pwd == confpwd){
        auth.createUserWithEmailAndPassword(email, pwd).then(function(cred){
            window.localStorage.setItem("email", email);
            var replaced = email.replace(".", "-");
            databaseref.child(replaced).update({
                rooms : ""
            });
            var user = auth.currentUser;
            user.displayName = name;
            user.photoURL = "https://www.w3schools.com/bootstrap4/img_avatar3.png";
            window.location = "index.html";
        }).catch(function(error){
            var message = error.message;
            document.getElementById("error").innerHTML = message;
        });
    }
}