import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { LOGIN } from "../constants/route";
import { supabase } from "../lib/supabaseConfig";
import { useEffect, useState } from "react";
import { getUser } from "../services/service";
import { useDispatch } from "react-redux";

function ProtectedRoutes() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(dispatch, navigate)
        setUser(user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  if (user === null) {
    // User information is still being fetched
    return null;
  }

  return user ? <Outlet /> : <Navigate to={LOGIN} />;
}

export default ProtectedRoutes;