import React from 'react';

// toast
import {ToastContainer} from 'react-toastify';

// toast css
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  return (
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        />
  )
}

export default Toast;