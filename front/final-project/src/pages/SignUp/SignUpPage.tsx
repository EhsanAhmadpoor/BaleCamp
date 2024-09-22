import SignUp from "./SignUp";
import SignUpMobile from "./SignUpMobile";
import useWindowSize from "../../hooks/useWindowSize";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { signUpRequest } from "../../redux/slices/authSlice";

export interface SignUpProps {
  handleSignUp: (e: any) => void,
  setEmail: (e: any) => void,
  setName: (e: any) => void,
  setPassword: (e: any) => void,
  setRepeatPass: (e: any) => void,
  error: string | null,
  auth: any,
  email :string,
  name: string,
  password: string,
  repeatPass : string,
}

const SignUpPage = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [passwordRepeat, setRepeatPass] = useState("")
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowSize()

  const handleSignUp = (e: any) => {
    e.preventDefault()
    if (!email || !password || !name || !passwordRepeat) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    if (password !== passwordRepeat) {
      setError("رمز عبور با تکرار آن مطابقت ندارد.");
      return;
    }

    setError(null);
    dispatch(signUpRequest({ name, email, password }))
  }



  return width > 768 ? <SignUp email={email} name={name} password={password} repeatPass={passwordRepeat} auth={auth} handleSignUp={handleSignUp} error={error} setEmail={setEmail} setName={setName} setPassword={setPassword} setRepeatPass={setRepeatPass} />
    :
    <SignUpMobile  email={email} name={name} password={password} repeatPass={passwordRepeat}  auth={auth} handleSignUp={handleSignUp} error={error} setEmail={setEmail} setName={setName} setPassword={setPassword} setRepeatPass={setRepeatPass} />;
}

export default SignUpPage;