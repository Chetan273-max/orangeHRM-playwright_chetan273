import {test,expect,Locator} from '@playwright/test'

test('verify test',async({page})=>{

    await page.goto("https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=815461296140&hvpos=&hvnetw=g&hvrand=15137973722905519375&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9062114&hvtargid=kwd-64107830&hydadcr=14452_2462829&mcid=e9c68a2d0f333bcaacd29ec00843c329&hvocijid=15137973722905519375--&hvexpln=nav&gad_source=1")

    await expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in")

    const amazonMenu:Locator = page.locator("a[id='nav-logo-sprites']")

    /*await amazonMenu.click()
    await expect(page).toHaveURL("https://www.amazon.in/ref=nav_logo")
    */

    const searchTextBox:Locator = page.locator("#twotabsearchtextbox")

    await searchTextBox.fill("iPhone 16")

    const searchSymbol:Locator = page.locator("#nav-search-submit-button")
    await searchSymbol.click()

    await expect(page).toHaveTitle("Amazon.in : iPhone 16")

    const comboBox:Locator = page.locator("select#s-result-sort-select")

    await comboBox.selectOption({label:"Price: High to Low"})

    const products = page.locator("div[data-component-type='s-search-result']")
    let cheapestProductPrice = Infinity
    let cheapestProductName = ""

    const count = await products.count()
    for(let i=0; i<count;i++){

        const product = products.nth(i)

        //await product.locator("img.s-image").screenshot({path:`screenshots/product-${i}.png`})

        //const sponsored = product.getByText("Sponsored")

        const productName = await product.locator("div[data-cy='title-recipe']").textContent()

        const priceLocator:Locator = product.locator("span.a-price-whole")

        if(await priceLocator.count()>0){
        const productPrice = await priceLocator.first().textContent()


            if(productName?.includes("Apple")){
                const productPricevalue = Number(productPrice?.replace(/,/g,""))
              if(productPricevalue<cheapestProductPrice){

                cheapestProductPrice = productPricevalue
                cheapestProductName = productName

               }        
            }

        }
    
    }

    for(let i=0; i<count;i++){

        const product = products.nth(i)

        const productName = (await product.locator("div[data-cy='title-recipe']").textContent())?.trim()

        if(productName === cheapestProductName.trim()){

            await product.locator("h2.a-size-medium.a-spacing-none.a-color-base.a-text-normal").click()
            break
        }      

    }

    const productTitle = page.locator("#productTitle")

    await expect(productTitle).toBeVisible()

})