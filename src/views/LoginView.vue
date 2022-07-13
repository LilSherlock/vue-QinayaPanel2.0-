<template>
        <!-- <div class="navBar"> -->
            <img id="background" src="../../public/background.png">
                <div class="card-form" v-if="!forgotPassword">
                    <div class="cardContent" v-if="!register">
                        <div class="logo">
                            <img alt="Vue logo" class="logo" src="../../public/76071610766530234.png"  />
                        </div>
                        <br>
                        <br>
                        <br>
                        <br>
                        <!-- <div class="title" v-if="register">Nombre </div>
                        <div class="content" v-if="register">
                            <input class="textInput" type="text" v-model="name" placeholder="Nombre" />
                        </div> -->
                        <div class="title" style="font-weight: 800; font-size: xx-large; color: rgb(50, 50, 50);">Bienvenido</div>
                        <div class="content">
                            <input class="textInput" type="text" v-model="email" placeholder="Email" />
                        </div>
                        <div class="title" style="text-align:right; font-size: smaller; color: #CD1E50; cursor: pointer;" v-on:click="activeForgotPassword"><div>¿Olvidaste tu contraseña?</div></div>
                        <div class="content">
                            <input class="textInput" type="password" v-model="password" placeholder="Password" />
                        </div>
                        <div>
            
                            <div class="loader" v-if="loading"></div>
                        </div>
            
                        <p v-if="errors.length">
                            <b>Mensaje:</b>
                            <ul style="margin: 0%;">
                                <li v-for="error in errors" class="error">{{ error }}</li>
                            </ul>
                        </p>
                        <div class="buttonContent" @click="login" v-if="button">
                            <button class="button" type="submit"> Enviar </button>
                        </div>
                        <div class="buttonContent" @click="activeRegister" v-if="button">
                            <button class="button1"> {{this.registerText}} </button>
            
                        </div>
                        
                    </div>
    
                    <div class="cardContent" v-if="register">
                        <img alt="Vue logo"  style="width: 50px; position: absolute; left: 20px; top: 15px; cursor: pointer;" src="../../public/back.png"  @click="activeRegister"/>
                        <br>
                        <br>
                        <div class="logo">
                            <img alt="Vue logo" class="logo" src="../../public/76071610766530234.png"  />
                        </div>
                        <br>
                        <br>
                        <!-- <div class="title" v-if="register">Nombre </div>
                        <div class="content" v-if="register">
                            <input class="textInput" type="text" v-model="name" placeholder="Nombre" />
                        </div> -->
                        <div class="title" style="font-weight: 800; font-size: xx-large; color: rgb(50, 50, 50); text-align: center;">Crea tu Cuenta</div>
                        <br>
                        <div class="content">
                            <input class="textInput" type="text" v-model="name" placeholder="Nombre" />
                        </div>
                        <div class="content">
                            <input class="textInput" type="text" v-model="email" placeholder="Email" />
                        </div>
                        <div class="content">
                            <input class="textInput" type="password" v-model="password" placeholder="Password" />
                        </div>
                        <div>
            
                            <div class="loader" v-if="loading"></div>
                        </div>
            
                        <p v-if="errors.length">
                            <b>Mensaje:</b>
                            <ul style="margin: 0%;">
                                <li v-for="error in errors" class="error">{{ error }}</li>
                            </ul>
                        </p>
                        <div class="buttonContent" @click="login" v-if="button">
                            <button class="button" type="submit"> Registrarse </button>
                        </div>
                        
                    </div>
                </div>

                <ForgotPassword v-if="forgotPassword" @forgotPassoword="activeForgotPassword"></ForgotPassword>

            <!-- </div> -->

        <!-- </div> -->


</template>

<script>


import axios from "axios";
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
import ForgotPassword from '@/components/ForgotPassword.vue'


