import React, { Component } from 'react';
import TaskItem from './TaskItem';
// import TaskItem  from './TaskItem';
import { connect } from 'react-redux';
import * as  actions from './../actions/index';
// import { filter } from 'lodash';
// import { filter } from 'domutils';

class TaskList extends Component{

    constructor(props){
    super(props); 
    this.state={
        filterName: '',
        filterStatus: -1,
         }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value =   target.type ==='checkbox' ? target.checked : target.value;
        // this.props.onFilter(
        //             name === 'filterName' ? value : this.state.filterName,
        //             name === 'filterStatus' ? value : this.state.filterStatus
        // )
        var filter = {
            name  : name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter)
        this.setState({
            [name] : value
        });
        //  console.log(this.state);
    }
    render(){
        var { tasks, filterTable,keyword,sort } = this.props; //this.props.tasks
        console.log(sort);
        //filter on table
          if(filterTable.name) {
            tasks = tasks.filter((task) => {
              return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            });
        }
          tasks = tasks.filter((task) => {
            if(filterTable.status === -1) {
              return task;
            }else{
              return task.status === (filterTable.status === 1 ? true : false);
            }
          });  
        var {filterName, filterStatus} = this.state;

        //search 
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
          });


        //sort
        if(sort.by === 'name'){
            tasks.sort((a,b) =>{
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -sort.value;
                else return 0;
            });
        }else{
            tasks.sort((a,b) =>{
            if(a.status > b.status) return -sort.value;
            else if(a.status < b.status) return sort.value;
            else return 0;
            });
        }

        var elmTasks = tasks.map((task, index) => {
            return(
                <TaskItem
                    key={task.id}
                    task = {task}
                    index= {index}
                    // onUpdateStatus = {this.props.onUpdateStatus}
                    // onDelete = {this.props.onDelete}
                    // onUpdate = {this.props.onUpdate}
                />
            )
        });
  
        return(
            
            <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>TÊN</th>
                                    <th>TRẠNG THÁI</th>
                                    <th>HÀNH ĐỘNG</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input type="text"
                                                className="form-control"
                                                name="filterName"
                                                value = { filterName}
                                                onChange={ this.onChange }
                                                />
                                    </td>
                                    <td>
                                        <select 
                                            className="form-control"
                                            name="filterStatus"
                                            value = { filterStatus}
                                            onChange={this.onChange}
                                            >
                                                <option value={-1}>Tất cả</option>
                                                <option value={0}>Ẩn</option>
                                                <option value={1}>Kích hoạt</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                                {elmTasks}
                            </tbody>
                        </table>
                        
                    </div>
                
            </div>
            
        );
    
}}
const mapStateToProps  = (state) => {
    return { 
        tasks : state.tasks,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort 

    }
} ;
const mapDispatchToProps = (dispatch, action) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}
export default  connect(mapStateToProps, mapDispatchToProps) (TaskList);