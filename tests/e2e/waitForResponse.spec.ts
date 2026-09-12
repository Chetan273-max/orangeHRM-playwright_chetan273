import {test,expect} from '@playwright/test'

test('verify test',async({page})=>{

    await page.goto('https://automatewithbipin.com/')

    const responsePromise = page.waitForResponse(

        response => response.url().includes('/posts/1')

    )



})