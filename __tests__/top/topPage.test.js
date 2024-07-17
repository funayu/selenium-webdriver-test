const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

function getFormattedDate() {
  return format(new Date(), 'yyyyMMdd_HHmmss');
}

describe('トップページのテスト', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOption(new chrome.Options())
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('トップページが正常に表示されること', async () => {
    await driver.get('https://petit-sozai.com/');
    await driver.wait(until.titleContains('フリー素材 プチソザイ'), 10000);

    // ページが正しくロードされたことを確認
    let header = await driver.findElement(By.tagName('header'));
    expect(await header.isDisplayed()).toBe(true);

    // フッターが表示されていることを確認
    let footer = await driver.findElement(By.tagName('footer'));
    expect(await footer.isDisplayed()).toBe(true);

    // メインビジュアルが表示されていることを確認
    let mainVisual = await driver.findElement(
      By.className('wp-block-sgb-hero')
    );
    expect(await searchBox.isDisplayed()).toBe(true);

    // 検索ボックスが2つ存在することを確認
    let searchBoxes = await driver.findElement(By.name('s'));
    expect(await searchBoxes.length).toBe(2);
    // 各検索ボックスが表示されていることを確認
    for (let searchBox of searchBoxes) {
      expect(await searchBox.isDisplayed()).toBe(true);
    }

    // スクリーンショットを撮影
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
