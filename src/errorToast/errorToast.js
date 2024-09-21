export const errorToast = (msg) => {
    let toastHtml = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header bg-danger">
    <strong class="me-auto">Error</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">   

    ${msg}.
  </div>   

</div>`;
  
    let toastContainer = document.querySelector(".toast-container");
    toastContainer.innerHTML += toastHtml;
  
    let toast = document.querySelector(".toast");
    const toastBootstrap = new bootstrap.Toast(toast);
    toastBootstrap.show();
  };
  