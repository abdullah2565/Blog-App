  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
  import {
    getFirestore, getDocs, doc,
    collection, addDoc, deleteDoc
  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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
  const db = getFirestore(app);
  const Auth = getAuth(app)
 console.log(app)
 console.log(Auth)
 const todosCollectionRef = collection(db, 'todos')


 const signupform =document.getElementById('signupform')
 const loginform =document.getElementById('loginform')
 const authdiv =document.getElementById('auth')
 const tinput =document.getElementById('tinput')
 const todos =document.getElementById('todos')
 const addinfo =document.getElementById('addinfo')
 

 signupform?.addEventListener('submit', e => {
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

 loginform?.addEventListener('submit' , e => {
  e.preventDefault()
  console.log(e.target[0].value)
  const userInfo = {
    email: e.target[0].value,
    password: e.target[1].value
  }
  signInWithEmailAndPassword(Auth, userInfo.email, userInfo.password)
    .then((userCredential) => {
      window.location.href = 'blog.html'
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


 addinfo?.addEventListener('click', async () => {
  if (!tinput.value) return alert('Please add todo')
  try {
      const docAdded = await addDoc(todosCollectionRef, {
          todo: tinput.value
      });
      tinput.value = ''
      getTodos()
      console.log("Document written with ID: ", docAdded);
  } catch (e) {
      console.error("Error adding document: ", e);
  }
})

async function getTodos() {
  todos.innerHTML = null
  const querySnapshot = await getDocs(todosCollectionRef);
  querySnapshot.forEach((todoDoc) => {
      const todoObj = todoDoc.data()
      const div = document.createElement('div')
      div.className = 'card'
      const div1 = document.createElement('div')
      div.className = 'card-content'
      const span = document.createElement('span')
      div.className = 'card-description'
      span.innerText = todoObj.todo
      const div2 = document.createElement('div')
      div.className = 'card-content'
      const button = document.createElement('button')
      div.className = 'card-button primary'
      button.innerText = 'Delete'
      button.id = todoDoc.id

      button.addEventListener('click', async function () {
          console.log(this)

          const docRef = doc(db, 'todos', this.id)
          console.log(docRef)
          await deleteDoc(docRef)
          getTodos()
      })

      div.appendChild(span)
      div2.appendChild(button)
      div.appendChild(div1)
      div.appendChild(div2)

      todos.appendChild(div)

  });
}
 const loginOpt = document.getElementById('loginOpt')
 const registerOpt = document.getElementById('SignUpOpt')
 
 const loginDiv = document.getElementById('signIn')
 const SignUpDiv = document.getElementById('signUp')
 
 loginOpt?.addEventListener('click', ()=>{
   loginDiv.style.display = "flex"
   SignUpDiv.style.display = "none"
 })
  registerOpt?.addEventListener('click', ()=>{
   loginDiv.style.display = "none"
   SignUpDiv.style.display = "flex"
 })


