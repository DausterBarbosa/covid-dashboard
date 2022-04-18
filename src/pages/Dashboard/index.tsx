import {useEffect, useState} from "react";

import {DashboardContainer, SelectComponent, InfoContainer, Label} from "./style";

import Virus from "../../assets/images/virus.png";

interface StatesProps {
    id: number;
    nome: string;
    sigla: string;
}

interface State {
    value: string;
    label: string;
}

interface SelectedState {
    date: string;
    state: string;
    confirmed: number;
    deaths: number;
    is_last: boolean;
    estimated_population: number;
    city_ibge_code: string;
    confirmed_per_100k_inhabitants: number;
    death_rate: number;
}

function Dashboard(){
    const [states, setStates] = useState();
    const [selectedState, setSelectedState] = useState<SelectedState | null>(null);

    function handleState(state:State){
        fetch(`https://api.brasil.io/v1/dataset/covid19/caso/data/?format=json&is_last=True&page=1&place_type=state&state=${state.value}`, {
            headers: {
                Authorization: "Token 1447bb1589b58c17c739d7b844cb01c3b28148cd"
            }
        })
        .then((response) => response.json())
        .then((data) => setSelectedState(data.results[0]));
    }

    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((response) => response.json())
        .then((data) => {
            const formattedData = data.map((state:StatesProps) => ({label: state.nome, value: state.sigla}));

            setStates(formattedData);
        });
    }, []);

    return (
        <DashboardContainer>
            <img src={Virus} alt="Virus"/>
            <p>Encontre rapidamente informações sobre a pandemia no seu estado</p>
            <SelectComponent
                placeholder="Selecione um estado"
                options={states}
                noOptionsMessage={() => "Estado não encontrado"}
                onChange={(state) => handleState(state as State)}
            />
            {selectedState !== null && (
                <InfoContainer>
                    <img src={`https://raw.githubusercontent.com/bgeneto/bandeiras-br/master/imagens/${selectedState?.state}.png`} alt="" />
                    <Label>Data:<p>{selectedState?.date}</p></Label>
                    <Label>UF:<p>{selectedState?.state}</p></Label>
                    <Label>Confirmações:<p>{selectedState?.confirmed}</p></Label>
                    <Label>Mortes:<p>{selectedState?.deaths}</p></Label>
                    <Label>É a última atualização:<p>{selectedState?.is_last ? "Sim" : "Não"}</p></Label>
                    <Label>População estimada:<p>{selectedState?.estimated_population}</p></Label>
                    <Label>Código IBGE:<p>{selectedState?.city_ibge_code}</p></Label>
                    <Label>Confirmados/100k hab.:<p>{selectedState?.confirmed_per_100k_inhabitants}</p></Label>
                    <Label>Mortes/confirmados:<p>{selectedState?.death_rate}</p></Label>
                </InfoContainer>
            )}
        </DashboardContainer>
    );
}

export default Dashboard;