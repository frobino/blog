function saveToFirebase() {
    var email = document.getElementById("inputEmail").value;

    // create json object
    var emailObject = {
        email: email
    };

    var db = database;
    var reference = db.ref('subscription-entries');

    /*
     * Use the global firebase object to connect to your realtime database.
     * We have a reference to a new child ‘subscription-entries’
     * (if the child doesn’t exist, firebase will make it on the fly).
     * We use the push() method to create a new record in the ‘subscription-entries’ child.
     * If we didn’t do this then we would be overwriting the same record over and over again,
     * push() creates a new child as a unique id, and then we are setting our emailObject
     * as the data to fill that record.
     * 
     * NOTE: the same mail can be recorded multiple times under different id.
     */
    reference.push().set(emailObject)
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}

function readFromFirebase(){
    var db = database;
    var reference = db.ref('subscription-entries');
    reference.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val().email;
            console.log(`Subscriber ${childKey}: ${childData}`);
        });
      });
}
