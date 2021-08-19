var { suite} = require('selenium-webdriver/testing');
const assert = require('assert');


const { By, Key, until } = require("selenium-webdriver");
require("chromedriver");

suite(function(env) {
    describe("Profile-card custom element", function(){

        let driver;
        before(async function(){
            //To wait for browser to build and launch properly
            driver = await env.builder().forBrowser("chrome").build();
        });
    
        after(function(){
            driver.quit();
        });
    
        it("exist portfolio webpage", async function(){
            await driver.get('http://localhost:9000');

            return driver.wait(until.titleIs('Portfolio'), 1000);
        });
    
        it("exist profile-card component", async function(){
            await driver.get('http://localhost:9000');
            
            const profileElement = await driver.findElement(By.id('profile'));
            const shadowRoot = await driver.executeScript("return arguments[0].shadowRoot", profileElement);
            
            return shadowRoot
                    .findElement(By.className('profile-container'))
                    .isDisplayed();
        });
    
        it("contains a profile", async function(){
            return new Promise(async (resolve, reject) => {
                await driver.get('http://localhost:9000');
    
                const profileElement = await driver.findElement(By.id('profile'));
                const shadowRoot = await driver.executeScript("return arguments[0].shadowRoot", profileElement);
                
                const avatarSlot = await shadowRoot
                        .findElement(By.id('profile-img'))
                        .findElement(By.id('avatar'));
                const imgAssignedNodesCount = await driver.executeScript("return arguments[0].assignedNodes().length", avatarSlot);
                
                try {
                    assert.strictEqual(imgAssignedNodesCount, 1, 'Should have only one node as part of the image.');
                } catch (error) {
                    reject(error);
                }

                const descSlot = await shadowRoot
                        .findElement(By.id('profile-desc'))
                        .findElement(By.id('description'));
                const pAssignedNodesCount = await driver.executeScript("return arguments[0].assignedNodes().length", descSlot);
                
                try {
                    assert.strictEqual(pAssignedNodesCount, 1, 'Should have only one node as part of the description as a paragraph.');
                } catch (error) {
                    reject(error);
                }


                const nameSlot = await shadowRoot
                        .findElement(By.id('profile-info'))
                        .findElement(By.name('name'));
                const spanAssignedNodesCount = await driver.executeScript("return arguments[0].assignedNodes().length", nameSlot);
                
                try {
                    assert.strictEqual(spanAssignedNodesCount, 1, 'Should have only one node as part of the name using a span.');
                } catch (error) {
                    reject(error);
                }


                const emailSlot = await shadowRoot
                        .findElement(By.id('profile-info'))
                        .findElement(By.name('email'));
                const emailAssignedNodesCount = await driver.executeScript("return arguments[0].assignedNodes().length", emailSlot);
                
                try {
                    assert.strictEqual(emailAssignedNodesCount, 1, 'Should have only one node as part of the info for email.');
                } catch (error) {
                    reject(error);
                }


                const phoneSlot = await shadowRoot
                        .findElement(By.id('profile-info'))
                        .findElement(By.name('phone'));
                const phoneAssignedNodesCount = await driver.executeScript("return arguments[0].assignedNodes().length", phoneSlot);
                
                try {
                    assert.strictEqual(phoneAssignedNodesCount, 1, 'Should have only one node as part of the info for phone number.');
                } catch (error) {
                    reject(error);
                }

                const moreElementDisplayed = await shadowRoot.findElement(By.id('more-content')).isDisplayed();
                
                try {
                    assert.strictEqual(moreElementDisplayed, false, 'Should be hidden.');
                } catch (error) {
                    reject(error);
                }

                resolve();
            });
        });

        it("changes to mode all", async function(){ 
            await driver.get('http://localhost:9000');

            const profileElement = await driver.findElement(By.id('profile'));
            const shadowRoot = await driver.executeScript("return arguments[0].shadowRoot", profileElement);
            
            await driver.executeScript("arguments[0].setAttribute('mode', 'all')", profileElement);
            const moreElementDisplayed = await shadowRoot.findElement(By.id('more-content')).isDisplayed();
            const linkText = await shadowRoot.findElement(By.id('show-more')).getText();

            return Promise.all([
                assert.strictEqual(moreElementDisplayed, true, 'Should be Shown.'),
                assert.strictEqual(linkText, '', 'Link should be empty.')
            ]);
        });

        it("changes to mode basic", async function(){
            await driver.get('http://localhost:9000');
            const profileElement = await driver.findElement(By.id('profile'));
            const shadowRoot = await driver.executeScript("return arguments[0].shadowRoot", profileElement);
            
            await driver.executeScript("arguments[0].setAttribute('mode', 'basic')", profileElement);
            const moreElementDisplayed = await shadowRoot.findElement(By.id('more-content')).isDisplayed();
            const descSlot = await shadowRoot.findElement(By.id('profile-desc')).isDisplayed();
            const linkText = await shadowRoot.findElement(By.id('show-more')).getText();

            return Promise.all([
                assert.strictEqual(moreElementDisplayed, false, 'More element should not be shown.'),
                assert.strictEqual(descSlot, false, 'Description should not be shown.'),
                assert.strictEqual(linkText, '', 'Link should be empty.')
            ]);
        });
    });
});