export const DEFAULT_MONITOR_INTERVAL = 1_200_000; // 20 minutes

export default class Monitor {
  isDisabled: boolean;
  isRequestDisabled: boolean;
  interval: number;
  onRequest: () => Promise<any>;
  shouldChange: (oldData?: any, newData?: any) => Promise<boolean>;
  oldData: any;
  constructor(
    onRequest: () => Promise<any>,
    shouldChange: (oldData?: any, newData?: any) => Promise<boolean>,
  ) {
    this.onRequest = onRequest;
    this.shouldChange = shouldChange;

    this.isDisabled = false;
    this.isRequestDisabled = false;
    this.interval = DEFAULT_MONITOR_INTERVAL;
  }

  onMonitorChange() {
    console.log('Method not implemented.');
  }

  run() {
    if (this.isDisabled) return;

    setInterval(this.check.bind(this), this.interval);
  }

  async check() {
    if (this.isRequestDisabled) {
      this.onMonitorChange();

      return;
    }

    const data = await this.onRequest();

    const shouldChange = await this.shouldChange(this.oldData, data);

    if (shouldChange) {
      this.onMonitorChange();
    }

    this.oldData = data;
  }
}
