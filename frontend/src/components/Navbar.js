import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { logOut } from  '../redux/usersDuck'


export const Navbar = props => {

  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();

  function toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }


  const hanldeClick = () => {
    dispatch(logOut())
  }

  return (
    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
    <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt =>evt.preventDefault()}><img src={require("../assets/images/logo-mini.svg")} alt="logo" /></a>
      <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
        <i className="mdi mdi-menu"></i>
      </button>
      <ul className="navbar-nav navbar-nav-right ml-lg-auto">
        <li className="nav-item  nav-profile border-0">
          <Dropdown alignRight>
            <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
              <span className="profile-text">{user.name}</span>
              <img className="img-xs rounded-circle" src={require("../assets/images/user.png")} alt="Profile" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
              <Dropdown.Item 
                  className="dropdown-item preview-item d-flex align-items-center border-0" 
                  onClick={hanldeClick}
                  eventKey='logout'
                >
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
      <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
        <span className="mdi mdi-menu"></span>
      </button>
    </div>
  </nav>
  )
}


export default Navbar;
