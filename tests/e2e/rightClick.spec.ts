import {test,expect} from '@playwright/test'

test('verify right click',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/context_menu")

    page.once('dialog',async(dialog)=>{

        expect(dialog.message()).toBe('You selected a context menu')

        await dialog.accept()

    })

    await page.locator("#hot-spot").click({button:'right'})

})

test('drag&drop', async({page})=>{

    await page.goto("http://the-internet.herokuapp.com/drag_and_drop")

    const source = page.locator("#column-a")
    const target = page.locator("#column-b")

    await source.dragTo(target)
    await expect(target.locator('header')).toHaveText("A")
    await expect(source.locator('header')).toHaveText("B")

})

test('verify file upload', async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/upload")

    await page.locator('#file-upload').setInputFiles('D:/VI Tranche5/chitranjanjan sahu.xlsx')

    await page.locator("#file-submit").click()
    await expect(page.getByRole('heading',{name:'File Uploaded!'})).toBeVisible()
    await expect(page.locator('#uploaded-files')).toHaveText('chitranjanjan sahu.xlsx')

})

test('verify download',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/download")

    const downlaodPromise = page.waitForEvent('download')

    await page.getByRole('link',{name:'Документация и правила о документации ошибок во время тестирования.docx'}).click()

    const downloadFile = await downlaodPromise
    
    expect(downloadFile.suggestedFilename()).toBe('Документация и правила о документации ошибок во время тестирования.docx')

})