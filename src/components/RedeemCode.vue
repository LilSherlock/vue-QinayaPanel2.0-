<template>
    <div class="redem">
        <br>
        <h3 class="redemName" style="font-weight: 900;">¿Tienes un código de activación?</h3>
        <h3 class="redemName">Activa tú plan acá</h3>
        <br v-if="loading">
        <div id="loader" v-if="loading"></div>
        <div class="message">
            <div v-for="error in errors" :key="error" id="textMessage" style="color: rgba(173,62,84,255)">{{ error }}</div>
        </div>
        <br>
        <div class="panelButton" style="position: relative; " v-if="button">
            <input type="text" class="noSelect" style="padding: 1rem 2rem; width: 100%; border-radius: 10px; border: 0px solid transparent; background-color: #F5F5F5;">
            <a class="buttonRedem noSelect" v-on:click="redeemCode">
                Redimir
            </a>
        </div>
        <br>
    </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()


export default {
    
    data() {
        return {
            loading: false,
            REST_ENDPOINT: this.$REST_ENDPOINT,
            voucher: '',
            errors:[],
            button: true,

        }
    },
    methods: {
        redeemCode() {
            this.loading = true
            this.button = false
            const params = new URLSearchParams();
            params.append('user_id', authStore.user.id);
            params.append('access_token', authStore.token);
            params.append('voucher', this.voucher);


            // return;/
            axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=redeem_computer`, params).then((result) => {
                if (result.data.status == 403) {
                    this.displayError('Este codigo ya fue utilizado!');
                    return;
                }
                if (result.data.status == "404") {
                    // localStorage.setItem("token", result.data.token);
                    // this.displayError('El email o la contraseña son incorrectos');
                    return;
                }
                if (result.data.status == "401") {
                    // localStorage.setItem("token", result.data.token);
                    this.displayMessage('Ya reclamaste tu prueba gratis');
                    setTimeout(() => this.buttonLoad = false, 4000)
                    return;
                }
                if (result.data.status == "200") {
                    this.displayError('Has redimido un compu nuevo!');
                    return;
                }
            });
        },
        displayError(errors) {
            setTimeout(() => this.loading = false, 1000)

            setTimeout(() => this.errors.push(errors), 1000)

            // this.errors.push(errors);
            setTimeout(() => this.errors = [], 4000)
            setTimeout(() => this.button = true, 4000)

            return
        },
        redeemExtendCode() {
            const params = new URLSearchParams();
            params.append('user_id', authStore.user.id);
            params.append('access_token', authStore.token);
            params.append('voucher', this.voucher);


            // return;/
            axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=redeem`, params).then((result) => {
                if (result.data.status == 403) {
                    this.displayError('Este codigo ya fue utilizado!');
                    return;
                }
                if (result.data.status == "404") {
                    // localStorage.setItem("token", result.data.token);
                    // this.displayError('El email o la contraseña son incorrectos');
                    return;
                }
                if (result.data.status == "401") {
                    // localStorage.setItem("token", result.data.token);
                    this.displayMessage('Ya reclamaste tu prueba gratis');
                    setTimeout(() => this.buttonLoad = false, 4000)
                    return;
                }
                if (result.data.status == "200") {
                    this.displayError('Has redimido tiempo extra para tu comu!');
                    return;
                }
            });
        }
    },

}

</script>

<style>
    @media screen and (max-width: 520px) {
        .redem {
            width: 90%;
        }
    }
    .redem {
        display: flex;
        justify-content: center;
        flex-direction: column;
        box-shadow: 0px 0px 9px #c6c6c6;
        padding: 5px 20px;
        overflow: hidden;
        width: 80%;
        height: auto;
        border-radius: 20px;
        background-color: aqua;
        font-weight: 600;
        margin: 20px auto;
        background-color: white;
        background-size: cover;
    }
    .buttonRedem {
        text-align: center;
        color: #fff;
        background-color: rgba(173,62,84,255);
        margin: auto 0;
        padding: 1rem 2rem;
        /* position: absolute; */
        right: 0%;
        border-radius: 10px;
        height: 20px;
        cursor: pointer;
        transition: box-shadow 600ms cubic-bezier(.33,.11,.02,.99), transform  600ms cubic-bezier(.33,.11,.02,.99);
    }
    .buttonRedem:hover {
        box-shadow: 0px 0px 9px #c6c6c6;
        transform: scale(1.05)
        translateY(-0.2rem);
    }
    .redemName {
        color: black;
        margin: 0 auto;
    }
    .panelButton {
        display: flex;
        justify-content: center;

    }
</style>