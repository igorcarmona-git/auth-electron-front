import React, { useState, useEffect } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function AllActiveUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await API.get('/users/allactive');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários ativos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUsers();
  }, []);

  return (
    <div>
      <h2>Relatório de todos os usuários ativos</h2>
      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : users.length === 0 ? (
          <p>Nenhum usuário ativo encontrado.</p>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.cpf}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={() => window.print()}>Imprimir</button>
      <button onClick={() => navigate('/home')}>Voltar</button>
    </div>
  );
}

export default AllActiveUsers;
