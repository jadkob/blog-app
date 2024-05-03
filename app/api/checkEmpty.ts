export function checkEmpty(arr: any) {
    for (let el of arr) {
        if (el == "") {
            return true
        }
    }
    return false
}