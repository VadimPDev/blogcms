import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import { Auth } from './containers/Auth/Auth'
import { Main } from './containers/Main/Main'
import {DetailPage} from './containers/DetailPage/DetailPage'
import {AddNews} from './containers/AddNews/AddNews'
import { CreateCategory } from './containers/CreateCategory/CreateCategory'
import { Category } from './containers/Category/Category'
import {CreatePage} from './containers/CreatePage/CreatePage'
import { Page } from './containers/Page/Page'


export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return (
            <Switch>
                <Route path='/' exact>
                    <Main />
                </Route>
                <Route path='/admin/add' exact>
                    <AddNews />
                </Route>
                <Route path='/admin/category'>
                    <CreateCategory />
                </Route>
                <Route path='/detail/:id' exact>
                    <DetailPage />
                </Route>
                <Route path='/admin/page'>
                    <CreatePage />
                </Route>
                <Route path='/category/:url' exact>
                    <Category />
                </Route>
                <Route path='/page/:url' exact>
                    <Page />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }else {
        return (
            <Switch>
                <Route path='/admin/auth'>
                    <Auth />
                </Route>
                <Route path='/' exact>
                    <Main />
                </Route>
                <Route path='/detail/:id' exact>
                    <DetailPage />
                </Route>
                <Route path='/category/:url' exact>
                    <Category />
                </Route>
                <Route path='/page/:url' exact>
                    <Page />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }
}