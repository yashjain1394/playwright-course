import {expect} from "@playwright/test"
import { Navigation } from "./Navigation";

export class ProductsPage{
    constructor(page){
        this.page=page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index)=>{
        const specificAddButton=this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getbasketCount()
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await navigation.getbasketCount()
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        //get order of products
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        //get order of products
        const productTitleAfterSorting = this.productTitle.allInnerTexts()
        //expect that these lists are different
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
        // await this.page.pause()
    }
}