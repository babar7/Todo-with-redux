
const INITIAL_STATE = {
    todo : '',
    todos: []
}

export default (state = INITIAL_STATE , action) => {
    switch (action.type){
            case 'FB_TODOS':
                return ({
                    ...state,
                    todos : state.todos.concat(action.payload)
                })
            case 'TODODELETE':
                state.todos.splice(action.payload, 1)
                return ({
                    ...state,
                    todos : state.todos.concat()
                    // todos : state.todos.concat(action.payload)
                })
            case 'TODOUPDATE' :
                state.todos[action.payload.slctedTodoIndex] = {todo: action.payload.slctedTodoValue, id : action.payload.slctedTodoID}
                return ({ 
                    ...state,
                    todos : state.todos.concat()
                    // todos : state.todos.splice(action.payload.slctedTodoIndex, 1 ,{todo : action.payload.slctedTodoValue, id: action.payload.slctedTodoID} )                    
                    // [state.todos[action.payload.slctedTodoIndex]] : state.todos.concat({todo: action.payload.slctedTodoValue, id : action.payload.slctedTodoID})
                })
       
        default :
            return state;
                
    }
}