import {Link} from "react-router-dom";
const Navigation = () => {
    return (
      <header>
        <div className="logo">TODO BERN Stack</div>
        <nav>
          <ul>
            <li>
              <Link className="nav_link" to="/view-all-task">
                All Tasks
              </Link>
            </li>

            <li>
              <Link className="nav_link" to="/create-task">
                Create Task
              </Link>
            </li>

            <li>
              <Link className="nav_link" to="/view-task">
                View Task
              </Link>
            </li>

            <li>
              <Link className="nav_link" to="/update-task">
                Update Task
              </Link>
            </li>

            <li>
              <Link className="nav_link" to="/delete-task">
                Delete Task
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
  
  export default Navigation