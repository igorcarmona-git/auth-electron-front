import React from 'react';
import { Link } from 'react-router-dom';

function ReportsPage() {
  return (
    <div>
      <h2>Escolha um relatório:</h2>
      <ul>
        <li>
          <Link to="/reports/r1">Relatório de usuários ativos</Link>
        </li>
      </ul>
    </div>
  );
}

export default ReportsPage;
