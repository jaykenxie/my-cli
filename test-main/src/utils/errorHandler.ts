type Platform = "javascript" | "vue";

interface IShanxParams {
  appId: string;
  origin?: string;
  platform?: Platform;
}

class Shanx {
  params: IShanxParams;
  constructor(params: IShanxParams) {
    this.params = params;
    this.initLisnt();
  }
  initLisnt() {
    this.consoleErrorHandler();
    this.urlErrorHandler();
    if (this.params.platform === "javascript") {
      this.runtimeErrorHandler();
      this.promiseErrorHandler();
    }
  }
  consoleErrorHandler() {
    console.error = (function(errFn) {
      return (...args: any) => {
        console.log("args", args);
        errFn.apply(console, args);
      };
    })(console.error);
  }
  runtimeErrorHandler() {
    window.onerror = (msg, url, row, col, error) => {
      console.log({ msg, url, row, col, error });
    };
  }
  promiseErrorHandler() {
    // 捕获未 catch 的 promise 错误
    window.addEventListener("unhandledrejection", (e) => {
      e.preventDefault();
      const { reason } = e;
      console.error(reason);
    });
  }
  urlErrorHandler() {
    window.addEventListener(
      "error",
      (event) => {
        // 过滤js error
        let target: any = event.target || event.srcElement;
        let isElementTarget: boolean =
          target instanceof HTMLScriptElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLImageElement;
        if (!isElementTarget) return false;
        // 上报资源地址
        let url = target.src || target.href;
        console.log("资源加载错误：", url, event);
        console.error({
          message: "资源加载错误",
          static: 1,
        });
      },
      true
    );
  }
  vueErrorHandler(vue: any) {
    vue.config.errorHandler = (err: any, vm: any, info: any) => {
      console.log("Vue Error", err, vm, info);
      // handle error
      // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
      // 只在 2.2.0+ 可用
    };
  }
}
