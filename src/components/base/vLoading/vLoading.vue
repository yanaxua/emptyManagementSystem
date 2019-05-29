<template>
    <div class='loading-dialog' v-show='show'>
        <div class="bg">
            <span>加载中</span>
            <div class="animated">
                <div v-for="item in [1,2,3,4,5,6,7,8]" :key="item" :style="style"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vLoading',
        data() {
            return {
                target: '',
                show: false,
                style: {
                    backgroundColor: '#619ef7',
                    opacity: 0.1
                }
            }
                ;
        }
    };
</script>

<style scoped>
    .loading-dialog {
        background-color: hsla(0,0%,100%,.9);
        position: absolute;
        z-index: 999;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bg {
        min-width: 200px;
        min-height: 200px;
        height: 200px;
        width: 200px;
        font-size: 24px;
        border-radius: 4px;
        /*background :rgba(255,255,255,0.8);*/
        color: #fff;
        position: relative;
    }

    .bg > span {
        font-size: 13px;
        font-weight: bold;
        color: #619ef7;
        position: absolute;
        left: 27px;
        top: 20%;
    }

    .animated {
        width: 80px;
        height: 80px;
        /*animation: round 0.5s linear infinite;*/
        position: relative;
    }

    @keyframes round {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes changeBg {
        0% {
            background-color: #619ef7;
            opacity: 1;
        }
        12.5% {
            background-color: #619ef7;
            opacity: 0.8;
        }
        25% {
            background-color: #619ef7;
            opacity: 0.6;
        }
        37.5% {
            background-color: #619ef7;
            opacity: 0.4;
        }
        50% {
            background-color: #619ef7;
            opacity: 0.2;
        }
        62.5% {
            background-color: #619ef7;
            opacity: 0.1;
        }
        75% {
            background-color: #619ef7;
            opacity: 0.1;
        }
        87.5% {
            background-color: #619ef7;
            opacity: 0.1;
        }
        100% {
            background-color: #619ef7;
            opacity: 0.1;
        }
    }

    .animated > div {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        /*transition: 0.0.5s all;*/
        position: absolute;
    }

    .animated > div:nth-of-type(1) {
        left: 40px;
        top: 0px;
        animation: changeBg 0.5s linear 0s infinite;
    }

    .animated > div:nth-of-type(2) {
        left: 68.3px;
        top: 11.7px;
        animation: changeBg 0.5s linear 0.0625s infinite;
    }

    .animated > div:nth-of-type(3) {
        left: 80px;
        top: 40px;
        animation: changeBg 0.5s linear 0.125s infinite;
    }

    .animated > div:nth-of-type(4) {
        animation: changeBg 0.5s linear 0.1875s infinite;
        left: 68.3px;
        top: 68.3px;
    }

    .animated > div:nth-of-type(5) {
        animation: changeBg 0.5s linear 0.25s infinite;
        left: 40px;
        top: 80px;
    }

    .animated > div:nth-of-type(6) {
        animation: changeBg 0.5s linear 0.3125s infinite;
        left: 11.7px;
        top: 68.3px;
    }

    .animated > div:nth-of-type(7) {
        animation: changeBg 0.5s linear 0.375s infinite;
        left: 0px;
        top: 40px;
    }

    .animated > div:nth-of-type(8) {
        animation: changeBg 0.5s linear 0.4125s infinite;
        left: 11.7px;
        top: 11.7px;
    }
</style>