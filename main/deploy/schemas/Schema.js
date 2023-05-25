import uniqid from 'uniqid'
export default class Schema {
    constructor() {
        this.id = uniqid()
        this.createAt = Date.now()
    }
    upTime() {
        return Date.now() - this.createAt
    }
}
