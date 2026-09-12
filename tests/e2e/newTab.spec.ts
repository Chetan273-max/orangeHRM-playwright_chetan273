import {test,expect} from '@playwright/test'

test('verify test', async({page,context})=>{

    await page.goto("https://the-internet.herokuapp.com/windows?utm_source=chatgpt.com")
    

    const newPromise = context.waitForEvent('page')

    await page.getByRole('link',{name:'Click Here'}).click()

    const newPage = await newPromise

    await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new')

    await expect(newPage.locator('body')).toHaveText('New Window')

    await newPage.close()

    await expect(page).toHaveURL(/\/windows/)

})