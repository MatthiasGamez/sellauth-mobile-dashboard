# SA Dashboard (unofficial)
1. Create a GitHub repo, upload all files in this folder (keep .github/).
2. Actions tab -> "Build APK" -> run. Download artifact `SA-Dashboard-apk` -> app-debug.apk.
3. Install on your phone (allow unknown sources), paste your SellAuth API key.
Local build: npm i && npx cap add android && npx cap sync && cd android && ./gradlew assembleDebug
