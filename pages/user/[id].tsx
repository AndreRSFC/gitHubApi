import { NextPageContext } from "next";
import styled from "styled-components";

import Layout from "../../components/Layout";

import { COLORS } from "../../utils/styledVariables";
import { Repo, UserDetail } from "../../utils/types";

const StyledUserInfos = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;

  .user-image {
    border-radius: 50%;
    width: 220px;
    height: 220px;
    border: 1px solid ${COLORS.GREY[100]};
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .user-name {
    color: ${COLORS.GREY[900]};
    font-size: 12px;
  }

  .user-name b {
    color: ${COLORS.GREY[900]};
    font-size: 16px;
  }

  .user-bio {
    margin: 10px 0;
    color: ${COLORS.GREY[900]};
    font-size: 14px;
  }

  .user-stats {
    color: ${COLORS.GREY[500]};
    font-size: 10px;
  }
`;

const StyledUser = styled.div`
  display: flex;
  width: 1024px;
  margin: 20px auto;

  .user-userRepos-container {
    margin-left: 20px;
    width: 100%;
  }

  .user-repostTitle {
    color: ${COLORS.GREY[900]};
    font-size: 24px;
    margin: 0 0 10px 5px;
  }

  @media only screen and (max-width: 1050px) {
    width: 800px;
  }

  @media only screen and (max-width: 860px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .user-userRepos-container {
      margin-left: 0;
      padding: 0 20px;
    }
  }
`;

const StyledListRepoItem = styled.li`
  width: 100%;
  border: 1px solid ${COLORS.GREY[100]};
  border-radius: 8px;
  list-style: none;
  margin-bottom: 10px;
  padding: 15px;
  min-height: 70px;
  box-sizing: border-box;

  @media only screen and (max-width: 860px) {
    min-height: 100%;
  }
`;

const User = ({ user, repos }: { user: UserDetail; repos: Array<Repo> }) => {
  return (
    <Layout
      title={`Pagina de busca com resultado do ${user.name} (${user.login})`}
    >
      <StyledUser>
        <StyledUserInfos>
          <img className="user-image" src={user.avatar_url} alt="" />
          <span className="user-name">
            <b>{user.name}</b> ({user.login})
          </span>
          <span className="user-bio">{user.bio}</span>
          <span className="user-stats">
            {user.followers} followers . {user.following} following .{" "}
            {user.public_repos} public repos
          </span>
        </StyledUserInfos>
        <div className="user-userRepos-container">
          <h1 className="user-repostTitle">Repos</h1>
          <ul>
            {repos.length > 0 &&
              repos
                .filter((repo) => !repo.fork)
                .map((repo) => {
                  return (
                    <StyledListRepoItem key={repo.id}>
                      <h4>{repo.name}</h4>
                      <span>{repo.description}</span>
                    </StyledListRepoItem>
                  );
                })}
          </ul>
          <h1 className="user-repostTitle">Forks</h1>
          <ul>
            {repos.length > 0 &&
              repos
                .filter((repo) => repo.fork)
                .map((repo) => (
                  <StyledListRepoItem key={repo.id}>
                    <h4>{repo.name}</h4>
                    <span>{repo.description}</span>
                  </StyledListRepoItem>
                ))}
          </ul>
        </div>
      </StyledUser>
    </Layout>
  );
};

User.getInitialProps = async (ctx: NextPageContext) => {
  const token = "0455140aa117b5f007f2460c24c96a39d274b91f";

  const userRes = await fetch(
    `https://api.github.com/users/${ctx.query.id}?state=closed`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const userJSON = await userRes.json();

  const reposRes = await fetch(
    `https://api.github.com/users/${ctx.query.id}/repos?state=closed`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const reposJSON = await reposRes.json();

  return { user: userJSON, repos: reposJSON };
};

export default User;
