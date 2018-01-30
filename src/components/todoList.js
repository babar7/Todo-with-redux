import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseAction, deleteSelectedTodo, gettingFbData, updateTodoFunc } from '../store/action/action';

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            todo : '',
            todos : [],
            todoID : '',
            todoVal : '',
            todoIndex : '',
            alert : 'none'
        }
         
    }
    componentWillMount(){
        this.props.gettingDataFromFB()
    }
    onChangeHandler(ev){
        this.setState({todo : ev.target.value, alert : 'none' })
    }
    modalonChangeHandler(ev){
        this.setState({todoVal : ev.target.value})
    }
    addTodo(ev){
        ev.preventDefault()
        if(this.state.todo.trim() === ""){
            this.setState({ alert : 'block'})
        }
        else {
            let todoObj = {todo : this.state.todo};
            this.setState({  todo : '', alert : 'none' });
            this.props.addToFirebase(todoObj) 
        }
    }
    editTodo(){
        let selectedTodoObj = {
           slctedTodoID : this.state.todoID,
           slctedTodoValue : this.state.todoVal,
           slctedTodoIndex : this.state.todoIndex
        }        
        this.props.updateTodo(selectedTodoObj);
    }
    deleteTodo(){
        let selectedTodoObj = {
            slctedTodoID : this.state.todoID,
            slctedTodoIndex : this.state.todoIndex
         }        
        this.props.deleteTodo(selectedTodoObj)
    
    }
    modalPopup(key, value , index) {
        this.setState({todoID : key, todoVal: value, todoIndex : index });
    }
    
    render() {
        return (
            <div>
                <div>
                    <h1 className="heading"> Todo List With React Redux </h1>
                    <hr />
                    <hr /> 
                </div> 
              <div className="input-group">
                <form className="input-group" onSubmit={this.addTodo.bind(this)}> 
                  <input type="text" className="form-control col-6 todo-input" value={this.state.todo} onChange={this.onChangeHandler.bind(this)} placeholder="Enter Your Todo Here"/>  
                  <button className="btn btn-primary addTodo" > Add Todo </button>  
                </form> 
              </div>
                <div className="alert alert-danger alert" role="alert" style = {{display : this.state.alert}}>
                    Please Enter Some Value !
                </div>  
              <div>
                    <ul className="list-group ul">
                        {this.props.todos.map((val, index)=>{
                            return (
                                <div key={index}>
                                <li className="list-group-item list-group-item-action list-group-item-secondary li"  
                                   data-toggle="modal" data-target="#todoModal" onClick={this.modalPopup.bind(this, val.id, val.todo, index)}> {val.todo}
                                  </li>
                                </div>
                                )
                            })
                        }
                    </ul>
              </div>

              <div>   
                <div className="modal fade" id="todoModal" tabIndex="-1" role="dialog" aria-labelledby="todoModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="todoModalLabel">Want to edit or remove ?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                
                <input type="text" className="form-control" value={this.state.todoVal} onChange={this.modalonChangeHandler.bind(this)}/>

                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteTodo.bind(this)}>Remove</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editTodo.bind(this)}>Save changes</button>
                </div>
                </div>
                </div>
                </div>    
            </div> 
            
        </div>
        )
    }
}


function mapStateToProps(state){
    return ({
        todos : state.rootReducer.todos
    })

}
function mapDispatchToProps(dispatch){
    return({
        gettingDataFromFB : () => {
            dispatch(gettingFbData())
        },
        deleteTodo : (selectedTodoObj)=> {
            dispatch(deleteSelectedTodo(selectedTodoObj))
        },
        addToFirebase : (todoObj) => {
            dispatch(firebaseAction(todoObj))
            },
        updateTodo : (selectedTodoObj) => {
            dispatch(updateTodoFunc(selectedTodoObj))
        }   

    })
}
export default connect(mapStateToProps , mapDispatchToProps)(TodoList);

