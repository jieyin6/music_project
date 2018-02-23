export default class Singer{
    constructor({id,name,idNum}){
        this.id = id
        this.name = name
        this.idNum = idNum
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}