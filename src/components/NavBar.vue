<template>
    <div class="navbar" style="width: 100%;">
        <div class="contentBar">
            <div class="menuLogo" >
                    <img alt="Vue logo" src="../../public/logo_qin.png" class="logoQinaya" style="width: 220px;"/>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <div class="navMenu noSelect" style="display: flex; justify-content: flex-end; width: 50%;">

                <div class="userProfile" style="width: 80%;">
                    <!-- <div>
                        <svg-icon :fa-icon="faUser" :size="25" flip="horizontal" style="color: black; padding: 10px;" ></svg-icon>
                    </div> -->
                    <div style="width:20%;" :style="[ruta.ruta == 'dashboard' ? 'border-bottom: 3px solid #CD1E50' : '']">
                        <router-link to="/dashboard">
                            
                            <div class="icon" :style="[ruta.ruta == 'dashboard' ? 'color: #CD1E50' : 'color:black']">Inicio </div>
                        </router-link>
                        <!-- <span class="icon">{{username}}</span> -->
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style="width:20%;" :style="[ruta.ruta == 'plans' ? 'border-bottom: 3px solid #CD1E50' : '']">
                        <router-link to="/plans">

                        <div class="icon" :style="[ruta.ruta == 'plans' ? 'color: #CD1E50' : 'color:black']">Planes&nbsp;& precios</div>
                        <!-- <span class="icon">{{username}}</span> -->
                        </router-link>

                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style="width:20%;;" :style="[ruta.ruta == 'referral' ? 'border-bottom: 3px solid #CD1E50' : '']">
                        <div class="icon" :style="[ruta.ruta == 'referral' ? 'color: #CD1E50' : 'color:black']">Refiere&nbsp;y gana </div>
                        <!-- <span class="icon">{{username}}</span> -->
                    </div>

                </div>
            </div>

            <div class="navMenu noSelect" v-on:click="dropdownVisilibity == false ? dropdownVisilibity = true : dropdownVisilibity = false" ref="dropdownMenu">

                <div class="userProfile" style="display: flex;">
                    <div>
                        <svg-icon :fa-icon="faUser" flip="horizontal" style="color: black; padding: 10px; height: 25px; width: fit-content;" ></svg-icon>
                    </div>

                    <div>
                        <span class="icon">Bienvenido </span>
                        <span class="icon">{{username}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="dropdownSection">
            <div class="dropdown" v-if="dropdownVisilibity">
                <div class="dropdownDivision" v-on:click="logOut">
                    <div>Log Out</div>
                </div>
    
            </div>
        </div>
        <div class="menuBar">
            <div class="barResponsive" v-on:click="logOut" v-if="dropdownVisilibity">
                <h2>Log Out</h2>
            </div>
            
        </div>
    </div>
</template>

<script>
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

export default {
    props: {
        ruta: Object
    },
    setup() {
        return {
            faUser,
        }
    },
    data() {
        var user_name = authStore.user.name
        return {
            dropdownVisilibity: false,
            username: user_name,
        }
    },
    methods:{

        documentClick(e){
            let el = this.$refs.dropdownMenu
            let target = e.target
            if (target == null || el == null || el.contains(target) == false) {
                return;
            }
            if ((  el !== target) && !el.contains(target)) {
                this.dropdownVisilibity=false
                }
        },
        logOut() {
            authStore.$reset()
            document.removeEventListener('click', this.documentClick)
            this.$router.push('/')

        },
    },
    created () {
        document.addEventListener('click', this.documentClick)
    },
    unmounted () {
        document.removeEventListener('click', this.documentClick)
    },
    beforeMount() {
        console.log('aa', this.ruta)
    }
}


</script>

<style>
.menuLogo {
    width: fit-content;
}
.icon {
    font-weight: bold;
    text-decoration: none;
}
a {
    text-decoration: none;

}
.navbar {
    width: 100%;
    height: fit-content;
}
.logoQinaya {
    width: 100%;
    height: 80px;
    padding: 20px;

}
.contentBar {
    background-color: white;
    overflow: hidden;
    width: 99%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    padding: 10px;
    color: black;
    height: 60px;
    padding-right: 0px;
    /* background: rgb(255, 255, 255); */
    background-size: cover;
    border-radius: 10px;
    box-shadow: 0px 2px 10px #c6c6c6;

}
.userProfile {
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: space-evenly;
    padding: 20px;
    cursor: pointer;
}

.barResponsive {
    display: flex;
    justify-content: center;
    background-color: #CD1E50;
}

.barResponsive:hover {
    background: #f5f5f5;
}

.dropdown {
    margin-top: 2px;
    display: inline-block;
    align-items: center;
    flex-direction: column;
    width: 200px;
    position: absolute;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 2px 10px #c6c6c6;

    padding: 10px;
}

.dropdownSection {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.dropdownDivision {
    
    padding-top: 3%;
    font-weight: bold;
    padding-bottom: 5%;
    cursor: pointer;
    background: #CD1E50;
    color: white;
    padding-left: 4%;
    border-radius: 3px;
    box-shadow: 0px 2px 10px #c6c6c6;


}

.menuBar {
    text-align: center;
    padding: 5px;
    display: none;
}

.dropdownDivision:hover {
    background-color: #fc2864;
    border-radius: 5px;
    color: white;

}

@media screen and (max-width: 520px) {
    .icon {
        display: none;
    }
    .dropdown {
        display: none;
    }
    .menuBar {
        display: block;
    }
    .userProfile {
        display: none;
    }
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
</style>