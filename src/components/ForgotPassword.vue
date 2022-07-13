<template>
    <div class="card-form" style="background-color: transparent;">
        <div class="cardContent" style=" width: 100%;">
            <div class="logo">
                <img alt="Vue logo" class="logo" src="../../public/76071610766530234.png"  style="width: 100em"/>
            </div>
            <br>
            <!-- <div class="title" v-if="register">Nombre </div>
            <div class="content" v-if="register">
                <input class="textInput" type="text" v-model="name" placeholder="Nombre" />
            </div> -->
            <div style="background-color: white; padding: 20px 50px; border-radius: 10px;">
                <div class="title" style="font-weight: 500; font-size: larger; color: gray; width: 100%;">¿Olvidaste tu contraseña? No hay problema. Escribe tu email y te enviaremos un link para cambiar tu contraseña</div>
                <div class="content">
                    <input class="textInput" type="text" placeholder="Email" style="width: 100%;"/>
                </div>
                <div>                
                    <div class="loader" v-if="loading"></div>
                </div>
    
                <p v-if="errors">
                    <b>Mensaje:</b>
                    <ul style="margin: 0%;">
                        <li v-for="error in errors" class="error">{{ error }}</li>
                    </ul>
                </p>
                <div style="display: flex; width: 100%; justify-content: center;">
                    <div class="buttonContent" style="width: 40%">
                        <button class="button" type="submit"> Enviar </button>
                    </div>
                    &nbsp;
                    <div class="buttonContent" style="width: 40%" v-on:click="activeLogin">
                        <button class="button1"> Volver </button>
        
                    </div>

                </div>

            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        activeLogin() {
            this.$emit('forgotPassoword', false)
        }
    }

}
</script>

<style>

</style>