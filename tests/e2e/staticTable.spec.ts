import {test,expect} from '@playwright/test'

test('verify staticTable',async({page})=>{

    await page.goto("https://www.qapractice.com/")
    await page.getByRole('button',{name:'Start Practicing'}).click()

    const cardBody = page.locator('.card-body').filter({hasText:'UI Element Automation'})
    await cardBody.getByRole('button',{name:'Start practising →'}).click()

    await expect(page.getByText('UI Element Automation Practice')).toBeVisible()

    const table = page.locator('div').locator('.table').first()
    const tableHeader = table.locator('thead th')
    const headers = await tableHeader.allTextContents()

    const tableBodyRow = table.locator('tBody tr')
    const countOfTableRow = await tableBodyRow.count()
    console.log(countOfTableRow)


    let younestAge = Infinity
    for(let i=0; i<countOfTableRow;i++){
     for(let j=0;j<headers.length;j++){
        
        if(Number((await tableBodyRow.nth(i).locator('td').nth(2).textContent())?.trim())<younestAge){

            younestAge = Number((await tableBodyRow.nth(i).locator('td').nth(2).textContent())?.trim())
        
        }

    }
}

for(let i=0;i<countOfTableRow;i++){

    if(await tableBodyRow.nth(i).locator('td').nth(2).textContent()=== String(younestAge)){

    const youngUserName = await tableBodyRow.nth(i).locator('td').nth(1).textContent()
    const youngUserAge = await tableBodyRow.nth(i).locator('td').nth(2).textContent()
    console.log(youngUserName)
    console.log(youngUserAge)
    }
}





/*
    for(let i = 0; i<headers.length;i++){
        for(let j=0;j<countOfTableRow;j++){

            if(headers[i]==='Name'){
            const rowData = await tableBodyRow.nth(j).locator('td').nth(i).allTextContents()
            console.log(rowData)
            }
        }



    }
*/
})