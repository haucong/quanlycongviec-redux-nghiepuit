import React, { Component } from 'react';
import './App.css';
import TaskList from './component/TaskList';
import TaskForm from './component/TaskForm'
import Control from './component/Control'
import {connect} from 'react-redux';
import * as actions from './actions/index'; 
// import _ from 'lodash';
// import { findIndex } from 'lodash';
// import demo from './trainning/demo';

class App extends Component{

  // constructor(props){
  //   super(props);
    // this.state = {
      // tasks: [],
      // isDisplayForm: false,
      // taskEditing: null,
      // filterName : '',
      // filterStatus: '-1',
      // keyword : '',
      // sortBy : 'name',
      // sortValue: 1
  //   };
  // }
  // componentWillMount(){
  //   if(localStorage && localStorage.getItem('tasks')){
  //     var tasks = JSON.parse(localStorage.getItem('tasks'));
  //     this.setState({
  //       tasks : tasks
  //     });
  //   }
  // }


  onToggleForm = () => {
      // if(this.state.isDisplayForm && this.state.taskEditing !== null){
      //   console.log('th1');
      //   this.setState({
      //     isDisplayForm: true,
      //     taskEditing: null
      //   });
      // }else{
      //   this.setState({
      //     isDisplayForm : !this.state.isDisplayForm,
      //     taskEditing: null
      //   });
      // }
      var {itemEditing} = this.props;
      if (itemEditing && itemEditing.id !== '') {
        this.props.onOpenForm();
      }else{
        this.props.onToggleForm();
      }
      this.props.onClearTask({
        id : '',
        name: '',
        status: false
      });
    
  }
 
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }
  // onSubmit = (data) => {
  //   var { tasks } = this.state; // var tasks = this.tasks.
  //   data.status = data.status === 'true' ? true: false;
  //   if(data.id === ''){
  //     data.id = this.guid(); 
  //     tasks.push(data);
  //   }
  //   else{
  //   var index = this.findIndex(data.id);
  //   tasks[index] = data;
      
  //   }
  //   this.setState({
  //     tasks : tasks,
  //     taskEditing : null
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  // onUpdateStatus= (id) => {
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   // var index = findIndex(tasks, (task) => {
  //   //   return task.id ===id;
  //   // });
  //   if(index !== -1){
  //     tasks[index].status = !tasks[index].status;
  //     this.setState({
  //       tasks: tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }
  // }

  // onDelete = (id) => {
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   if(index !== -1){
  //     tasks.splice(index, 1) ; //xoa phan tu cuoi cung
  //     this.setState({
  //       tasks: tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }
  //   this.onCloseForm();
  // }
  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    this.onShowForm();
  }
  // onFilter = (filterName, filterStatus) => {
  //   this.setState({
  //     filterName : filterName,
  //     filterStatus : filterStatus
  // });
  // }
  // onSearch = (keyword) => {
  //   this.setState({
  //     keyword : keyword
  //   })
  // }
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
  }
  render(){
    // var {
        // tasks, 
        // isDisplayForm, 
        // taskEditing, 
        // filterName,
        // filterStatus,
        // keyword,
        // sortBy,
        // sortValue,
        // } = this.state;

        var {isDisplayForm} = this.props; //lay trong store
  
        // var elmTaskForm = isDisplayForm ? <TaskForm 
                                              // onCloseForm={this.onCloseForm}
                                              // onSubmit = {this.onSubmit} 
                                              // task = {taskEditing}
                                              // /> : '';
    return(
        
        <div className="container">
          <div className="text-center">
            <h1>Quản lý công việc</h1><hr/>
          </div>
            
            <div className="row">
              <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' :
                                ''}>
                  <TaskForm/>
              </div>

                <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
                                'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>  
                     <button type="button" 
                            className="btn btn-primary"
                            onClick={this.onToggleForm}>
                          <span className="fa  fa-plus mr-5"></span>  Thêm công việc
                      </button>
                  
                      <Control 
                          // onSearch={this.onSearch}
                          // onSort = { this.onSort}
                          // sortBy = {sortBy}
                          // sortValue = { sortValue}
                      />
                      <TaskList
                        // tasks = { tasks }
                        // onUpdateStatus = { this.onUpdateStatus}
                        // onDelete = { this.onDelete}
                        // onUpdate = {this.onUpdate}
                        // onFilter = { this.onFilter }
                        // filterName={filterName}
                        // filterStatus={filterStatus}
                        />
                </div>             
            </div>
       
          
        </div>
        
    );
  }
}
const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
      onToggleForm : () => {
        dispatch(actions.toggleForm());
      },
      onClearTask : (task) =>{
        dispatch(actions.editTask(task)); 
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }

     
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (App);
