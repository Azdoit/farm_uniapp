import { createSSRApp } from "vue";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import 'uno.css'
import './uni.scss'
import App from "./App.vue";
// 引入Pinia和持久缓存的设置
const pinia = createPinia().use(
	createPersistedState({
	  storage: {
		getItem(key) {
		  return uni.getStorageSync(key);
		},
		setItem(key, value) {
		  uni.setStorageSync(key, value);
		},
	  },
	})
  );
export function createApp() {
  const app = createSSRApp(App).use(pinia);
  return {
    app,
  };
}
