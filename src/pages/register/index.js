import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'; //fi = feather icons, o nome do ícone pode ser desvoberto em: https://feathericons.com/
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();
    async function handleRegister (e) {
        e.preventDefault(); //nao atualiza a página quando dá o submit; isso é o padrão do HTML mas é prevenido através dessa linha de código
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try {
            const response = await api.post('ongs', data); //realização do cadastro; ongs é o caminho para o método, data é o objeto json
            alert(`Seu ID de acesso: ${response.data.id}`); //uso de crase para conseguir colocar variável (response.data.id) no alerta; response.data é o que é retornado pelo backend quando o post é feito com sucesso e o .id quer dizer que queremos apenas o id desse "data" todo.
            history.push('/') //envia o usuário para a página de logon uma vez que seu id foi criado com sucesso)
        }
        catch(err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/"> {/* invés de usar a href usa-se Link to no react */}
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar Para o logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}> {/* assim que o usuário clicar em Cadastrar (dar o submit), a função handleRegister será executada */}
                    {/* para ser possível enviar os dados ao banco de dados, em todo input acrescentar os atributos value e onChange correspondentes aos estados*/}
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)}/> {/* em style, a primeira chave indica que eu estou incluindo um código javascript no HTML; a segunda chave indica que eu to incluindo um objeto do javascript */}
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}