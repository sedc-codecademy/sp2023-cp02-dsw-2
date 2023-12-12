
const showNotification = (message) => {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 1500);
  }

  export{showNotification}