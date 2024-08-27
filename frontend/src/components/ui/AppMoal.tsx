import React, { useState } from "react";
import { Button, Modal } from "antd";

interface ModalProps {
  title: string;
  onOk: () => void;
  triggerText: React.ReactNode;
  content: string;
  danger?: boolean;
  disabled?: boolean;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
  titleColor?: string;
}

const AppModal = ({
  title,
  danger = true,
  content,
  triggerText,
  onOk,
  disabled = false,
  okButtonTitle = "Confirm",
  cancelButtonTitle = "Cancel",
  titleColor = "primary",
}: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button danger={danger} onClick={showModal} disabled={disabled}>
        {triggerText}
      </Button>
      <Modal
        title={<h3 style={{ color: titleColor }}>{title}</h3>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okButtonTitle}
        cancelText={cancelButtonTitle}
        okButtonProps={{ danger: danger }}
        centered
      >
        <p>{content}</p>
      </Modal>
    </>
  );
};

export default AppModal;
