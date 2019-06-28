
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        window.fbAsyncInit = function() {
          FB.init ({
             appId      : '186142862315301',
             xfbml      : true,
             version    : 'v2.6'
          });
       };
    
       (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "http://connect.facebook.net/en_US/sdk.js";
         //  js.src = "sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
       } (document, 'script', 'facebook-jssdk'));
      

       
       var firebaseConfig = {
        apiKey: "AIzaSyC0EXDFsySdpXSRq3pnEfCc4317qQJj0_o",
        authDomain: "web-cordova.firebaseapp.com",
        databaseURL: "https://web-cordova.firebaseio.com",
        projectId: "web-cordova",
        messagingSenderId: "1009859557449",
        appId: "1:1009859557449:web:930491c30989e8c7"
   
      };
       
      firebase.initializeApp(firebaseConfig);

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

function facebookSignin() {

   //  if (!firebase.auth().currentUser) {

   var provider = new firebase.auth.FacebookAuthProvider();
  
   // firebase.auth().signInWithPopup(provider)

   // console.log("12345 "+String(provider));
   var myJSON = JSON.stringify(provider);
     console.log("myJSON "+myJSON);
   firebase.auth().signInWithRedirect(provider);
   // firebase.auth().signInWithRedirect(provider)                   
   
   firebase.auth().getRedirectResult().then(function(result) {

      var myResult = JSON.stringify(result);
     console.log("myResult "+myResult);
     console.log("currentuser..."+ firebase.auth().currentUser);
      //console.log("RESULT "+ result);

      //data.items[1].name
   //   var token = myResult.credential[0].oauthAccessToken;
   //   var user = myResult.user.displayName;
    
   //   console.log("FB TOKEN: "+token);
   //    console.log("USER : "+user);
   }).catch(function(error) {
      console.log("error "+error);
      // console.log(error.message);
   });
}
// }

function facebookSignout() {

   
 firebase.auth().signOut()
 
 .then(function() {
   // console.log("FB TOKEN:"+token);
    console.log('Signout= successful!');
    
    FB.logout(function(response) {
      // user is now logged out
      console.log('FBLOGOUT = successful!');
    });
 }, function(error) {
    console.log('Signout failed');
 });
}

function toggleSignIn() {
   if (!firebase.auth().currentUser) {
     // [START createprovider]
     var provider = new firebase.auth.FacebookAuthProvider();
     // [END createprovider]
     // [START addscopes]
     provider.addScope('user_likes');
     // [END addscopes]
     // [START signin]
     firebase.auth().signInWithRedirect(provider);
     // [END signin]
   } else {
     // [START signout]
     firebase.auth().signOut();
     // [END signout]
   }
   // [START_EXCLUDE]
   document.getElementById('quickstart-sign-in').disabled = true;
   // [END_EXCLUDE]
 }

app.initialize();