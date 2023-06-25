// Connect database.
// POST and DELETE meothd with ID to handle and return JSON.
// Create a hook to call these two methods.
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

// POST method
// returns a JSON response containing the user object.
// This allows the client making the API request to 
// receive the user object as JSON data and process it accordingly.
export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  // asynchronous function
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  
  // Check if ID is valid
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // Creates a new array favoriteIds
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  // Adds a new element listingId to the favoriteIds array using the push() method.
  favoriteIds.push(listingId);
  // Updates the favoriteIds property of the user object in the database
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}

// DELETE method
// returns a JSON response containing the user object.
export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  
  // the favoriteIds array will be updated to exclude the listingId.
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}
