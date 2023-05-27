import { Outlet, Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth"

const Layout = () => {
    const [user] = useAuthState(auth)
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
          {!user && <li>
            <Link to="/auth/login">login</Link>
          </li>}
          {!user && <li>
            <Link to="/auth/signup">sign up</Link>
          </li>}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;