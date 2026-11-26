import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css';
import './Register.css';

const API_URL = 'http://localhost:3001';

export const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // State form Đăng nhập
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    // State form Đăng ký
    const [fullName, setFullName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(true);

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) return;

        try {
            const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(loginEmail.trim())}`);
            const users = await res.json();

            const matchedUser = users.find(
                (u: { email: string; password: string }) =>
                    u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
            );

            if (!matchedUser) {
                alert('Email hoặc mật khẩu không chính xác!');
                return;
            }

            const sessionUser = {
                id: matchedUser.id,
                fullName: matchedUser.fullName,
                email: matchedUser.email,
                phone: matchedUser.phone,
                rememberMe,
            };

            localStorage.setItem('user', JSON.stringify(sessionUser));
            navigate('/');
        } catch {
            alert('Không thể kết nối đến máy chủ!');
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (regPassword.length < 8) {
            alert('Mật khẩu phải có tối thiểu 8 ký tự!');
            return;
        }
        if (regPassword !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            const checkRes = await fetch(`${API_URL}/users?email=${encodeURIComponent(regEmail.trim())}`);
            const existingUsers = await checkRes.json();

            if (existingUsers.length > 0) {
                alert('Email này đã được đăng ký!');
                return;
            }

            const res = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: Math.random().toString(36).substring(2, 10),
                    fullName: fullName.trim(),
                    email: regEmail.trim(),
                    phone: phone.trim(),
                    password: regPassword,
                }),
            });

            if (!res.ok) {
                alert('Đăng ký thất bại, vui lòng thử lại!');
                return;
            }

            alert('Đăng ký tài khoản thành công!');
            setFullName('');
            setPhone('');
            setRegPassword('');
            setConfirmPassword('');
            setIsLogin(true);
            setLoginEmail(regEmail);
            setLoginPassword('');
        } catch {
            alert('Không thể kết nối đến máy chủ!');
        }
    };

    return (
        <div className="login-page">
            <header className="auth-top-bar">
                <div className="auth-top-container">
                    <button type="button" className="back-home-btn" onClick={() => navigate('/')}>
                        <i className="fa-solid fa-arrow-left"></i> Quay lại trang chủ
                    </button>
                    <span className="auth-top-divider"></span>
                    <span className="auth-brand-logo" onClick={() => navigate('/')}>
                        VIETUNIFORM
                    </span>
                </div>
            </header>

            <main className="main-content">
                <div className={`login-card ${!isLogin ? 'register-card' : ''}`}>
                    {/* Tab Switch */}
                    <div className="tab-switch">
                        <button
                            type="button"
                            className={`tab ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Đăng nhập
                        </button>
                        <button
                            type="button"
                            className={`tab ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Đăng ký
                        </button>
                    </div>

                    <h1 className="title">{isLogin ? 'Chào mừng trở lại' : 'Đăng ký tài khoản mới'}</h1>

                    {isLogin ? (
                        /* Form Đăng Nhập */
                        <form onSubmit={handleLoginSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="loginEmail">Email doanh nghiệp / cá nhân</label>
                                <div className="input-wrapper">
                  <span className="input-icon">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                                    <input
                                        id="loginEmail"
                                        type="email"
                                        placeholder="tenban@congty.com"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="label-row">
                                    <label htmlFor="loginPassword">Mật khẩu</label>
                                    <a href="#forgot" className="forgot-link">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div className="input-wrapper">
                  <span className="input-icon">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                                    <input
                                        id="loginPassword"
                                        type={showLoginPassword ? 'text' : 'password'}
                                        placeholder="••••••••••••"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-pwd"
                                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                                    >
                                        <i
                                            className={`fa-regular ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        ></i>
                                    </button>
                                </div>
                            </div>

                            <div className="remember-group">
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="checkmark"></span>
                                    Ghi nhớ đăng nhập trong 30 ngày
                                </label>
                            </div>

                            <button type="submit" className="submit-btn">
                                Đăng nhập <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </form>
                    ) : (
                        /* Form Đăng Ký */
                        <form onSubmit={handleRegisterSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="fullName">Họ và tên người đại diện</label>
                                <div className="input-wrapper">
                  <span className="input-icon">
                    <i className="fa-regular fa-user"></i>
                  </span>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="Nguyễn Văn A (Công ty / Tổ chức)"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="regEmail">Email doanh nghiệp / cá nhân</label>
                                    <div className="input-wrapper">
                    <span className="input-icon">
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                                        <input
                                            id="regEmail"
                                            type="email"
                                            placeholder="tenban@congty.com"
                                            value={regEmail}
                                            onChange={(e) => setRegEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại nhận hàng</label>
                                    <div className="input-wrapper">
                    <span className="input-icon">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="090x xxx xxx"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="regPassword">Mật khẩu</label>
                                    <div className="input-wrapper">
                    <span className="input-icon">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                                        <input
                                            id="regPassword"
                                            type={showRegPassword ? 'text' : 'password'}
                                            placeholder="Tối thiểu 8 ký tự"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-pwd"
                                            onClick={() => setShowRegPassword(!showRegPassword)}
                                        >
                                            <i
                                                className={`fa-regular ${showRegPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                            ></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                    <div className="input-wrapper">
                    <span className="input-icon">
                      <i className="fa-solid fa-rotate-left"></i>
                    </span>
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Nhập lại mật khẩu"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-pwd"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <i
                                                className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="remember-group">
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        required
                                    />
                                    <span className="checkmark"></span>
                                    <span>
                    Tôi đồng ý với{' '}
                                        <a href="#terms" className="link-text">
                      Điều khoản dịch vụ
                    </a>{' '}
                                        và{' '}
                                        <a href="#privacy" className="link-text">
                      Chính sách bảo mật
                    </a>{' '}
                                        của Sell Uniform.
                  </span>
                                </label>
                            </div>

                            <button type="submit" className="submit-btn">
                                Tạo tài khoản mới <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </form>
                    )}

                    <div className="or-divider">
                        <span>HOẶC TIẾP TỤC NHANH VỚI</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-btn">
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#4285F4"
                                    d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.41-1.57-5.13-3.72L.97 13.01C2.48 16.01 5.51 18 9 18z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M3.87 10.8c-.19-.53-.3-1.1-.3-1.8s.11-1.27.3-1.8L.97 4.99C.35 6.22 0 7.57 0 9s.35 2.78.97 4.01l2.9-2.21z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M9 3.58c1.32 0 2.5.45 3.44 1.33l2.58-2.58C13.46.89 11.43 0 9 0 5.51 0 2.48 1.99.97 4.99l2.9 2.21c.72-2.15 2.75-3.62 5.13-3.62z"
                                />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="badge-row">
            <span>
              <i className="fa-solid fa-shield-halved"></i> Mã hóa dữ liệu 256-bit SSL
            </span>
                        <span>Hệ thống ERP Đồng phục Việt Nam</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Auth;