import {test,expect} from '@playwright/test'

test('verify test',async({page})=>{

    await page.goto("https://www.w3schools.com/html/html_iframe.asp?utm_source=chatgpt.com")
    await page.getByRole('link',{name:'HTML Iframes'}).click()
    await page.getByRole('link',{name:'Iframes'}).click()


    const frame = page.frameLocator("iframe[title='W3Schools HTML Tutorial']")
    await frame.getByRole('link',{name:'SQL'}).click()

    await frame.getByRole('link',{name:'W3Schools on YouTube'}).click()

})