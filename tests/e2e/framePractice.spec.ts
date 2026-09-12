import {test,expect} from '@playwright/test'

test('verify test',async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/nested_frames?utm_source=chatgpt.com")

    const frames = page.frames();

    for (const frame of frames) {
    console.log(frame.name());
   }

    const frame = page.frameLocator("frame[name='frame-top']")

    await expect(frame.frameLocator("frame[name='frame-left']").getByText("LEFT")).toBeVisible()

    

})