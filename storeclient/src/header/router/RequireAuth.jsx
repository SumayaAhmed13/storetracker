import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const {user}=useSelector(state=>state.account);
    const location=useLocation();
    if(!user){
          return <Navigate to="/login" state={{from:location}}/>
    }
  return <Outlet/>
  
}

export default RequireAuth