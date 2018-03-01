<template>
 <div class="search-list" v-show="searchlist.length">
     <transition-group name='list' tag="ul">
         <li class="search-item" @click="selectItem(item)" v-for="(item,index) in searchlist" :key="index">
             <span class="text">{{item}}</span>
             <span class="icon" @click.stop="deleteItem(item)">
                 <i class="icon-delete"></i>
             </span>
         </li>
     </transition-group>
 </div>
</template>

<script>
export default {
    props:{
        searchlist:{
            type:Array,
            default:[]
        }
    },
    methods:{
        selectItem(item){
            this.$emit('select',item)
        },
        deleteItem(item){
            this.$emit('delete',item)
        }
    }

}
</script>

<style lang='scss'>
@import '~common/scss/variable';
@import '~common/scss/mixin';
.search-list{
    .search-item{
        display: flex;
        align-items: center;
        height: 40px;
        .text{
            flex: 1;
            color: $color-text-l
        }
        .icon{
            @include extend-click();
            .icon-delete{
                font-size:$font-size-small;
                color: $color-text-d
            }
        }
    }
}
.list-enter-active,.list-leave-active{
    transition: all 0.1s;
}
.list-enter,.list-leave-to{
    .search-item{
        height: 0
    }
}

</style>
