// import { v4 as uuidv4 } from 'uuid';

export class RegisterPage{
    constructor(page){
        this.page = page
        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', { name: 'register' })
    }

    signUpAsNewUser = async (email, password) => {
        // await this.page.pause()
        //type into email input
        await this.emailInput.waitFor()
        // const emailId = uuidv4()
        // const email = emailId + "@gmail.com" // afec-123c-2344@gmail.com
        // await this.emailInput.fill("testymctesterson@testers.com")
        await this.emailInput.fill(email)
        //type into password input
        await this.passwordInput.waitFor()
        // const password = uuidv4()
        // await this.passwordInput.fill("supersecretpassword")
        await this.passwordInput.fill(password)
        //click register button
        await this.registerButton.waitFor()
        await this.registerButton.click()
        // await this.page.pause()
    }
}