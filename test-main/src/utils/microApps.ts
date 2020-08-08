import {
  registerMicroApps,
  start,
  MicroAppStateActions,
  initGlobalState,
} from "qiankun";
import { getMicroAppList, IAppList } from "@/api/common";
import { eventHub } from "./event";

const routers: IMicroAppItem[] = [];

export interface IMicroAppItem {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  props?: any;
}

export async function microAppStart() {
  const result = await getMicroAppList();
  getMicroApp(result, routers);
  console.log("microAppStart");
  eventHub.$emit("menu-list", result);
  initActions();
  registerMicroApps(routers);
  start();
}

function initActions() {
  // 初始化 state
  const s = {
    name: "jayken",
    id: "898989898989",
  };
  const actions: MicroAppStateActions = initGlobalState(s);
  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    // console.log("main", state);
  });
  actions.setGlobalState(s);
  actions.offGlobalStateChange();
}

const userInfo = {
  name: "jayken",
  id: "898989898989",
};

function getMicroApp(
  list: IAppList[],
  temps: IMicroAppItem[] = []
): IMicroAppItem[] {
  for (const { type, name, host = "", path = "", children } of list) {
    if (type === "app") {
      temps.push({
        name,
        entry: host,
        container: "#microAppsContainer",
        activeRule: path,
        props: {
          userInfo,
          token: "v9f4p9j4cqbttjrk69wzcm9rjftvqfh4g2s98ntxnj6n7m9dbwkk68",
          callBack,
        },
      });
    }
    if (Array.isArray(children)) getMicroApp(children, temps);
  }
  return temps;
}

function callBack(a: string) {
  console.log(a);
}
