<template>
    <div class="trial">
        <img src="../../public/background.png" alt="" style="position: absolute; z-index: -1;">
        <br>
        <div style="padding: 20px;">
            <h2 class="trialName">Tienes acceso a 1 semana de compu gratis</h2>
            <br>
    
            <h4 class="trialName">Haz click en COMENZAR PRUEBA y da inicio a</h4>
            <h4 class="trialName">tu prueba gratis o compra un plan.</h4>
            <br>
            <div id="loader" v-if="loading"></div>
            <div class="message">
                <div v-for="error in errors" :key="error" id="textMessage">{{ error }}</div>
            </div>
            <br>
            <div class="panelButton" v-on:click="startTrial">
                <a class="buttonConnect noSelect" v-if="!buttonLoad">
                    COMENZAR&nbsp;PRUEBA
                </a>
            </div>
            <br>

        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
import axios from "axios";


export default {
    props: {
        getMachines: {type: Function},
    },
    data() {
        return {
            buttonLoad: false,
            loading: false,
            errors: [],
            REST_ENDPOINT: this.$REST_ENDPOINT

        }
    },
    methods: {
        startTrial() {
            this.buttonLoad = true
            this.loading = true


            const params = new URLSearchParams();
            params.append('user_id', authStore.user.id);
            params.append('access_token', authStore.token);

            // return;/
            axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=trial`, params).then((result) => {
                if (result.data.status == "403") {
                    // localStorage.setItem("token", result.data.token);
                    // this.displayError('El email o la contraseña son incorrectos');
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
                    setTimeout(() => this.loading = false, 4000)
                    authStore.trial = true;
                    this.$root.$emit("getMachines") //like this
                    this.getMachines();
                }
            });
        },
        displayMessage(errors) {
            setTimeout(() => this.loading = false, 1000)
            setTimeout(() => this.errors.push(errors), 1000)

            // this.errors.push(errors);
            setTimeout(() => this.errors = [], 4000)
            setTimeout(() => this.button = true, 4000)

            return
        },
    }
}
</script>

<style>
    .trial {
        z-index: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;
        box-shadow: 0px 0px 9px #c6c6c6;
        overflow: hidden;
        position: relative;
        width: 70%;
        height: auto;
        border-radius: 20px;
        font-weight: 600;
        margin: 20px auto;
        /* background-image: url('../../public/background.png');
        background-size: cover; */
    }

    .trialName {
        color: rgb(255, 255, 255);
        margin: 0 auto;
    }
    .panelButton {
        display: flex;
        justify-content: center;

    }

    @media screen and (max-width: 520px) {
        .trial {
            width: 90%;
        }
    }
</style>