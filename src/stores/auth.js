import { defineStore } from 'pinia'


export const useAuthStore = defineStore({
    id: 'userAuth',
    state: () =>{
        return {
            token: '',
            user: {
                id: '',
                name: '',
                email: '',
            },
            isAuthenticated: false,
            trial: null
        }
    },
    persist: true,
});