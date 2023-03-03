import LoadingStore from '@/stores/loading'

function handleDescriptor(descriptor, name) {
    return {
        ...descriptor,
        enumerable: false,
        initializer() {
            const { initializer } = descriptor

            return function (){
                LoadingStore.changeModel(name, true)

                const promise = initializer.call(this).apply(this, arguments)
                
                if (typeof promise === 'object' && typeof promise.finally === 'function') {
                    promise.finally(() => {
                        LoadingStore.changeModel(name, false)
                    });
                } else {
                    LoadingStore.changeModel(name, false)
                }
                return promise
            }
        }
    }
}

export default function loading(value) {
    if(value){
        return function (target, prop, descriptor) {
            return handleDescriptor(descriptor, value)
        }
    }
}