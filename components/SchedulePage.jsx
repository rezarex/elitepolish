'use client'

import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, Clock, Calendar, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import {API_BASE_URL} from '../config/config'
import Navbar from './Navbar';


const BOOKING_API = `${API_BASE_URL}/booking/add`;

const SERVICES = [
    { id: 'S01', name: 'Standard Maintenance', description: 'Recurring upkeep for pristine homes.' },
    { id: 'S02', name: 'Deep Cleaning', description: 'Top-to-bottom restoration and sanitization.' },
    { id: 'S03', name: 'Move-In / Move-Out', description: 'Total-void cleaning for property transitions.' },
    { id: 'S04', name: 'Airbnb Turnover', description: '5-star hospitality cleaning and staging.' },
    { id: 'S05', name: 'Medical Office', description: 'Clinical-grade sanitation and disinfection.' },
    { id: 'S06', name: 'Post-Construction', description: 'Heavy-duty dust and debris removal.' },
    { id: 'S07', name: 'Handyman Services', description: 'Professional repairs, mounting, and assembly.' },
    { id: 'S08', name: 'Gutter Cleaning', description: 'Safety-first debris removal and drainage check.' },
    { id: 'S09', name: 'Pressure Washing', description: 'Soft-wash and high-pressure exterior restoration.' },
];

const TIME_SLOTS = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
];

// --- MODAL COMPONENT ---

const MessageModal = ({ message, type, onClose }) => {
    if (!message) return null;

    const Icon = type === 'error' ? AlertTriangle : (type === 'loading' ? Loader2 : CheckCircle);
    const color = type === 'error' ? 'text-red-500' : (type === 'loading' ? 'text-blue-500' : 'text-green-500');

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
                <Icon size={48} className={`mx-auto mb-4 ${color} ${type === 'loading' ? 'animate-spin' : ''}`} />
                <h4 className="text-xl font-bold mb-4 text-slate-800">
                    {type === 'loading' ? 'Submitting Request...' : (type === 'error' ? 'Submission Failed' : 'Success')}
                </h4>
                <p className="text-gray-600 mb-6">{message}</p>
                {type !== 'loading' && (
                    <button
                        onClick={onClose}
                        className={`w-full py-2 rounded-lg font-bold transition ${type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#0f172a] hover:bg-slate-700 text-white'}`}
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
};


// --- STEP COMPONENTS ---

// Step 1: Service Selection
const Step1Service = ({ bookingData, updateData, setStep }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-3xl font-serif text-[#0f172a]">1. Choose Your Service</h3>
            <div className="grid md:grid-cols-3 gap-6">
                {SERVICES.map(service => (
                    <button
                        key={service.id}
                        onClick={() => updateData('service', service)}
                        className={`p-6 border-2 rounded-lg text-left transition-all shadow-md
                            ${bookingData.service.id === service.id 
                                ? 'border-[#d4af37] ring-4 ring-[#d4af37]/30 bg-[#fcf8e5]' 
                                : 'border-gray-200 hover:border-gray-400 bg-white'
                            }`}
                    >
                        <h4 className="text-xl font-bold font-serif mb-1 text-slate-800">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        {/* Removed price display as per user's input */}
                    </button>
                ))}
            </div>
            
            <div className="flex justify-end pt-4">
                <button
                    className="bg-[#0f172a] hover:bg-slate-700 text-white px-8 py-3 rounded-sm font-bold transition shadow-lg disabled:opacity-50"
                    onClick={() => setStep(2)}
                    disabled={!bookingData.service.id}
                >
                    Next: Date & Time <ChevronRight size={18} className="inline ml-1" />
                </button>
            </div>
        </div>
    );
};

// Step 2: Date and Time Selection
const Step2Schedule = ({ bookingData, updateData, setStep }) => {

    const handleDateChange = (e) => {
        updateData('bookingDate', e.target.value);
        // Reset time if date changes
        updateData('timeslot', '');
    };
    
    // Function to format today's date for input min attribute
    const getMinDate = () => new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-6">
            <h3 className="text-3xl font-serif text-[#0f172a]">2. Schedule Your Appointment</h3>
            
            <div className="grid md:grid-cols-2 gap-6 font-sans">
                {/* Date Picker */}
                <div>
                    <label htmlFor="bookingDate" className="block text-sm font-medium mb-2">Select Date</label>
                    <input
                        type="date"
                        id="bookingDate"
                        value={bookingData.bookingDate}
                        onChange={handleDateChange}
                        min={getMinDate()}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                    />
                </div>
                
                {/* Time Slots */}
                <div>
                    <label className="block text-sm font-medium mb-2">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map(slot => {
                            const isSelected = bookingData.timeslot === slot;
                            return (
                                <button
                                    key={slot}
                                    // CRITICAL FIX: Changed 'time' to 'timeslot' to match bookingData state
                                    onClick={() => updateData('timeslot', slot)}
                                    disabled={!bookingData.bookingDate} 
                                    className={`p-3 text-sm rounded-lg font-medium transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed
                                        ${isSelected 
                                                ? 'bg-[#d4af37] text-white shadow-lg' 
                                                : 'bg-gray-100 hover:bg-gray-200 text-slate-800'}`}
                                >
                                    {slot.split(' - ')[0]}
                                </button>
                            );
                        })}
                    </div>
                    {bookingData.bookingDate && <p className="text-xs mt-2 text-gray-500">Availability shown for {bookingData.bookingDate}.</p>}
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
                    className="bg-[#0f172a] hover:bg-slate-700 text-white px-8 py-3 rounded-sm font-bold transition shadow-lg disabled:opacity-50"
                    onClick={() => setStep(3)}
                    disabled={!bookingData.bookingDate || !bookingData.timeslot}
                >
                    Next: Your Details <ChevronRight size={18} className="inline ml-1" />
                </button>
            </div>
        </div>
    );
};

