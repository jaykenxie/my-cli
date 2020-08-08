<template>
  <el-container class="main-container">
    <el-header style="height: 50px;" class="main-header">Header</el-header>
    <el-container style="height: calc(100% - 70px);">
      <el-aside
        class="main-aside"
        :style="{ width: showAside ? '200px' : '60px' }"
        ><menu-tree :menuList="menuList"></menu-tree
      ></el-aside>
      <div class="main-viewport">
        <tag-router class="main-tagrouter"></tag-router>
        <el-main>
          <div id="microAppsContainer"></div>
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuTree, { IMenuItem } from "./components/MenuTree.vue";
import { eventHub } from "./utils/event";
import { IAppList } from "./api/common";
import TagRouter from "@/components/TagRoute.vue";

@Component({
  components: {
    MenuTree,
    TagRouter,
  },
})
export default class App extends Vue {
  private showAside: boolean = true;
  private menuList: IMenuItem[] = [
    {
      name: "系统管理",
      path: "1",
      children: [
        {
          name: "用户管理",
          path: "1-1",
        },
        {
          name: "功能管理",
          path: "1-2",
        },
      ],
    },
  ];
  private async created() {
    eventHub.$on("menu-list", this.getMenuList);
  }
  private getMenuList(list: IAppList[]) {
    this.menuList = list;
  }
}
</script>

<style lang="scss" scoped>
.main {
  &-container {
    height: 100%;
  }
  &-header {
    margin-bottom: 8px;
    box-shadow: 0 0 2px #dcdfe6;
    background-color: #fff;
    height: 50px;
  }
  &-aside {
    transition: width 0.1s;
    margin-left: 8px;
    margin-bottom: 8px;
    box-shadow: 0 0 2px #dcdfe6;
    background-color: #fff;
  }
  &-viewport {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 6px 6px 6px;

    /deep/ .el-main {
      height: calc(100% - 44px);
      overflow-y: auto;
      padding: 0;
      background: #fff;
      margin-top: 10px;
      box-sizing: border-box;
      padding: 10px;
    }
  }
}
#microAppsContainer {
  height: 100%;
}
</style>
