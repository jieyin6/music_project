<template>
<div class="search-wrapper">
    <input type="text" v-model="input" v-on:input="search"> 
    <ul v-show="lists.length">
        <li v-for="(list,index) in lists" :key="index">
            <span>{{list}}</span>
        </li>
    </ul>
</div>
</template>

<script>
import {getRecommend} from 'api/baidu'
import {ERR_OK} from 'api/config'
export default {
    data(){
        return{
            input:'',
            lists:[]
        }
    },
    methods:{
        search(){
            let _this =this
            window.baidu={}
            window.baidu.sug=function(val){
                JSON.stringify(val);
                console.log(val.s)
                _this.lists = val.s
                console.log(this.lists)
            }
            getRecommend(_this.input)
        }
    }
}
</script>

<style>
span{
    font-size: 16px;
    color: aqua
}
</style>
