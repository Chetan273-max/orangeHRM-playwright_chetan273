import {test,expect, Locator} from '@playwright/test'

test('verify dynamic elements',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/dynamic_controls")


    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('div#checkbox input')).toBeVisible()

    await page.locator('form#checkbox-example').locator('button').click()

    await expect(page.locator('form#checkbox-example').locator('p#message')).toHaveText("It's gone!")
    await expect(page.locator('input#checkbox')).toBeHidden()

    await page.locator('form#checkbox-example').locator('button').click()
    await expect(page.locator('input#checkbox')).toBeVisible()

    await expect(page.locator('form#checkbox-example').locator('p#message')).toHaveText("It's back!")

})

test('verify checkboxEnable status', async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/dynamic_controls")

    const textBox = page.locator('form#input-example input')

    await expect(textBox).toBeDisabled()

    await page.locator('form#input-example button').click()

    await expect(textBox).toBeEnabled()

    await textBox.fill('xyz')
    await expect(textBox).toHaveValue('xyz')
    await expect(page.locator('form#input-example p')).toHaveText("It's enabled!")

})

test('verify dynamic loading', async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/dynamic_loading")
    await page.getByRole('link',{name:'Example 1: Element on page that is hidden'}).click()
    await page.getByRole('button',{name:'Start'}).click()
    await expect(page.locator('#finish')).toHaveText("Hello World!")

})

test('verify rendered element', async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/dynamic_loading")
    await page.getByRole('link',{name:"Example 2: Element rendered after the fact"}).click()
    await page.getByRole('button',{name:"Start"}).click()
    await expect(page.locator("#finish")).toBeVisible({timeout:10000})
    await expect(page.locator("#finish")).toHaveText("Hello World!")

})

test('verify chromes CPU', async({page})=>{

    await page.goto("http://uitestingplayground.com/dynamictable")

    const table = page.locator("div[role='table']")

    const header = await  table.locator("[role='rowgroup']").first().locator("[role='row']").locator('span').allTextContents()

    const body = table.locator("[role='rowgroup']").last().locator("[role='row']")

    const chrome = body.filter({hasText:'Chrome'})

    for(let i=0;i<header.length;i++){

        if(header[i] === "CPU"){

                const cpuValue = await chrome.locator('span').nth(i).textContent()
                console.log(`cpuValue is ${cpuValue} `) 
            
        }

    }

})

test('verify highest cpu usage',async({page})=>{

    await page.goto("http://uitestingplayground.com/dynamictable")

    const headers = await page.locator("[role='table']").locator("[role='rowgroup']").first().locator("[role='row'] span").allTextContents()

    const body = page.locator("[role='table']").locator("[role='rowgroup']").last().locator("[role='row']")

    let highestCPUValue = 0
    let cpuValueinString:string = ""
    let browserNameofHighestCPUValue:string = ""

    for(let i=0;i<headers.length;i++){

        for(let j=0;j< await body.count();j++){

        if(headers[i]==="CPU"){
            const cpuValue = await body.nth(j).locator('span').nth(i).textContent()
            const browserName = await body.nth(j).locator('span').nth(0).textContent()
            const valueInNumber = Number(cpuValue?.replace("%",""))
            if(valueInNumber>highestCPUValue){
                highestCPUValue = valueInNumber
                if(cpuValue!==null){
                cpuValueinString = cpuValue
                }
                if(browserName!== null){
                 browserNameofHighestCPUValue =browserName
                }
            }
        }
    }

    }
    console.log(browserNameofHighestCPUValue)

})

test('verify memory', async({page})=>{

    await page.goto("http://uitestingplayground.com/dynamictable")
    const headers = await page.locator("[role='table']").locator("[role='rowgroup']").first().locator("[role='row'] span").allTextContents()
    const body = page.locator("[role='table']").locator("[role='rowgroup']").last().locator("[role='row']")

    const chromeRow:Locator = body.filter({hasText:"Chrome"})
    let memoryValue:string = ""

    for(let i=0;i<headers.length;i++){
        if(headers[i] === "Memory"){
             memoryValue = await chromeRow.locator('span').nth(i).textContent()??""
        }
    }

    console.log(memoryValue)







})