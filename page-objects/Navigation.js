import {expect} from "@playwright/test"
import { isDesktopViewPort } from "../utils/isDesktopViewport"

export class Navigation{
    constructor(page){
        this.page=page

        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink=page.getByRole('link', { name: 'Checkout' })
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        // return number
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        // "0" -> 0
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        // if mobile viewport, first open the burger menu
        if (!isDesktopViewPort(this.page)){
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }



}