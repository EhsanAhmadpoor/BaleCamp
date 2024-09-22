import Login from "./Login";
import LoginMobile from "./LoginMobile";
import useWindowSize from "../../hooks/useWindowSize";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { loginRequest } from "../../redux/slices/authSlice";


export interface LoginProps {
  handleLogin: (e: any) => void,
  setEmail: (e: any) => void,
  setPassword: (e: any) => void,
  error: string | null,
  auth: any,
  email: string,
  password: string,
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: any) => {
    e.preventDefault()
    if (!email || !password) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    setError(null);
    dispatch(loginRequest({ email, password }))
  }
  const { width } = useWindowSize()

  return width > 768 ? <Login email={email} password={password} handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} auth={auth} error={error} />
    :
    <LoginMobile email={email} password={password} handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} auth={auth} error={error} />;
}

export default LoginPage;