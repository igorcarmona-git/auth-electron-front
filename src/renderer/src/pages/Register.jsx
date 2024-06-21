import React, { useState } from 'react';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import '../styles/Register.css';

function Register() {
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Verifica se o CPF tem 11 dígitos ou se todos os dígitos são iguais
    }
  
    var soma;
    var resto;
    soma = 0;
  
    for (var i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }
  
    soma = 0;
  
    for (var j = 1; j <= 10; j++) {
        soma += parseInt(cpf.substring(j - 1, j)) * (12 - j);
    }
  
    resto = (soma * 10) % 11;
  
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
  
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
  
    return true;
  }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required('Nome de usuário é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais'),
    status: yup.string().default('active')
  });

  const { register, handleSubmit, formState: { errors }, setValue, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const formatCPF = (value) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return onlyNumbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
  };

  const handleCPFChange = (e) => {
    const isValidCPF = validarCPF(e.target.value);

    if (!isValidCPF)
      return setError('cpf', { type: 'manual', message: 'CPF inválido' });
    clearErrors('cpf');

    const formattedValue = formatCPF(e.target.value);
    setValue('cpf', formattedValue);
  };

  const onSubmit = async (values) => {   
    try {
      const { confirmPassword, ...dataToSend } = values;  // Exclude confirmPassword
      console.log(dataToSend);
      const { data, status } = await API.post('/users', dataToSend);
      if (status === 201) {
        navigate('/');
      }
    } catch (error) {
      return setError('root', { type: 'manual', message: error});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Cadastre-se</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="campo">
          <label htmlFor="username" className="label">Nome de Usuário:</label>
          <input {...register('username')} type="text" id="username" className="input" />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor="email" className="label">E-mail:</label>
          <input {...register('email')} type="email" id="email" className="input" />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor="cpf" className="label">CPF:</label>
          <input
            {...register('cpf')}
            type="text"
            id="cpf"
            className="input"
            placeholder="xxx.xxx.xxx-xx"
            maxLength="14"
            onChange={handleCPFChange}
          />
          {errors.cpf && <span className="error-message">{errors.cpf.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor="password" className="label">Senha:</label>
          <input {...register('password')} type="password" id="password" className="input" />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <div className="campo">
          <label htmlFor="confirmPassword" className="label">Confirmar Senha:</label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            className="input"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
        </div>
        
        <button type="submit" className="button">Registrar</button>
        <button type="button" className="button" onClick={() => navigate('/')}>Voltar</button>
      </form>
    </div>
  );
}

export default Register;
