// The reason for the code is to create modified versions 
// of the original types Listing, Reservation, and User 
// from the Prisma client. These modified types, SafeListing, 
// SafeReservation, and SafeUser, have some properties 
// omitted and the createdAt property replaced with a string type.

// The purpose of omitting certain properties and changing 
// the type of createdAt is to ensure that sensitive or 
// unnecessary information is not exposed or used in 
// certain contexts. It allows you to define a safer 
// representation of the data when working with it 
// in specific scenarios.


import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
