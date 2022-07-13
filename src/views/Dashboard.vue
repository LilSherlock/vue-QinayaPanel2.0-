<template>
    <navBar style="position: sticky; top: 0%; z-index: 2;" :ruta="{ruta}" v-if="!mirage"></navBar>
    
    <div class="centralCompuDispla" v-if="mirage">
        <div id="container">
            <iframe :src="mirageUrl" :class="fullscreen ? 'compuDisplayFullScreen' : 'compuDisplay'" allowfullscreen frameBorder="0"></iframe>
            <div :class="fullscreen ? 'controlButtonFullScreen': 'controlButton' " id="controlIframe" allowfullscreen>
                <div class="buttonController">
                    <div style="display:flex"> 
                        <!-- <svg-icon :fa-icon="faHouse" :size="25" flip="horizontal" ></svg-icon> -->
                        <svg-icon :fa-icon="faMaximize" :size="25" flip="horizontal" class="buttonDisplay" v-on:click="EscFullScreen"></svg-icon>
                        <svg-icon :fa-icon="faDoorOpen" :size="25" flip="horizontal" class="buttonDisplay" v-on:click="closeMirage"></svg-icon>
                    </div>

                </div>
            </div>
        </div>
        <br>
    </div>

    <br>
        <div class="dashboardContainer" v-if="!mirage">
            <div class="centralPanel noSelect">
                <div class="" style="margin: auto auto;">

                    <div class="buttonGroup" v-if="!ended">
                        <div class="secondButton">
                            <span class="ended" v-on:click="activeEnded">Vencidos</span>
                            <div class="backgroundButton"></div>
                        </div>
                        <div class="firstButton">
                            <span>Activos</span>
                        </div>
                    </div>

                    <div class="buttonGroup" v-if="ended">
                        <div id="secondButton">
                            <span id="ended" v-on:click="endEnded" >Activos</span>
                            <div id="backgroundButton"></div>
                        </div>
                        <div id="firstButton">
                            <span >Vencidos</span>
                        </div>
                    </div>



                </div>
                <br>
                <h1 style="text-align:center; color: black; margin: 0px;" v-if="machines.length == 0">{{ endEnded  ? 'No tienes Compus Asignados' : 'No tienes Compus vencidos '}}</h1>
                <div v-if="!ended">
                    <div class="panel" v-for="(machine, index) in machines" style="margin-bottom: 20px;" :key="machine">
                        <div class="divisionPanel">
                            <div class="compuName">
                                <div style="font-size: medium; font-weight: 500;">Nombre </div>
                                <div style="font-size: smaller; color: gray;" >{{ machine.nombre_maquina }}</div>
                            </div>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;

                            <div class="compuName">
                                <div style="font-size: medium; font-weight: 500;">Tiempo Disponible </div>
                                <div style="font-size: smaller; color: gray;">{{ machine.tiempo_disponible }}</div>
                            </div>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <div class="compuName">
                                <div style="font-size: medium; font-weight: 500;">Sistema Operativo</div>
                                <div style="font-size: smaller; color: gray;"> {{ machine.sistema_operativo }}</div>
                            </div>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp; 
                        </div>
    
    
    
                        <div class="divisionPanel1">
    
                            <!-- <div id="loader" ></div> -->
                            <br>
                            <div class="panelButton" v-on:click="loginMirage(index)" style="margin-right:2px">
                                <a class="buttonConnect noSelect">
                                    Conectar
                                </a>
                            </div>
                            <br>
                            <div class="panelButton" v-on:click="loginMirage(index)" >
                                <a class="buttonConnect noSelect" style="background-color:black">
                                    Extender&nbsp;Tiempo
                                </a>
                            </div>
    
                        </div>
    
                    </div>

                </div>
                <br>
                <br>
                <trialCode v-if="!userTrial && !ended" :getMachines="getMachines"></trialCode>
                <redeemCode v-if="!ended"></redeemCode>

            </div>
    
    
        </div>


</template>

