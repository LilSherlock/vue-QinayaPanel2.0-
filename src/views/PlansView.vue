<template>
    <navBar style="position: sticky; top: 0%; z-index: 2;" :ruta="{ruta}"></navBar>
    <redeemCode></redeemCode>
    <plan-buy></plan-buy>
    <br><br>
</template>

<script>
import navBar from '@/components/NavBar.vue'

import redeemCode from '@/components/RedeemCode.vue'

import PlanBuy from '@/components/PlanBuy.vue'





export default {

    components: {
            navBar,
            redeemCode,
            PlanBuy
        },
    data() {
        return {
            ruta: 'plans'
        }
    }
}

</script>

<style>

</style>