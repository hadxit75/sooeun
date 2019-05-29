import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
// import ElementUI from "element-ui";
import locale from "element-ui/lib/locale";
import lang from "element-ui/lib/locale/lang/en";
import VueRouter from "vue-router";
import routes from "./routes/routes";
import VueNotify from "vue-notifyjs";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";

import "./assets/sass/paper-dashboard.scss";
import "./assets/sass/demo.scss";

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Scrollbar
} from "element-ui";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.prototype.$http = axios;
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(VueRouter);
Vue.use(VueNotify);

locale.use(lang);
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  next();

  // console.log('r',requiresAuth);
  // console.log('c',currentUser);
  // console.log('f',from);
  // console.log('t',to);
  // http://localhost:8080/#/postdetail?postid=MmLU6AZQkqp0dWY0fnBa
  // if (
  //     requiresAuth &&
  //     !currentUser &&
  //     to.path != "/login" &&
  //     from.path != "/login"
  // ) {
  //     // console.log("8");
  //     next("login");
  // } else if (requiresAuth && !currentUser && to.path != "/login") {
  //     // console.log("7");
  //     next("/");
  // } else if (requiresAuth && !currentUser && to.path == "/login") {
  //     // console.log("5");
  //     next();
  // } else if (requiresAuth && !currentUser) {
  //     // console.log("1");
  //     next("login");
  // } else if (requiresAuth && currentUser) {
  //     // console.log("4");
  //     next();
  // } else if (!requiresAuth && !currentUser) {
  //     //
  //     // console.log("2");
  //     next();
  // } else if (!requiresAuth && currentUser && to.path == "/login") {
  //     // console.log("3");
  //     next("/overview");
  // } else if (!requiresAuth && currentUser && to.path === "/") next();
  // else next();

  // }
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
