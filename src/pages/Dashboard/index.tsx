import {useEffect, useState} from "react";

import {DashboardContainer, SelectComponent, InfoContainer, InfoContainerHeader, Label} from "./style";

import Virus from "../../assets/images/virus.png";

interface StatesProps {
    id: number;
    nome: string;
    sigla: string;
}

interface State{
    value: string;
    label: string;
}

function Dashboard(){
    const [states, setStates] = useState();

    function handleState(state:unknown){
        fetch("https://api.brasil.io/v1/dataset/covid19/caso/data/?format=json&is_last=True&page=1&place_type=state&state=CE", {
            headers: {
                Authorization: "Token 1447bb1589b58c17c739d7b844cb01c3b28148cd"
            }
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
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
                onChange={(value, action) => handleState(value)}
            />
            <InfoContainer>
                <InfoContainerHeader>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bandeira_do_Cear%C3%A1.svg/1200px-Bandeira_do_Cear%C3%A1.svg.png" alt="" />
                    <strong>Ceará</strong>
                </InfoContainerHeader>
                <Label>Data:<p>20/20/20</p></Label>
                <Label>UF:<p>CE</p></Label>
                <Label>Confirmações:<p>123808</p></Label>
                <Label>Mortes:<p>1922</p></Label>
                <Label>É a última atualização:<p>Sim</p></Label>
                <Label>População estimada:<p>897654</p></Label>
                <Label>Código IBGE:<p>12</p></Label>
                <Label>Confirmados/100k hab.:<p>13841.49273</p></Label>
                <Label>Mortes/confirmados:<p>0.0161</p></Label>
            </InfoContainer>
        </DashboardContainer>
    );
}

export default Dashboard;