export function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `alert alert-${type} shadow-lg`;
  toast.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}