export default {
    name: 'LoginView',
    components: {
        ForgotPassword
    },
    data() {
        return {
            errors:[],
            name: '',
            email: '',
            password: '',
            registerText: 'Registrate',
            loading: false,
            button: true,
            register: false,
            REST_ENDPOINT: this.$REST_ENDPOINT,
            forgotPassword: false,

        }
    },
    methods: {
        activeForgotPassword() {
            if (this.forgotPassword == false) {
                this.forgotPassword = true
            } else {
                this.forgotPassword = false
            }
        },
        activeRegister() {
            if (this.register == false) {
                this.registerText = 'Inicia sesion'
                this.register = true
            } else {
                this.registerText = 'Registrate'
                this.register = false
            }
        },
        validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                return false;
            } else {
                return true;
            }
        },
        displayError(errors) {
            setTimeout(() => this.loading = false, 1000)

            setTimeout(() => this.errors.push(errors), 1000)

            // this.errors.push(errors);
            setTimeout(() => this.errors = [], 4000)
            setTimeout(() => this.button = true, 4000)

            return
        },
        login() {
            this.button = false;
            this.errors = [];
            this.loading = true
            
            if (this.register == false) {

                // Aca se inicia sesion
                if (!this.email) {
                    this.displayError('El email es obligatorio');
                    return;
                        
                }
                if (!this.password) {
                    this.displayError('La contraseña es obligatoria');
                    return;
                }
                if (this.validateEmail()) {
                    this.displayError('El email es invalido');
                    return;
                }
    
                const params = new URLSearchParams();
                params.append('email', this.email);
                params.append('password', this.password);
                axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=authenticate`, params).then((result) => {
                    if (result.data.status == "403") {
                        // localStorage.setItem("token", result.data.token);
                        this.displayError('El email o la contraseña son incorrectos');
                        return;
                    }
                    if (result.data.status == "401") {
                        // localStorage.setItem("token", result.data.token);
                        this.displayError('Contraseña incorrecta');
                        return;
                    }
                    if (result.data.status == "404") {
                        // localStorage.setItem("token", result.data.token);
                        this.displayError('El email o la contraseña son incorrectos');
                        return;
                    }
                    if (result.data.status == "200") {
                        setTimeout(() => this.loading = false, 1000)

                        authStore.token = result.data.access_token;
                        authStore.user.id = result.data.user.id;
                        authStore.user.email = result.data.user.email;
                        authStore.user.name = result.data.user.name;
                        authStore.trial = result.data.have_trial;
                        this.$router.push('dashboard');
    
                        return;
                    }
                });
            } else {
                // Boton de registro de cuenta
                if (!this.name) {
                    this.displayError('El nombre es obligatorio');
                    return;
                        
                }
                if (!this.email) {
                    this.displayError('El email es obligatorio');
                    return;
                        
                }
                if (!this.password) {
                    this.displayError('La contraseña es obligatoria');
                    return;
                }
                if (this.validateEmail()) {
                    this.displayError('El email es invalido');
                    return;
                }

                const params = new URLSearchParams();
                params.append('name', this.name);
                params.append('email', this.email);
                params.append('password', this.password);

                axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=register`, params).then((result) => {
                    if (result.data.status == "400") {
                        // localStorage.setItem("token", result.data.token);
                        this.displayError('Faltan datos por completar');
                        return;
                    }
                    if (result.data.status == "200") {
                        setTimeout(() => this.loading = false, 1000)
                        this.displayError('¡Cuenta creada con exito!');
                        setTimeout(() => this.register = false, 2000)


                        return;
                    }
                });
            }
        }
    }
}
</script>

<style>
#background {
    /* background-image: url('@/../public/background.png'); */
    background-size: cover;
    background-attachment: fixed;
    position:fixed;
    top:0px;
    right:0px;
    bottom:0px;
    left:0px;
    width: 100%;
    height: 100%;
}


.content {
    margin: 15px auto;
}
.navBar {
    padding: 5%;
    margin: 5px;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
.form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.logo {
    margin: 0 auto;
    display: flex;
    width: 15em;
    justify-content: center;
}

.cardContent {
    width: auto;
    padding: 20px 0px;
    margin: 0 auto;
}
.card-form {  
    display: flex;
    flex-direction: column;position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items:center;
    background-color: white;
    width: 50%;
    height: auto;
    color: white;
    padding: 20px;

    border-radius: 20px;
}
@media screen and (max-width: 620px) {
    .card-form {
        width: auto;
    }
}


.buttonContent {
    margin-top: 10px;
}

.title {
    text-align: left;
    font-size: 20px;
    width: 280px;
    color: black;

}
.error {
    color: #000000;
    font-weight: bold;
    font-size: 20px;
}
.button {
    background-color: #CD1E50;
    border: none;
    color: white;
    /* padding: 15px 60px; */

    text-align: center;
    text-decoration: none;
    width: 100%;
    height: 50px;
    display: inline-block;
    font-size: 16px;
    margin: 2px 2px;
    border-radius: 10px;
    cursor: pointer;
    transition: box-shadow 600ms cubic-bezier(.33,.11,.02,.99), transform  600ms cubic-bezier(.33,.11,.02,.99);
}
.button1 {
    background-color: #484444;
    border: none;
    color: white;
    /* padding: 15px 60px; */

    text-align: center;
    text-decoration: none;
    width: 100%;
    height: 3em;
    display: inline-block;
    font-size: 16px;
    margin: 2px 2px;
    border-radius: 10px;
    cursor: pointer;
    transition: box-shadow 600ms cubic-bezier(.33,.11,.02,.99), transform  600ms cubic-bezier(.33,.11,.02,.99);
}
.button1:hover {
    background-color: #FCB813;
    color: white;

    transform: scale(1)
    translateY(-0.2rem);
}
.button:hover {
    background-color: #000000;
    color: white;

    transform: scale(1)
    translateY(-0.2rem);
}
.button:active {
    background-color: #000000;
    color: white;
    transform: scale(1.1);
}
.textInput {
    height: 35px;
    width: 15em;
    background: rgb(248,244,244);
    border: 0px solid #ccc;
    border-radius: 10px;
    padding: 5px 10px;
    text-align: left;
    font-size: large;
    font-weight: 400;
}


.loader {
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #CD1E50; /* Blue */
    border-radius: 50%;
    margin: 0 auto;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>