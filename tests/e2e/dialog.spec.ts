import {test,expect} from '@playwright/test'
/*
test('verify dialog',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts?utm_source=chatgpt.com")

    page.on('dialog',async(dialog)=>{

        await dialog.accept()

        console.log(dialog.message())

    })
    await page.getByRole('button',{name:"Click for JS Alert"}).click()
})
 */
/*
test('verify dialog',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts?utm_source=chatgpt.com")

    page.on('dialog',async(dialog)=>{

        expect(dialog.message()).toBe('I am a JS Confirm')
        await dialog.accept()
    })

    await page.getByRole('button',{name:'Click for JS Confirm'}).click()
    await expect(page.locator('p#result')).toHaveText('You clicked: Ok')

})

*/

test('verify propmt',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts?utm_source=chatgpt.com")

    page.once('dialog',async(dialog)=>{

        expect(dialog.message()).toBe('I am a JS prompt')
        await dialog.accept('Chetan')

    })

    await page.getByRole('button',{name:'Click for JS Prompt'}).click()
    await expect(page.locator('p#result')).toHaveText('You entered: Chetan')

})