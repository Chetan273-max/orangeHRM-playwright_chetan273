import {test,expect} from '@playwright/test'

test('verify api', async({page})=>{

    await page.route('https://api.github.com/repos/microsoft/playwright',async route =>{
        await route.fulfill({
            status:200,
            contentType:'application.json',
            body:JSON.stringify({
                "name": "playwright",
                "full_name": "microsoft/playwright",
                "stargazers_count": 999999,
                "description": "My mocked Playwright repository"
            })
        })

    })

    await page.goto("https://github.com/microsoft/playwright")


})
