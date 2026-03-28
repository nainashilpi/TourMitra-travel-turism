export interface Destination {
  id: string;
  name: string;
  distanceKm: number;
  image: string;
}

export interface TripCategory {
  id: string;
  label: string;
  destinations: Destination[];
}

export const tripCategories: TripCategory[] = [
  {
    id: "hill-station-retreats",
    label: "Hill Station Retreats",
    destinations: [
      { id: "manali", name: "Manali", distanceKm: 480, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80" },
      { id: "shimla", name: "Shimla", distanceKm: 340, image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&q=80" },
      { id: "mussoorie", name: "Mussoorie", distanceKm: 290, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
      { id: "darjeeling", name: "Darjeeling", distanceKm: 1620, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80" },
      { id: "ooty", name: "Ooty", distanceKm: 1250, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80" },
      { id: "munnar", name: "Munnar", distanceKm: 1380, image: "https://images.unsplash.com/photo-1609766857491-6c4f75f33cb5?w=600&q=80" },
      { id: "nainital", name: "Nainital", distanceKm: 320, image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=600&q=80" },
      { id: "coorg", name: "Coorg", distanceKm: 1190, image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&q=80" },
      { id: "kasauli", name: "Kasauli", distanceKm: 380, image: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=600&q=80" },
    ],
  },
  {
    id: "food-tours",
    label: "Food Tours",
    destinations: [
      { id: "amritsar-food", name: "Amritsar", distanceKm: 520, image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80" },
      { id: "kolkata-food", name: "Kolkata", distanceKm: 1500, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
      { id: "lucknow-food", name: "Lucknow", distanceKm: 510, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80" },
      { id: "hyderabad-food", name: "Hyderabad", distanceKm: 1080, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80" },
      { id: "mumbai-food", name: "Mumbai", distanceKm: 1150, image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80" },
      { id: "indore-food", name: "Indore", distanceKm: 310, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&q=80" },
      { id: "chennai-food", name: "Chennai", distanceKm: 1680, image: "https://images.unsplash.com/photo-1582550945154-66ea8fff25e1?w=600&q=80" },
      { id: "pune-food", name: "Pune", distanceKm: 1090, image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80" },
      { id: "delhi-food", name: "New Delhi", distanceKm: 599, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" },
    ],
  },
  {
    id: "wildlife-safaris",
    label: "Wildlife Safaris",
    destinations: [
      { id: "ranthambore", name: "Ranthambore", distanceKm: 530, image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80" },
      { id: "jim-corbett", name: "Jim Corbett", distanceKm: 360, image: "https://images.unsplash.com/photo-1535083783855-aaab7b497490?w=600&q=80" },
      { id: "kaziranga", name: "Kaziranga", distanceKm: 2050, image: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=600&q=80" },
      { id: "sundarbans", name: "Sundarbans", distanceKm: 1560, image: "https://images.unsplash.com/photo-1612690669207-fed642192c40?w=600&q=80" },
      { id: "bandhavgarh", name: "Bandhavgarh", distanceKm: 620, image: "https://images.unsplash.com/photo-1598946214635-d56e3a79c1b7?w=600&q=80" },
      { id: "kanha", name: "Kanha", distanceKm: 680, image: "https://images.unsplash.com/photo-1601233749202-8b6a33dba87f?w=600&q=80" },
      { id: "periyar", name: "Periyar", distanceKm: 1320, image: "https://images.unsplash.com/photo-1564682895970-0dbb72e18d97?w=600&q=80" },
      { id: "gir", name: "Gir Forest", distanceKm: 900, image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80" },
      { id: "tadoba", name: "Tadoba", distanceKm: 790, image: "https://images.unsplash.com/photo-1504173010664-32509107de63?w=600&q=80" },
    ],
  },
  {
    id: "historical-expeditions",
    label: "Historical Expeditions",
    destinations: [
      { id: "udaipur", name: "Udaipur", distanceKm: 405, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80" },
      { id: "jaipur", name: "Jaipur", distanceKm: 438, image: "https://images.unsplash.com/photo-1477587458883-47145ed68e5f?w=600&q=80" },
      { id: "agra", name: "Agra", distanceKm: 441, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80" },
      { id: "new-delhi", name: "New Delhi", distanceKm: 599, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" },
      { id: "varanasi", name: "Varanasi", distanceKm: 613, image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80" },
      { id: "bhubaneswar", name: "Bhubaneswar", distanceKm: 929, image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80" },
      { id: "hampi", name: "Hampi", distanceKm: 1100, image: "https://images.unsplash.com/photo-1570804387988-b02b9866a1af?w=600&q=80" },
      { id: "khajuraho", name: "Khajuraho", distanceKm: 720, image: "https://images.unsplash.com/photo-1630260494484-9743d1a5f1eb?w=600&q=80" },
      { id: "mysore", name: "Mysore", distanceKm: 1250, image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&q=80" },
    ],
  },
  {
    id: "adventurous-activities",
    label: "Adventurous Activities",
    destinations: [
      { id: "rishikesh", name: "Rishikesh", distanceKm: 278, image: "https://images.unsplash.com/photo-1585016495481-91613b03a700?w=600&q=80" },
      { id: "leh-ladakh", name: "Leh Ladakh", distanceKm: 980, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80" },
      { id: "spiti", name: "Spiti Valley", distanceKm: 670, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
      { id: "auli", name: "Auli", distanceKm: 490, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80" },
      { id: "andaman-adv", name: "Andaman Islands", distanceKm: 2100, image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600&q=80" },
      { id: "bir-billing", name: "Bir Billing", distanceKm: 560, image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80" },
      { id: "chopta", name: "Chopta", distanceKm: 430, image: "https://images.unsplash.com/photo-1585408050490-2f8d0c546c7e?w=600&q=80" },
      { id: "gokarna-adv", name: "Gokarna", distanceKm: 1270, image: "https://images.unsplash.com/photo-1502214254-5d4b8bbefef5?w=600&q=80" },
      { id: "zanskar", name: "Zanskar", distanceKm: 1050, image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=600&q=80" },
    ],
  },
  {
    id: "tranquil-retreats",
    label: "Tranquil Retreats",
    destinations: [
      { id: "alleppey", name: "Alleppey", distanceKm: 1410, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" },
      { id: "pondicherry", name: "Pondicherry", distanceKm: 1720, image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&q=80" },
      { id: "goa", name: "Goa", distanceKm: 1190, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80" },
      { id: "coorg-tr", name: "Coorg", distanceKm: 1190, image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&q=80" },
      { id: "mcleodganj", name: "McLeod Ganj", distanceKm: 510, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80" },
      { id: "varkala", name: "Varkala", distanceKm: 1480, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
      { id: "shillong", name: "Shillong", distanceKm: 1900, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
      { id: "kasol", name: "Kasol", distanceKm: 555, image: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=600&q=80" },
      { id: "majuli", name: "Majuli", distanceKm: 2150, image: "https://images.unsplash.com/photo-1564681564708-935d77b08278?w=600&q=80" },
    ],
  },
];