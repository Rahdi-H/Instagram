import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import { DASHBOARD, LOGIN, PROFILE, PROFILE_EDIT, SIGN_UP } from "./constants/route"
import ProtectedRoutes from "./helpers/ProtectedRoutes"

function App() {
  const Login = lazy(()=> import("./pages/Login"))
  const SignUp = lazy(()=> import("./pages/SignUp"))
  const Dashboard = lazy(()=> import("./pages/Dashboard"))
  const NotFound = lazy(()=> import("./pages/NotFound"))
  const Profile = lazy(()=> import("./pages/Profile"))
  const ProfileEdit = lazy(()=> import("./components/profile/ProfileEdit"))
  return (
      <Router>
        <Suspense fallback={<h1 className="text-center text-5xl">Loading...</h1>}>
          <Routes>
            <Route path={LOGIN} element={<Login/>}/>
            <Route path={SIGN_UP} element={<SignUp/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path={DASHBOARD} element={<Dashboard/>}/>
              <Route path={PROFILE} element={<Profile/>}/>
              <Route path={PROFILE_EDIT} element={<ProfileEdit/>}/>
            </Route>
            {/* <Route path={DASHBOARD} element={<Dashboard/>}/> */}
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </Router>
  )
}

export default App
