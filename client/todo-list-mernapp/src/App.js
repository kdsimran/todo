import './App.css';
import Items from './components/Items';
import Todo from './components/Todo';
// import Sidebar from './components/Sidebar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


function App() {

  return (
    <div class="container-fluid">
    <div class="row">
        <div class="col-sm-auto bg-light sticky-top">
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                    </a>
                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                    </ul>
            </div>
        </div>
        <div class="col-sm p-3 min-vh-100">
            <Items/>
        </div>
    </div>
{/* </div> */}
</div>
  );
}

export default App;