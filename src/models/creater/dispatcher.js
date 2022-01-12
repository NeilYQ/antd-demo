
export default class Dispatcher {

    callbacks = {}
    
    data = {}

    update = namespace => {
        (this.callbacks[namespace] || []).forEach(
            (callback = val => {}) => {
                try{
                    let data = this.data[namespace]
                    callback(data)
                }catch(err){
                    callback(undefined)
                }
            }
        )
    }
};