import HomeIcon from "../../assets/icons/HomeIcon";
import LoginBaleLogo from "../../assets/icons/LoginBaleLogo";
import TextInputWithLabel from '../../components/InputText/InputTextWithLabel';
import Kafshdoozak from '../../assets/icons/Kafshdoozak.png'
import styles from './LoginMobile.module.scss'
import { LoginProps } from "./LoginPage";
import {  useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useDispatch } from "react-redux";
import KafshdoozakDark from '../../assets/icons/Kafshdoozak-dark.png'
import { deleteSuccessfulSignUp } from "../../redux/slices/authSlice";
import { useEffect } from "react";

const LoginMobile = ({ email, password, handleLogin, setEmail, setPassword, error, auth }: LoginProps) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      navigate('/issues');
    }
  }, [userId, navigate]);

  return (
    <div className={styles.loginPage} >
      <div className={styles.header}>
        <span>کفشدوزک</span>
        <img className={styles.Kafshdoozak} alt='kafshdoozak' src={`${theme === 'dark' ? KafshdoozakDark : Kafshdoozak}`} />
        <div className={styles.homeIcon}>
          <HomeIcon onClick={() => navigate('/issues')} height={24} width={24} fill="var(--home-icon-fill)" />
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.inputs}>
          <TextInputWithLabel
            label='ایمیل'
            placeholder="test@gmail.com"
            inputClassName={styles.emailInput}
            labelClassName={styles.customLabel}
            wrapperClassName={styles.inputWrapper}
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}

          />
          <TextInputWithLabel
            label='رمز عبور'
            placeholder="...رمز عبور خود را وارد کنید"
            inputClassName={styles.passwordInput}
            labelClassName={styles.customLabel}
            wrapperClassName={styles.inputWrapper}
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            type={"password"}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {auth.error && <div className={styles.error}>{auth.error}</div>}
        <button disabled={auth.loading}
          onClick={handleLogin}
          className={styles.login}>ورود</button>
        <button onClick={() => { dispatch(deleteSuccessfulSignUp()); navigate('/signup'); }} className={styles.signUp}>ثبت نام کنید</button>
      </form>
      <div className={styles.baleLogo} >
        <LoginBaleLogo width={53} height={21} fill="var(--bale-icon-fill)" />
      </div>
    </div >
  )
}

export default LoginMobile;