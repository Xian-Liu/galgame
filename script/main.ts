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


// 创建一个 Map 用来储存下面的键值对
const data = new Map<string, Dialog>();

const NewDialog = (id, content, nextId, type, branches) => {
    let a = new Dialog();
    a.id = id
    a.content = content
    a.nextId =nextId
    a.type = type
    a.branches = branches
    return a;
}

// 给 Dialog实例的属性赋值
(() => {
    data.set('0', NewDialog('0','hello world0', '1', 'text', null))
    let branches = new Array<GalOption>()
    branches.push(new GalOption("选2",'2'))
    branches.push(new GalOption("选3", '3'))
    data.set('1', NewDialog('1', null, null, 'option', branches))
    data.set('2', NewDialog('2','hello world2', '2', 'text', null))
    data.set('3', NewDialog('3','hello world3', '3', 'text', null))
})();
let btn1 = document.createElement('button')
btn1.setAttribute('class', "btn btn-primary ml-2 mr-2 mt-2 branch")
let btn2 = document.createElement('button')
btn2.setAttribute('class', "btn btn-primary ml-2 mr-2 mt-2 branch")

// 下一步按钮的 DOM 对象
const nextButton = $('#next');
// 对话框的 DOM 对象
const dialog = $("#text");
const conversation=$("#conversation")
//  修改文本框的内容
// 为 nextButton 的 click 事件添加一个监听器

let mut = () => {
    //将下一个 id 传递给 currentDialog
    let currentDialog = data.get(nextDialogId);
    console.log(nextDialogId)
            console.log(currentDialog)
            //如果 other 属性字符串为 yes ,插入button按钮
    switch(currentDialog.type) {
        case "text":
            dialog.text(currentDialog.content)
            nextDialogId = currentDialog.nextId
            break;
        case "option":
            dialog.text("")
            btn1.innerText = currentDialog.branches[0].content
            conversation.prepend(btn1)
            btn1.addEventListener('click', () => {
                console.log("btn1 is clicked")
                nextDialogId = currentDialog.branches[0].nextId
                mut()
                btn1.remove()
            })
            dialog.text("")
            btn2.innerText = currentDialog.branches[1].content
            conversation.prepend(btn2)
            btn2.addEventListener('click', () => {
                console.log("btn2 is clicked")
                nextDialogId = currentDialog.branches[1].nextId
                mut()
                btn2.remove()
            })
            break;
        default:
            console.log("incorrect dialog type")
    }
}

nextButton.click(mut);