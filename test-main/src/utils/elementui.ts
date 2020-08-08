import {
  Header,
  Main,
  Aside,
  Container,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
} from 'element-ui';

export default function(vue: any) {
  vue.component(Header.name, Header);
  vue.component(Main.name, Main);
  vue.component(Aside.name, Aside);
  vue.component(Container.name, Container);
  vue.component(Menu.name, Menu);
  vue.component(Submenu.name, Submenu);
  vue.component(MenuItem.name, MenuItem);
  vue.component(MenuItemGroup.name, MenuItemGroup);
}
