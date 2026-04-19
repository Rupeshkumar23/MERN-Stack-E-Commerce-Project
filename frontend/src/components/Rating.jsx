import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const Rating = ({ value = 0, onRatingChange, disabled = false, showValue = true }) => {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line
    setRating(value);
  }, [value]);

  const handleClick = (star) => {
    if (disabled) return;
    setRating(star);
    onRatingChange?.(star);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = hover ? star <= hover : star <= rating;
          return (
            <button
              key={star}
              onClick={() => handleClick(star)}
              onMouseEnter={() => !disabled && setHover(star)}
              onMouseLeave={() => !disabled && setHover(0)}
              disabled={disabled}
              className={`transition-all duration-200 ${
                disabled ? "cursor-default" : "cursor-pointer hover:scale-125"
              }`}
            >
              <Star 
                size={18} 
                className={filled ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
              />
            </button>
          );
        })}
      </div>
      {showValue && <span className="text-xs font-semibold text-gray-500">{rating}/5</span>}
    </div>
  );
};

export default Rating;