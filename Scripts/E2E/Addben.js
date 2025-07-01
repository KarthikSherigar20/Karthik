const { LoginTestSuite } = require('../Login/Login.js');

describe('Adding ben', () => {

    it('Add ben', async () => {
        await LoginTestSuite();

        await browser.pause(3000); // Wait for login to complete

        const addBeneficiary = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description(", Add Beneficiary"))`);
        await addBeneficiary.click();

        await browser.pause(5000); // Wait for the scroll to complete





    });
});