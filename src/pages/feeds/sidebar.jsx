import React from "react";

function Sidebar({ sections, onItemClick }) {
  return (
    <ul style={{ margin: "1em 0", padding: "0 1em", height: '100%' }}>
      {sections.map((section) => (
        <li key={section} style={{ listStyle: "none", height: '1.5%', marginTop: '1em', minHeight: 40 }}>
          <button style={{width: '100%', height: '100%'}} onClick={() => onItemClick(section)}>{section}</button>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