// Step 3: User Details
const Step3Details = ({ bookingData, updateData, setStep, handleSubmit, isLoading }) => {
    const isFormValid = bookingData.name.trim() !== '' && 
                        bookingData.phone.trim() !== '' && 
                        bookingData.address.trim() !== '';

    return (
      <div className="space-y-6">
        <h3 className="text-3xl font-serif text-[#0f172a]">3. Your Details & Project Scope</h3>
        <div className="grid md:grid-cols-2 gap-6 font-sans">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">Full Name</label>
            <input
              type="text"
              value={bookingData.name}
              onChange={(e) => updateData('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
              placeholder="John Doe"
              disabled={isLoading} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">Phone Number</label>
            <input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => updateData('phone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
              placeholder="(555) 123-4567"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="font-sans">
          <label className="block text-sm font-medium mb-2 text-slate-700">Service Address</label>
          <input
            type="text"
            value={bookingData.address}
            onChange={(e) => updateData('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
            placeholder="123 Luxury Lane, Toronto, ON"
            disabled={isLoading}
          />
        </div>

        {/* --- NEW FIELD: PROJECT NOTES --- */}
        <div className="font-sans">
          <label className="block text-sm font-medium mb-2 text-slate-700 font-bold">Project Details (Optional)</label>
          <p className="text-xs text-gray-500 mb-2">Please describe the specific tasks (e.g., "Mounting 65 inch TV" or "3-bedroom post-reno clean")</p>
          <textarea
            value={bookingData.notes || ''}
            onChange={(e) => updateData('notes', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
            placeholder="Tell us more about the job to help us provide an accurate quote..."
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            className="text-gray-600 hover:text-[#0f172a] font-bold transition disabled:opacity-50"
            onClick={() => setStep(2)}
            disabled={isLoading}
          >
            &larr; Back
          </button>
          <button
            className="bg-[#0f172a] hover:bg-slate-700 text-white px-8 py-3 rounded-sm font-bold transition shadow-lg disabled:opacity-50 flex items-center justify-center"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
                <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Processing...
                </>
            ) : (
                'Request My Quote'
            )}
          </button>
        </div>
      </div>
    );
};

// Step 4: Confirmation/Summary
const Step4Confirmation = ({ bookingData }) => {
    const { service, bookingDate, timeslot, name, phone, address } = bookingData;
    
    // Safety check for confirmation display, uses service.name
    const serviceName = service?.name || 'Service Not Selected';

    return (
        <div className="space-y-6 text-center p-12 bg-white rounded-xl shadow-2xl">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-4xl font-serif text-[#0f172a] font-extrabold">Quote Requested!</h3>
            <p className="text-lg text-gray-600">
                Thank you, {name}! We have successfully logged your service request and will be in touch shortly to finalize the details and provide a precise quote.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg text-left inline-block w-full max-w-md mx-auto">
                <h4 className="text-xl font-bold border-b pb-2 mb-3 text-slate-800">Your Booking Summary</h4>
                <div className="space-y-2 text-sm">
                    <p className="flex justify-between"><strong>Service:</strong> <span className="font-semibold text-[#d4af37]">{serviceName}</span></p>
                    <p className="flex justify-between"><strong>Date:</strong> <span>{bookingDate}</span></p>
                    <p className="flex justify-between"><strong>Time Slot:</strong> <span>{timeslot}</span></p>
                    <p className="flex justify-between"><strong>Address:</strong> <span>{address}</span></p>
                    <p className="flex justify-between"><strong>Contact:</strong> <span>{phone}</span></p>
                </div>
            </div>
            <p className="text-sm text-gray-500 pt-4">The booking data was successfully sent.</p>
        </div>
    );
};


// --- MAIN APP COMPONENT ---

export default function BookingApp() {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        service: {},
        bookingDate: '',
        timeslot: '',
        name: '',
        phone: '',
        address: ''
    });
    // State for API submission feedback
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Universal function to update booking data
    const updateData = (field, value) => {
        setBookingData(prev => ({ ...prev, [field]: value }));
    };

 
    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessage(''); // Clear previous errors

        try {
            // Construct the desired payload format
            const payload = {
                name: bookingData.name,
                bookingDate: bookingData.bookingDate,
                timeslot: bookingData.timeslot,
                phone: bookingData.phone,
                address: bookingData.address,
                // CRITICAL CHANGE: Extract only the service name string
                service: bookingData.service?.name || 'Unknown Service' 
            };
            
            // --- LOGGING THE PAYLOAD ---
            console.log("--- STARTING API SUBMISSION ---");
            // Log the newly constructed payload
            console.log("Payload to be sent", JSON.stringify(payload, null, 2));
            console.log(BOOKING_API);
            
            console.log("-----------------------------");
            // -----------------------------

            const response = await fetch(BOOKING_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Send the modified payload
            });

            if (!response.ok) {
                // If response is not 2xx, throw an error
                let errorDetails = `Status: ${response.status}`;
                try {
                    const errorJson = await response.json();
                    errorDetails += ` - ${errorJson.message || JSON.stringify(errorJson)}`;
                } catch (e) {
                    // Handle non-JSON responses
                    errorDetails += ' - Non-JSON response received.';
                }
                throw new Error(`Booking submission failed. ${errorDetails}`);
            }

            // Successful submission
            console.log("Booking successfully submitted to /api/booking.");
            setStep(4); // Advance to confirmation step

        } catch (error) {
            console.error("Submission Error:", error.message);
            // Display error to the user via modal
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1Service bookingData={bookingData} updateData={updateData} setStep={setStep} />;
            case 2:
                return <Step2Schedule bookingData={bookingData} updateData={updateData} setStep={setStep} />;
            case 3:
                // Pass isLoading state to Step 3
                return <Step3Details 
                            bookingData={bookingData} 
                            updateData={updateData} 
                            setStep={setStep} 
                            handleSubmit={handleSubmit}
                            isLoading={isLoading} 
                        />;
            case 4:
                return <Step4Confirmation bookingData={bookingData} />;
            default:
                return <Step1Service bookingData={bookingData} updateData={updateData} setStep={setStep} />;
        }
    };
    
    // Status Bar to track progress
    const steps = [
        { label: 'Service', icon: Zap, step: 1 },
        { label: 'Schedule', icon: Calendar, step: 2 },
        { label: 'Details', icon: Clock, step: 3 },
        { label: 'Confirm', icon: CheckCircle, step: 4 }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 font-sans">
            <Navbar/>
            <MessageModal 
                message={errorMessage} 
                type="error" 
                onClose={() => setErrorMessage('')} 
            />

            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-2xl border-t-8 border-[#d4af37]">
                <h1 className="text-4xl sm:text-5xl font-serif text-[#0f172a] mb-8 text-center font-extrabold">
                    Schedule Your Elite Polish Service
                </h1>
                
                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 mx-6" />
                    {steps.map((s, index) => (
                        <div key={s.step} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors duration-500
                                ${step >= s.step 
                                    ? 'bg-[#d4af37] text-white shadow-md' 
                                    : 'bg-gray-200 text-gray-500'
                                }`}>
                                <s.icon size={20} />
                            </div>
                            <span className={`text-sm font-semibold hidden sm:block ${step >= s.step ? 'text-[#0f172a]' : 'text-gray-500'}`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Render Current Step */}
                {renderStep()}
            </div>
        </div>
    );
}