import styled from 'styled-components';

export const Button = styled.button`
cursor: pointer;
background: #25ccde;
font-size: 16px;
color: black;
color: ${props => (props.primary ? 'violet' : 'white')};
border: ${props =>
  props.primary ? '2px solid violet' : '2px solid #25ccde'};
margin: 0 1em;
padding: 0.25em 1em;
transition: 0.5s all ease-out;
&:hover {
  color: black;
  background-color: ${props =>
    props.primary ? 'violet' : '#25ccde'};
  border: ${props =>
      props.primary ? '2px solid violet' : '2px solid black'};
}
`;
