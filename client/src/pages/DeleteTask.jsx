import { useState } from "react";
import Navigation from "./Navigation"

const DeleteTask = ({state}) => {

  const deleteTask = async(event) => {
    event.preventDefault();
    const {contract, account} = state;
    const taskId = document.querySelector("#taskId").value;

    try {
      
      if(contract && contract.methods) {
        await contract.methods
        .deleteTask(taskId)
        .send({from: account})
      }

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navigation />
      <form onSubmit={deleteTask}>
        <label>
          ID:
          <input id="taskId" />
        </label>

        <button type="submit">Delete Task</button>
        </form>
    </>
  )
}
  
  export default DeleteTask