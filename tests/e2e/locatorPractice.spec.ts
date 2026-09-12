import {test,expect,Locator} from '@playwright/test'

test('verify loginBranding', async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    const brandingName:Locator = page.getByRole('img',{name:'company-branding'})

    await expect(brandingName).toBeVisible()
    await brandingName.screenshot({path:'screenshots/branding.png'})

    const logo:Locator = page.locator('.orangehrm-login-logo').locator("img[alt='orangehrm-logo']")

    await expect(logo).toBeVisible()

    await logo.screenshot({path:'screenshots/logo.png'})

    const loginTitle:Locator = page.getByRole('heading',{name:'Login'})
    await expect(loginTitle).toBeVisible()
    
    const userNameHint:Locator = page.getByText('Username : Admin')
    const passwordHint:Locator = page.getByText('password : admin123')

    await expect(userNameHint).toBeVisible()
    await expect(passwordHint).toBeVisible()

    const usernameTextbox:Locator = page.locator("input[name='username']")
    const passwordTextbox:Locator = page.locator("input[name='password']")
    await usernameTextbox.fill("Admin")
    await passwordTextbox.fill("admin123")
    const loginButton:Locator = page.getByRole('button',{name:"Login"})
    /*
    const linkdinMenu:Locator = page.locator('svg.oxd-icon.orangehrm-sm-icon').nth(0)
    await linkdinMenu.click()

    const facebookMenu:Locator = page.locator('svg.oxd-icon.orangehrm-sm-icon').nth(1)
    await facebookMenu.click()

    const twitterMenu:Locator = page.locator('svg.oxd-icon.orangehrm-sm-icon').nth(2)
    await twitterMenu.click()

    const youtubeMenu:Locator = page.locator('svg.oxd-icon.orangehrm-sm-icon').nth(3)
    await youtubeMenu.click()
    */
    

    const socialMediaIcon:Locator = page.locator('svg.oxd-icon.orangehrm-sm-icon')

    for(let i=0;i<4;i++){

        const[newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            socialMediaIcon.nth(i).click()
        ])  

        await newPage.waitForLoadState()
        let url = newPage.url()
        await expect(newPage).toHaveURL(url) 
        await newPage.close()
        
    }
/*
    await loginButton.click()

    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
*/
    
})