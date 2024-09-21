document.getElementById('addButton').addEventListener('click', function() {
    // 显示模态框
    document.getElementById('myModal').style.display = 'block';
});

const modal = document.getElementById('myModal');

document.addEventListener('click', function(event) {
    const clickElement = event.target;
    if(!modal.contains(clickElement) && clickElement.id !== 'addButton') {
        modal.style.display = 'none';
    }
    clickElement.style.zIndex = 1000;
})

document.getElementById('submitButton').addEventListener('click', function() {
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
    document.body.appendChild(newDiv);
});


let currentZIndex = 1;

document.addEventListener('mousedown', function(event) {
    const newDiv = event.target;
    console.log(newDiv.className);

    if (newDiv.className.includes('draggable')) { // 确保只对可拖拽的 div 生效
        newDiv.style.zIndex = currentZIndex++;

        console.log(newDiv.className+'-'+newDiv.style.zIndex);
        
        let shiftX = event.clientX - newDiv.getBoundingClientRect().left;
        let shiftY = event.clientY - newDiv.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            newDiv.style.left = pageX - shiftX + 'px';
            newDiv.style.top = pageY - shiftY + 'px';
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
            console.log(position);
        }

        document.addEventListener('mouseup', onMouseUp);
    }
});

var divBoxList = [
    {
        width: '100px',
        height: '100px',
        color: 'red',
        className: 'box1',
        top: '253px',
        left: '493px'
    },
    {
        width: '100px',
        height: '100px',
        color: 'black',
        className: 'box2',
        top: '153px',
        left: '493px'
    }
] 


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
