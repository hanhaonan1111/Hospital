import { createPinia } from "pinia"
import persist from "pinia-plugin-persistedstate"

const pinia = createPinia().use(persist)
//统一导出，代码简洁，入口唯一
export * from "./modules/user"

export default pinia
