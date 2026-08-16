export type Driver = {
  id: number;
  name: string;
  gender: "Female" | "Male";
  rating: number;
  reviews: number;
  vehicle: "Car" | "Bike" | "Scooty" | "EV";
  model: string;
  plate: string;
  license: string;
  phone: string;
  from: string;
  to: string;
  time: string;
  seats: number;
  fare: number;
  distance: string;
  fuel: string;
  women: boolean;
};

export const DRIVERS: Driver[] = [
  {
    id: 1,
    name: "Ananya Kumar",
    gender: "Female",
    rating: 4.9,
    reviews: 128,
    vehicle: "Car",
    model: "Maruti Suzuki Swift",
    plate: "TN 38 AB 4721",
    license: "DL-0426-XXXX-001",
    phone: "+91 98765 42130",
    from: "Tambaram",
    to: "Guindy",
    time: "6:30 PM",
    seats: 2,
    fare: 85,
    distance: "18 min away",
    fuel: "Petrol",
    women: true,
  },
  {
    id: 2,
    name: "Rahul S.",
    gender: "Male",
    rating: 4.8,
    reviews: 94,
    vehicle: "Bike",
    model: "Honda Shine",
    plate: "TN 10 CD 8214",
    license: "DL-0426-XXXX-002",
    phone: "+91 91234 67890",
    from: "Tambaram",
    to: "Guindy",
    time: "6:45 PM",
    seats: 1,
    fare: 48,
    distance: "11 min away",
    fuel: "Petrol",
    women: false,
  },
  {
    id: 3,
    name: "Meera Priya",
    gender: "Female",
    rating: 4.9,
    reviews: 76,
    vehicle: "EV",
    model: "Ola S1 Pro",
    plate: "TN 07 EV 1098",
    license: "DL-0426-XXXX-003",
    phone: "+91 99887 66110",
    from: "Chromepet",
    to: "Guindy",
    time: "7:00 PM",
    seats: 2,
    fare: 55,
    distance: "22 min away",
    fuel: "EV",
    women: true,
  },
  {
    id: 4,
    name: "Vikram R.",
    gender: "Male",
    rating: 4.7,
    reviews: 61,
    vehicle: "Scooty",
    model: "TVS Jupiter",
    plate: "TN 22 EF 5531",
    license: "DL-0426-XXXX-004",
    phone: "+91 90031 22110",
    from: "Pallavaram",
    to: "Guindy",
    time: "7:15 PM",
    seats: 1,
    fare: 45,
    distance: "26 min away",
    fuel: "Petrol",
    women: false,
  },
  {
    id: 5,
    name: "Divya Nair",
    gender: "Female",
    rating: 5,
    reviews: 41,
    vehicle: "Car",
    model: "Tata Nexon EV",
    plate: "TN 09 GH 3390",
    license: "DL-0426-XXXX-005",
    phone: "+91 90909 11223",
    from: "Velachery",
    to: "OMR Sholinganallur",
    time: "8:05 PM",
    seats: 3,
    fare: 92,
    distance: "9 min away",
    fuel: "EV",
    women: true,
  },
  {
    id: 6,
    name: "Karthik M.",
    gender: "Male",
    rating: 4.6,
    reviews: 152,
    vehicle: "Car",
    model: "Hyundai Aura",
    plate: "TN 11 JK 7712",
    license: "DL-0426-XXXX-006",
    phone: "+91 98111 45670",
    from: "Chennai",
    to: "Bengaluru",
    time: "10:30 PM",
    seats: 4,
    fare: 640,
    distance: "Inter-city",
    fuel: "Diesel",
    women: false,
  },
];

export const PASSENGERS = [
  {
    name: "Priya",
    gender: "Female",
    from: "Tambaram",
    to: "Guindy",
    time: "5:30 PM",
    seats: 1,
    pref: "Female driver preferred",
    share: 45,
  },
  {
    name: "Arun",
    gender: "Male",
    from: "Chromepet",
    to: "T. Nagar",
    time: "6:00 PM",
    seats: 2,
    pref: "Any driver",
    share: 70,
  },
  {
    name: "Sneha",
    gender: "Female",
    from: "Velachery",
    to: "Sholinganallur",
    time: "6:40 PM",
    seats: 1,
    pref: "Women-for-Women",
    share: 52,
  },
];

export const FARE_RATES: Record<string, { base: number; perKm: number }> = {
  Car: { base: 55, perKm: 8 },
  Bike: { base: 30, perKm: 5 },
  Scooty: { base: 28, perKm: 4.5 },
  EV: { base: 42, perKm: 5.8 },
  Goods: { base: 60, perKm: 9.5 },
};

export function routeKm(from: string, to: string) {
  const text = (from + to).toLowerCase();
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return 4 + (hash % 220) / 10;
}

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
