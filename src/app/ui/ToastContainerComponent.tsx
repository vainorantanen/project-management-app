"use client"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"; // Import react-toastify


export default function ToastContainerComponent() {

    return (
        <ToastContainer
        position="top-right"
        autoClose={5000} // Adjust as needed
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    )
}