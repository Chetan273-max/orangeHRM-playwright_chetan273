import {expect, test as setup} from '@playwright/test'

setup('authenticate',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.locator("[name='username']").fill('Admin')
    await page.locator("[name='password']").fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()


    await page.context().storageState({
        path:'playwright/.auth/user.json'
    })
})