// import { extension_settings, getContext, saveSettingsDebounced } from "../../../script.js";
// import { eventSource } from "../../extensions.js";
// 扩展脚本 - 登录功能与界面实现
(function() {
    // 等待jQuery和页面加载完成
    
    // 全局变量用于存储登录状态
    let isLoggedIn = false;
    
    // 等待页面加载完成
    $(document).ready(function() {
        console.log('正在加载登录功能...');
        
        // 延迟执行以确保界面已加载
        setTimeout(function() {
            // 初始化登录按钮
            initLoginButton();
            
            // 每次页面加载时，重置登录状态为未登录
            isLoggedIn = false;
            updateLoginButtonState();
            console.log('页面已加载，登录状态已重置为：未登录');
        }, 2000);
    });
    
    // 从localStorage加载登录状态（这个函数不再使用，保留代码仅供参考）
    function loadLoginState() {
        const savedLoginState = localStorage.getItem('isLoggedIn');
        
        if (savedLoginState === 'true') {
            isLoggedIn = true;
            updateLoginButtonState();
            console.log('已从本地存储恢复登录状态：已登录');
        } else {
            isLoggedIn = false;
            updateLoginButtonState();
            console.log('已从本地存储恢复登录状态：未登录');
        }
    }
    
    // 保存登录状态（这个函数不再使用，保留代码仅供参考）
    function saveLoginState() {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        console.log('登录状态已保存到本地存储');
    }
    
    // 初始化登录按钮
    function initLoginButton() {
        // 创建登录按钮
        const $loginButton = $(`
            <div id="login_button" class="login-button" title="警察系统">
                <i class="fa-solid fa-hard-drive"></i>
                <span>登录系统</span>
            </div>
        `);
        
        // 添加按钮到页面
        $('body').append($loginButton);
        
        // 添加登录按钮点击事件
        $loginButton.on('click', function() {
            console.log('登录按钮被点击，当前登录状态：', isLoggedIn ? '已登录' : '未登录');
            handleLoginButtonClick();
        });
        
        // 导入登录页面和手机界面
        importHtmlContent();
        
        // 添加自定义样式
        addCustomStyles();
        
        console.log('登录功能已添加');
    }
    
    // 处理登录按钮点击
    function handleLoginButtonClick() {
        if (isLoggedIn) {
            // 已登录状态，直接显示手机界面
            console.log('检测到已登录状态，显示手机界面');
            showPhoneInterface();
        } else {
            // 未登录状态，显示登录界面
            console.log('检测到未登录状态，显示登录界面');
            showLoginDialog();
        }
    }
    
    // 显示登录对话框
    function showLoginDialog() {
        // 显示登录对话框
        $('#login_dialog').show();
        console.log('登录对话框已显示');
    }
    
    // 显示手机界面
    function showPhoneInterface() {
        // 检查手机界面元素是否存在
        if ($('#phone_interface').length === 0) {
            console.error('手机界面元素不存在！');
            return;
        }
        
        // 显示手机界面
        $('#phone_interface').css('display', 'block');
        console.log('手机界面已显示');
        
        // 更新手机上的时间和日期
        updatePhoneDateTime();
    }
    
    // 更新手机上的时间和日期
    function updatePhoneDateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        
        // 更新主时间显示
        $('#phone_time').text(`${hours}:${minutes}`);
        $('#phone_date').text(`${year}年${month}月${day}日`);
        
        // 更新状态栏时间
        $('#phone_status_time').text(`${hours}:${minutes}`);
        
        console.log('手机时间已更新为:', `${hours}:${minutes}`);
    }
    
    // 更新登录按钮状态
    function updateLoginButtonState() {
        const $loginButton = $('#login_button');
        
        if (isLoggedIn) {
            $loginButton.addClass('logged-in');
            $loginButton.attr('title', '已登录 - 点击查看手机');
            // 文本内容保持不变但已被CSS隐藏
            console.log('登录按钮状态已更新为：已登录');
        } else {
            $loginButton.removeClass('logged-in');
            $loginButton.attr('title', '警察系统 - 点击登录');
            // 文本内容保持不变但已被CSS隐藏
            console.log('登录按钮状态已更新为：未登录');
        }
    }
    
    // 导入HTML内容
    function importHtmlContent() {
        // 创建登录对话框
        const $loginDialog = $(`
            <!-- Login Modal -->
            <div id="login_dialog" class="login-dialog" style="display: none;">
                <div class="login-dialog-header">
                    <div class="secret-stamp">机密</div>
                    <h3>警用终端系统</h3>
                    <div id="close_login_btn" class="login-close-btn">×</div>
                </div>
                <div class="login-dialog-content">
                    <div class="file-top">
                        <div class="file-label">系统验证 // 档案编号：PSB-138X</div>
                    </div>
                    <div class="login-form">
                        <div class="security-code">PSB-SEC-LEVEL: ALPHA</div>
                        <div class="login-form-group">
                            <label for="username"><i class="fa-solid fa-id-card"></i> 警员编号</label>
                            <input type="text" id="username" name="username" placeholder="输入警员编号" autocomplete="off">
                        </div>
                        <div class="login-form-group">
                            <label for="password"><i class="fa-solid fa-key"></i> 密钥代码</label>
                            <input type="password" id="password" name="password" placeholder="输入密钥代码" autocomplete="off">
                        </div>
                        <div class="login-form-buttons">
                            <button id="login_submit_btn" class="login-submit-btn">
                                <i class="fa-solid fa-unlock-keyhole"></i> 授权访问
                            </button>
                            <button id="login_cancel_btn" class="login-cancel-btn">
                                <i class="fa-solid fa-xmark"></i> 取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `);

        // 创建手机界面
        const $phoneInterface = $(`
            <!-- Phone Interface -->
            <div id="phone_interface" class="phone-container" style="display: none;">
                <div class="notch"></div>
                <div class="status-bar">
                    <div class="status-bar-left">
                        <span class="signal">4G</span>
                        <span id="phone_status_time">12:00</span>
                    </div>
                    <div class="status-bar-right">
                        <span class="battery">85%</span>
                        <div class="battery-icon">
                            <div class="battery-level"></div>
                        </div>
                    </div>
                </div>
                <div class="phone-content">
                    <div class="time" id="phone_time">12:00</div>
                    <div class="date" id="phone_date">2024年3月21日</div>
                    
                    <div class="app-grid">
                        <div class="top-apps">
                            <div class="app-icon" id="map_app">
                                <i class="fa-solid fa-map-location-dot"></i>
                                <div class="star-1">★</div>
                                <div class="star-2">★</div>
                                <div class="star-3">★</div>
                                <span class="app-label">地图追踪</span>
                            </div>
                            <div class="app-icon" id="monitor_app">
                                <i class="fa-solid fa-video"></i>
                                <div class="star-1">★</div>
                                <div class="star-2">★</div>
                                <div class="star-3">★</div>
                                <span class="app-label">嫌疑监控</span>
                            </div>
                            <div class="app-icon" id="counsel_app">
                                <i class="fa-solid fa-brain"></i>
                                <div class="star-1">★</div>
                                <div class="star-2">★</div>
                                <div class="star-3">★</div>
                                <span class="app-label">心理咨询</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="wallpaper-btn">
                        <i class="fa-solid fa-image"></i>
                    </div>
                    
                    <div class="phone-close-btn" id="phone_close_btn">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div> 
        `);
        
        // 添加登录对话框到页面
        $('body').append($loginDialog);
        console.log('登录对话框已添加到页面');
        
        // 添加手机界面到页面
        $('body').append($phoneInterface);
        console.log('手机界面已添加到页面');
        
        // CSS由manifest.json自动加载
        
        // 初始化登录对话框事件
        initLoginDialogEvents();
        
        // 初始化手机界面事件
        initPhoneInterfaceEvents();
    }
    
    // 初始化登录对话框事件
    function initLoginDialogEvents() {
        // 绑定登录表单提交事件
        $('#login_submit_btn').on('click', function() {
            const username = $('#username').val();
            const password = $('#password').val();
            
            // 检查输入是否为空
            if (!username || !password) {
                // 显示错误提示
                const errorToast = $(`<div class="auth-toast error"><i class="fa-solid fa-triangle-exclamation"></i> 授权失败 - 请输入警员编号和密钥代码</div>`);
                $('body').append(errorToast);
                
                setTimeout(function() {
                    errorToast.fadeOut(300, function() {
                        $(this).remove();
                    });
                }, 3000);
                return;
            }
            
            console.log('尝试登录，用户名:', username);
            
            // 添加验证进度条
            const $progressOverlay = $(`
                <div class="auth-progress-overlay">
                    <div class="auth-progress-container">
                        <div class="auth-progress-status">身份验证中...</div>
                        <div class="auth-progress-bar">
                            <div class="auth-progress-fill"></div>
                        </div>
                        <div class="auth-progress-info">正在连接数据库服务器</div>
                    </div>
                </div>
            `);
            
            $('body').append($progressOverlay);
            const $progressFill = $('.auth-progress-fill');
            const $progressInfo = $('.auth-progress-info');
            
            // 模拟验证过程
            $progressFill.width('0%');
            
            setTimeout(function() {
                $progressFill.width('35%');
                $progressInfo.text('验证警员编号有效性');
            }, 800);
            
            setTimeout(function() {
                $progressFill.width('65%');
                $progressInfo.text('核对密钥代码');
            }, 1600);
            
            setTimeout(function() {
                $progressFill.width('85%');
                $progressInfo.text('获取授权等级');
            }, 2400);
            
            setTimeout(function() {
                $progressFill.width('100%');
                $progressInfo.text('授权完成');
                
                // 移除进度条
                setTimeout(function() {
                    $progressOverlay.fadeOut(300, function() {
                        $(this).remove();
                    });
                    
                    // 验证用户名和密码
                    if (username === 'Fangshu' && password === 'FS123') {
                        // 登录成功
                        isLoggedIn = true;
                        
                        // 显示成功提示
                        const successToast = $(`<div class="auth-toast success"><i class="fa-solid fa-check-circle"></i> 授权成功 - 欢迎回来，${username}警官，希望你还活着。</div>`);
                        $('body').append(successToast);
                        
                        setTimeout(function() {
                            successToast.fadeOut(300, function() {
                                $(this).remove();
                            });
                        }, 3000);
                        
                        // 隐藏登录对话框并显示手机界面
                        $('#login_dialog').hide();
                        showPhoneInterface();
                        
                        // 更新登录按钮状态
                        updateLoginButtonState();
                    } else {
                        // 登录失败
                        const errorToast = $(`<div class="auth-toast error"><i class="fa-solid fa-triangle-exclamation"></i> 授权失败 - 警员编号或密钥代码错误</div>`);
                        $('body').append(errorToast);
                        
                        // 震动输入框
                        $('#username, #password').addClass('auth-error');
                        setTimeout(function() {
                            $('#username, #password').removeClass('auth-error');
                        }, 800);
                        
                        setTimeout(function() {
                            errorToast.fadeOut(300, function() {
                                $(this).remove();
                            });
                        }, 3000);
                    }
                }, 800);
            }, 3000);
        });
        
        // 绑定取消按钮事件
        $('#login_cancel_btn').on('click', function() {
            $('#login_dialog').hide();
            console.log('登录对话框已通过取消按钮关闭');
        });
        
        // 绑定关闭按钮事件
        $('#close_login_btn').on('click', function() {
            $('#login_dialog').hide();
            console.log('登录对话框已通过关闭按钮关闭');
        });
    }
    
    // 初始化手机界面事件
    function initPhoneInterfaceEvents() {
        // 壁纸列表
        const wallpapers = [
            { type: 'color', value: '#000000', name: '纯黑' },
            { type: 'color', value: '#191970', name: '深蓝' },
            { type: 'color', value: '#301934', name: '深紫' },
            { type: 'image', value: 'https://pub-07f3e1b810bb45079240dae84aaadd3e.r2.dev/profile/user壁纸.jpg', name: '默认图片' },
            { type: 'image', value: 'https://pub-07f3e1b810bb45079240dae84aaadd3e.r2.dev/profile/phone%20background.jpg', name: '夜空' },
            { type: 'gradient', value: 'linear-gradient(45deg, #000000, #333333)', name: '灰黑渐变' },
            { type: 'gradient', value: 'linear-gradient(to bottom, #000000, #0f3460)', name: '蓝黑渐变' }
        ];
        
        // 当前壁纸索引
        let currentWallpaperIndex = 0;
        
        // 绑定壁纸按钮事件
        $('.wallpaper-btn').on('click', function() {
            // 循环切换壁纸
            currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
            const wallpaper = wallpapers[currentWallpaperIndex];
            
            // 应用壁纸
            applyWallpaper(wallpaper);
            
            // 显示提示
            const toast = $(`<div class="wallpaper-toast">壁纸已切换: ${wallpaper.name}</div>`);
            $('body').append(toast);
            
            // 2秒后移除提示
            setTimeout(function() {
                toast.fadeOut(300, function() {
                    $(this).remove();
                });
            }, 2000);
        });
        
        // 应用壁纸函数
        function applyWallpaper(wallpaper) {
            const $phoneContent = $('.phone-content');
            
            // 根据壁纸类型应用不同的样式
            if (wallpaper.type === 'color') {
                $phoneContent.css({
                    'background-image': 'none',
                    'background-color': wallpaper.value
                });
            } else if (wallpaper.type === 'image') {
                $phoneContent.css({
                    'background-image': `url('${wallpaper.value}')`,
                    'background-color': 'transparent'
                });
            } else if (wallpaper.type === 'gradient') {
                $phoneContent.css({
                    'background-image': wallpaper.value,
                    'background-color': 'transparent'
                });
            }
            
            console.log(`壁纸已切换为: ${wallpaper.name}`);
        }
        
        // 绑定关闭按钮事件
        $('#phone_close_btn').on('click', function() {
            $('#phone_interface').hide();
            console.log('手机界面已关闭');
        });
        
        // 更新手机上的时间和日期
        updatePhoneDateTime();
        
        // 设置定时更新时间（每分钟更新一次）
        setInterval(updatePhoneDateTime, 60000);
        
        // 添加各个应用图标点击事件
        $('#map_app').on('click', function() {
            alert('地图追踪应用启动中...');
        });
        
        $('#monitor_app').on('click', function() {
            alert('嫌疑监控应用启动中...');
        });
        
        $('#counsel_app').on('click', function() {
            alert('心理咨询应用启动中...');
        });
    }
    
    // 添加自定义样式
    function addCustomStyles() {
        const customCSS = `
            /* 登录按钮样式 - 已在style.css中定义，这里仅保留兼容样式 */
            .login-button {
                position: fixed;
                right: 20px;
                bottom: 20px;
                z-index: 1000;
            }
            
            /* 手机界面的样式补充 - 已在style.css中定义，这里留空 */
        `;
        
        // 添加样式到页面
        $('head').append(`<style>${customCSS}</style>`);
        console.log('自定义样式已添加');
    }
})();
