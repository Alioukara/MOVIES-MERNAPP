import React from 'react';
import Cookies from 'universal-cookie';
import '../styles/dashboard.css'

const cookies = new Cookies();
function dashboard(props) {
      

    return (
        <div id="dashboard" className="container d-flex justify-content-center align-items-center">
        <div className="card">
            <div className="upper"> <img id="img1" src="https://i.imgur.com/Qtrsrk5.jpg" className="img-fluid" /> </div>
          
            <div className="mt-5 text-center">
                <h4 className="mb-0">{cookies.get("username")}</h4>
                <div className="d-flex flex-column align-items-center mt-4 px-4">
                    <div className="stats mb-3">
                        <h6 className="mb-0">Comments</h6> <span>0</span>
                    </div>
                    <div className="stats">
                      <h6 className="btn btn-warning">Change my Password</h6>
                    </div>
                    {/* <div className="stats">
                        <h6 className="mb-0">Ranks</h6> <span>129</span>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
    );
}

export default dashboard;