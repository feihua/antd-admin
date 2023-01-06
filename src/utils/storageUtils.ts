const USER_TOKEN = 'token'
const USER_Name = 'name'
const BTN_MENU = 'btnMenu'
const TREE_MENU = 'treeMenu'
/*
包含n 个操作local storage 的工具函数的模块
*/
export const storageUtils = {

    saveToken(token: string) {
        localStorage.setItem(USER_TOKEN, token)
    },
    getToken() {
        return localStorage.getItem(USER_TOKEN)
    },

    saveUserName(userName: string) {
        localStorage.setItem(USER_Name, userName)
    },
    getUserName(): string {
        return localStorage.getItem(USER_Name) || '一个游客'
    },

    saveBtnMenu(btnMenu: string[]) {
        localStorage.setItem(BTN_MENU, JSON.stringify(btnMenu))
    },
    getBtnMenu(): string {
        let btnMenu = localStorage.getItem(BTN_MENU);
        return btnMenu != null ? JSON.parse(btnMenu) : [];
    },


    saveTreeMenu(treeMenu: string[]) {
        localStorage.setItem(TREE_MENU, JSON.stringify(treeMenu))
    },
    getTreeMenu(): string[] {
        let treeMenu = localStorage.getItem(TREE_MENU);
        return treeMenu != null ? JSON.parse(treeMenu) : [];
    },


    logout() {
        localStorage.removeItem(USER_TOKEN)
        localStorage.removeItem(USER_Name)
        localStorage.removeItem(BTN_MENU)
        localStorage.removeItem(TREE_MENU)
    }
}
