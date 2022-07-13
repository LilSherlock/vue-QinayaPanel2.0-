<template>
    <div class="buyPlan">
        <img src="../../public/background.png" alt="" style="position: absolute; z-index: -1;">

        <div class="full-container">
            <div style="display:flex;">
                <div class="container">
                    <p style="padding:0px 2px; font-size: 1.6em;">1</p>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div class="container" style="width: auto; font-size: 1.3em; text-overflow: wrap; text-align: start;">
                    <p>Selecciona&nbsp;el sistema&nbsp;operativo para&nbsp;tú&nbsp;compu</p>
                </div> 

            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="container" style="width: auto">
                <select name="" id="" style="" class="select noSelect">
                    <option value="Windows">Windows</option>
                    <option value="Linux">Linux</option>
    
                </select>
            </div>
        </div>
    </div>
    <!-- Seleccionar plan -->
    <div class="selectPlan">
        <div class="full-container" >
            <div style="padding:50px 20px;width: 200px" class="plan_information">
                    <div style="text-align:left;">&nbsp;</div>
                    <div style="display:flex; align-items: center; justify-content: start;">
                        <div>&nbsp;</div>&nbsp;&nbsp;
                        <div style="font-size:2em; margin: 0 auto;"> &nbsp;</div>
                    </div>
                    <div style="text-align:end; margin-right: 30px;"> &nbsp;</div>
                    <br>
                    <div style="color: gray" >
                        Tiempo
                    </div>
                    <br>
                    <div style="color: gray">
                        Storage
                    </div>
                    <br>
                    <div style="color: gray">
                        Ram
                    </div>
                    <br>
                    <div style="color: gray">
                        VCores
                    </div>
                    <br>
                    &nbsp;

            </div>
            <div style="padding:50px 20px; box-shadow: 0px 0px 9px #c6c6c6;border-radius: 10px; width: 200px">
                    <div style="text-align:left;">Semanal</div>
                    <div style="display:flex; align-items: center; justify-content: start;">
                        <div>$</div>&nbsp;&nbsp;
                        <div style="font-size:3em; margin: 0 auto;">3000</div>
                    </div>
                    <div style="text-align:end; margin-right: 30px;">cop</div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        1 día
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        10 Gb
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        2 Gb
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        2@ 1.2 Ghz
                    </div>
                    <br>
                    <div class="panelButton" style="margin-right:2px">
                        <a class="buttonConnect noSelect" >
                            Comprar
                        </a>
                    </div>
            </div>
            <div style="padding:50px 20px; box-shadow: 0px 0px 9px #c6c6c6;border-radius: 10px; width: 200px">
                    <div style="text-align:left;">Semanal</div>
                    <div style="display:flex; align-items: center; justify-content: start;">
                        <div>$</div>&nbsp;&nbsp;
                        <div style="font-size:3em; margin: 0 auto;">3000</div>
                    </div>
                    <div style="text-align:end; margin-right: 30px;">cop</div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        1 día
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        10 Gb
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        2 Gb
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        2@ 1.2 Ghz
                    </div>
                    <br>
                    <div class="panelButton" style="margin-right:2px">
                        <a class="buttonConnect noSelect" >
                            Comprar
                        </a>
                    </div>
            </div>
            <div style="padding:50px 20px; box-shadow: 0px 0px 9px #c6c6c6;border-radius: 10px; width: 200px">
                    <div style="text-align:left;">Semanal</div>
                    <div style="display:flex; align-items: center; justify-content: start;">
                        <div>$</div>&nbsp;&nbsp;
                        <div style="font-size:3em; margin: 0 auto;">3000</div>
                    </div>
                    <div style="text-align:end; margin-right: 30px;">cop</div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        1 día
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        10 Gb
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        2 Gb
                    </div>
                    <br>
                    <div style="color: gray" class="information_plan">
                        Tiempo
                    </div>
                    <div>
                        2@ 1.2 Ghz
                    </div>
                    <br>
                    <div class="panelButton" style="margin-right:2px">
                        <a class="buttonConnect noSelect" >
                            Comprar
                        </a>
                    </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
        </div>  
        
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .information_plan {
        display: none;
    }
    @media screen and (max-width: 520px) {
            .full-container {
                flex-direction: column;
            }
            .select {
                width: 150px !important;
            }
            .plan_information {
                display: none;
            }
            .information_plan {
                display: block;
            }
        }
    .buyPlan {
        display: flex;
        align-items: center;
        box-shadow: 0px 0px 9px #c6c6c6;
        position: relative;
        /* padding: 10px 20px; */
        z-index: 1;
        overflow: hidden;
        width: 80%;
        height: auto;
        border-radius: 5px;
        /* background-image: url('../../public/background.png'); */
        color: white;
        font-weight: 600;
        margin: 20px auto;
        background-color: white;
        background-size: cover;
    }
    .container {
        width: 10%;
    }
    .full-container {
        width: 100%;
        display: flex;
        padding: 10px 20px;
        align-items: center;
        justify-content: space-between;
    }
    .select {
        width: 300px;
        height: 50px;
        border-radius: 10px;
        background-color: #f0f0f0;
    }

    .selectPlan {
        display: flex;
        align-items: center;
        /* box-shadow: 0px 0px 9px #c6c6c6; */
        padding: 10px 20px;
        overflow: hidden;
        width: 80%;
        height: auto;
        border-radius: 5px;
        background-color: white;
        color: black;
        font-weight: 600;
        margin: 50px auto;
        background-color: white;
        background-size: cover;
    }
</style>