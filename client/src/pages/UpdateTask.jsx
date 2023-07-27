import { useState } from "react";
import Navigation from "./Navigation"

const UpdateTask = ({state}) => {

  const updateTask = async(event) => {
    event.preventDefault();
    const {contract, account} = state;
    const taskId = document.querySelector("#taskId").value;
    const taskName = document.querySelector("#taskName").value;
    const taskDate = document.querySelector("#taskDate").value;

    try {
      const res = await fetch("http://localhost:3000/api/ethereum/update-task", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body:JSON.stringify({taskDate:taskDate})
      })

      const data = await res.json()
      if(data.status === 200) {
        if(contract && contract.methods) {
          await contract.methods
          .updateTask(taskId, taskName, taskDate)
          .send({from: account})
        }
      } else {
          alert("Date Clash! Another task on same date exist")
        }

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navigation />
      <form onSubmit={updateTask}>
        <label>
          ID:
          <input id="taskId" />
        </label>

        <label>
          Name:
          <input id="taskName" />
        </label>

        <label>
          Date:
          <input id="taskDate" />
        </label>

        <button type="submit">Update Task</button>
        </form>
    </>
  )
}
  
  export default UpdateTask