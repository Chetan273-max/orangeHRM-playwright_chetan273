import{test,expect,Locator} from '@playwright/test'

test('Verify test',async({page})=>{

    await page.goto("https://demoqa.com/")

    await page.getByRole('link',{name:"Elements"}).click()

    await page.getByRole('link',{name:"Check Box"}).click()

    const treeItem = page.locator("span.rc-tree-switcher.rc-tree-switcher_close");

    while(await treeItem.count()>0){
        await treeItem.first().click()
    }

    const checkBoxForNotes = page.locator("span[aria-label='Select Notes']");
    await checkBoxForNotes.click()

    await expect(checkBoxForNotes).toBeChecked()

    await checkBoxForNotes.click()

    await expect(checkBoxForNotes).not.toBeChecked()
/*
    const countOfCheckBox = await checkBox.count()

    for(let i=0; i<countOfCheckBox; i++){

        await checkBox.nth(i).click()
    }
 */



    
})