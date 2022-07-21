const Message = ({ open, message }: { open: boolean; message: string }) => {
  return <>{<div className={`message${open ? "" : " hidden"}`}>{message}</div>}</>;
};

export default Message;
