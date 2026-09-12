import {Page,expect,Locator} from '@playwright/test'

export class BasePage{

    constructor(protected page:Page){}

    async navigate(url:string):Promise<void>{

        await this.page.goto(url)
    }

    async click(locator:Locator):Promise<void>{
        await locator.click()
    }

    async fill(locator:Locator,text:string):Promise<void>{
        await locator.fill(text)
    }

    async hover(locator:Locator):Promise<void>{
        await locator.hover()
    }

    async selectOption(locator:Locator,value:string):Promise<void>{

        await locator.selectOption(value)

    }

    async selectCustomDropdown(dropdown:Locator,option:string):Promise<void>{

        await this.click(dropdown)
        await this.click(this.page.getByRole('option',{name:option,exact:true}))  

    }

    async verifyVisible(locator:Locator):Promise<void>{

        await expect(locator).toBeVisible()

    }

    async verifyURL(url:string):Promise<void>{

        await expect(this.page).toHaveURL(url)

    }

    async verifyTitle(title:string):Promise<void>{

        await expect(this.page).toHaveTitle(title)

    }

    async waitForVisible(locator:Locator):Promise<void>{
        await locator.waitFor({state:'visible'})
    }

    async scroll(locator:Locator):Promise<void>{
        await locator.scrollIntoViewIfNeeded()
    }

    async press(locator:Locator,key:string):Promise<void>{
        await locator.press(key)
    }

    async verifyEnabled(locator:Locator):Promise<void>{
        await expect(locator).toBeEnabled()
    }

    async doubleClick(locator:Locator):Promise<void>{
        await locator.dblclick()
    }

    async check(locator:Locator):Promise<void>{
        await locator.check()
    }

    async uncheck(locator:Locator):Promise<void>{
        await locator.uncheck() 
    }

    async clear(locator:Locator):Promise<void>{
        await locator.clear()
    }

    async type(locator:Locator,text:string):Promise<void>{
        await locator.type(text)
    }

    async getText(locator:Locator):Promise<string>{
        return await locator.innerText()
    }

    async getAttribute(locator:Locator,attribute:string):Promise<string|null>{
        return await locator.getAttribute(attribute)
    }

    async getValue(locator:Locator):Promise<string>{
        return await locator.inputValue()
    }

    async verifyText(locator:Locator,expected:string):Promise<void>{

        await expect(locator).toHaveText(expected)
    }

    async getTableRow(text:string):Promise<Locator>{

        return this.page.locator('.oxd-table-row--with-border',{hasText:text}) 



    }

    





}