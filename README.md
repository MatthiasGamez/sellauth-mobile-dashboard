# SellAuth Mobile Dashboard (Unofficial)

An unofficial Android app to check your [SellAuth](https://sellauth.com) shop from your phone. Log in with your API key, see your income at a glance, and search invoices by ID.

> **Not affiliated with or endorsed by SellAuth.** Use at your own risk.

## Features

- **Income overview**: today, last 7 days, last 30 days, all loaded, plus average order value and a 14-day chart
- **Invoice search**: find invoices by ID, email or status
- **Invoice details**: tap an invoice to see its full data and copy the ID
- **Multiple shops**: switch between shops on your account
- **Privacy mode**: blur all amounts with one tap
- **Currency choice**: USD, EUR, GBP, CAD, AUD
- **Auto refresh** every 2 minutes
- **Notifications** for new sales (also when the app is closed, checked about every 15 minutes)
- Dark, AMOLED and light themes, accent colors, PIN lock

## Download

Go to the **[Releases](https://github.com/MatthiasGamez/sellauth-mobile-dashboard/releases)** page and download `app-debug.apk`, or build it yourself (see below).

Install steps:
1. Open the APK on your Android phone.
2. Allow installs from unknown sources if asked.
3. Open the app and paste your API key.

## Get your API key

Create an API key in your SellAuth account settings. The app only reads data (shops and invoices).

## Build the APK yourself

**Option A: GitHub Actions (no setup needed)**
1. Fork or upload this repo to your own GitHub account.
2. Open the **Actions** tab, select **Build APK** and click **Run workflow**.
3. When it finishes, download the `SA-Dashboard-apk` artifact.

**Option B: Locally** (needs Node 20, JDK 17 and the Android SDK)
```bash
npm install
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```
The APK ends up in `android/app/build/outputs/apk/debug/`.

## Notifications

Enable them in **Settings > Notifications** and allow the Android permission. A background task checks your shop roughly every 15 minutes (Android decides the exact timing). For reliable alerts, set the app's battery usage to **Unrestricted** in Android settings. Notifications only work in the Android app, not in a browser.

## Privacy and security

- Your API key is stored only on your device (local storage).
- Requests go directly to `api.sellauth.com`. There is no other server and no tracking.
- Use **Settings > Log out** to remove the key from the device.
- Never commit an API key to this repo.

## How it works

A single-page web app (`www/index.html`) wrapped in an Android app with [Capacitor](https://capacitorjs.com). Native HTTP is enabled so requests to the SellAuth API are not blocked by browser CORS rules.

## Known limitations

- Statistics are calculated from up to 1,500 of the most recent invoices.
- This is a debug build. It is not signed for the Play Store.
- Field names from the API are read defensively. If an amount shows as 0, please open an issue with a sample (censored) invoice response.

## Contributing

Issues and pull requests are welcome. Ideas: push notifications for new sales, refund/cancel actions, stock overview, tickets and feedback.

## License

MIT. See below or add a `LICENSE` file.
