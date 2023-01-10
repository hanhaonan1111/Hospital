import { defineStore } from "pinia"
import type { User } from "@/types/user"
import { ref } from "vue"
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



