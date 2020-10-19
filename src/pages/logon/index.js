import React, {useState} from 'react';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi'; //fi = feather icons, o nome do ícone pode ser desvoberto em: https://feathericons.com/
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin (e) {
        e.preventDefault(); //nao atualiza a página quando dá o submit; isso é o padrão do HTML mas é prevenido através dessa linha de código
        try {
            const response = await api.post('sessions', {id}); //realização do logon; sessions é o caminho para o método, {id} é o objeto json
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name); //localStorage guarda os dados no navegador; é a partir do ongId e do ongName que sabere que mostraremos uma página /profiles dinâmica (que mostra os casos cadastrados de cada ONG)
            history.push('/profile'); //se logado com sucesso, é redirecionado para a pagina de diretório profile
        }
        catch (err) {
            alert('Falha no login, tente novamente.'); //se o id fornecido for inválido, aparecerá esse alerta para o usuário
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}> {/* assim que o usuário clicar em Entrar (dar o submit), a função handleLogin será executada */}
                    {/* para ser possível enviar os dados ao banco de dados, em todo input acrescentar os atributos value e onChange correspondentes aos estados*/}
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register"> {/* invés de usar a href usa-se Link to no react */}
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}
