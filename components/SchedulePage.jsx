'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { CheckCircle, Home, AppWindow, Key } from 'lucide-react';

export default function SchedulePage() {
  const router = useRouter(); // Initialize router
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    address: '',
    phone: ''
  });

  const services = [
    { key: 'interior', title: 'The Interior Edit', icon: Home },
    { key: 'exterior', title: 'The Exterior Refresh', icon: AppWindow },
    { key: 'transition', title: 'The Transition', icon: Key },
  ];

  const updateData = (key, value) => {
    setBookingData(prev => ({ ...prev, [key]: value }));
  };

  const Step1 = () => (
    <div className="space-y-6">
      <h3 className="text-3xl font-serif text-[#0f172a]">1. Choose Service</h3>
      <p className="text-gray-600">Select the signature service that fits your needs.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map(s => (
          <button
            key={s.key}
            className={`p-6 border-2 rounded-lg text-left transition-all font-sans ${
              bookingData.service === s.key 
                ? 'border-[#d4af37] bg-[#fcf8e5] shadow-xl' 
                : 'border-gray-200 hover:border-[#d4af37]/50 bg-white'
            }`}
            onClick={() => updateData('service', s.key)}
          >
            <s.icon size={32} className={`mb-3 ${bookingData.service === s.key ? 'text-[#d4af37]' : 'text-[#0f172a]'}`} />
            <h4 className="font-bold text-lg">{s.title}</h4>
          </button>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <button
          className="bg-[#d4af37] hover:bg-[#b5952f] text-white px-8 py-3 rounded-sm font-bold transition disabled:opacity-50"
          onClick={() => setStep(2)}
          disabled={!bookingData.service}
        >
          Next: Date & Time
        </button>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <h3 className="text-3xl font-serif text-[#0f172a]">2. Select Date & Time</h3>
      <div className="grid md:grid-cols-2 gap-6 font-sans">
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date</label>
          <input
            type="date"
            value={bookingData.date}
            onChange={(e) => updateData('date', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Time Slot</label>
          <select
            value={bookingData.time}
            onChange={(e) => updateData('time', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
          >
            <option value="">Select a Time</option>
            <option value="9am-12pm">9:00 AM - 12:00 PM</option>
            <option value="12pm-3pm">12:00 PM - 3:00 PM</option>
            <option value="3pm-6pm">3:00 PM - 6:00 PM</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button
          className="text-gray-600 hover:text-[#0f172a] font-bold transition"
          onClick={() => setStep(1)}
        >
          &larr; Back
        </button>
        <button
          className="bg-[#d4af37] hover:bg-[#b5952f] text-white px-8 py-3 rounded-sm font-bold transition disabled:opacity-50"
          onClick={() => setStep(3)}
          disabled={!bookingData.date || !bookingData.time}
        >
          Next: Contact Details
        </button>
      </div>
    </div>
  );

  const Step3 = () => {
    const handleSubmit = () => {
      if (bookingData.name && bookingData.address && bookingData.phone) {
        setStep(4);
      } else {
        console.error("Please fill in all required fields.");
      }
    };
    
    return (
      <div className="space-y-6">
        <h3 className="text-3xl font-serif text-[#0f172a]">3. Your Details</h3>
        <div className="grid md:grid-cols-2 gap-6 font-sans">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={bookingData.name}
              onChange={(e) => updateData('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => updateData('phone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
        <div className="font-sans">
          <label className="block text-sm font-medium mb-2">Service Address</label>
          <input
            type="text"
            value={bookingData.address}
            onChange={(e) => updateData('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
            placeholder="123 Luxury Lane, Toronto, ON"
          />
        </div>
        <div className="flex justify-between pt-4">
          <button
            className="text-gray-600 hover:text-[#0f172a] font-bold transition"
            onClick={() => setStep(2)}
          >
            &larr; Back
          </button>
          <button
            className="bg-[#0f172a] hover:bg-slate-700 text-white px-8 py-3 rounded-sm font-bold transition shadow-lg"
            onClick={handleSubmit}
          >
            Confirm & Request Quote
          </button>
        </div>
      </div>
    );
  };

  const Step4 = () => (
    <div className="text-center py-12 px-6 font-sans">
      <CheckCircle size={64} className="text-[#d4af37] mx-auto mb-6" />
      <h3 className="text-4xl font-serif text-[#0f172a] mb-4">Consultation Requested!</h3>
      <p className="text-lg text-gray-700 mb-8">
        Thank you, <span className="font-bold">{bookingData.name}</span>! Your request for the <span className="font-bold">{services.find(s => s.key === bookingData.service).title}</span> 
        on <span className="font-bold">{bookingData.date}</span> at <span className="font-bold">{bookingData.time}</span> has been successfully submitted.
      </p>
      <p className="text-gray-600 mb-8">
        Our concierge team will review the details and contact you shortly at <span className="font-bold">{bookingData.phone}</span> 
        to confirm the final quote and schedule.
      </p>
      <button
        className="text-[#d4af37] border border-[#d4af37] hover:bg-[#d4af37] hover:text-white px-8 py-3 rounded-sm font-bold transition"
        onClick={() => router.push('/')} // Use router to navigate back to the home page
      >
        Return to Home Page
      </button>
    </div>
  );

  const steps = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
    4: <Step4 />,
  };

  const progress = (step / 4) * 100;

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto min-h-[70vh] font-sans">
      <div className="text-center mb-12">
        <h2 className="font-serif text-5xl text-[#0f172a]">Book Your Service</h2>
        <p className="text-gray-500 mt-2">A simple three-step process to reclaim your time.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#d4af37] transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
        {step < 4 && (
          <p className="text-center text-sm text-gray-500 mt-2">Step {step} of 3</p>
        )}
      </div>

      <div className="bg-white p-8 md:p-12 shadow-2xl rounded-lg border-t-4 border-[#0f172a]">
        {steps[step]}
      </div>
    </div>
  );
};