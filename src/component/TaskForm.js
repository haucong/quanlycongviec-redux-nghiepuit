import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name : '',
            status: false
        }
    }
    componentWillMount(){
        if(this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
               id:  this.props.itemEditing.id,
               name:  this.props.itemEditing.name,
               status:  this.props.itemEditing.status,
            });
        }else{
            this.onClear(); 
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing) {
            this.setState({
               id:  nextProps.itemEditing.id,
               name:  nextProps.itemEditing.name,
               status:  nextProps.itemEditing.status,
            });
        }
        else if (!nextProps.task){
            this.setState({
                id: '',
                name : '',
                status: false
            });
        }
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
            // console.log(value);
        }
        this.setState({
            [name] : value
        })
    }
    onSave = (event) => {
        event.preventDefault();
        // this.props.onSubmit(this.state);
        //cancel&closeForm  

        this.props.onSaveTask(this.state); 
        this.onClear();
        this.onCloseForm();
    }
    onClear = () => {
        this.setState({
            // id: '',
            name: '',
            status : false
        });
    }
    onCloseForm = () => {
        this.props.onCloseForm(); 
    }
    render(){
        var {id} = this.state;
        if(!this.props.isDisplayForm) return null;   
        return(
            
            <div className="panel panel-warning">
                  <div className="panel-heading">
                        <h3 className="panel-title">
                            {id !== '' ? 'Cập nhật công việc' : 'Thêm Công Việc'}
                            <span className="ml-150" onClick={this.onCloseForm}> X </span>
                        </h3>
                  </div>
                  <div className="panel-body">
                        <form onSubmit={this.onSave}>
                            <div className="form-group">
                                <label>Tên:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <label>Trạng thái:</label>
                                <select 
                                    className="form-control"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    >
                                    <option value={true}>KÍCH HOẠT</option>
                                    <option value={false}>ẨN</option>
                                </select><br/>
                                
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning  mr-5">
                                    <span className="fa fa-plus"></span>
                                    Submit</button> 
                                <button type="reset" 
                                className="btn btn-danger ml-5"
                                onClick={this.onClear}
                                >
                                    <span className="fa fa-close ml-5"></span>
                                    Cancel</button>
                            </div>
                        
                            
                        </form>
                        
                  </div>
            </div>
            
        );
    }
}
const mapStateToProps = state =>{
    return {
        isDisplayForm : state.isDisplayForm, 
        itemEditing  : state.itemEditing
    }
}; 
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) =>{
            dispatch(actions.saveTask(task)); 
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
          }
          
    }
} 
export default connect(mapStateToProps, mapDispatchToProps ) (TaskForm);