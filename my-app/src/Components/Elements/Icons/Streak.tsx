"use client";

import React from "react";

type StreakBadgeProps = {
  streak: number;
};

const StreakBadge: React.FC<StreakBadgeProps> = ({ streak }) => {
  const streakColor = (() => {
    if (streak >= 200) return "#394AD7"; 
    if (streak >= 100) return "#0CEA00"; 
    if (streak >= 50) return "#FF1115";  
    if (streak > 0) return "#FF9E11";    
    return "#999999"; 
  })();

  return (
    <div className="flex items-center gap-x-2">
      <p className="text-lg font-semibold">{streak}</p>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.1793 0.51967C11.0524 0.349569 10.8618 0.238381 10.6513 0.211665C10.4408 0.184949 10.2285 0.245003 10.0632 0.378023C8.11511 1.94554 6.7564 4.21964 6.37705 6.81194C5.69312 6.31615 5.09244 5.7121 4.60036 5.0249C4.46499 4.83586 4.25245 4.71693 4.02052 4.70046C3.78859 4.68398 3.56137 4.77167 3.40064 4.93969C1.79085 6.62241 0.800781 8.90617 0.800781 11.4195C0.800781 16.5972 4.99811 20.7945 10.1758 20.7945C15.3535 20.7945 19.5508 16.5972 19.5508 11.4195C19.5508 7.6061 17.274 4.32613 14.0089 2.86162C12.8535 2.29756 11.8994 1.48535 11.1793 0.51967ZM14.082 12.9824C14.082 15.1398 12.3331 16.8887 10.1758 16.8887C8.01842 16.8887 6.26953 15.1398 6.26953 12.9824C6.26953 12.556 6.33785 12.1456 6.46414 11.7615C7.11879 12.2454 7.8713 12.6046 8.68652 12.8039C8.9114 11.3448 9.64095 10.0521 10.6913 9.1099C12.605 9.3622 14.082 10.9998 14.082 12.9824Z"
          fill={streakColor}
        />
      </svg>
    </div>
  );
};

export default StreakBadge;
