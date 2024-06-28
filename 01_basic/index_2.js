// ページ上の要素を見つけて操作
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// スクリーンショットに付与するための文字列生成
function getFormattedDate() {
  return format(new Date(), 'yyyyMMdd_HHmmss');
}

(async function example() {
  // Builderクラスを使用してWebDriverインスタンスを作成
  let driver = await new Builder()
    .forBrowser('chrome') // 使用するブラウザを指定
    .setChromeOptions(new chrome.Options()) // 必要なオプションを設定
    .build(); // WebDriverインスタンスを構築;
  try {
    // 特定のURLを開く
    await driver.get('https://www.google.com');
    console.log('ページを開きました');
    // 検索ボックスにテキストを入力
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);
    console.log('検索ボックスにテキストが入力されました');
    // タイトルが変更されるまで待機
    await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
    console.log('タイトル変更を待機');
    // タイトルを取得して表示
    let title = await driver.getTitle();
    console.log(`ページタイトル：${title}`);

    // スクリーンショットを撮影
    let screenshot = await driver.takeScreenshot();
    const timestamp = getFormattedDate();
    fs.writeFileSync(
      path.join(__dirname, `screenshot_${timestamp}.png`),
      screenshot,
      'base64'
    );
    console.log('スクリーンショットを撮影しました');
  } finally {
    await driver.quit();
  }
})();
