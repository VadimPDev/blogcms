import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {useAuth} from './hooks/AuthHook'
import {AuthContext} from './context/AuthContext'
import { useRoutes } from './routes'
import {Loader} from './components/Loader/Loader'
import { Navbar } from './components/Navbar/Navbar';
import {Header} from './components/Header/Header'
import {SideBar} from './components/SideBar/SideBar'
import {ToastProvider} from 'react-toast-notifications'
import {Footer} from './components/Footer/Footer'
import './App.css'


function App() {
  const {token,userId,login,logout,ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return <Loader />
  }
  return (
    <ToastProvider>
    <AuthContext.Provider value={{token,userId,login,logout,isAuthenticated}}>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Navbar />
          <main>
            {routes}
            <SideBar auth={isAuthenticated}/>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
    </ToastProvider>
  );
}

export default App;
