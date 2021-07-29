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

export interface MetroOptions {
  type: ("friend" | "team" | "dashboard" | "settings" | "coffee"), //friend, group
  key: (number | null), // 
  data?: ChatData;
}
export interface MetroViewProps {
  friends: Array<{
    name: string;
    uid: string;
  }>,
  teams: Array<{
    name: string,
    tid: string
  }>,
  makeMenuItem: (object: MetroOptions) => any;
  optionComponent: JSX.Element
}

//METRO OPTIONS COMPONENT INFTERFACES
export interface DashboardViewProps {

}

export interface CoffeeViewProps {

}

export interface MessageProps {
  content: string;
  side: 'left' | 'right';
}

export interface ChatData {
  _id: string | null;
  _name: string | null;
}


//YET TO CONFIGURE
export interface AlertProps {
  title?: string;
  message?: string
  handleOk: () => void;
  handleCancel?: () => void;
  //...
}



export interface MessageInterface {
  _name: string;
  content: string;
  deleted: boolean;
  timestamp: any;
  _uid: string;
  _messageId?: string;
}