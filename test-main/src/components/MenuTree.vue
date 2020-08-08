<template>
  <el-menu @select="selectHandler">
    <menu-item :menuList="menuList"></menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import MenuItem from "./MenuItem.vue";
import { IAppList } from "../api/common";

@Component({
  components: {
    MenuItem,
  },
})
export default class MenuTree extends Vue {
  name: string = "MenuTree";

  @Prop({ default: () => [] }) menuList!: IMenuItem[];

  private selectHandler(path: string) {
    if (this.$route.path === path) return;
    this.$router.push(path);
  }
}

export interface IMenuItem extends IAppList {}
</script>

<style></style>
