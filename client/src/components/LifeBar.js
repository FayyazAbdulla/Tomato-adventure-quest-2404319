import React from "react";
import "./Style/LifeBar.css"

function LifeBar({ lives }) {
  // Function to render hearts based on the number of lives
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(<span key={i}>🤍</span>);
    }
    return hearts;
  };

  return (
    <div className="life-heartttt">
      {/* Render hearts based on the number of lives */}
      {renderHearts()}
      <br/><br/>
    </div>
  );
}

export default LifeBar;
