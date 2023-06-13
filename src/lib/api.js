const FIREBASE_DOMAIN = "https://react-http-c27a0-default-rtdb.firebaseio.com";
const FIREBASE_RAILWAYS_API_DOMAIN = "https://railways-api-f9661-default-rtdb.firebaseio.com/";

export async function getAllTickets() {
  const response = await fetch(`${FIREBASE_DOMAIN}/tickets.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch tickets.");
  }

  const transformedTickets = [];

  for (const key in data) {
    const ticketObj = {
      id: key,
      ...data[key],
    };

    transformedTickets.push(ticketObj);
  }

  return transformedTickets;
}


export async function getTicketsByUser(email) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tickets.json`);
  const data = await response.json();

  if (!response.ok) {throw new Error(data.message || "Could not fetch tickets."); }
  const transformedTickets = [];

  for (const key in data) {
    const ticketObj = {
      id: key,
      ...data[key],
    };

    if (ticketObj.user === email) {
    transformedTickets.push(ticketObj);}
  }

  return transformedTickets;
}


export async function getRailwaysByOrigin(obj) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tickets.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch tickets.");
  }

  const transformedTickets = [];

  for (const key in data) {
    const ticketObj = {
      id: key,
      ...data[key],
    };

    if (ticketObj.origin === obj.origin && ticketObj.destination === obj.destination) {
      transformedTickets.push(ticketObj);
    }
  }

  return transformedTickets;
}

export async function getSingleTicket(ticketId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tickets/${ticketId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch tickets.");
  }

  const loadedTicket = {
    id: ticketId,
    ...data,
  };

  return loadedTicket;
}

export async function addTicket(ticketData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/tickets.json`, {
    method: "POST",
    body: JSON.stringify(ticketData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create ticket.");
  }

  return null;
}

export async function addRailwayStation(railwayStationData) {
  const response = await fetch(`${FIREBASE_RAILWAYS_API_DOMAIN}/railwayStation.json`, {
    method: "POST",
    body: JSON.stringify(railwayStationData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create railway station.");
  }

  return null;
}

export async function addRide(rideData) {
  const response = await fetch(`${FIREBASE_RAILWAYS_API_DOMAIN}/rides.json`, {
    method: "POST",
    body: JSON.stringify(rideData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create ride.");
  }

  return null;
}


export async function getRidesByOrigin(obj) {
  const response = await fetch(`${FIREBASE_RAILWAYS_API_DOMAIN}/rides.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch tickets.");
  }

  const transformedTickets = [];

  for (const key in data) {
    const ticketObj = {
      id: key,
      ...data[key],
    };

    if (ticketObj.origin === obj.origin && ticketObj.destination === obj.destination) {
      transformedTickets.push(ticketObj);
    }
  }

  return transformedTickets;
}



export async function getAllRailwayStations() {
  const response = await fetch(`${FIREBASE_RAILWAYS_API_DOMAIN}/railwayStation.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch tickets.");
  }

  const transformedTickets = [];

  for (const key in data) {
    const value = data[key]

    transformedTickets.push(value);
  }

  return transformedTickets;
}










