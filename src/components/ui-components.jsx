import styled from 'styled-components';

const UlMensajes = styled.ul`
    max-width: 800px;
    margin: 10px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const LiMensaje = styled.li`
    background-color: lightgreen;
    border: 2px solid dodgerblue;
    padding: 10px 20px;
    align-self: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
`

export { UlMensajes, LiMensaje };

