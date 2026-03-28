"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingBar = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState<Date | null>(null);
  const [showTravellers, setShowTravellers] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy/Premium Economy");

  const travellersRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        travellersRef.current &&
        !travellersRef.current.contains(event.target as Node)
      ) {
        setShowTravellers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyTravellers = () => {
    setShowTravellers(false);
  };

  return (
    <div className="fixed left-0 w-full z-[49] bg-white backdrop-blur-md border rounded-3xl shadow-md p-6 transition-all duration-300">
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* From / To / Departure / Travellers */}
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
          {/* From */}
          <div>
            <h4>From :</h4>
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="px-6 py-3 rounded-lg w-full lg:w-48 text-lg  bg-amber-800"
            />
          </div>

          {/* To */}
          <div>
            <h4>To:</h4>
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="px-6 py-3 rounded-lg w-full lg:w-48 text-lg bg-amber-300"
            />
          </div>

          <div>
           <h4>Departure :</h4>
          {/* Departure */}
          <div className="w-full lg:w-48">
            <DatePicker
              selected={departure}
              onChange={(date: Date | null) => setDeparture(date)}
              placeholderText="Departure"
              className="w-full px-6 py-3 rounded-lg text-lg bg-amber-500"
              minDate={new Date()}
              />
          </div>
        </div>

          {/* Travellers */}
          <div>
 <h4>Travellers :</h4>
          <div className="relative w-full lg:w-64">
            <button
              className="w-full px-6 py-3 bg-slate-800 text-white rounded-lg text-left text-lg"
              onClick={() => setShowTravellers(!showTravellers)}
              >
              {adults} Adults, {children} Children, {infants} Infants -{" "}
              {travelClass}
            </button>

            
            {showTravellers && (
              <div
              ref={travellersRef}
              className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 w-full p-4 z-50"
              >
                {/* Adults */}
                <div className="mb-3">
                  <label className="block text-gray-600 font-semibold mb-1">
                    Adults (12y+)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded text-lg"
                  />
                </div>

                {/* Children */}
                <div className="mb-3">
                  <label className="block text-gray-600 font-semibold mb-1">
                    Children (2y - 12y)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded text-lg"
                  />
                </div>

                {/* Infants */}
                <div className="mb-3">
                  <label className="block text-gray-600 font-semibold mb-1">
                    Infants (below 2y)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={infants}
                    onChange={(e) => setInfants(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded text-lg"
                  />
                </div>

                {/* Travel Class */}
                <div className="mb-3">
                  <label className="block text-gray-600 font-semibold mb-1">
                    Travel Class
                  </label>
                  <select
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-lg"
                  >
                    <option>Economy/Premium Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>

                <button
                  onClick={handleApplyTravellers}
                  className="mt-3 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-lg"
                >
                  APPLY
                </button>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Price & Book */}
        <div className="flex flex-col lg:flex-row items-center gap-4 mt-4 lg:mt-0">
          <span className="font-bold text-2xl text-white">₹12,999</span>
          <button className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg text-lg hover:bg-cyan-400 hover:text-black transition">
            Select Date
          </button>
          <button className="bg-cyan-400 text-black px-8 py-3 rounded-lg text-lg hover:bg-cyan-300 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingBar;
