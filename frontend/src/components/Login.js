import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(email, password);
    }

    return (
        <section className="auth-container">
            <h3 className="auth-container__title">Вход</h3>
            <form action="#" className="form" name={`${props.name}-auth`} onSubmit={handleSubmit}>
                <div className="form__text-wrap">
                    <input required type="email" name="email" className="form__text form__text_type_auth" placeholder="Email" id="email-input" value={email} onChange={handleEmailChange} />
                    <span className="form__error place-title-input-error"></span>
                </div>
                <div className="form__text-wrap">
                    <input required type="password" name="password" className="form__text form__text_type_auth" placeholder="Пароль" id="password-input" value={password} onChange={handlePasswordChange} />
                    <span className="form__error link-input-error"></span>
                </div>
                <button type="submit" className="form__button form__button_type_auth">Войти</button>
            </form>
        </section>
    );

}

export default Login; 