import React from "react";
import styled from "styled-components";

import { COLORS } from "../utils/styledVariables";

type PropsType = {
  placeholder: string;
  onChange: () => void;
  className?: string;
};

const InputStyle = styled.div`
  display: flex;
  background-color: ${COLORS.WHITE};
  border-radius: 31px;
  width: 650px;
  padding: 14px 20px;
  box-sizing: border-box;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);

  .input {
    background: none;
    border: 0;
    outline: none;
    font-size: 18px;
    width: 100%;

    ::placeholder {
      color: ${COLORS.BLACK[900]};
      font-family: "Montserrat";
      font-weight: 400;
    }
  }

  .input-icon {
    width: 28px;
    height: 28px;
  }

  @media only screen and (max-width: 860px) {
    height: 42px;
    width: 100%;

    .input {
      font-size: 14px;

      ::placeholder {
        font-size: 14px;
      }
    }

    .input-icon {
      width: 16px;
      height: 16px;
    }
  }
`;

const Input = React.forwardRef(
  ({ placeholder, onChange, className }: PropsType, ref: any) => (
    <InputStyle className={className}>
      <input
        ref={ref}
        onChange={onChange}
        className={"input"}
        placeholder={placeholder}
        type="text"
        aria-label="Input de Busca"
        name="Input de Busca"
        autoComplete="off"
      />
      <img
        alt="Lupa de pesquisa"
        src="https://cdn.pixabay.com/photo/2017/01/13/01/22/magnifying-glass-1976105_960_720.png"
        className="input-icon"
      />
    </InputStyle>
  )
);

export default Input;
