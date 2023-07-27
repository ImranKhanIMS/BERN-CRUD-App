import { useState,useEffect } from "react"
import Navigation from "./Navigation"
const ViewAllTask = () => {
  const [taskList, setTaskList] = useState([])

    useEffect(() => {
      const allTaks = async() => {
        try {
          const res = await fetch("http://localhost:3000/api/ethereum/view-all-tasks", {
            method: "GET",
            headers: {
              "content-type": "application/json"
            }
          })
          const data = await res.json();
          if(data.status===200){
            setTaskList(data.taskList);
            console.log(data.taskList);
          }
        } catch(error) {
          console.log(error);
        }
      }
      allTaks();
    },[])

    return (
      <>
        <Navigation />
        <h1>ViewAllTask</h1>
      </>
    )
  }
  
  export default ViewAllTask