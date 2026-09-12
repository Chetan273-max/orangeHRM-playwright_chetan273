import { ADMIN_MENU,DASHBOARDPAGE_HEADING,USER_DROPDOWN,LOGOUT} from "../constants/constants";
import { BasePage } from "./BasePage";
import { Page,Locator } from "@playwright/test";

export class DashboardPage extends BasePage{

    private readonly dashboardHeading:Locator
    private readonly adminMenu:Locator
    private readonly userDropDown:Locator
    private readonly logOut:Locator

    constructor(page:Page){

        super(page)
        this.dashboardHeading = page.getByRole('heading',{name:DASHBOARDPAGE_HEADING})
        this.adminMenu = page.getByRole('link',{name:ADMIN_MENU})
        this.userDropDown = page.locator(USER_DROPDOWN)
        this.logOut = page.getByRole('menuitem',{name:LOGOUT})
    
    }

    async isLoaded():Promise<void>{

        await this.verifyVisible(this.dashboardHeading)

    }

    async navigateToAdmin():Promise<void>{
        await this.click(this.adminMenu)
    }


    async logout():Promise<void>{
        await this.click(this.userDropDown)
        await this.click(this.logOut)
     
    }

}