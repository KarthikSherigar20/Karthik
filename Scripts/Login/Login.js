async function LoginTestSuite () {
        // 1. Enter Email
        const emailField = await $('//android.widget.EditText[contains(@text, "Enter Email")]');
        await emailField.waitForDisplayed({ timeout: 10000 });
        await emailField.setValue('playstoretest@pococare.com');
        await browser.pause(500); // Short pause for UI update

        // 2. Request OTP
        const requestOTPButton = await $('//*[contains(@text, "Request OTP")]');

        await driver.execute('mobile: scroll', {
            strategy: 'accessibility id',
            selector: 'requestOTPButton',
            direction: 'up',
            maxSwipes: 5
        });

        await requestOTPButton.click();
        await browser.pause(500); // Wait longer for OTP to be sent

        // 3. Verify OTP Screen
        await $('//*[contains(@text, "Verify OTP")]').waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'OTP verification screen did not appear'
        });

        // 4. Enter OTP (123456)
        const otp = "123456"; // Your test OTP
        const otpFields = await $$('//android.widget.EditText');

        for (let i = 0; i < Math.min(otp.length, otpFields.length); i++) {
            await otpFields[i].setValue(otp[i]);
            await browser.pause(100); // Small delay between digits
        }


        await (await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout')).click();

        await browser.pause(500); // Wait for the click to register

        const submit = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Submit OTP"))`);
        await submit.click();


        await browser.pause(500); // Wait for OTP submission to complete

        await (await $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_foreground_only_button"]'))
            .click();

        await browser.pause(500);

    }



module.exports = { LoginTestSuite };
// This module exports the test suite for use in other files if needed.