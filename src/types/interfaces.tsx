//SELF-EXPLENATORY XD
export interface UserData {
  username?: string;
  password: string;
  mail: string;
  type: string;
  remember?: boolean;
}

//LOGIN/SIGNUP VIEWS PROPS
export interface LoginProps {
  size: { WindowHeight: number, WindowWidth: number }
  handleClick: (data: UserData) => Promise<void>;
  setRegister: () => void;
}

export interface MetroProps {

}

//TO CONFIGURE
export interface AlertProps {
  title?: string;
  message?: string
  handleOk: () => void;
  handleCancel?: () => void;
  //...
}