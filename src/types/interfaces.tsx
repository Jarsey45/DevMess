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
export interface MetroViewProps {
  friends: Array<{
    name: string;
    uid: string;
  }>,
  teams: Array<{
    name: string,
    tid: string
  }>
}

//YET TO CONFIGURE
export interface AlertProps {
  title?: string;
  message?: string
  handleOk: () => void;
  handleCancel?: () => void;
  //...
}