<template>
  <div>
    <template v-for="(item, i) in menuList">
      <el-submenu
        v-if="Array.isArray(item.children)"
        :index="item.name"
        :key="item.path + i"
      >
        <template slot="title">{{ item.name }}</template>
        <menu-item :menuList="item.children"></menu-item>
      </el-submenu>
      <el-menu-item :key="item.path + i" :index="item.path" v-else>{{
        item.name
      }}</el-menu-item>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class MenuItem extends Vue {
  name: string = "MenuItem";
  @Prop({ default: () => [] }) menuList!: IMenuItem[];

  private showAside: boolean = false;

  private toggleAside() {
    this.showAside = !this.showAside;
  }
}

interface IMenuItem {
  name: string;
  path: string;
  children?: IMenuItem[];
}
</script>

<style></style>
