// import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreateTask from './pages/CreateTask';
import DeleteTask from './pages/DeleteTask';
import Navigation from './pages/Navigation';
import UpdateTask from './pages/UpdateTask';
import ViewAllTask from './pages/ViewAllTask';
import ViewTask from './pages/ViewTask';
import Wallet from './pages/Wallet';

import './App.css';
import { useState } from 'react';

function App() {

  const [state, setState] = useState({web3:null, contract:null, account:null})

  const saveState = ({web3, contract, account}) => {
    setState({web3:web3, contract:contract, account:account})
  }

  const router = createBrowserRouter([
    {path: '/', element: <Wallet saveState={saveState} />},
    {path: '/create-task', element: <CreateTask state={state} />},
    {path: '/delete-task', element: <DeleteTask state={state} />},
    {path: '/update-task', element: <UpdateTask state={state} />},
    {path: '/view-all-task', element: <ViewAllTask />},
    {path: '/view-task', element: <ViewTask />}
  ])
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
