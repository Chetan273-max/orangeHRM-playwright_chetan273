import {test,Locator,expect} from '@playwright/test'

test('verify window&Iframe',async({page})=>{

    await page.goto("https://automatewithbipin.com/")
    await page.locator("div[data-view='newtab']").click()

    const newPromise = page.waitForEvent('popup')

    await page.getByRole('button',{name:'Open Playwright Docs'}).click()

    const newPage =  await newPromise
    await newPage.waitForLoadState()

    expect(newPage).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
    expect(newPage).toHaveURL("https://playwright.dev/")

    await page.locator("div[data-view='iframe']").click()
    const frameBody = page.frameLocator("iframe#simpleFrame")
    await frameBody.getByRole('button',{name:"Click me inside the frame"}).click()

    const frameFormBody = page.frameLocator("iframe#formFrame")
    await frameFormBody.locator('input#frameName').fill("Chetan")
    expect(frameBody.locator('input#frameName')).toHaveAttribute("Chetan")

})