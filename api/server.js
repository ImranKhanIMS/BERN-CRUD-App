const express = require('express')
const cors = require("cors")
const ABI = require("./ABI.json");
const {Web3} = require("web3");

const app = express();
app.use(cors())
app.use(express.json())

const web3 = new Web3("https://holy-white-water.ethereum-goerli.discover.quiknode.pro/90093c7b9e879a5739bcf1adea62ed9b848cf4d2/");
const contractAddress = "0xffffab03f945daad91a19663514a9a5f4ff0bede";
const contract = new web3.eth.Contract(ABI, contractAddress);

app.get("/api/ethereum/view-task/:taskId", async(req, res) => {
    try{
        const {taskId} = req.params;
        const task = await contract.methods.viewTask(taskId).call();
        const {id, name, date} = task;
        const numId = Number(id);
        const taskObj = {
            numId, name, date
        }
        res.status(200).json({status:200, taskObj, message:"Task Exist"});
    } catch(error) {
        res.status(404).json({status:404, message:"Task Id not Found!"});
    }
})

app.get("/api/ethereum/view-all-tasks", async(req, res) => {
    try{
        const tasks = await contract.methods.allTask().call();
        if(tasks.length > 0){
            const taskList = tasks.map(({id, name, date}) => {
            const taskId = Number(id);
            return {taskId, name, date};
        })

        res.status(200).json({status:200, taskList, message:"Tasks List Exist"});
        } else {
            res.status(404).json({status:404, message:"Task List does not exist!"});
        }
    } catch(error) {
        res.status(500).json({status:500, message:"Task Id not Found!"});
    }
})

const dateClashCheck = async (taskDate) => {
    const tasks = await contract.methods.allTask().call();
    const foundTask = tasks.find(task=>task.date === taskDate);

    if(foundTask) {
        return foundTask.name;
    }
    return "No Task Found";
}

app.post("/api/ethereum/create-task", async(req, res) => {
    const {taskDate} = req.body;
    const task = await dateClashCheck(taskDate);
    try{
        if(task !== "No Task Found") {
            res.status(409).json({status:409, message:"Date Clash: Task cannot be added"})
        } else {
            res.status(200).json({status:200, message:"Task can be added"})
        }
    } catch(error) {
        console.error(error)
        // res.status(500).json({status:500, message:"Task Id not Found!"})
    }
})

app.post("/api/ethereum/update-task", async(req, res) => {
    const {taskDate} = req.body;
    const task = await dateClashCheck(taskDate);
    try{
        if(task !== "No Task Found") {
            res.status(409).json({status:409, message:"Date Clash: Task cannot be added"})
        } else {
            res.status(200).json({status:200, message:"Task can be added"})
        }
    } catch(error) {
        console.error(error)
        // res.status(500).json({status:500, message:"Task Id not Found!"})
    }
})

console.log(contract);
app.listen(3000,() => {
    console.log("server is running")
});