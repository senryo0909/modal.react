import React from "react";

type IProps = {
  open?: boolean;
  data: {
    name: string;
    old?: number;
    tel?: string;
    mail: string;
    address: string;
    open?: boolean;
  };
  close?: boolean;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export default function Modal({
  data,
  handleCancel,
  handleSubmit,
  open,
  close,
}: IProps) {
  return open ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#4e4e4ebb",
        position: "relative",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: "50vw",
          top: "50vh",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          style={{
            height: "20px",
            background: "#ccc",
          }}
        >
          header
          {close && <span>x</span>}
        </div>
        <div
          style={{
            padding: "0 1rem",
          }}
        >
          <div>
            <span>Name:</span>
            {data.name}
          </div>
          <div>
            <span>Old:</span>
            {data.old}
          </div>
          <div>
            <span>tel:</span>
            {data.tel}
          </div>
          <div>
            <span>mail</span>
            {data.mail}
          </div>
          <div>
            <span>address</span>
            {data.address}
          </div>
        </div>
        <div
          style={{
            margin: "1rem",
            textAlign: "right",
          }}
        >
          <button
            style={{
              marginLeft: 8,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCancel(e);
            }}
          >
            Cancel
          </button>
          <button
            style={{
              marginLeft: 8,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
