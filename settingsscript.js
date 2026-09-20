document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. THEME TOGGLE LOGIC (Session Storage)
    // ==========================================
    const themeToggle = document.getElementById('theme');
    const savedTheme = sessionStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'dark' && icon) icon.className = 'fas fa-sun';
        
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            sessionStorage.setItem('theme', newTheme);
            
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon moon-icon';
            }
        });
    }

    // ==========================================
    // 2. NOTIFICATION & ACCOUNT DROPDOWN TOGGLES
    // ==========================================
    const notifBtn = document.getElementById('notification');
    const accountBtn = document.getElementById('account');
    const notifBox = document.getElementById('notification-box');
    const accountBox = document.getElementById('account-box');

    function closeAllPanels() {
        if (notifBox) notifBox.classList.remove('active');
        if (accountBox) accountBox.classList.remove('active');
    }
    if (notifBtn && notifBox) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCurrentlyOpen = notifBox.classList.contains('active');
            closeAllPanels();
            if (!isCurrentlyOpen) notifBox.classList.add('active');
        });
    }
    if (accountBtn && accountBox) {
        accountBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCurrentlyOpen = accountBox.classList.contains('active');
            closeAllPanels();
            if (!isCurrentlyOpen) accountBox.classList.add('active');
        });
    }
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-wrapper')) {
            closeAllPanels();
        }
    });

    // ==========================================
    // 3. DYNAMIC NOTIFICATION ENGINE
    // ==========================================
     renderDynamicNotifications();
 });

 // Separate global function so it can run immediately
function renderDynamicNotifications() {
    const notifListContainer = document.getElementById('dynamic-notifications-list');
    if (!notifListContainer) return;

    const lastOrderRaw = localStorage.getItem('lastPlacedOrder');
    notifListContainer.innerHTML = ''; // Clear container completely

    if (lastOrderRaw) {
        try {
            const orderData = JSON.parse(lastOrderRaw);
            
            const orderNotificationItem = document.createElement('li');
            orderNotificationItem.style.padding = "8px 0";
            orderNotificationItem.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
                    <span style="font-weight: 600; color: #10b981;">🎉 Order Placed!</span>
                    <span style="font-size: 0.75rem; font-family: monospace; color: var(--text-main);">ID: ${orderData.orderId}</span>
                    <span style="font-size: 0.75rem; color: var(--text-subtle);">Paid: ${orderData.totalAmount}</span>
                </div>
            `;
            notifListContainer.appendChild(orderNotificationItem);
            return; 
        } catch (error) {
            console.error("Error building notification nodes:", error);
        }
    }

     // Default template rendering if memory data files do not exist yet
    const fallbackItem = document.createElement('li');
    fallbackItem.style.cssText = "font-size: 0.85rem; color: var(--text-subtle); padding: 12px 0; text-align: center; list-style: none;";
    fallbackItem.textContent = "No recent notifications.";
    notifListContainer.appendChild(fallbackItem);
 }

// Automatically update notifications instantly if changes happen between windows or scripts
window.addEventListener('storage', (e) => {
    if (e.key === 'lastPlacedOrder') {
        renderDynamicNotifications();
    }
});
