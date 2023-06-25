'use client';

// favorites route handle the POST and DELETE methods

// HeartButton is the logic of handling UI logic
// useFavorite hook inside hooks folder handling the API logic

// Overall, the HeartButton component encapsulates the 
// logic and functionality related to favoriting a listing 
// and provides an easy-to-use interface for rendering the 
// appropriate UI and handling user interactions.

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

import ClientOnly from "./ClientOnly";

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

// Inside the component, it calls the useFavorite hook 
// with the listingId and currentUser as arguments. 
// The useFavorite hook returns an object with two values: 
// hasFavorited and toggleFavorite

const HeartButton: React.FC<HeartButtonProps> = ({ 
  listingId,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
       {/* Dynamic CSS to check whether hasFavorited or not */}
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
   );
}
 
export default HeartButton;