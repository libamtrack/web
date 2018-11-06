export default function readData(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status == 0) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        };
        xhr.open("GET", file, true);
        xhr.send(null);
    });
}