import { expect } from '@playwright/test';

export class PaymentPage{
    constructor(page){
        this.page=page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerInput = page.getByPlaceholder('Credit card owner')
        this.creditCardNumberInput = page.getByPlaceholder('Credit card number')
        this.creditCardValidUptoInput = page.getByPlaceholder('Valid until')
        this.creditCardCVCInput = page.getByPlaceholder('Credit card CVC')
        this.payButton = page.locator('[data-qa="pay-button"]')
                            }   

    activateDiscount = async() => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        //Option 1 for laggy inputs: using .fill() with await expect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        //Option 2 for laggy inputs: slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(code)

        //Option 3 for laggy inputs: using keyboard shortcuts
        // await this.page.keyboard.down("Control")
        // await this.page.keyboard.type("c")
        // await this/this.page.keyboard.up("Control")

        expect (await this.discountedValue.isVisible()).toBe(false)
        expect (await this.discountActiveMessage.isVisible()).toBe(false)
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.discountActiveMessage.waitFor()
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText() //"345$"
        const discountValueOnlyStringNumber = discountValueText.replace("$", "") //345
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText() //"345$"
        const totalValueOnlyStringNumber = totalValueText.replace("$", "") //345
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)

        expect(discountValueNumber).toBeLessThan(totalValueNumber)


    }

    fillPaymentDetails = async(paymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)
        await this.creditCardValidUptoInput.waitFor()  
        await this.creditCardValidUptoInput.fill(paymentDetails.validUntil)
        await this.creditCardCVCInput.waitFor()
        await this.creditCardCVCInput.fill(paymentDetails.cvc)

    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}