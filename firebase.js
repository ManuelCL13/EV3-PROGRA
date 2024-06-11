// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
//librería que permite utilizar funciones
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN:
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFeqblHI31Em6ooQcOG8mTxeZKc0RK5tc",
    authDomain: "onepiece-ev3.firebaseapp.com",
    projectId: "onepiece-ev3",
    storageBucket: "onepiece-ev3.appspot.com",
    messagingSenderId: "77773664653",
    appId: "1:77773664653:web:7cb0497c81cce69084cdc4",
    measurementId: "G-5SQNQWNRFS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//función de firestore que retorna la base de datos para ser utilizada
const db = getFirestore(app);

//función para guardar un registro
export const save = (personajes) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento a la colección 
    //collection es una función de firestore que permite recibir la base de datos y el nombre de la colección
    addDoc(collection(db, 'personajes'), personajes)
}
//función para listar todos los registros
export const getData = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'personajes'), data)
}

//función eliminar 
export const eliminar = (id) =>{
    //deleteDoc es la función de firestore que permite eliminar un documento por su id
    //doc es la función que permite buscar el documento por su id 
    deleteDoc(doc(db,'personajes',id))
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtener = (id) => getDoc(doc(db,'personajes',id))

//función para actualizar los datos del documento 
export const update = (id,personajes) =>{
    //updateDoc es una función de firestore permite modificar un documento seleccionado 
    updateDoc(doc(db,'personajes',id),personajes)
}