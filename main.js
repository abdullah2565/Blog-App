    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC96dIRsPOaMG5T4zHjKcd_ZbOLMqVw0LI",
    authDomain: "blog-app-1fb23.firebaseapp.com",
    projectId: "blog-app-1fb23",
    storageBucket: "blog-app-1fb23.appspot.com",
    messagingSenderId: "476189170039",
    appId: "1:476189170039:web:c10edfd8d3f1fde758a972",
    measurementId: "G-8W46V6H2Y9"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const Auth = getAuth(app)
 console.log(app)
 console.log(Auth)

 const signupform =document.getElementById('signupform')
 const loginform =document.getElementById('loginform')
 const authdiv =document.getElementById('auth')
 
 const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;
     authdiv.style.display = 'none'
  } else {
    // User is signed out
    // ...
  }
});
 signupform.addEventListener('submit', e => {
  e.preventDefault()
  console.log('e+++' ,     e.target[0].value,
  )
  console.log(e.target.value)
  const auth = getAuth();
  const userInfo = {
    fullname: e.target[0].value,
    email: e.target[1].value,
    password: e.target[2].value
  }
createUserWithEmailAndPassword(Auth, userInfo.email , userInfo.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log('user->', user)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
 })

 loginform.addEventListener('submit' , e => {
  e.preventDefault()
  console.log(e.target[0].value)
  const userInfo = {
    email: e.target[0].value,
    password: e.target[1].value
  }
  signInWithEmailAndPassword(Auth, userInfo.email, userInfo.password)
    .then((userCredential) => {
      window.location.href = 'txt.html'
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
 })

 const loginOpt = document.getElementById('loginOpt')
 const registerOpt = document.getElementById('SignUpOpt')
 
 const loginDiv = document.getElementById('signIn')
 const SignUpDiv = document.getElementById('signUp')
 
 loginOpt.addEventListener('click', ()=>{
   loginDiv.style.display = "flex"
   SignUpDiv.style.display = "none"
 })
  registerOpt.addEventListener('click', ()=>{
   loginDiv.style.display = "none"
   SignUpDiv.style.display = "flex"
 })
 
// Include the rest of your existing JavaScript code


