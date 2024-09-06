import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" color="white" width="3em" height="3em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 18V8.5A4.5 4.5 0 0 1 8.5 4h7A4.5 4.5 0 0 1 20 8.5v7a4.5 4.5 0 0 1-4.5 4.5H6a2 2 0 0 1-2-2" /><path d="M8 12h3.5a2 2 0 1 1 0 4H8V9a1 1 0 0 1 1-1h1.5a2 2 0 1 1 0 4H9m7 4h.01" /></g></svg>
    ),
    title: "Automated Trip Booking",
    paragraph: 'Say goodbye to the hassle of manual bookings. Our smart automation technology handles all your Amazon Relay trip bookings seamlessly.',
    btn: "Learn More",
    btnLink: "/#",
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" color="white" width="3em" height="3em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.87 10.48a9 9 0 1 0-7.876 10.465M9 10h.01M15 10h.01" /><path d="M9.5 15c.658.64 1.56 1 2.5 1c.357 0 .709-.052 1.043-.151M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H17m2 0v1m0-8v1" /></g></svg>
    ),
    title: "Cost-Effective Solution",
    paragraph: 'Enjoy premium features at an affordable monthly fee, designed to fit any budget while maximizing your operational efficiency.',
    btn: "Learn More",
    btnLink: "/#",
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" color="white" width="3em" height="3em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0m0 17v-5l-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4l-1 1v5m6-17a2 2 0 1 0 4 0a2 2 0 1 0-4 0m0 17v-4h-2l2-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1l2 6h-2v4" /></svg>
    ),
    title: "User-Friendly Interface",
    paragraph: "No tech skills? No problem! Our intuitive design ensures anyone can set up and start using Joker Relay in minutes.",
    btn: "Learn More",
    btnLink: "/#",
  },
  {
    id: 4,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" color="white" width="3em" height="3em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8m-8 4h6m-1 7l-1 1l-3-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5.5M19 16l-2 3h4l-2 3" /></svg>
    ),
    title: "Real-Time Alerts",
    paragraph: 'Stay in the loop with instant notifications about your trip bookings, allowing you to manage your fleet proactively.',
    btn: "Learn More",
    btnLink: "/#",
  },

];
export default featuresData;
