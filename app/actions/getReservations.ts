// Update the database to prevent other users pick the same date to reserve.

// This code defines an asynchronous function called getReservations that 
// takes a params object as a parameter. This function retrieves 
// reservations based on the specified parameters.

// In the context of an HTTP request, parameters can be sent in the query 
// string of a GET request or in the body of a POST request. 
// They provide additional information to the server, such as form data, 
// filter criteria, authentication tokens, or any other data required to 
// process the request.

import prisma from "@/app/libs/prismadb";

// use the params in different page across the website
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

// params refers to an object that contains parameters used to filter and retrieve reservations. 
export default async function getReservations(
  params: IParams
) {
  try {
    // The function extracts the listingId, userId, and authorId properties from the params object.
    const { listingId, userId, authorId } = params;
    // It initializes an empty query object.
    // If listingId is provided, it adds a property listingId to the query object.
    const query: any = {};
        
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
