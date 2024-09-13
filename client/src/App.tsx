import Home from "./Pages/Home"
import LoginPage from "./Pages/Login"
import SignupPage from "./Pages/Signup"
import {Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { useQuery } from "@apollo/client"
import { GET_USER } from "./graphql/queries/user.queries"

function App() {
  const { loading, data } = useQuery(GET_USER);

  if (loading) {
    return null
  }else{
    console.log(data?.user)
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={data?.user ? <Home /> : <Navigate to='/login' />} />
				<Route path='/login' element={!data?.user ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!data?.user ? <SignupPage /> : <Navigate to='/' />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
