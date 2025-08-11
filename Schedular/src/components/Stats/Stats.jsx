import React from "react";
import "./Stats.scss";

const Stats = ({ stats }) => {
  return (
    <section className="stats">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-body">
            <div className="stat-number">{stat.value}</div>
            <div className="muted">{stat.title}</div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Stats;
