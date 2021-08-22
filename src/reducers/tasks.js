import * as types from './../constants/ActionType';

var s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
var  guid = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

var findIndex = (tasks, id) => {
    var result = -1; 
    tasks.forEach( (task, index ) => {
      if(task.id === id) {
        result =  index;
      }
    });
    return result; 
  }

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data  ? data : [];
var  myReducer = ( state = initialState, action) => {
    var id = '';
    var index = -1;
    switch(action.type){
        case types.LIST_ALL:
         return state; 
        case types.SAVE_TASK:
            var task = {
                id: action.task.id, // '' || co gtri
                name: action.task.name,
                status: (action.task.status ==='true' || action.task.status === true) ? true : false
            };
            if(!task.id){
                task.id = guid();
                state.push(task);
            }else{
                index = findIndex(state, task.id);
                state[index] = task;
            }
           
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            //cách 1:
                // var cloneTask = {...state[index]};
                // cloneTask.status = !cloneTask.status;
                // state.splice(index, 1);
                // state.push(cloneTask);
            //cách 2:
                // var cloneTask = {...state[index]};
                // cloneTask.status = !cloneTask.status;
                // state[index] = cloneTask;
            //cách 3:
                state[index] = {
                    ...state[index],
                    status : !state[index].status
                };
            localStorage.setItem('tasks', JSON.stringify(state));
            //  console.log(state); 
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: 
            return state;
    }
    // return state;
};
export default myReducer;
//clone task moi = task cu && status = !status;
//xoa task cu => push task moi