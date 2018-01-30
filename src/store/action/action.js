import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSnO2sh-b8o91I7-lCShA6O23D3J1zCXk",
    authDomain: "reactreduxtodoapp-c7394.firebaseapp.com",
    databaseURL: "https://reactreduxtodoapp-c7394.firebaseio.com",
    projectId: "reactreduxtodoapp-c7394",
    storageBucket: "",
    messagingSenderId: "620893660277"
  };
  firebase.initializeApp(config);



var fb = firebase.database();
export function gettingFbData(){
    return dispatch => {
      fb.ref('todos/').on('child_added' , snap => {
        let fbTodoObj = snap.val()
        fbTodoObj.id = snap.key
        dispatch({ type : 'FB_TODOS', payload : fbTodoObj})
      })
    }
}
 
export function firebaseAction(todoObj){
  return dispatch =>{
      fb.ref('todos/').push(todoObj)

  }
}
export function deleteSelectedTodo(selectedTodoObj){
  return dispatch =>{
      fb.ref(`todos/${selectedTodoObj.slctedTodoID}`).remove()
      dispatch({type : 'TODODELETE' , payload : selectedTodoObj.slctedTodoIndex})
  }
}
export function updateTodoFunc(selectedTodoObj){
  return dispatch => {
      fb.ref(`todos/${selectedTodoObj.slctedTodoID}`).update({todo : selectedTodoObj.slctedTodoValue})
      dispatch ({type : 'TODOUPDATE', payload : selectedTodoObj})
  }
}