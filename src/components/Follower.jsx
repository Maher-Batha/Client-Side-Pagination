import React from "react";

const Follower = ({ avatar_url, html_url, login }) => {
  return (
    <li className="single-follower-card">
      <div className="image">
        <img src={avatar_url} alt={login} />
      </div>
      <h2>{login}</h2>
      <a href={html_url} className="btn">
        view profile
      </a>
    </li>
  );
};

export default Follower;
