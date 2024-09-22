import HomeIcon from "../../assets/icons/HomeIcon";
import LoginBaleLogo from "../../assets/icons/LoginBaleLogo";
import TextInputWithLabel from '../../components/InputText/InputTextWithLabel';
import Kafshdoozak from '../../assets/icons/Kafshdoozak.png'
import styles from './SigeUpMobile.module.scss'
import { SignUpProps } from "./SignUpPage";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import KafshdoozakDark from '../../assets/icons/Kafshdoozak-dark.png'

const SignUpMobile = ({ email, name, password, repeatPass, handleSignUp, setEmail, setName, setPassword, setRepeatPass, error, auth }: SignUpProps) => {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const successfulSignUp = useSelector((state: any) => state.auth.successfulSignUp)
  useEffect(() => {
    if (successfulSignUp === true) {
      navigate('/login')
    }
  }, [successfulSignUp])


  return (
    <div className={styles.signUpPage} >
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
            placeholder="...ایمیل خود را وارد کنید"
            inputClassName={styles.emailInput}
            labelClassName={styles.customLabel}
            wrapperClassName={styles.inputWrapper}
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />
          <TextInputWithLabel
            label='نام'
            placeholder="...نام خود را وارد کنید"
            inputClassName={styles.nameInput}
            labelClassName={styles.customLabel}
            wrapperClassName={styles.inputWrapper}
            onChange={(e: any) => setName(e.target.value)}
            value={name}
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
          <TextInputWithLabel
            label='تکرار رمز عبور'
            placeholder="...رمز عبور خود را دوباره وارد کنید"
            inputClassName={styles.repeatPasswordInput}
            labelClassName={styles.customLabel}
            wrapperClassName={styles.inputWrapper}
            onChange={(e: any) => setRepeatPass(e.target.value)}
            value={repeatPass}
            type={"password"}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {auth.error && <div className={styles.error}>{auth.error}</div>}
        <button
          disabled={auth.loading}
          onClick={handleSignUp}
          className={styles.login}>ثبت نام</button>
        <button onClick={() => navigate('/login')} className={styles.signUp}>وارد شوید</button>
      </form>
      <div className={styles.baleLogo} >
        <LoginBaleLogo width={53} height={21} fill="var(--bale-icon-fill)" />
      </div>
    </div >
  )
}

export default SignUpMobile;