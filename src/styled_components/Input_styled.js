import styled from 'styled-components';

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.7em;
  vertical-align: central;
  color: ${props => props.inputColor || "black"};
  background: white;
  border: 2px solid #aaaaaa;
  border-radius: 3px;
`;
