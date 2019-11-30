// clickCount 统计点击的次数
let clickCount = 0;
//
let nextDialogId = '0';

// 对话类
class Dialog {
    // 此对话的 id
    id;
    // 对话的内容
    content;
    // 下一条对话的 id
    nextId;
    // 对话的对应立绘
    picture;
}

// 所有的对话数据
// const data=["1","2","3"];


// 创建一个 Map 用来储存下面的键值对
const data = new Map();

// 给 Dialog实例的属性赋值
(() => {
    let a = new Dialog();
    a.id = '0'
    a.content = "hello world 0"
    a.nextId = '3'
    data.set(a.id, a)
    a = new Dialog();
    a.id = '3'
    a.content = "hello world 1"
    a.nextId = '4'
    data.set(a.id, a)
    a = new Dialog();
    a.id = '4'
    a.content = "hello world 2"
    a.nextId = '0'
    data.set(a.id, a)
})();

// 下一步按钮的 DOM 对象
const nextButton = $('#next');
// 对话框的 DOM 对象
const dialog = $("#text");
//  修改文本框的内容
// 为 nextButton 的 click 事件添加一个监听器
nextButton.click((event) => {
    let currentDialog = data.get(nextDialogId);
    dialog.text(currentDialog.content);
    nextDialogId = currentDialog.nextId;
});