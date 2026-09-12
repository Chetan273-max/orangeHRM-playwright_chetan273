import {test,expect} from '@playwright/test'

test('verify test',async({page})=>{

    await page.goto("https://www.qapractice.com/",{waitUntil:'domcontentloaded'})

    await page.getByRole('button',{name:"Start Practicing"}).click()

    const countryOptions = await page.locator('#forms-country option').evaluateAll(options=>options.map(option=>({
        text:option.textContent?.trim(),
        value:(option as HTMLOptionElement).value

    })))

    for(const country of countryOptions){

        console.log(`${country.text} -> ${country.value}`)
    } 




/*
    const card = page.locator('div.card').filter({hasText:"Web Form Automation"})

    await card.getByRole('button',{name:"Start practising →"}).click()

    await expect(page).toHaveURL(/practice-forms/);

    const country = page.locator('#forms-country')
     await expect(country).toBeVisible()

    const countryDropDown = await page.locator('#forms-country option').allTextContents()
    
    console.log(countryDropDown.length)

    const freqOfOptions:{[key:string]:number} = {}

    for(let i=0; i<countryDropDown.length;i++){

        if(!freqOfOptions[countryDropDown[i]]){
            freqOfOptions[countryDropDown[i]] = 1
        }
        else{
            freqOfOptions[countryDropDown[i]] = freqOfOptions[countryDropDown[i]] + 1
        }
    }

    console.log(freqOfOptions)

*/

})