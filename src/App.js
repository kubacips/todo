import React from 'react'
import './index.css'
import { useState, useReducer } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';


const reducer = (state, action) => {
  if(action.type === "ADD_TASK"){
    const newTasks = [...state.unfinishedTasks, action.payload]
    return{
      ...state,
      unfinishedTasks: newTasks
    }
  }

  if(action.type === "REMOVE_UN_TASK"){
    const filteredTasks = state.unfinishedTasks.filter( (oneTasks) => {
      return oneTasks.id !== action.payload
    } )
    return{
      ...state,
      unfinishedTasks: filteredTasks
    }
  }

  if(action.type === "SAVE_TASK"){
    const newTasks = [...state.finishedTasks, action.payload]
    const filteredTasks =state.unfinishedTasks.filter( (oneTask) => {
      return oneTask.id !== action.payload.id
    } )
    return{
      ...state,
      finishedTasks: newTasks,
      unfinishedTasks: filteredTasks
    }
  }

  if( action.type === "REMOVE_FI_TASK"){
    const filteredTasks = state.finishedTasks.filter( (oneTask) => {
      return oneTask.id !== action.payload
    } )
    return{
      ...state,
      finishedTasks: filteredTasks
    }
  }
}

const defaultState = {
  unfinishedTasks: [],
  finishedTasks: []
}



const App = () => {
  const [taskName, setTaskName] = useState("")
  const [state, dispatch] = useReducer(reducer, defaultState)


  const formSubmit = (e) => {
    e.preventDefault()
    if(taskName) {
      const newTask = {id: new Date().getTime(), name: taskName}
      dispatch( {type: "ADD_TASK", payload: newTask} )
    }
    setTaskName("")
  }

  return (
    <section className="container">
      <div className="app-name">Plánovač úloh</div>
      <form onSubmit={formSubmit}>
        <input 
          type="text" 
          onChange={ (e) => setTaskName(e.target.value)}
          value={ taskName }
          placeholder="zadaj úlohu"
        />

        <input 
          type="submit"
          value="pridať do zoznamu úloh"
        />
      </form>

      <div className="all-tasks">
        <div className="unfinished">
          <div className="tasks-header" >plánované úlohy</div>
          <div className="unfinished-tasks">
            <ul>
              {state.unfinishedTasks.map( (oneTask) =>{
                return <li key={oneTask.id}>
                  <p>{oneTask.name}</p>
                  <div className="buttons">
                  <button 
                    type='button' 
                    className='delete-button'
                    title="odstrániť zo zoznamu"
                    onClick={() => dispatch( {type: "REMOVE_UN_TASK", payload: oneTask.id} )}
                    ><AiFillDelete/>
                  </button>
                  <button
                    type='button'
                    className="save-button"
                    title="uložiť medzi ukončené"
                    onClick={() => dispatch( {type: "SAVE_TASK", payload: oneTask} )}
                    ><FiSave/>
                  </button>
                  </div>
                </li>
              })}        
            </ul>
          </div>
        </div>

        <div className="finished">
          <div className="tasks-header" >hotové úlohy</div>
          <div className="finished-tasks">
            <ul>
              {state.finishedTasks.map( (oneTask) =>{
                return <li key={oneTask.id}>
                  <p>{oneTask.name}</p>
                  <button
                    type='button'
                    className='delete-button'
                    title="odstrániť zo zoznamu"
                    onClick={ () => dispatch( {type: "REMOVE_FI_TASK", payload: oneTask.id})}
                    ><AiFillDelete/>
                  </button>
                </li>
              } )}            
            </ul>
          </div>
        </div>
      </div>

    </section>
  )
  
}

export default App