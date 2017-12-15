const body = document.getElementsByTagName('body')[0];

    // 提示弹框
export function alertTip([text, duration = 2000]) {
    let ele = document.createElement('div');

    // 添加提示
    ele.innerHTML = text;
    ele.classList.add('alert-tip');
    body.appendChild(ele);

    // 渐隐动画
    let timer1 = setTimeout(() => {
        ele.style.opacity = 0;
        clearTimeout(timer1);
    }, duration - 200);

    // 移除
    let timer2 = setTimeout(() => {
        body.removeChild(ele);
        clearTimeout(timer2);
    }, duration);
}

export let test = {
    name: 'luo',
    age: 20
}

    // // 全屏加载Loading
    // fullLoading() {
    //     let ele = document.createElement('div');
        
    //     // 添加Loading
    //     ele.innerHTML = text;
    //     ele.classList.add('loading-tip');
    //     body.appendChild(ele);

    //     // 渐隐动画
    //     let timer1 = setTimeout(() => {
    //         ele.style.opacity = 0;
    //         clearTimeout(timer1);
    //     }, time - 200);

    //     // 移除
    //     let timer2 = setTimeout(() => {
    //         body.removeChild(ele);
    //         clearTimeout(timer2);
    //     }, time);
    // }
