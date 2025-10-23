import { StatsigClient } from '@statsig/js-client'
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';

const myStatsigClient = new StatsigClient(
  "client-wfc6mrHMMNblKH5jHe2piKSzRHipfR75T6eyY0cmir0", 
  { userID: "user-id" },
  {
    plugins: [
      new StatsigSessionReplayPlugin(),
      new StatsigAutoCapturePlugin(),
    ],
  }
);

await myStatsigClient.initializeAsync();
