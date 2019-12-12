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
    // type: 
    // "text" 对话
    // "option" 选项
    type:string;
    // 分支对应的下一个DIALOG ID
    branches:Array<GalOption>;
}

class GalOption {
    constructor(content, nextId) {
        this.content = content
        this.nextId = nextId
    }
    // 选项的文字
    content: string;
    // 选项对应的下一个 id
    nextId: string;
}

// 所有的对话数据
// const data=["1","2","3"];


// 创建一个 Map 用来储存下面的键值对
const data = new Map<string, Dialog>();

// 给 Dialog实例的属性赋值
(() => {
    let a = new Dialog();
    a.id = '0'
    a.content = "hello world 0"
    a.nextId = '1'
    a.type = "text"
    data.set(a.id, a)
    a.id = '1'
    a.type = "option"
    a.branches = new Array<GalOption>()
    a.branches.push(new GalOption("选2",'2'))
    a.branches.push(new GalOption("选3", '3'))
    data.set(a.id, a);
})();

// 下一步按钮的 DOM 对象
const nextButton = $('#next');
// 对话框的 DOM 对象
const dialog = $("#text");
//  修改文本框的内容
// 为 nextButton 的 click 事件添加一个监听器
nextButton.click((event) => {
    //将下一个 id 传递给 currentDialog
    let currentDialog = data.get(nextDialogId);
    //如果 other 属性字符串为 yes ,插入button按钮
    switch(currentDialog.type) {
        case "text":
            dialog.text(currentDialog.content)
            nextDialogId = currentDialog.nextId
            break;
        case "option":
            
            break;
        default:
            console.log("incorrect dialog type")
    }
});
