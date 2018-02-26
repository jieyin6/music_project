function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min +1 ) + min)
}

export function shuffle(arr){
    let _arr = arr.slice()
    for(let i = 0; i < _arr.length;i++){
        let j = getRandomInt(0,i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t

    }
    return _arr
}

//截留函数
//调用一个函数，会返回另一个函数，结果在另一个函数里延迟执行某个func函数。
//如果另一个函数反复被调用，func函数只会被调用一次，因为调用时，有个delay时间
//在此时间内再次被调用的话，timer就会被清空。
export function debounce (func,delay){
    let timer
    return function (...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this,args)
        }, delay);
    }
}