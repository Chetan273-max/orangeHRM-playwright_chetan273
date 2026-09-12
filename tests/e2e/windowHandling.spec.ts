import {test,expect} from '@playwright/test'

test('verify test', async({page})=>{

    await page.goto('https://lab.hakdogan.com/practice/new-tab/')

    const newPromise = page.waitForEvent('popup')
    await page.getByRole('link',{name:'Open destination ↗'}).click()
    const newPage = await newPromise
    await newPage.waitForLoadState()
    await expect(newPage).toHaveURL('https://lab.hakdogan.com/practice/new-tab/destination/')
    await expect(newPage).toHaveTitle('New Tab destination · Validation Lab')

})