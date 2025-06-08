"use server";

import { getAllLocations } from "@/utils/service/location/get";

export async function searchLocations(query: string) {
  const locations = await getAllLocations();
  return locations.filter((location) =>
    location.area_name.toLowerCase().includes(query.toLowerCase())
  );
}
