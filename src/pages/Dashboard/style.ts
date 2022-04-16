import styled from "styled-components";

import Select from "react-select";

export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    img {
        width: 100%;
    }

    p {
        font-size: 18px;
        color: #6e6e6e;
        text-align: center;
    }
`;

export const SelectComponent = styled(Select)`
    width: 100%;
    margin-top: 10px;
`;

export const InfoContainer = styled.div`
    margin-top: 30px;
    width: 100%;
`;

export const InfoContainerHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #EEE;
    color: #6e6e6e;

    img {
        width: 70px;
    }

    strong {
        font-size: 20px;
        margin-left: 10px;
    }
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    font-weight: bold;

    p {
        padding-left: 10px;
    }

    & + & {
        margin-top: 10px;
    }
`;