// aboutData.ts

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  github: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  year:string;
  image: string;
  bio: string;
  socialLinks: SocialLinks;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  year:string;
  image: string;
  socialLinks: SocialLinks;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  authorId: string;
}

export const founders: Founder[] = [
  {
    id: "founder-1",
    name: "Naina Shilpi",
    role: "Founder & CEO",
    year:"3rd",
    image: "/team/Naina_shilpi.jpg",
    bio: "",
    socialLinks: {
      instagram: "https://www.instagram.com/____nynaa__/",
      linkedin: "https://www.linkedin.com/in/nainashilpi",
      github: "https://github.com/nainashilpi",
    },
  },
  {
    id: "team-29",
    name: "Atisha Jain",
    role: "Founder & CEO",
    year:"3rd",
  image: "/team/Atisha_Jain.jpg",
  bio:"",
  socialLinks: {
    instagram: "https://www.instagram.com/_atishajain",
    linkedin: "https://www.linkedin.com/in/atisha-jain2004",
    github: "https://github.com/atisha-jain2004",
  },
}
];

export const teamMembers: TeamMember[] = [
  
  {
    id: "team-21",
    name: "Pari Lakhera",
    role: "Web Developer",
    year: "1st",
    image: "/team/PariLakhera.jpeg",
    socialLinks: {
      instagram: "https://www.instagram.com/parrriii_07",
      linkedin:"",
      github: "https://github.com/parrriii_07",
    },
  },
  {
    id: "team-45",
    name: "Ankita Prajapat",
    role: "Graphics Desiner",
    year: "2nd",
    image: "/team/Ankita_Prajapat.jpg",
    socialLinks: {
      instagram: "",
      linkedin:"",
      github: "https://github.com/ankitaprajapat632-cmyk",
    },
  },
  {
    id: "team-62",
    name: "Aditya Singh Chauhan",
    role: "Machine learning Engineer",
    year: "1st",
    image: "/team/Aditya_Singh_Chauhan.jpeg",
    socialLinks: {
      instagram: "",
      linkedin: "https://www.linkedin.com/in/asc-net",
      github: "http://github.com/asc-17",
    },
  },
  {
    id: "team-54",
    name: "Shivani Meena",
    role: "Machine learning Engineer",
    year: "1st",
    image: "/team/Shivani_Meena.jpg",
    socialLinks: {
      instagram: "",
      linkedin: "",
      github: "",
    },
  },
  {
    id: "team-68",
    name: "Vidhi Jain",
    role: "Machine learning Engineer and CR",
    year: "1st",
    image: "/team/Vidhi_Jain.jpg",
    socialLinks: {
      instagram: "https://www.instagram.com/_vidhi_1007",
      linkedin: "https://www.linkedin.com/in/vidhi-jain-17028338b",
      github: "",
    },
  },
  {
    id: "team-16",
    name: "Pranshu Verma",
    role: "CR and IOT",
    year: "1st",
    image: "/team/Pranshu_Verma.jpg",
    socialLinks: {
      instagram: "https://www.instagram.com/pranshu_v06",
      linkedin: "https://www.linkedin.com/in/pranshu06",
      github: "",
    },
  },
  {
    id: "team-9",
    name: "Prawin Kumar",
    role: "DSA IOT",
    year: "1st",
    image: "/team/Prawinkumarmahto.jpg",
    socialLinks: {
      instagram: "https://www.instagram.com/pranshu_v06",
      linkedin: "https://www.linkedin.com/in/prawin-kumar-a1a6b1382",
      github: "",
    },
  },
  {
    id: "team-4",
    name: "VIVEK YADAV",
    role: "DSA and IOT",
    year: "1st",
    image: "/team/Vivekyadav.jpeg",
    socialLinks: {
      instagram: "https://www.instagram.com/vivek_yadavvvv",
      linkedin: "https://www.linkedin.com/in/vivek-yadav-9065a6380",
      github: "",

    },
  },
  {
    id: "team-7",
    name: "Sumit Sharma",
    role: "Web developer",
    year: "2",
    image: "/team/Sumit_Sharma.jpg",
    socialLinks: {
      instagram: "https://www.instagram.com/sumitsharma2168/",
      linkedin: "https://www.linkedin.com/in/sumit-sharma-87252132b",
      github: "https://github.com/sumitsharma1824",
    },
  },
  {
    id: "team-47",
    name: "Sahil Mansuri",
    role: "DSA",
    year: "1st",
    image: "/team/Sahil_Mansuri.jpg",
    socialLinks: {
      
      instagram: "",
      linkedin: "https://www.linkedin.com/in/sahil-mansuri-486aaa387",
      github: "https://github.com/sahilmns",
    },
  },

];

export const posts: Post[] = [
  {
    id: "post-1",
    title: "Top 10 Hidden Gems in Southeast Asia",
    description: "Discover the most breathtaking and lesser-known destinations across Southeast Asia that will leave you speechless.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop",
    authorId: "founder-1",
  },
  {
    id: "post-2",
    title: "How AI is Revolutionizing Travel Planning",
    description: "Explore how artificial intelligence and machine learning are transforming the way we plan and experience travel.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    authorId: "founder-2",
  },
  {
    id: "post-3",
    title: "Budget Travel Tips for 2024",
    description: "Learn the best strategies to explore the world without breaking the bank. Travel smart, travel more!",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
    authorId: "team-1",
  },
  {
    id: "post-4",
    title: "Designing for Wanderlust: UI Trends in Travel Apps",
    description: "A deep dive into the latest design trends that make travel applications more engaging and user-friendly.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    authorId: "team-2",
  },
  {
    id: "post-5",
    title: "Sustainable Travel: A Guide to Eco-Tourism",
    description: "How to minimize your carbon footprint while maximizing your travel experiences across the globe.",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop",
    authorId: "team-4",
  },
  {
    id: "post-6",
    title: "The Ultimate Road Trip Playlist",
    description: "Curated songs and podcasts to make your road trip memorable. Hit the road with the perfect soundtrack!",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    authorId: "team-5",
  },
];

export const getAllMembers = (): (Founder | TeamMember)[] => {
  return [...founders, ...teamMembers];
};

export const getMemberById = (id: string): Founder | TeamMember | undefined => {
  return getAllMembers().find((member) => member.id === id);
};

export const getPostsByAuthor = (authorId: string): Post[] => {
  return posts.filter((post) => post.authorId === authorId);
};