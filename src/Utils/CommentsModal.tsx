import React, { ReactNode, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { DefaultInput, DefaultTextArea } from "./fieilds";
//
const DefaultModal: React.FC<{
  children: ReactNode;
  id: string;
  isOpen?: boolean;
  handleIsOpen?: (isOpen: boolean) => void;
  modalBoxClasses?: string;
}> = ({ children, id, isOpen, handleIsOpen, modalBoxClasses }) => {
  return (
    <>
      <input
        checked={isOpen}
        onChange={(e) => handleIsOpen && handleIsOpen(e.target.checked)}
        type="checkbox"
        id={id}
        className="modal-toggle"
      />
      <dialog className="md:modal modal md:bg-[#0000004d] bg-white overflow-y-auto shadow-none">
        <div
          className={`modal-box md:w-max w-full md:h-max h-full bg-white md:mb-0 px-4 rounded-xl shadow-none ${modalBoxClasses}`}
        >
          {children}
        </div>
        <label className="modal-backdrop" htmlFor={id}></label>
      </dialog>
    </>
  );
};
//delete modal
export const DeleteModal: React.FC<{
  title: string;
  message: string;
  onSubmit: () => void;
  handleIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}> = ({ title, message, onSubmit, isOpen, handleIsOpen }) => {
  //generate random id
  const id: string = Math.random().toString(36).substr(2, 9);
  return (
    <DefaultModal id={id} isOpen={isOpen} handleIsOpen={handleIsOpen}>
      <div className="modal-header">
        <div className="flex flex-1">
          <h2 className="text-lg font-bold text-[#DE0046]">{title}</h2>
        </div>
      </div>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-footer mt-8">
        <button className="btn btn-error text-white" onClick={onSubmit}>
          بله
        </button>
        <label htmlFor={id} className="btn btn-ghost">
          خیر
        </label>
      </div>
    </DefaultModal>
  );
};

export default DefaultModal;
