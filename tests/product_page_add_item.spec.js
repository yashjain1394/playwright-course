import { test } from "@playwright/test"

// const addTwoNumbers = (a,b) => {
//     console.log("Adding up two numbers")
//     return a+b
// }

test("Product Page Add To Basket", async ({page})=>{
    await page.goto("localhost:2221")
    await page.pause()

})