<script>
import { faHouse, faMaximize, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

// import { app, protocol, BrowserWindow, remote } from 'electron'

import navBar from '@/components/NavBar.vue'
import { useAuthStore } from '../stores/auth'
import axios from "axios";
import redeemCode from '@/components/RedeemCode.vue'
import trialCode from '@/components/TrialCode.vue'




const authStore = useAuthStore()

export default {
    setup() {
        return {
            faHouse,
            faMaximize,
            faDoorOpen,
        }
    },
    components: {
        navBar,
        redeemCode,
        trialCode

    },
    data() {
        return {
            machines: [],
            errors:[],
            errorsRedem:[],
            loadingRedem: false,
            loading: false,
            ruta: 'dashboard',
            ended: false,
            mirageUrl: '',
            mirageActive: false,
            buttonLoad: false,
            position: null,
            mirage: false,
            REST_ENDPOINT: this.$REST_ENDPOINT,
            fullscreen: false,
            userTrial: false,
            a: false,
            i: 1,
        }
    },
    methods: {
        fullscreenChange() {
            if (document.fullscreenEnabled ||
                document.webkitIsFullScreen || 
                document.mozFullScreen ||
                document.msFullscreenElement) {
                console.log('enter fullscreen');
            }
            else {
                console.log('exit fullscreen');
            }
            // force to reload iframe once to prevent the iframe source didn't care about trying to resize the window
            // comment this line and you will see
            var iframe = document.querySelector('iframe');
            // iframe.src = iframe.src;
        },
        EscFullScreen() {
            if (this.fullscreen == true && this.a == false) {
                this.a = true;
                this.fullscreen = false;
                document.exitFullscreen();

            } else {
                this.a = false;
                this.fullscreen = true;
                this.afullscreen();
            }
        },
        exitHandler() {
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                    this.fullscreen = false;
            } else {
                this.fullscreen = true;
            }
        },
        afullscreen() {
            if (document.fullscreenEnabled || 
                document.webkitFullscreenEnabled || 
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled) {
                
                // which element will be fullscreen
                var iframe = document.querySelector('#container');

                var frame = document.querySelector('iframe');
                // Do fullscreen
                this.fullscreen = true;


                if (iframe.requestFullscreen && this.fullscreen == true) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen && this.fullscreen == true) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.mozRequestFullScreen && this.fullscreen == true) {
                    iframe.mozRequestFullScreen();
                } else if (iframe.msRequestFullscreen && this.fullscreen == true) {
                    iframe.msRequestFullscreen();
                }
                setTimeout(() => {frame.focus()}, 500);
            }
            else {
                document.querySelector('.error').innerHTML = 'Your browser is not supported';
            }
        },
        closeMirage() {
            this.mirage = false
            this.mirageActive = false
            this.mirageUrl = ''
            const params = new URLSearchParams();
            params.append('compu_id', this.machines[this.position].id);
            this.position = null;
            axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=end_session`, params).then((result) => {
                // if (result.data.status == "403") {
                //     authStore.$reset()
                //     this.$router.push('/login')
                //     return;
                // }
                // if (result.data.status == "404") {
                //     return;
                // }
                if (result.data.status == "200") {
                    this.mirage = false
                    this.mirageActive = false
                    this.mirageUrl = ''
                    this.a = false;
                    return;
                }
            });
        },
        loginMirage(id) {
            this.position = id
            this.mirageActive = true;
            const params = new URLSearchParams();
            params.append('user_id', authStore.user.id);
            params.append('compu_id', this.machines[id].id);
            params.append('access_token', authStore.token);
            axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=start_session`, params).then((result) => {
                console.log(result.data)
                if (result.data.status == "403") {
                    authStore.$reset()
                    this.$router.push('/login')
                    return;
                }
                if (result.data.status == "404") {
                    return;
                }
                if (result.data.status == "200") {
                    setTimeout(() => this.mirageActive = false, 4000)
                    this.mirage = true
                    setTimeout(() => this.afullscreen(), 500);

                    setTimeout(() => this.mirageUrl = result.data.href, 500);
                
                    document.addEventListener('fullscreenchange', this.exitHandler);
                    document.addEventListener('webkitfullscreenchange', this.exitHandler);
                    document.addEventListener('mozfullscreenchange', this.exitHandler);
                    document.addEventListener('MSFullscreenChange', this.exitHandler);

                }
            });
            return;
        },
        startFullScreen() {
            if (this.fullscreen) {
                this.fullscreen = false
            } else {
                this.fullscreen = true
            }
        },
        getMachines() {
            const params = new URLSearchParams();
            this.userTrial = authStore.trial;

            params.append('user_id', authStore.user.id);
            params.append('access_token', authStore.token);
            axios.post(`${this.REST_ENDPOINT}mobile.asp?Action=machines`, params).then((result) => {
                if (result.data.status == "403") {
                    authStore.$reset()
                    this.$router.push('/login')
                    return;
                }
                if (result.data.status == "404") {
                    // localStorage.setItem("token", result.data.token);
                    // this.displayError('El email o la contraseña son incorrectos');
                    return;
                }
                if (result.data.status == "200") {
                    setTimeout(() => this.loading = false, 1000)

                    console.log(result.data.machines);
                    result.data.machines.forEach(element => {
                        this.machines.push(element.user_machine);
                    });
                    console.log(this.machines);
                    return;
                }
            });
        },
        activeEnded() {
            this.ended = true
        },
        endEnded() {
            this.ended = false
        },
        
    },
    beforeMount(){
        this.userTrial = authStore.trial;
        this.getMachines();
    },
}
</script>

