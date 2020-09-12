import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import Input from "./Input";

import { COLORS } from "../utils/styledVariables";
import { User } from "../utils/types";

const StyledHighLight = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${COLORS.GREY[900]};
  width: 100%;
  height: 420px;
  box-sizing: border-box;
  padding: 0 30px;
  margin-top: 48px;

  @media only screen and (max-width: 860px) {
    height: 340px;
  }
`;

const StyledSearchResultsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .resultsContainer-title {
    color: ${COLORS.WHITE};
    margin-bottom: 10px;
  }

  .resultsContainer-list {
    position: absolute;
    top: 90px;
    background-color: ${COLORS.WHITE};
    width: 100%;
    padding: 14px 0 0;
    box-sizing: border-box;
    border-radius: 0 0 31px 31px;
    box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.25);
  }

  .resultsContainer-list-item {
    display: flex;
    list-style: none;
    padding: 15px 20px;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;

    :last-child {
      padding-bottom: 20px;
      border-radius: 0 0 31px 31px;
    }

    a {
      text-decoration: none;
      color: ${COLORS.GREY[900]};
    }

    &:hover {
      background-color: #e2e2e2;
    }
  }

  .resultsContainer-list-item-image {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .resultsContainer-input-haveResults {
    box-shadow: none;
    border-radius: 31px 31px 0 0;
  }

  @media only screen and (max-width: 860px) {
    .resultsContainer-title {
      font-size: 24px;
      text-align: center;
      width: 400px;
    }
  }
`;

type ResultsType = {
  incomplete_results: boolean;
  items: Array<User>;
  total_count: number;
};

const HighLight = () => {
  const [results, setResults] = useState<ResultsType | null>(null);
  const [searched, setSearched] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();

  const token = "0455140aa117b5f007f2460c24c96a39d274b91f";

  useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${searched}&state=closed`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setResults(data));

    return;
  }, [searched]);

  return (
    <StyledHighLight>
      <StyledSearchResultsContainer>
        <h1 className="resultsContainer-title">
          Digite o usuario que voce deseja busca
        </h1>
        <Input
          placeholder={"Ex.: Fulano, Cifrano"}
          ref={inputRef}
          onChange={() =>
            inputRef && inputRef.current && setSearched(inputRef.current.value)
          }
          className={
            results && results.total_count > 0
              ? "resultsContainer-input-haveResults"
              : ""
          }
        />
        {results && results.total_count > 0 && (
          <div className="resultsContainer-list">
            {results.items.map((item: User, index) => {
              return (
                index < 4 && (
                  <Link key={item.login} href={`../user/${item.login}/`}>
                    <li className="resultsContainer-list-item">
                      <img
                        className={"resultsContainer-list-item-image"}
                        src={item.avatar_url}
                      />
                      {item.login}
                    </li>
                  </Link>
                )
              );
            })}
          </div>
        )}
      </StyledSearchResultsContainer>
    </StyledHighLight>
  );
};

export default HighLight;
