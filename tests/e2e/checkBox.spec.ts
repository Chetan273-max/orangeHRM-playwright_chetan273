import {test,expect} from '@playwright/test'

test('verify checkBox',async({page})=>{

    await page.goto("https://www.qapractice.com/")
    await page.getByRole('button',{name:'Start Practicing'}).click()
    const card = page.locator('.card').filter({hasText:'UI Element Automation'})
    await card.getByRole('button',{name:'Start practising →'}).click()

    await expect(page.getByText('UI Element Automation Practice')).toBeVisible()
/*
    const multipleCheckBoxForm = page.locator("[id^='ui-checkbox-option']")

    await multipleCheckBoxForm.nth(0).check()
    await multipleCheckBoxForm.nth(2).check()

    const count = await multipleCheckBoxForm.count()

    
    let countOfCheckedBoxes = 0 

    for(let i=0;i<count;i++){
        
        if(await multipleCheckBoxForm.nth(i).isChecked()){

            countOfCheckedBoxes += 1

            console.log(await multipleCheckBoxForm.nth(i).locator('..').locator('label').textContent())

        }    
    }
    console.log(countOfCheckedBoxes)

    expect(countOfCheckedBoxes).toBe(2)
*/
/*
  const option2CheckBox = page.getByLabel('Option 2')

  await option2CheckBox.check()
  await expect(option2CheckBox).toBeChecked()
  await option2CheckBox.uncheck()
  await expect(option2CheckBox).not.toBeChecked()
*/
})

