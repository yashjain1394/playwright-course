import { test, expect} from "@playwright/test"

// const addTwoNumbers = (a,b) => {
//     console.log("Adding up two numbers")
//     return a+b
// }

test("Product Page Add To Basket", async ({page})=>{
    await page.goto("/")
    // await page.pause()

    // const addToBasketButton = page.getByRole('button',{name:'Add to basket'}).first()
    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')

    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText("0")

    await addToBasketButton.click()

    // console.log(await page.getByRole('button',{name:'Add to basket'}).count())
    await expect(addToBasketButton).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")

    const chekoutLink=page.getByRole('link', { name: 'Checkout' })
    await chekoutLink.waitFor()
    await chekoutLink.click()
    await page.waitForURL("/basket")
    // await page.pause()


})

