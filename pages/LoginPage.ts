import {Page,Locator} from '@playwright/test'
import { BasePage } from './BasePage'
import {LOGIN_URL} from '../constants/constants'

export class LoginPage extends BasePage{

    private readonly usernameInput:Locator
    private readonly passwordInput:Locator
    private readonly loginButton:Locator
    private readonly errorMessage:Locator


    constructor(page:Page){
        super(page)
        this.usernameInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.loginButton = page.getByRole("button", {name:"Login"})
        this.errorMessage = page.locator(".oxd-alert-content-text")
    }

    async open():Promise<void>{
        await this.navigate(LOGIN_URL)
    }

    async login(username:string,password:string):Promise<void>{


        await this.fill(this.usernameInput,username)
        await this.fill(this.passwordInput,password)
        await this.click(this.loginButton)

    }

    async isLoaded():Promise<void>{

        await this.verifyURL(LOGIN_URL)
        await this.verifyVisible(this.usernameInput)
        await this.verifyVisible(this.passwordInput)
        await this.verifyVisible(this.loginButton)
    }

    async verifyErrorMessage(message:string):Promise<void>{
        await this.verifyText(this.errorMessage,message)
    }
    
}