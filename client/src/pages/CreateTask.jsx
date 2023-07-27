import { useState } from "react";
import Navigation from "./Navigation";

const CreateTask = ({state}) => {

  const createTask = async(event) => {
    event.preventDefault();
    const {contract, account} = state;
    const taskName = document.querySelector("#taskName").value;
    const taskDate = document.querySelector("#taskDate").value;

    try {
      const res = await fetch("http://localhost:3000/api/ethereum/create-task", {
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
          .createTask(taskName, taskDate)
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
      <form onSubmit={createTask}>
        <label>
          Name:
          <input id="taskName" />
        </label>

        <label>
          Date:
          <input id="taskDate" />
        </label>

        <button type="submit">Create Task</button>
        </form>
    </>
  )
}

export default CreateTask