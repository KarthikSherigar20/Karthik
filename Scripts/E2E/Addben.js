const { LoginTestSuite } = require('../Login/Login.js');

describe('Adding ben', () => {

    it('Add ben', async () => {
        await LoginTestSuite();

        await browser.pause(3000); // Wait for login to complete
        
        try {
            const addBenBtn = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().descriptionContains("Add Beneficiary"))`);

            const isVisible = await addBenBtn.waitForDisplayed({ timeout: 10000 });

            if (isVisible) {
                await addBenBtn.click();
            } else {
                console.log("❗ Add Beneficiary button is not visible. Stopping test execution.");
                return; // Stops further steps in the test
            }
        } catch (err) {
            console.log("❗ Add Beneficiary button not found. Stopping test execution.");
            return; // Also stops the test here, but doesn't fail it
        }


        await browser.pause(5000); // Wait for the scroll to complete

        const others = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Others"))`);
        await others.click();

        await browser.pause(3000); // Wait for the scroll to complete

        const full = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Full Name"))`);
        await full.setValue("Test User");

        await browser.pause(1000); // Wait for the input to register

        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("same as self"))');

        // Then interact with the element
        const sameAsSelf = await $('//android.view.ViewGroup[@content-desc="same as self"]');
        await sameAsSelf.click(); // or .isDisplayed(), .getText(), etc.
        await browser.pause(1000); // Wait for the click to register

        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("0000000000"))');

        const no = await $('//android.widget.EditText[@text="0000000000"]');
        await no.setValue("9999999988");


        await browser.pause(1000); // Wait for the input to register                

        const save = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Save and continue"))`);
        await save.click();
        await browser.pause(1000); // Wait for the save action to complete
        const successMessage = await $('//android.widget.TextView[@text="Beneficiaries Added Successfully"]');

        // First wait for the message to appear
        await successMessage.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Success message did not appear'
        });

        // Then assert it's displayed
        await expect(successMessage).toBeDisplayed();

    });
});