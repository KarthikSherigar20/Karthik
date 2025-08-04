const { LoginTestSuite } = require('../Login/Login.js');


describe('Profile', () => {

    it('Profile', async () => {
        await LoginTestSuite();

        await browser.pause(3000); // Wait for login to complete

        const addBenBtn = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().descriptionContains("Test User"))`);

        await addBenBtn.click();
        await browser.pause(3000); // Wait for the profile to load


        await $('//android.view.ViewGroup[@content-desc="Profile"]/android.widget.ImageView').click();

        await browser.pause(3000); // Wait for the profile options to load

        await $('//android.widget.TextView[@text=""]').click();

        await browser.pause(2000); // Wait for the profile picture to change

        await $('//android.widget.TextView[@text="Select Gender"]').click();

        await browser.pause(2000); //

        await $('//android.widget.TextView[@text="Male"]').click();

        await browser.pause(2000); //

        const ageField = await $(`android=new UiScrollable(new UiSelector().scrollable(true))
    .scrollIntoView(new UiSelector().textContains("Enter your age"))`);

        await ageField.waittForDisplayed({ timeout: 10000 });
        await ageField.setValue("24");

        await browser.pause(2000); // Wait for the age to be set

        const emailfield = await $(`android=new UiScrollable(new UiSelector().scrollable(true))
    .scrollIntoView(new UiSelector().textContains("Enter your email id"))`);

        await emailfield.waitForDisplayed({ timeout: 10000 });
        await emailfield.setValue("123acs@gmail.com");


        await $('//android.widget.Switch[@text="OFF"]').click();

        const save=await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Save and continue"))`);

        await save.waitForDisplayed({ timeout: 10000 });
        await save.click();














    })


})