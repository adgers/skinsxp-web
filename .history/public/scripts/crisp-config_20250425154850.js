window.$crisp = [];
window.CRISP_WEBSITE_ID = '64854b17-ea32-4825-b545-51357071e729';

// 等待 Crisp 加载完成
window.CRISP_READY_TRIGGER = function() {
    // 设置聊天按钮位置
    $crisp.push(["config", "position:reverse", true]);
    $crisp.push(["set", "position:reverse", true]);
    
    // 设置距离底部的距离
    setTimeout(function() {
        var crispButton = document.querySelector('.crisp-client .cc-1m7n');
        if (crispButton) {
            crispButton.style.bottom = '80px';
        }
        
        var crispChat = document.querySelector('.crisp-client .cc-kxkl');
        if (crispChat) {
            crispChat.style.bottom = '80px';
        }
    }, 1000);
}; 