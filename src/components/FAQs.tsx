import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Lucide icon imports
import './styles/faqs.scss';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How does it work?',
    answer: 'You can rent a car by signing up on our platform, selecting a car, and making a payment. The car will be delivered to your location or you can pick it up from our designated locations.',
  },
  {
    question: 'Can I rent a car without a credit card?',
    answer: 'Yes, you can rent a car without a credit card. We accept various payment methods including debit cards, bank transfers, and digital wallets.',
  },
  {
    question: 'What are the requirements for renting a car?',
    answer: 'To rent a car, you need to have a valid driver’s license, be at least 21 years old, and provide proof of insurance.',
  },
  {
    question: 'Does Car Rental allow me to tow with or attach a hitch to the rental vehicle?',
    answer: 'No, our rental cars are not equipped to tow or have hitches attached to them.',
  },
  {
    question: 'Does Car Rental offer coverage products for purchase with my rental?',
    answer: 'Yes, we offer various coverage products that you can purchase with your rental to ensure you are fully protected during your rental period.',
  },
  {
    question: 'What happens if I return the car late?',
    answer: 'If you return the car late, you may be charged an additional fee. Please inform us in advance if you anticipate returning the car late.',
  },
  {
    question: 'Can I cancel my reservation?',
    answer: 'Yes, you can cancel your reservation. Please refer to our cancellation policy for more information on cancellations and refunds.',
  },
  {
    question: 'What if I have an accident?',
    answer: 'In case of an accident, please contact us immediately. We will guide you through the process of reporting the accident and filing a claim.',
  },
  {
    question: 'Can I extend my rental period?',
    answer: 'Yes, you can extend your rental period. Please contact us in advance to make arrangements for extending your rental period.',
  },
  {
    question: 'What if I have an emergency?',
    answer: 'In case of an emergency, please contact us immediately. We have a 24/7 customer service team that is available to assist you with any emergencies. Contact us using the details provided on landing page',
  }
];

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold">FAQs</h2>
        <p className="text-lg text-gray-600">Find answers to some of the most frequently asked questions below.</p>
      </div>
      <div className="mt-8 space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold">{faq.question}</h3>
              <div className={`chevron-icon ${openIndex === index ? 'open' : ''}`}>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>
            {openIndex === index && <p className="answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
