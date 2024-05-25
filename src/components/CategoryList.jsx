import React from "react";


const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const CategoryList = () => {
  return (
    <div className="categoriesBar">
      {keywords.map((value, id) => (
        <span key={id}>{value}</span>
      ))}
    </div>
  );
};

export default CategoryList;
