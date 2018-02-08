<template>
    <div class="m-header">
        <div class="header-icon"></div>
        <h1 class="header-text">Chicken Music</h1>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
.m-header{
    height: 44px;
    text-align: center;
    color: $color-theme;
    font-size: 0;
    .header-icon{
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
        width: 30px;
        height: 32px;
        margin-right: 9px;
        @include bg-image('logo');
        background-size: 30px 32px;
    }
    .header-text{
        display: inline-block;
        vertical-align: top;
        line-height: 44px;
        font-size: $font-size-large;
    }
}
</style>
