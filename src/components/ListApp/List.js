import React  from 'react';
import  {useEffect,useState} from 'react';
import './List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCircleXmark, faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import mintlistLogo from './mintLog.png'; //

function List() {
  const [toDo, setToDo] = useState ([]);
  const[newTask,setNewTask] = useState('');
  const[updateData,setUpdateData] = useState('');

    useEffect(() => {
      //window.localStorage.setItem('toDo', JSON.stringify(toDo));
      if(toDo.length !== 0){   
        localStorage.setItem("listTodos", JSON.stringify(toDo))
      }   
    }, [toDo]);

    useEffect(() => {
      var data=JSON.parse(localStorage.getItem("listTodos"));
      //const data = window.localStorage.getItem('toDo');
      //if( data !== null) setToDo(JSON.parse(data));
      if( data !== null) setToDo(data);
    }, []);

    const addTask = (e) =>  {
      e.preventDefault();
        if(newTask){
          let num = toDo.length+1;
          let newEntry = {id: num, title: newTask, status: false}
          setToDo([...toDo, newEntry])
          setNewTask('');
        }
    }

    const deleteTask = (id) => {
      const removeTasks = [...toDo].filter( toDo => toDo.id !== id)
        if(toDo.length === 1){   
          localStorage.removeItem("listTodos")
          setToDo(removeTasks)
        } else {
          setToDo(removeTasks)
        }
     }

    const doneTask = (id) => {
      let doneTask = toDo.map(task => {
        if(task.id === id){
          return ({...task,status: !task.status})
        } 
          return task;
      })
      setToDo(doneTask);
    }

    const changeTask = (e) => {
      e.preventDefault();
      let updateEntry = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status ? true : false,
      }
      setUpdateData(updateEntry);
    }

    const cancelUpdate = () => {
      setUpdateData('');
    }

    const updateTask = (e) => {
      e.preventDefault();
      let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
      let updatedObject = [...filterRecords, updateData]
      setToDo(updatedObject);
      setUpdateData('');
    }
	
  return (
    <div className="ListApp  ">
        <div className = "Listlink"><a href="/">Mojito</a></div>

      <div className="List">

        <div className="Listlogo "> <img src={mintlistLogo}alt="mint"/> </div>
        
        {updateData && updateData ? (
          
           <div className="updateTaskForm">
           <form onSubmit={changeTask}>
             <input
               type = "text"
               placeholder = "Add Item" 
               value = {updateData && updateData.title}
               onChange = { (e) => changeTask(e)}
             />
             <button className="updateBtn" type="button" onClick={updateTask}>Update</button>
             <button className="cancelBtn" type="button" onClick={cancelUpdate}>Cancel</button>
           </form>
         </div>
        
		) : (
		
        <div className="newTaskForm">
          <form onSubmit={addTask}>
            <input
              type = "text"
              value = {newTask}
              onChange = {(e) => setNewTask(e.target.value)}
              placeholder = "Add Task" 
            />
            <button type="button" onClick={addTask}>Add Task</button>
          </form>
        </div>
        )}
            <div className="tasks">
          {toDo && toDo.length ? '' : <div className="noTask">No tasks...</div>}
          {toDo && toDo.sort((a,b) => a.id > b.id ? 1:-1)
         
          .map((task,index) => {
              return(
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                    <div className={task.status ? 'done' : ''}>
                      <span className="taskNumber">{index + 1}</span>
                      <span className="taskText">{task.title}</span>

                      <div className="iconsWrap">
                        {task.status === false 
                          ?  <span 
                                title = "Completed/Not Completed" onClick={() => doneTask(task.id)}>
                                <FontAwesomeIcon icon={faCircleCheck}/>
                            </span>
                          : <span 
                              title = "Completed/Not Completed" onClick={() => doneTask(task.id)}>
                              <FontAwesomeIcon icon={faCircleXmark}/>
                            </span>
                        }
                       
                        {task.status ? null: ( 
                          <span  title = "Edit"
                            onClick={() => setUpdateData({
                                id: task.id, 
                                title: task.title, 
                                status: task.status ? true :false })}>
                            <FontAwesomeIcon icon={faPen}/>
                          </span>
                        )}
                        
                        <span 
                            title = "Delete" onClick={() => deleteTask(task.id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </span>
                      </div>
                      
                    </div>  
                </div>
              </React.Fragment>)
            })
          }
        </div>

         
        </div>
     </div>
  );
 
}
export default List;
