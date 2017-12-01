<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
    html,body {
        min-width: 800px;
    }
    .componentsRoot {
        min-width: 800px;
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
</style>
