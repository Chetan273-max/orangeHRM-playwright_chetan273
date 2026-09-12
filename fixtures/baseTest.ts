import {test as base,expect} from '@playwright/test'
import { LoginPage} from '../pages/LoginPage'
import { DashboardPage } from '../pages/dashboardPage'
import { AdminPage } from '../pages/adminPage'
export {expect}

export const test = base.extend<{

    loginPage:LoginPage,
    dashboardPage:DashboardPage,
    adminPage:AdminPage
    
}>({
    loginPage:async({page},use)=>{
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    dashboardPage:async({page},use)=>{
        const dashboardPage = new DashboardPage(page)
        await use(dashboardPage)
    },

    adminPage:async({page},use)=>{
        const adminPage = new AdminPage(page)
        await use(adminPage)
    }
})