<style>
body {
    background-color: #fff;
}
.buttonConnect {
        text-align: center;
        color: #fff;
        background-color: rgba(173,62,84,255);
        margin: auto 0;
        padding: 1rem;
        width: 200px;
        border-radius: 5px;
        height: 20px;
        cursor: pointer;
        transition: box-shadow 600ms cubic-bezier(.33,.11,.02,.99), transform  600ms cubic-bezier(.33,.11,.02,.99);
    }
.buttonConnect:hover {
    box-shadow: 0px 0px 9px #c6c6c6;
    transform: scale(1)
    translateY(-0.2rem);
}
.panel {
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
        /* flex-direction: column; */
        /* flex-wrap: wrap; */
        padding: 20px;
        box-shadow: 0px 1px 3px 0px #9e9c9c;
        height: auto;
        width: auto;

        border-radius: 2px;
        /* background-image: url('../../public/background.png'); */
        margin: 0 auto;
}
.divisionPanel {
    display: flex;
    justify-content: space-between;
    /* flex-direction: column; */
    margin: 0 auto;
    align-items: flex-end;
    width: 80%;

}
.divisionPanel1 {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    /* flex-direction: column; */
    margin: 0 auto;
    align-items: center;
    width: 80%;

}

@media screen and (max-width: 850px) {
    .panel {
        flex-direction: column;

    }
    .divisionPanel {
        margin-bottom: 20px;

    }
}
@media screen and (max-width: 520px) {
    .divisionPanel {
        flex-direction: column;
    }
    .divisionPanel1 {
        flex-direction: column;
    }
}

.ended:hover + .backgroundButton {
    margin-left: -24px;
}

#ended:hover + #backgroundButton {
    margin-left: -40px;
}

.firstButton {
    float: left;
    line-height: 20px;
    color: #5D26D9;
    font-weight: bold;
}
.secondButton {
    float: right;
    line-height: 20px;
    cursor: pointer;
    font-weight: bold;
}

#firstButton {
    float: right;
    line-height: 20px;
    color: #5D26D9;
    font-weight: bold;
}
#secondButton {
    float: left;
    line-height: 20px;
    cursor: pointer;
    font-weight: bold;
}

.buttonGroup {
    width: 200px;
    height: 20px;
    padding: 10px 40px;
    position: relative;
    border-radius: 20px;
    background-color: #e3e3e3;
    z-index: 1;
}

.backgroundButton {
    width: 130px;
    height: 40px;

    top: 0;
    margin-left: -173px;
    border-radius: 20px;
    transition: 0.5s;
    box-shadow: 0px 0px 9px #c6c6c6;
    position: absolute;
    background-color: #ffffff;
    z-index: -1;
}
#backgroundButton {
    width: 130px;
    height: 40px;

    top: 0;
    margin-left: 109px;
    border-radius: 20px;
    transition: 0.5s;
    box-shadow: 0px 0px 9px #c6c6c6;
    position: absolute;
    background-color: #ffffff;
    z-index: -1;
}

#container {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.buttonDisplay {
    cursor: pointer;
}
    

.buttonDisplay:hover {
    color: #CD1E50;
}
.buttonController {
    display: flex;
    justify-content: space-between;
}
.controlButton {
    z-index: 1;
    padding: 5px;
    background-color:  rgba(255,255,255,0);
    width: 50px;
    height: 50px;
}
.controlButton:fullscreen {
    background-color: rgba(255,255,255,0.5);
    width: 100px;
    height: 100px;
    position: absolute;
}

::backdrop
{
    background-color: transparent;
}
.centralCompuDispla {
    display: flex;
    margin-top: 20px;
    z-index: 1;
    padding: 5px;

    justify-content: center;
}
.compuDisplay {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    /* border: #CD1E50 solid 4px; */
    height: 98%;
    padding: 5px;
    border-radius: 20px;
}
.compuDisplayFullScreen {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    top: 0px; left: 0px;
    z-index: 3;
}

.controlButtonFullScreen {
    position: absolute;
    z-index: 5;
    padding: 5px;
    width: 10%;
    height: 2%;
    top: 0px;
}

#textMessage {
    color: rgb(255, 255, 255);
    font-size: 1.2em;
    text-align: center;
}


#loader {
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #CD1E50; /* Blue */
    margin: 0 auto;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}


.noSelect {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.noSelect:focus {
    outline: none !important;
}
.dashboardContainer {
    z-index: 3;
    margin-bottom: 20em;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    overflow: auto;
    width: auto;
    z-index: 1;
}

.centralPanel {
    width: 90%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
}

.panelTitle {
    background-image: url('../../public/background.png');
    background-size: cover;
    /* background-image: url('../../public/background.png'); */
    color: black;
    width: 500px;
    height: 50px;
    text-align: center;
    overflow: auto;
    border-radius: 20px;
    line-height: 50px; /* adjust as needed */
    font-size: larger;

}

.compuName {
    color: black;
    margin: 0 auto;
}

</style>