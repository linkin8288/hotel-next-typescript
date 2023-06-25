// Call the favorite POST and DELETE methods.

// Here's a breakdown of the toggleFavorite function:
// It first checks if a currentUser is available. If not, it opens the loginModal (presumably a modal for user login) and returns, preventing further execution.
// If a currentUser is available, it sets up a request variable based on the current hasFavorited state. If the listing is already favorited (hasFavorited is true), the request variable is set to a delete request to remove the listing from favorites. Otherwise, the request variable is set to a post request to add the listing to favorites.
// The request is then executed using Axios to send the appropriate HTTP request to the backend API.
// After the request is successfully executed, the router is refreshed to update the page, and a success toast message is displayed.
// If an error occurs during the request, an error toast message is displayed.
// The returned object { hasFavorited, toggleFavorite } provides access to the hasFavorited boolean value and the toggleFavorite function, which can be used in the component where this hook is used.
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  // In summary, the code is determining whether the current user has favorited 
  // a specific listing by checking if the listingId is present in the 
  // currentUser?.favoriteIds array. The result (true or false) is 
  // memoized using the useMemo hook to optimize performance by 
  // avoiding unnecessary recalculations.

  // hasFavorited is either return a list with IDs or empty list
  const hasFavorited = useMemo(() => {
    // The code snippet assigns the value of currentUser?.favoriteIds to the variable list
    const list = currentUser?.favoriteIds || [];
    
    return list.includes(listingId);
  }, [currentUser, listingId]);

  // The toggleFavorite function is a callback function that handles the logic for 
  // toggling the favorite status of a listing. It is triggered by a click event on a <div> element.
  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
