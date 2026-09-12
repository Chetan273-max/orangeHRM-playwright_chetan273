
import { ADMINPAGE_HEADING,ADMIN_URL,USER_ROW,SYSTEM_USERS, SEARCH_BUTTON, RESET_BUTTON, RECORD_FOUND,ADD_BUTTON, ADDUSER_TITLE, ADD_CONFIRMPASSWORD_TEXTBOX, ADD_PASSWORD_TEXTBOX, ADD_EMPLOYEENAME_TEXTBOX, ADD_STATUS_TEXTBOX, ADD_USERROLE_TEXTBOX, ADD_USERNAME_TEXTBOX, ADD_SAVE_BUTTON, ADD_CANCEL_BUTTON, USER_TABLE_ROW} from "../constants/constants";
import { BasePage } from "./BasePage";
import { Page,Locator, expect } from '@playwright/test';
import { SearchUser } from "../interfaces/searchUser";
import { AddUser } from "../interfaces/addUser";
import { addAdminUser } from "../testData/addUserData";


export class AdminPage extends BasePage{

    private readonly adminHeading:Locator
    private readonly systemUsers:Locator
    private readonly usernameTextbox:Locator
    private readonly userRoleDropdown:Locator
    private readonly employeeNameTextbox:Locator
    private readonly statusDropdown:Locator
    private readonly searchButton:Locator
    private readonly resetButton:Locator
    private readonly recordFound:Locator
    private readonly addButton:Locator
    private readonly addUserHeading:Locator
    private readonly addPasswordTextbox:Locator
    private readonly addConfirmPasswordTextbox:Locator
    private readonly addSaveButton:Locator
    private readonly addCancelButton:Locator
    private readonly employeeNameAtribute:Locator
    
 
    constructor(page:Page){

        super(page)
        this.adminHeading = page.getByRole('heading',{name:ADMINPAGE_HEADING})
        this.systemUsers = page.getByRole('heading',{name:SYSTEM_USERS})
        this.usernameTextbox = page.locator(USER_ROW,{hasText:'Username'}).locator('input')
        this.userRoleDropdown = page.locator(USER_ROW,{hasText:'User Role'}).locator('.oxd-select-text')
        this.employeeNameTextbox = page.locator(USER_ROW,{hasText:'Employee Name'}).locator('input')
        this.statusDropdown = page.locator(USER_ROW,{hasText:'Status'}).locator('.oxd-select-text')
        this.searchButton = page.getByRole('button',{name:SEARCH_BUTTON})
        this.resetButton = page.getByRole('button',{name:RESET_BUTTON})
        this.recordFound = page.getByText(RECORD_FOUND)
        this.addButton = page.getByRole('button',{name:ADD_BUTTON})
        this.addUserHeading = page.getByRole('heading',{name:ADDUSER_TITLE})
        this.addConfirmPasswordTextbox = page.getByLabel(ADD_CONFIRMPASSWORD_TEXTBOX)
        this.addPasswordTextbox = page.getByLabel(ADD_PASSWORD_TEXTBOX)
        this.addSaveButton = page.getByRole('button',{name:ADD_SAVE_BUTTON})
        this.addCancelButton = page.getByRole('button',{name:ADD_CANCEL_BUTTON})
        this.employeeNameAtribute = page.locator("input[placeholder='Type for hints...']")
       
         
    }    
    async isLoaded():Promise<void>{
        await this.verifyURL(ADMIN_URL)
        await this.verifyVisible(this.adminHeading)
        await this.verifyVisible(this.systemUsers)
    }

    async enterSearchUsername(username:string):Promise<void>{

        await this.fill(this.usernameTextbox,username)

    }

    async selectUserRole(role:string):Promise<void>{
        await this.selectCustomDropdown(this.userRoleDropdown,role)
    }

    async enterEmployeeName(employeeName:string,employeeOption:string):Promise<void>{

        await this.fill(this.employeeNameTextbox,employeeName)
        await this.click(this.page.getByRole('option',{name:employeeOption}))
    }

    async selectStatus(status:string):Promise<void>{

        await this.selectCustomDropdown(this.statusDropdown,status)

    }

    async clickSearch():Promise<void>{
        await this.click(this.searchButton)
    }

    async clickReset():Promise<void>{
        await this.click(this.resetButton)
    }

        async searchUser(user:SearchUser):Promise<void>{

            await this.enterSearchUsername(user.username)
            await this.selectUserRole(user.role)
            await this.enterEmployeeName(user.employeeName,user.employeeOption)
            await this.selectStatus(user.status)
            await this.clickSearch()

        }

    async verifyUserExists(username:string):Promise<void>{

        const row = await this.getTableRow(username)
        await expect(row).toBeVisible()
    }   


    
    async verifyRecordFound():Promise<void>{

        await this.verifyText(this.recordFound,RECORD_FOUND)

    }

    async clickAdd():Promise<void>{

        await this.click(this.addButton)
    }

    async verifyAddUserHeading():Promise<void>{
        await this.verifyVisible(this.addUserHeading)
    }

    async enterPassword(password:string):Promise<void>{

        await this.fill(this.addPasswordTextbox,password)
    }

    async enterConfirmPassword(password:string):Promise<void>{
        await this.fill(this.addConfirmPasswordTextbox,password)
    }

    async clickSaveButton():Promise<void>{
        await this.click(this.addSaveButton)
    }

    async clickCancelButton():Promise<void>{
        await this.click(this.addCancelButton)
    }

    async addUser(user:AddUser):Promise<void>{

        await this.clickAdd()
        await this.verifyAddUserHeading()
        await this.enterSearchUsername(addAdminUser.username)
        await this.enterEmployeeName(addAdminUser.employeeName,addAdminUser.employeeOption)
        await this.selectUserRole(addAdminUser.role)
        await this.selectStatus(addAdminUser.status)
        await this.enterPassword(addAdminUser.password)
        await this.enterConfirmPassword(addAdminUser.confirmPassword)
        await this.clickSaveButton()
    }

    async editUserRow(username:string):Promise<void>{

         await this.click(this.page.locator(USER_TABLE_ROW,{hasText:username}).locator(".oxd-icon.bi-pencil-fill"))

    }

    async verifyUser(employeeName:string){

        await expect(this.employeeNameAtribute).toHaveValue(employeeName)

    }

    async deleteUser(employeeName:string):Promise<void>{

        await this.click(this.page.locator(USER_TABLE_ROW,{hasText:employeeName}).locator("i.oxd-icon.bi-trash"))
        await this.click(this.page.getByRole('button',{name:" Yes, Delete "}))

    }

}