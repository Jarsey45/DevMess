export interface UserData {
  username?: string;
  password: string;
  mail: string;
  type: string;
  remember?: boolean;
}

export interface LoginProps {
  handleClick: (data: UserData) => Promise<void>;
  setRegister: () => void;
}