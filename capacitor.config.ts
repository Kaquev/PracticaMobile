import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'AppMobile1',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/LocalDatabase',
      androidDatabaseLocation: 'default'
    }
  }
};

export default config;