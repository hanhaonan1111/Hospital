import { defineStore } from "pinia"
import type { params, User } from "@/types/user"
import { ref } from "vue"
import http from '@/utils/http'
export const useUserStore = defineStore(
    "Hispital_User",
    () => {
        const user = ref<User>();
        const setUserData = (u: User) => {
            user.value = u;
        }
        const clearUser = () => {
            user.value = undefined;
        }


        return { user, setUserData, clearUser };
    },
    {
        persist: true,
    }
)

//   https://consult-api.itheima.net/login/password



