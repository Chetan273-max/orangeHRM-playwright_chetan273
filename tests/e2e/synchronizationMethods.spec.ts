import {test,expect} from '@playwright/test'

test('verify synchronization methods',async({page})=>{


    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByRole('heading',{name:'Dashboard'})).toBeVisible()


})