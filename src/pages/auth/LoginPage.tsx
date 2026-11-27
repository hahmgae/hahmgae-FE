import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import Toast from '@/components/common/Toast';
import useToast from '@/hooks/useToast';
import logo from '../../../assets/image/login_signup/함개 글씨 로고.svg';
import ownerImage from '../../../assets/image/login_signup/견주 그림.svg';
import dogImage from '../../../assets/image/login_signup/강아지 그림.svg';
import styles from './auth.module.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const userIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { toast, showToast, hideToast } = useToast();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!userId.trim()) {
            showToast('아이디를 입력해 주세요.');
            userIdRef.current?.focus();
            return;
        }

        if (!password.trim()) {
            showToast('비밀번호를 입력해 주세요.');
            passwordRef.current?.focus();
            return;
        }

        hideToast();
        navigate('/', { replace: true });
    }

    return (
        <main className="content">
            <section className={styles.loginPage} aria-label="로그인">
                <div className={styles.loginContent}>
                    <img className={styles.logo} src={logo} alt="함개" width={130} height={62} />

                    <form noValidate onSubmit={handleSubmit}>
                        <div className={styles.loginFields}>
                            <TextField
                                ref={userIdRef}
                                label="아이디"
                                hideLabel
                                variant="login"
                                name="userId"
                                placeholder="아이디"
                                autoComplete="username"
                                autoCapitalize="none"
                                spellCheck={false}
                                value={userId}
                                onChange={(event) => {
                                    setUserId(event.target.value);
                                    hideToast();
                                }}
                            />

                            <TextField
                                ref={passwordRef}
                                label="비밀번호"
                                hideLabel
                                variant="login"
                                name="password"
                                type="password"
                                placeholder="비밀번호"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    hideToast();
                                }}
                            />
                        </div>

                        <div className={styles.loginSubmit}>
                            <Button type="submit">로그인</Button>
                        </div>
                    </form>

                    <div className={styles.signupLink}>
                        <Button variant="link" onClick={() => navigate('/signup')}>
                            회원가입
                        </Button>
                    </div>
                </div>

                <div className={styles.illustrations} aria-hidden="true">
                    <img className={styles.ownerImage} src={ownerImage} alt="" />

                    <img className={styles.dogImage} src={dogImage} alt="" />
                </div>
            </section>

            <Toast message={toast?.message ?? null} messageId={toast?.id} />
        </main>
    );
}
