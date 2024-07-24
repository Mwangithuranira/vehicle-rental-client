import React from 'react';
import './styles/tips.scss';

const tips = [
  {
    title: "Book in Advance",
    description: "Especially during peak tourist seasons, due to unlimited availability.",
    icon: "📅",
  },
  {
    title: "Check the Insurance Coverage",
    description: "Ensure that the rental car comes with comprehensive insurance coverage.",
    icon: "🛡️",
  },
  {
    title: "Understand the Rental Agreement",
    description: "Read the rental agreement carefully, paying attention to terms and conditions, mileage limits, fuel policy, and any additional fees.",
    icon: "📄",
  },
  {
    title: "Check for Emergency Equipment",
    description: "Ensure the car is equipped with necessary emergency equipment such as a spare tire, jack, first aid kit, and fire extinguisher.",
    icon: "🧰",
  },
  {
    title: "Documentation",
    description: "Always carry your driving license, passport, rental agreement, and insurance documents when driving.",
    icon: "🛂",
  },
  {
    title: "Inspect the Vehicle",
    description: "Thoroughly inspect the vehicle for any pre-existing damages and report them to the rental company.",
    icon: "🔍",
  },
  {
    title: "Know the Road Rules",
    description: "Familiarize yourself with the local road rules and driving conditions in Kenya.",
    icon: "🚦",
  },
  {
    title: "Fuel Policy",
    description: "Understand the fuel policy. Some rentals require you to return the car with a full tank of fuel.",
    icon: "⛽",
  },
  {
    title: "Drive Safely",
    description: "Observe speed limits, wear seat belts, and avoid using your phone while driving.",
    icon: "🚗",
  },
  {
    title: "Emergency Contacts",
    description: "Keep a list of emergency contacts, including the rental company, local authorities, and emergency services.",
    icon: "📞",
  },
  {
    title: "Return the Car on Time",
    description: "Avoid late returns to prevent additional charges.",
    icon: "⏰",
  },
  {
    title: "Enjoy Your Trip",
    description: "Relax and enjoy your trip, exploring the beautiful sights and attractions of Kenya.",
    icon: "🌍",
  }
];

const TipsComponent: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">KeBest’s Top Tips for Renting a Car in Kenya</h1>
      <div className="tips-list">
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">
            <div className="tip-icon">{tip.icon}</div>
            <div className="tip-content">
              <h2 className="tip-title">{tip.title}</h2>
              <p className="tip-description">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsComponent;
