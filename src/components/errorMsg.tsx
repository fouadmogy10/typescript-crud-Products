interface IProps {
    msg: string | undefined;
  }
  
  const ErrorMessage = ({ msg }: IProps) => {
    return msg ? <span className="block text-red-700 font-semibold text-sm">{msg}</span> : null;
  };
  
  export default ErrorMessage;