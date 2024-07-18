import React from "react";

export default function Modal() {
    const openModal = () =>{
        document.getElementById('parent-modal')?.classList.remove('hidden');
        document.getElementById('modal')?.classList.remove('hidden')
        }
        const closeModal = () =>{
            document.getElementById('parent-modal')?.classList.add('hidden');
            document.getElementById('modal')?.classList.add('hidden')
            }
  return (
    <>
      <div id="parent-modal" className="w-[130rem] h-[130rem] z-50 bg-black/40 fixed inset-0" onClick={closeModal}></div>
      <div id="modal" className=" rounded-lg z-50 bg-white fixed inset-5 max-w-[37.5rem]   mx-auto" onClick={openModal}></div>
    </>
  );
}
