
//Get all Country dropdown options and select India by its value, then verify that India is selected.
//Do not use label for selectOption().

import {test,expect} from '@playwright/test'

test('verify dropDown', async({page})=>{

    await page.goto("https://www.qapractice.com/")

    await page.getByRole('button',{name:'Start Practicing'}).click()

    const card = page.locator('.card').filter({hasText:"UI Element Automation"})

    await card.getByRole('button',{name:'Start practising →'}).click()

    await expect(page.getByRole('heading',{name:"UI Element Automation Practice"})).toBeVisible()

     const form = page.locator('#multiDropdown')
     const options = await form.locator('option').allTextContents()
     const count = options.length

     await form.selectOption([{label:'Option A'},{label:'Option B'},{label:'Option C'}])
 
     await expect(form).toHaveValues(["Option A","Option B","Option C"])

     await form.selectOption([{label:'Option A'},{label:'Option C'}])

     await expect(form).toHaveValues(["Option A","Option C"])
})