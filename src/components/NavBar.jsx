import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constant";
import axios from "axios";

const NavBar = () => {

  const user = useSelector(store => store.user)
  const dispatch = useDispatch(); 
  const navigate = useNavigate();  
  

const handlelogout = async () => {
    try{
      const res = await axios.post(API_BASE_URL + "/logout",{
        withCredentials: true
      });
      dispatch(removeUser());
      navigate("/login");

    } catch(err){
      
      console.log(err);
      
    }
  }
  
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
          { user && (<div className="dropdown dropdown-end  mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handlelogout}>Logout</a>
              </li>
            </ul>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default NavBar;
