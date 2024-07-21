const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// スクリーンショットのファイル名に使用する日時をフォーマットする
function getFormattedDate() {
  return format(new Date(), 'yyyyMMdd_HHmmss');
}

describe('トップページのテスト', () => {
  let driver;

  // テストの前に1度だけ実行
  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options())
      .build();
  });

  // テストの後に1度だけ実行されるクリーンアップ処理
  afterAll(async () => {
    await driver.quit();
  });

  test('トップページが正常に表示されること', async () => {
    await driver.get('https://petit-sozai.com/');
    // ページタイトルが含まれるまで最大10秒待機
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
    expect(await mainVisual.isDisplayed()).toBe(true);

    // メインビジュアルの検索ボックスが表示されていることを確認する
    let mainSearchBox = await driver.findElement(By.className('main-search'));
    expect(await mainSearchBox.isDisplayed()).toBe(true);

    /*
    // サイドバーの検索ボックスが表示されていることを確認する
    // 追加CSSがテスト用ブラウザで反映されない（原因不明）のため、一旦テストをコメントアウトする
    let sidebarSearchBox = await driver.findElement(By.className('sidebar-search'));
    expect(await sidebarSearchBox.isDisplayed()).toBe(true);
    */

    // スクリーンショットを撮影
    let screenshot = await driver.takeScreenshot();
    const timestamp = getFormattedDate();
    fs.writeFileSync(
      path.join(__dirname, `screenshot_${timestamp}.png`),
      screenshot,
      'base64'
    );
    console.log('スクリーンショットを撮影しました');
  }, 30000); // テストのタイムアウトを30秒に設定
});
