// ページ上の要素を見つけて操作するスクリプト（検索ボックスに文字列を入れて検索）
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// スクリーンショットに付与するための文字列生成
function getFormattedDate() {
  return format(new Date(), 'yyyyMMdd_HHmmss');
}

// テストのグループを定義
describe('Google Search', () => {
  let driver;

  // テストが実行される前に一度だけ実行される処理
  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options())
      .build();
  });

  // 全てのテストが実行された後に一度だけ実行される処理
  afterAll(async () => {
    await driver.quit();
  });

  // 個々のテストケース
  test('shod open Google and search for 「Selenium Webdriver」', async () => {
    await driver.get('https://google.com');
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);
    await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
    let title = await driver.getTitle();
    expect(title).toContain('Selenium WebDriver');
    console.log('テスト成功：ページタイトルに「Selenium WebDriver」が含まれる');

    let screenshot = await driver.takeScreenshot();
    const timestamp = getFormattedDate();
    fs.writeFileSync(
      path.join(__dirname, `screenshot_${timestamp}.png`),
      screenshot,
      'base64'
    );
    console.log('スクリーンショットを撮影しました');
  });
});
