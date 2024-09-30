document.getElementById('addButton').addEventListener('click', function() {
    // 显示模态框
    document.getElementById('myModal').style.display = 'block';
});

const modal = document.getElementById('myModal');

document.addEventListener('click', function(event) {
    if(event.button != 0) {
        return;
    }
    const clickElement = event.target;
    if(!modal.contains(clickElement) && clickElement.id !== 'addButton') {
        modal.style.display = 'none';
    }
    clickElement.style.zIndex = 1000;
})

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function() {
    var cName = document.getElementById('nameInput').value || 'new-Div';
    var color = document.getElementById('colorInput').value || 'lightblue'; // 默认颜色
    var dHeight = document.getElementById('heightInput').value || '100px';
    var dWidth = document.getElementById('widthInput').value || '100px';
    var newDiv = document.createElement('div');
    newDiv.className = cName+'-draggable';
    newDiv.style.backgroundColor = color;
    newDiv.style.width = dWidth;
    newDiv.style.height = dHeight;
    newDiv.style.draggable = true;
    newDiv.style.position = 'absolute';
    newDiv.style.top = '0px';
    newDiv.style.left = '0px';
    newDiv.style.zIndex = 1000; 
    document.body.appendChild(newDiv);


});

let currentZIndex = 1;

document.addEventListener('mousedown', function(event) {
    const newDiv = event.target;
    // console.log(newDiv.className);

    if (newDiv.className.includes('draggable')) { // 确保只对可拖拽的 div 生效
        newDiv.style.zIndex = currentZIndex++;

        // console.log(newDiv.className+'-'+newDiv.style.zIndex);
        
        let shiftX = event.clientX - newDiv.getBoundingClientRect().left;
        let shiftY = event.clientY - newDiv.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            // 计算新的位置
            let newLeft = pageX - shiftX;
            let newTop = pageY - shiftY;

            // 获取窗口尺寸
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // 获取元素的宽度和高度
            const divWidth = newDiv.offsetWidth;
            const divHeight = newDiv.offsetHeight;

            // 限制新的左侧坐标不超出屏幕
            if (newLeft < 0) {
                newLeft = 0; // 左边界
            } else if (newLeft + divWidth > windowWidth) {
                newLeft = windowWidth - divWidth; // 右边界
            }

            // 限制新的顶部坐标不超出屏幕
            if (newTop < 0) {
                newTop = 0; // 上边界
            } else if (newTop + divHeight > windowHeight) {
                newTop = windowHeight - divHeight; // 下边界
            }

            // 设置新的位置
            newDiv.style.left = newLeft + 'px';
            newDiv.style.top = newTop + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // 移动时
        document.addEventListener('mousemove', onMouseMove);

        // 释放鼠标时
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp); // 确保解绑

            // 记录位置和尺寸
            const position = {
                left: newDiv.style.left,
                top: newDiv.style.top,
                width: newDiv.style.width,
                height: newDiv.style.height,
            };
            // console.log(position);
        }

        document.addEventListener('mouseup', onMouseUp);
    }
});

var divBoxList = [] 


document.addEventListener('DOMContentLoaded', function() {

    for (const divBox of divBoxList) {
        var newDiv = document.createElement('div');
        newDiv.className = divBox.className+'-draggable';
        newDiv.style.backgroundColor = divBox.color;
        newDiv.style.width = divBox.width;
        newDiv.style.height = divBox.height;
        newDiv.draggable = true;
        newDiv.style.position = 'absolute';
        newDiv.style.top = divBox.top;
        newDiv.style.left = divBox.left;
        document.body.appendChild(newDiv);
    }
});


// 禁用右键菜单
document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // 阻止默认的右键菜单
});

document.addEventListener('mousedown', function(event) {
    if(event.button != 2) {
        return;
    }
    const clickElement = event.target;
    const child = clickElement.firstElementChild;
    if(null != child) {
        return;
    }

    // 插入新的段落并使其居中
    const newElement = document.createElement('button');
    newElement.textContent = '删除';
    newElement.style.margin = '0'; // 去掉段落的默认外边距
    newElement.style.position = 'absolute'; // 使用绝对定位
    newElement.style.top = '50%'; // 垂直居中
    newElement.style.left = '50%'; // 水平居中
    newElement.style.transform = 'translate(-50%, -50%)'; // 调整位置以实现居中
    newElement.className = clickElement.className+"-remove";
    newElement.style.border = '1px solid';
    newElement.style.borderRadius = '20px';
    newElement.style.width = '60px';
    newElement.style.height = '30px';
    newElement.style.backgroundColor = '#fea443';

    clickElement.appendChild(newElement);
})

document.addEventListener('mousedown', function(event) {
    if(event.button != 0) {
        return;
    }
    const removeElement = event.target;
    var removeElementCname = removeElement.className;
    console.log(removeElementCname);
    if(removeElementCname.includes('remove')) {
        const parentElement = removeElement.parentNode;
        if(parentElement) {
            parentElement.remove();
        }
    }
})