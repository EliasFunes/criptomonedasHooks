import React, {useState, useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from "./components/Formulario";
import Spinner from "./components/Spinner";
import Cotizacion from "./components/Cotizacion";
import axios from 'axios';

function App() {
    const [moneda, guardarMoneda] = useState('');
    const [criptoMoneda, guardarCriptomoneda] = useState('');
    const [cargando, guardarCargando] = useState(false);
    const [resultado, guardarResultado] = useState({});

    useEffect(() => {
        if(moneda !== '' && criptoMoneda !== ''){
            const cotizarCriptoMoneda = async () => {
                const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
                const resultado = await axios(url);

                guardarCargando(true);
                setTimeout(() => {
                    guardarCargando(false);
                    //se guardar el resultado dinamicamente dependiendo de la estructura de respuesta de la api
                    guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
                },3000);
            }
            cotizarCriptoMoneda();
        }
    }, [moneda, criptoMoneda]);

    const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>;

    return (
        <div className="container">
            <div className="row">
                <div className="one-half column">
                    <img src={imagen} alt="imagen criptomonedas" className="logotipo"/>
                </div>
                <div className="one-half column">
                    <h1>Cotiza Criptomonedas al Instante</h1>
                    <Formulario
                        guardarMoneda={guardarMoneda}
                        guardarCriptoMoneda={guardarCriptomoneda}
                    />
                    {componente}
                </div>
            </div>
        </div>
    );
}

export default App;
