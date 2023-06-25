'use client';

// Create individual list.
// Cancel button
// Heart Button with favorite functionality
// Detail
// In api folder, create favorites route of like functionality
// with POST and DELETE methods.
// Create HeartButton and useFavorite hook.

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  
  // handle the reservation cancel action
  const handleCancel = useCallback(
    // the type of the event object generated when a button element is clicked in a React component.
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // this code is called to prevent event propagation, 
      // which stops the event from bubbling up the DOM tree.
      e.stopPropagation();
    // It checks if the disabled prop is true. If it is, the function 
    // returns early and does not perform any further actions.
    // If the disabled prop is false, it calls the onAction 
    // function (if it exists) and passes the actionId as an argument. 
    // The onAction function is a callback that handles the action 
    // triggered by the button click.
    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);
  
  // Price
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);
  
  // Date
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    // Date format in JS
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    
    // date-fns library
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    // Lead to single list page with id using client routing in listings folder, listingId[]
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          {/* Image with zoom in CSS effect  */}
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ListingCard;