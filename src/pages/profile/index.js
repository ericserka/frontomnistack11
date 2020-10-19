import React, {useEffect, useState} from 'react'; //useEffect serve para disparar alguma função em algum determinado momento
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile() {
    const ongName = localStorage.getItem('ongName'); //pega do storage do navegador a ongName que foi setada ao fazer o logon com sucesso
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]); //o estado inicial é um array vazio porque a resposta vai vir como array (array de incidents)
    const history = useHistory();
    useEffect(() => {
        api.get('profile', { //profile é a rota quem todos os incidents de uma ONG
            headers: {
                authorization: ongId, //o campo authorization do header que será enviado pelo método GET é igualado ao ongId salvo no storage do navegador, dessa forma temos certeza que  estamos buscando os incidents da ONG correta (da ONG que está logada)
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]); //o primeiro parametro do useEffect é a função a ser disparada; o segundo parametro é um array de dependencias (quando a função deve ser disparada); se uma das dependencias mudam, a função é disparada novamente; ongId é colocado como dependencia só como precaução: se por algum motivo esse id mudar, a função vai ser disparada de novo
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, { //incidents/id é o caminho de um incident para ser deletado
                headers: {
                    authorization: ongId, //pra deletar precisa da autorização no header da requisição
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id)); //atualiza os incidents, excluindo o incident no frontend em tempo real; os incidents são setados como todos que tem id diferente do id que acabou de ser excluído
        }
        catch(err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }
    function handleLogout() {
        localStorage.clear(); //com o storage do navegador resetado, logout feito com sucesso
        history.push('/'); //após deslogar, é redirecionado para a página de logon
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/> 
                <span>Bem vinda, {ongName}</span> {/* ongName é dinâmico, vai depender do sotrage do navegador */}
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}> {/* botão de logout */}
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {/* map é a estrutura de repetição que passará por cada incident que a ONG tiver */}
                {incidents.map(incident => ( 
                    <li key={incident.id}> {/* id é definido no banco de dados */}
                        <strong>CASO:</strong>
                        <p>{incident.title}</p> {/* title é definido no banco de dados */}
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p> {/* description é definido no banco de dados */}
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p> {/* formatação para imprimir o valor em reais; value é definido no banco de dados */}
                        <button type="button" onClick={()=>handleDeleteIncident(incident.id)}> {/* quando a função tem parametros, essa sintaxe de arrow function é necessária, se não, dá problema */}
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}