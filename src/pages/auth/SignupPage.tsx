import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import Toast from '@/components/common/Toast';
import useToast from '@/hooks/useToast';
import dogProfile from '../../../assets/image/login_signup/로그인_기본 프로필.svg';
import radioDefault from '../../../assets/image/login_signup/로그인_circle default.svg';
import radioSelected from '../../../assets/image/login_signup/로그인_circle_varient.svg';
import styles from './auth.module.css';

const accountFields = [
    {
        name: 'userId',
        label: '아이디',
        placeholder: '아이디를 입력해 주세요.',
        type: 'text',
        autoComplete: 'username',
    },
    {
        name: 'password',
        label: '비밀번호',
        placeholder: '비밀번호를 입력해 주세요.',
        type: 'password',
        autoComplete: 'new-password',
    },
    {
        name: 'passwordConfirm',
        label: '비밀번호 확인',
        placeholder: '비밀번호를 다시 입력해 주세요.',
        type: 'password',
        autoComplete: 'new-password',
    },
    {
        name: 'nickname',
        label: '닉네임',
        placeholder: '예) 콩이네',
        type: 'text',
        autoComplete: 'nickname',
    },
] as const;

const dogSizes = ['소형견', '중형견', '대형견'] as const;

export default function SignupPage() {
    const navigate = useNavigate();
    const pageRef = useRef<HTMLElement>(null);
    const [step, setStep] = useState<'account' | 'dog'>('account');
    const [account, setAccount] = useState({
        userId: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
    });
    const [dogName, setDogName] = useState('');
    const [dogSize, setDogSize] = useState('');
    const { toast, showToast, hideToast } = useToast();

    const isAccountComplete = Object.values(account).every((value) => value.trim());
    const isDogComplete = Boolean(dogName.trim() && dogSize);
    const canSubmit = step === 'account' ? isAccountComplete : isDogComplete;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!canSubmit) {
            return;
        }

        if (step === 'account') {
            if (account.password !== account.passwordConfirm) {
                showToast('비밀번호가 일치하지 않습니다.');
                return;
            }

            hideToast();
            setStep('dog');
            pageRef.current?.scrollTo(0, 0);
            return;
        }

        hideToast();
        navigate('/', { replace: true });
    }

    return (
        <main ref={pageRef} className="content">
            <section className={styles.signupPage} aria-labelledby="signup-title">
                <header className={styles.header}>
                    <h1 id="signup-title" className={styles.title}>
                        {step === 'account' ? (
                            <>
                                함개에서 사용할
                                <br />
                                계정을 만들어 주세요
                            </>
                        ) : (
                            <>
                                함께 산책할
                                <br />
                                강아지를 소개해 주세요!
                            </>
                        )}
                    </h1>
                </header>

                <form
                    key={step}
                    className={[styles.signupForm, step === 'dog' ? styles.dogForm : '']
                        .filter(Boolean)
                        .join(' ')}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    {step === 'account' ? (
                        <div className={styles.accountFields}>
                            {accountFields.map((field) => (
                                <TextField
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    autoComplete={field.autoComplete}
                                    required
                                    value={account[field.name]}
                                    onChange={(event) => {
                                        setAccount((current) => ({
                                            ...current,
                                            [field.name]: event.target.value,
                                        }));
                                        hideToast();
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <img
                                className={styles.dogProfile}
                                src={dogProfile}
                                alt="기본 반려견 프로필"
                                width={115}
                                height={115}
                            />

                            <div className={styles.dogFields}>
                                <TextField
                                    label="반려견 이름"
                                    name="dogName"
                                    placeholder="예) 콩이"
                                    required
                                    value={dogName}
                                    onChange={(event) => {
                                        setDogName(event.target.value);
                                    }}
                                />

                                <fieldset className={styles.sizeField}>
                                    <legend className={styles.sizeLegend}>
                                        반려견 크기
                                        <span className={styles.required} aria-hidden="true">
                                            *
                                        </span>
                                    </legend>

                                    <div className={styles.radioGroup}>
                                        {dogSizes.map((size) => (
                                            <label key={size} className={styles.radioChoice}>
                                                <input
                                                    className={styles.radioInput}
                                                    type="radio"
                                                    name="dogSize"
                                                    value={size}
                                                    required
                                                    checked={dogSize === size}
                                                    onChange={() => {
                                                        setDogSize(size);
                                                    }}
                                                />

                                                <img
                                                    className={styles.radioIcon}
                                                    src={
                                                        dogSize === size
                                                            ? radioSelected
                                                            : radioDefault
                                                    }
                                                    alt=""
                                                    aria-hidden="true"
                                                />

                                                <span>{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        </>
                    )}

                    <div className={styles.bottomAction}>
                        <Button type="submit" disabled={!canSubmit}>
                            {step === 'account' ? '다음으로' : '함개 시작하기'}
                        </Button>
                    </div>
                </form>
            </section>

            <Toast message={toast?.message ?? null} messageId={toast?.id} />
        </main>
    );
}
