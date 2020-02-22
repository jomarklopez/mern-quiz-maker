export const shuffleArray = function (arr) {
    var temp, j, n = arr.length;
    while (--n > 0) {
        j = Math.floor(Math.random() * (n + 1));
        temp = arr[j];
        arr[j] = arr[n];
        arr[n] = temp;
    }
    return arr;
};