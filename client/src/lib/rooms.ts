export interface Room {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  capacity: number;
  image: string;
  features: string[];
  layouts: string[];
  equipment: string[];
}

export const rooms: Room[] = [
  {
    id: "clinton",
    name: "Clinton Training Room",
    subtitle: "Flexible training facilities to fit your budget",
    description: "A premium training room designed for the discerning professional, offering a stunning 10th-floor view of Victoria Island and Ikoyi. Equipped with state-of-the-art technology and adaptable configurations for any training scenario.",
    capacity: 50,
    image: "/images/clinton-room.png",
    features: [
      "100-inch TV Screen",
      "Board-room Setup",
      "10th floor view of Victoria Island and Ikoyi",
      "Intelligent digital whiteboarding screen",
      "Adaptable lighting",
      "Automated curtains",
      "Large intelligent screens",
    ],
    layouts: ["Boardroom", "Classroom", "Theater", "U-Shape", "Workshop"],
    equipment: [
      "100-inch TV Screen",
      "Digital Whiteboard",
      "Wireless Presentation System",
      "Video Conferencing Setup",
      "Surround Sound System",
      "Podium & Microphone",
    ],
  },
  {
    id: "obama",
    name: "Obama Seminar Room",
    subtitle: "Flexible seminar and workshop facilities to fit your budget",
    description: "A high-class seminar room offering superior sound and video facilities, flexible lighting, and adaptable wall colors. Perfect for executive presentations, workshops, and intimate gatherings that demand excellence.",
    capacity: 16,
    image: "/images/obama-room.png",
    features: [
      "500-inch Multimedia Screen",
      "Board-room Setup",
      "10th floor view of Victoria Island and Ikoyi",
      "Intelligent digital whiteboarding screen",
      "Adaptable lighting",
      "Automated curtains",
      "Adaptable wall colors",
    ],
    layouts: ["Boardroom", "Seminar", "Workshop", "Presentation"],
    equipment: [
      "500-inch Multimedia Screen",
      "Digital Whiteboard",
      "Sound System",
      "Video Conferencing",
      "Wireless Presentation",
      "Ambient Lighting Controls",
    ],
  },
  {
    id: "kings",
    name: "King's Space",
    subtitle: "Exotic room for the King's business meetings",
    description: "An exclusive, intimate setting designed for high-level executive meetings. This premium space offers a refined atmosphere with top-tier multimedia capabilities, ideal for decisions that shape the future of business.",
    capacity: 5,
    image: "/images/kings-space.png",
    features: [
      "65-inch Multimedia Screen",
      "Board-room Setup",
      "10th floor view of Victoria Island and Ikoyi",
      "Intelligent digital whiteboarding screen",
      "Adaptable lighting",
      "Automated curtains",
    ],
    layouts: ["Boardroom", "Executive"],
    equipment: [
      "65-inch Multimedia Screen",
      "Digital Whiteboard",
      "Video Conferencing",
      "Wireless Presentation",
      "Premium Audio System",
    ],
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}
