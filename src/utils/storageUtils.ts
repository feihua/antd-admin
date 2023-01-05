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
        localStorage.getItem(USER_TOKEN)
    },
    removeToken() {
        localStorage.removeItem(USER_TOKEN)
    },

    saveUserName(userName: string) {
        localStorage.setItem(USER_Name, userName)
    },
    getUserName(): string {
        return localStorage.getItem(USER_Name) || '一个游客'
    },
    removeUserName() {
        localStorage.removeItem(USER_Name)
    },

    saveBtnMenu(btnMenu: string[]) {
        localStorage.setItem(BTN_MENU, JSON.stringify(btnMenu))
    },
    getBtnMenu(): string {
        let btnMenu = localStorage.getItem(BTN_MENU);
        return btnMenu != null ? JSON.parse(btnMenu) : [];
    },
    removeBtnMenu() {
        localStorage.removeItem(BTN_MENU)
    },

    saveTreeMenu(treeMenu: string[]) {
        localStorage.setItem(TREE_MENU, JSON.stringify(treeMenu))
    },
    getTreeMenu(): string[] {
        let treeMenu = localStorage.getItem(TREE_MENU);
        return treeMenu != null ? JSON.parse(treeMenu) : [];
    },
    removeTreeMenu() {
        localStorage.removeItem(TREE_MENU)
    }
}
