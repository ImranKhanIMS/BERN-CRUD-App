import { useState,useEffect } from "react"
import Navigation from "./Navigation"
const ViewTask = () => {
  const [task, setTask] = useState([])
  // const ID = 2;

  const getTask = async(event) => {
    try {
      event.preventDefault()
      const id = document.querySelector("#taskID").value;
      const res = await fetch(`http://localhost:3000/api/ethereum/view-task/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      const data = await res.json();
      if(data.status===200){
        setTask(data.taskObj);
        console.log(task);
      }
    } catch(error) {
      console.log(error);
    }
  }
  
    // useEffect(() => {
    //   getTask(ID);
    // },[])

    return (
      <>
        <Navigation />
        <form onSubmit={getTask}>
          <label>
            ID:
            <input id="taskID" />
          </label>

          <button type="submit">View Task</button>
        </form>
      </>
    )
  }
  
  export default ViewTask