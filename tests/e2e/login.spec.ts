import {test} from '../../fixtures/baseTest'
import { expect, request} from '@playwright/test'
import { adminUser, essUser } from '../../testData/searchUserData'
import { addAdminUser } from '../../testData/addUserData'

test('login',async({page,loginPage,dashboardPage,adminPage})=>{

  await loginPage.open()
  await loginPage.isLoaded()
  await loginPage.login(process.env.APP_USERNAME!,process.env.APP_PASSWORD!)
  /*
  await adminPage.searchUser(essUser)
  await adminPage.verifyUserExists(essUser.username)
  await adminPage.addUser(addAdminUser)
*/
/*
await adminPage.editUserRow("Kavya Patel")
await adminPage.verifyUser("Kavya Shree Patel")
await adminPage.deleteUser("Urvi Sri")
*/

const apiContext = await request.newContext({
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    storageState: await page.context().storageState()
});

const response = await apiContext.get("/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC")

/*
const response = await apiContext.post("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users",{data:{

  username:'apiuser1957',
  password:'Ericsson@1957',
  status:true,
  userRoleId:1,
  empNumber:69

}})
*/
expect(response.status()).toBe(200)

const body = await response.json()
console.log(body.data.length) 
const employees = body.data

const createdNewUser:string[] = []
for(let i=0;i<10;i++){

  const employee = employees[i]

  const createResponse = await apiContext.post("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users",
    { data:{
  username:`Cricket${i}`,
  password:'Ericsson@1957',
  status:true,
  userRoleId:1, 
  empNumber:employee.empNumber}})

  const createResponseBody = await createResponse.json()
  createdNewUser.push(createResponseBody.data.userName)
  console.log(createResponseBody)

}
console.log(createdNewUser)

await dashboardPage.navigateToAdmin()

for(let i=0;i<createdNewUser.length;i++){  
  await adminPage.verifyUserExists(createdNewUser[i])
}

/*
console.log("Employee number",employee.empNumber)
console.log("First Name:-",employee.firstName)
console.log("Last Name:-",employee.lastName)
*/

/*
const user = body.data.find(
  (user:any) => user.userName === 'Admin'
)

expect(user).toBeDefined()

console.log(user)
const empNumber = user.employee.empNumber
console.log(empNumber)

const userRoleId = user.userRole.id
console.log(userRoleId)

const newUsername = "Admin3039"

const createResponse = await apiContext.post("/web/index.php/api/v2/admin/users",{

  data:{
    username:newUsername,
    password:"Ericsson@1920",
    status:true,
    userRoleId:userRoleId,
    empNumber:empNumber
  }

})

console.log("Create status:-",createResponse.status())

expect(createResponse.status()).toBe(200)
const createBody = await createResponse.json()
expect(createBody.data.userName).toBe(newUsername)
expect(createBody.data.status).toBe(true)
console.log("Create response",await createResponse.text())

await dashboardPage.isLoaded()
await dashboardPage.navigateToAdmin()
await adminPage.isLoaded()
await adminPage.enterSearchUsername(newUsername)
await adminPage.clickSearch()
await adminPage.verifyUserExists(newUsername)
*/
await apiContext.dispose()

})


