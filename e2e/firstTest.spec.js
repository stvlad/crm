const getRandomEmail =  require('./helper').getRandomEmail;


const asserts = {
  testEmail: 'testUser@testing.com',
  testPass: 'thisisthepass',
  wrongPass: 'wrongpassword'
}


describe('CRM', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  describe('Login', ()=>{
    it('should display the login screen', async () => {
      await expect(element(by.id('login'))).toBeVisible();
    });
    
    it('should get error when you type a wrong password', async () => {
      await element(by.id('email')).typeText(asserts.testEmail);
      await element(by.id('password')).typeText(asserts.wrongPass);
      await element(by.id('loginSubmit')).tap();
      await expect(element(by.id('errorMsg'))).toBeVisible();
    });

    it('should login with with existing email', async () => {
      await element(by.id('email')).tap();
      await element(by.id('email')).typeText(asserts.testEmail);
      await element(by.id('password')).typeText(asserts.testPass);
      await element(by.id('loginSubmit')).tap();
      await expect(element(by.id('errorMsg'))).toBeNotVisible();
    });
    
    it('should create/login with new email', async () => {
      await device.uninstallApp();
      await device.installApp();
      await device.terminateApp();
      await device.launchApp();
      await element(by.id('email')).typeText(getRandomEmail('@testing.com', 5));
      await element(by.id('password')).typeText(asserts.testPass);
      await element(by.id('loginSubmit')).tap();
      await expect(element(by.id('errorMsg'))).toBeNotVisible();
    })
  })
  describe('Main CRM screen', ()=>{
    
  });
  

})