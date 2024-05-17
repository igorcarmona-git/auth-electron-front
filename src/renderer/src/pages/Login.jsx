import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../utils/api';

const loginValidator = yup
  .object()
  .shape({
    email: yup.string()
    .email('Campo deve ser um e-mail')
    .required('E-mail obrigatório'),
    password: yup.string()
    .min(6,"No minimo 6 digitos")
    .required("Campo Obrigatório"),
  })
  .required();

function Login() {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(loginValidator),
      });


    async function submit(values){
        try {
            
            const {data , status} = await API.post('login', values)
            console.log({data, status})
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.log(error.response.data)
            
        }
    }


    return <form onSubmit={handleSubmit((values)=> submit(values))}>
        <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input {...register('email')} name="email" type="email" id="email" placeholder="seu email"/>
            {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="campo">
            <label htmlFor="password">Senha</label>
            <input {...register('password')} name="password" type="password" id="password" placeholder="sua senha"/>
            {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type='submit' >Entrar</button>
    </form>;
}

export default Login;