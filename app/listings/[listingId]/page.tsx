import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
    listingId? : string;
}

const ListingPage = async({params} : {params: IParams}) => {
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params);
    const listing = await getListingById(params)

    if(!listing){
        return (
            <ClientOnly>
                    <EmptyState />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ListingClient 
            listing={listing}
            reservations={reservations}
            currentUser = {currentUser}
            />
    </ClientOnly>
  )
}

export default ListingPage