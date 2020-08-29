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

function logoutFromFirebase() {
  firebase.auth().signOut()
  console.log("Logged out!");
}