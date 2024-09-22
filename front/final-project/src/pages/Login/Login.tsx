import styles from './Login.module.scss'
import HomeIcon from "../../assets/icons/HomeIcon";
import LoginImage from '../../assets/images/Login.jpg'
import LoginBaleLogo from "../../assets/icons/LoginBaleLogo";
import TextInputWithLabel from '../../components/InputText/InputTextWithLabel';
import Kafshdoozak from '../../assets/icons/Kafshdoozak.png'
import { useNavigate } from 'react-router-dom';
import { LoginProps } from './LoginPage';
import { useTheme } from '../../hooks/useTheme';
import KafshdoozakDark from '../../assets/icons/Kafshdoozak-dark.png'
import { useEffect } from 'react';
import { deleteSuccessfulSignUp } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';


const Login = ({ email, password, handleLogin, setEmail, setPassword, error, auth }: LoginProps) => {
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
      <div className={styles.outerContainer}>
        <div className={styles.homeIcon}>
          <HomeIcon onClick={() => navigate('/issues')} height={24} width={24} fill="var(--home-icon-fill)" />
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.imageContainer}>
            <img className={styles.loginPageImage} src={LoginImage} />
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formContent}>
              <div className={styles.appName}>
                <span>کفشدوزک</span>
                <img className={styles.Kafshdoozak} alt='kafshdoozak' src={`${theme === 'dark' ? KafshdoozakDark : Kafshdoozak}`} />

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
                <button
                  disabled={auth.loading}
                  onClick={handleLogin}
                  className={styles.login}>ورود</button>
                <button onClick={() => { dispatch(deleteSuccessfulSignUp()); navigate('/signup'); }} className={styles.signUp}>ثبت نام کنید</button>
              </form>
            </div>
            <div className={styles.baleLogo} >
              <LoginBaleLogo width={53} height={21} fill="var(--bale-icon-fill)" />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login;