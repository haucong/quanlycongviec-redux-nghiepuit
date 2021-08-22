import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Sort extends Component{

    
    onClick=(sortBy, sortValue)=>{
        // console.log(sortBy, sortValue);
        this.props.onSort({
            by : sortBy,
            value : sortValue
        })
    }
    render(){
        console.log(this.props.sort);
        return(
            <div className="row mt-5">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                
               <div className="dropdown">
                    
                    <button 
                             type="button" 
                            className="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true" 
                            >
                                Sắp xếp <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                        </svg>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a 
                                role="button" 
                                className={(this.props.sort.by === 'name' && this.props.sort.value === 1) ? 'sort_selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a 
                                role="button" 
                                className={(this.props.sort.by === 'name' && this.props.sort.value === -1) ? 'sort_selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên Z-A
                                </span>
                            </a>
                        </li> <hr/>
                        {/* <li role="separator" className="divider"></li> */}
                        <li onClick={() => this.onClick('status', 1)}>
                           <a 
                                role="button" 
                                className={(this.props.sort.by === 'status' && this.props.sort.value === 1) ? 'sort_selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Trạng thái kích hoạt
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status', -1)}>
                            <a 
                                role="button" 
                                className={(this.props.sort.by === 'status' && this.props.sort.value === -1) ? 'sort_selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Trạng thái ẩn
                                </span>
                            </a>
                        </li>
                    </ul>
               </div>
                
                
            </div>
            </div>
       
        );
    }
}

const mapStateToProps = state => {
    return {
        sort : state.sort 
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return{
        onSort : (sort) => {  //sort.by, sort.value
            dispatch(actions.sortTask(sort));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps) (Sort);