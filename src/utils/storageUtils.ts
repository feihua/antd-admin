const USER_TOKEN = 'token'
/*
包含n 个操作local storage 的工具函数的模块
*/
export const storageUtils = {

    saveToken(token: string) {
        localStorage.setItem(USER_TOKEN, token)
    },
    removeToken() {
        localStorage.removeItem(USER_TOKEN)
    }

    // saveUser(user) {
    //     // localStroage 只能保存string, 如果传递是对象, 会自动调用对象的toString()并保存
    //     // localStorage.setItem(USER_KEY, JSON.stringify(user)) // 保存的必须是对象的json 串
    //     store.set(USER_KEY, user) // 内部会自动转换成json 再保存
    // },
    //
    // getUser() { // 如果存在, 需要返回的是对象, 如果没有值, 返回{}
    //     // return JSON.parse(localStorage.getItem(USER_KEY) || '{}') // [object, Object]
    //     return store.get(USER_KEY) || {}
    // },
    //
    // removeUser() {
    //     // localStorage.removeItem(USER_KEY)
    //     store.remove(USER_KEY)
    // }
}
