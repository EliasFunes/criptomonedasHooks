import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Criptomoneda from "./Criptomoneda";
import Error from "./Error";

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) => {

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [monedaCotizar, guardarMonedaCotizar] = useState('');
    const [criptoCotizar, guardarCriptoCotizar] = useState('');
    const [error, guardarError] = useState(false);

    useEffect(() => {
        const consultarApi = async () => {
            //from https://min-api.cryptocompare.com/
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';
            const resultado = await axios(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if(monedaCotizar === '' || criptoCotizar === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCriptoMoneda(criptoCotizar);
    }

    const componente = (error) ? <Error mensaje="Ambos campos son obligatorio"/>: null;

    return (
        <form action="" onSubmit={handleSubmit}>
            {componente}
            <div className="row">
                <label htmlFor="">Elige tu moneda</label>
                <select
                    className="u-full-width"
                    onChange={e  => guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">- Elige tu moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euros</option>
                </select>
            </div>
            <div className="row">
                <label htmlFor="">Elige tu criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={e => guardarCriptoCotizar(e.target.value)}
                >
                    <option value="">- Elige tu criptomoneda</option>
                    {criptomonedas.map(criptomoneda => (
                        <Criptomoneda
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="calcular"/>
        </form>
    );
};

export default Formulario;
