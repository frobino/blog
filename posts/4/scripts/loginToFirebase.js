// Handle login to firebase request
function loginToFirebase() {
  var data = {
    email: document.getElementById("myLoginEmail").value,
    password: document.getElementById("myLoginPassword").value
  }
  firebase.auth().signInWithEmailAndPassword(data.email, data.password)
  .then(function(authData) {
    auth = authData;
    console.log("Login Successful!");
  })
  .catch(function(error) {
    console.log("Login Failed!", error);
  });
}

// Handle logout from firebase request
function logoutFromFirebase() {
  firebase.auth().signOut()
  console.log("Logged out!");
}

// Depending on login status, display or not specific parts of the page
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var element = document.getElementById("myDIV");
    element.style.display = "none";
  } else {
    // User is signed out.
    var element = document.getElementById("myDIV");
    element.style.display = "block";
  }
});