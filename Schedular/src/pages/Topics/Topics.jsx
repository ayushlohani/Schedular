import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Topics.scss";

const topicsData = {
  mental: [
    "Anxiety",
    "Depression",
    "Stress Management",
    "Trauma Recovery",
    "PTSD",
    "Insomnia",
    "Low Self-Esteem",
    "Burnout",
    "Panic Attacks",
    "Anger Issues",
    "OCD",
    "Grief and Loss",
    "Social Anxiety",
    "Addiction Recovery",
    "Relationship Conflicts",
    "Body Image Issues",
    "Perfectionism",
    "Fear of Failure",
  ],
  physical: [
    "Chronic Pain",
    "Obesity",
    "Diabetes Management",
    "Hypertension",
    "Arthritis",
    "Heart Disease",
    "Digestive Disorders",
    "Respiratory Issues",
    "Fatigue",
    "Sleep Apnea",
    "Thyroid Problems",
    "Injury Recovery",
    "Exercise and Fitness",
    "Post-Surgery Rehab",
    "Menstrual Health",
    "Skin Disorders",
    "Immunity Issues",
    "Migraine Management",
  ],
  financial: [
    "Budgeting",
    "Debt Management",
    "Credit Score Improvement",
    "Savings Strategies",
    "Retirement Planning",
    "Investing Basics",
    "Tax Planning",
    "Student Loan Help",
    "Emergency Fund Setup",
    "Financial Anxiety",
    "Spending Habits",
    "Insurance Literacy",
    "Financial Planning for Families",
    "Wealth Building",
    "Side Income Strategies",
    "Estate Planning",
    "Money Mindset",
    "Cost Cutting Techniques",
  ],
};

const TopicsList = () => {
  const { category } = useParams();
  const topics = topicsData[category?.toLowerCase()] || [];

  const navigate = useNavigate();
  const formatTopicForUrl = (topic) => {
    return topic.toLowerCase().replace(/\s+/g, "-");
  };

  const handleClick = (topic) => {
    navigate(`${formatTopicForUrl(topic)}`);
  };

  const handleOther = (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue) {
      navigate(`${formatTopicForUrl(inputValue)}`);
    }
  };

  return (
    <div className="topics-container">
      <h2>
        {category?.charAt(0).toUpperCase() + category?.slice(1)} Health Topics
      </h2>
      {topics.length > 0 ? (
        <ul className="topics-list">
          {topics.map((topic, idx) => (
            <li
              key={idx}
              className="topic-item"
              onClick={() => handleClick(topic)}
            >
              {topic}
            </li>
          ))}
          <input
            className="topic-item"
            type="text"
            placeholder="+ Other"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                handleOther(e);
              }
            }}
          />
        </ul>
      ) : (
        <p className="no-topics">No topics found for category: {category}</p>
      )}
    </div>
  );
};

export default TopicsList;
