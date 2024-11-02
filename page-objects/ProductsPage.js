import {expect} from "@playwright/test"
import { Navigation } from "./Navigation";
import { isDesktopViewPort } from "../utils/isDesktopViewport";

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
        //only desktop viewport
        let basketCountBeforeAdding
        if(isDesktopViewPort(this.page)){
            basketCountBeforeAdding = await navigation.getBasketCount()
        
        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        //only desktop viewport
        if(isDesktopViewPort(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

        }
        
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