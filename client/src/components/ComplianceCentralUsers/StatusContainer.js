import React from 'react'

export const StatusContainer = () => {
  return (
    <div className="statusContainer">
        <div className="statusContainerChild">
        <div className="status">
          <div className="statusText">Status</div>
          <div className="dropdown">
            <a
              className="btn custom-dropdown dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Status
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
        <form>
          <div className="custom-form-group">
            <label style={{margin:"0"}}>Search</label>
            <input className="customSearchInput form-control"
              type="email"
              
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Search"
            />
          </div>

          <button type="submit" className="btn btn-primary d-none">
            Submit
          </button>
        </form>
        <div className="lastLogin">Last Login</div>
        </div>
      </div>
  )
}
