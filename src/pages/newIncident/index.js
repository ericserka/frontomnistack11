import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'

export default function NewIncident () {
    //um estado para cada input
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId'); //necessário para o header
    const history = useHistory();
    async function handleNewIncident (e) {
        e.preventDefault(); //nao atualiza a página quando dá o submit; isso é o padrão do HTML mas é prevenido através dessa linha de código
        const data = {
            title,
            description,
            value,
        }
        try {
            api.post('incidents', data, { //realização do cadastro; incidents é o caminho para o método, data é o objeto json
                headers: {
                    authorization: ongId,
                }
            })
            history.push('/profile'); //após cadastrar caso com sucesso, redireciona usuário para profile
        }
        catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile"> {/* invés de usar a href usa-se Link to no react */}
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}> {/* ao clicar em cadastrar, handleNewIncident é executada */}
                    {/* para ser possível enviar os dados ao banco de dados, em todo input acrescentar os atributos value e onChange correspondentes aos estados */}
                    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título do caso" />
                    <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descrição"/>
                    <input value={value} onChange={e=>setValue(e.target.value)} placeholder="Valor em reais"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}