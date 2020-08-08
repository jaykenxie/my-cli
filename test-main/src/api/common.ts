import microAppList from "@/api/microAppList.json";

export interface IAppList {
  name: string;
  type?: string;
  path?: string;
  host?: string;
  icon?: string;
  children?: IAppList[];
}
export function getMicroAppList(): Promise<IAppList[]> {
  return new Promise((resolve, reject) => {
    resolve(microAppList);
  });
}
