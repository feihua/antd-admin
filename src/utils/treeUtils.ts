export function tree(data: any, pid = 0, key = 'pid') {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const i in data) {
        if (data[i][key] === pid) {
            const temp = data[i];
            const children = tree(data, data[i].id, key);
            if (children.length) {
                temp.children = children;
            }
            delete temp.parentId
            result.push(temp);
        }
    }

    return result;
}