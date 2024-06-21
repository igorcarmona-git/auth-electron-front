import { useState, React } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import '../styles/Login.css';

const loginSchema = yup.object().shape({
  username: yup.string().required('Usuário obrigatório'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha obrigatória')
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (dataValues) => {
    try {
      // Limpar erros anteriores ao enviar novo login
      clearErrors();

      const response = await API.post('login', dataValues);
      sessionStorage.setItem('token', response.data?.token);

      console.log('Login realizado com sucesso:  token: ', sessionStorage.getItem('token'));
      navigate('/home');
    } catch (error) {
      if (error) {
        setError('username', { type: 'manual', message: 'Credenciais inválidas' });
        setError('password', { type: 'manual', message: 'Credenciais inválidas' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div>
          <label htmlFor="username">Usuário</label>
          <input {...register('username')} type="text" id="username" placeholder="Seu usuário" />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input {...register('password')} type="password" id="password" placeholder="Sua senha" />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        <button type="submit">Entrar</button>
        <Link to="/register">Registrar-se</Link>
      </form>
    </div>
  );
}

export default Login;
