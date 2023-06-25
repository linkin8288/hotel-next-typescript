// The logic of loading individual listing by Id.
// Build the bridge between server component and database.

import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}
// This code is using object destructuring to extract the listingId property from the params object.
// prisma.listing: It refers to the listing model defined in your Prisma schema. It provides access 
// to CRUD operations for the listing table in the database.
export default async function getListingById(
  params: IParams
) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    // This code is ensuring that the createdAt properties 
    // of both the listing and user objects are converted to strings 
    // before returning the modified listing object. The updatedAt and 
    // emailVerified properties of the user object are also converted 
    // to strings if they exist.
    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
