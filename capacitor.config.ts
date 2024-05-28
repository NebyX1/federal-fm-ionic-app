import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.federalfm.id',
  appName: 'Federal FM',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;