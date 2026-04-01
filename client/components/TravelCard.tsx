"use client";

import { useState, useCallback } from "react";
import { TravelPackage } from "@/constants/travelPackages";

// ── helpers ────────────────────────────────────────────────────────────────

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-green-500" : "text-gray-300"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

// ── Image Carousel ─────────────────────────────────────────────────────────

function ImageCarousel({ images, savings }: { images: string[]; savings: number }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length]
  );

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-t-2xl group">
      {/* Images */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            draggable={false}
          />
        ))}
      </div>

      {/* Savings badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1 bg-blue-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-md">
        <TagIcon />
        Save INR {formatINR(savings)}
      </div>

      {/* Arrows — visible on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`rounded-full transition-all duration-200 ${
                i === current ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Card ──────────────────────────────────────────────────────────────

interface TravelCardProps {
  pkg: TravelPackage;
}

export default function TravelCard({ pkg }: TravelCardProps) {
  const fullStars = Math.floor(pkg.rating);
  const hasHalf = pkg.rating % 1 >= 0.5;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl shadow-olive-700 transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 w-full max-w-sm">
      {/* Image Carousel */}
      <ImageCarousel images={pkg.images} savings={pkg.savings} />

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Duration + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">{pkg.duration}</span>
          <div className="flex items-center gap-1">
            <StarIcon filled={true} />
            <span className="text-sm font-bold text-gray-800">{pkg.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({pkg.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2">
          {pkg.title}
        </h3>

        {/* Itinerary Pills */}
        <div className="flex flex-wrap gap-2">
          {pkg.itinerary.map((stop) => (
            <span
              key={stop.city}
              className="inline-flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              <span className="text-blue-900 font-bold">{stop.days}D</span> {stop.city}
            </span>
          ))}
        </div>

        {/* Sale Badge */}
        {pkg.badge && (
          <div className="inline-flex">
            <span className="bg-blue-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide">
              {pkg.badge}
            </span>
          </div>
        )}

        {/* Pricing */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-400 line-through">
              INR {formatINR(pkg.originalPrice)}
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
              SAVE INR {formatINR(pkg.savings)}
            </span>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
            INR {formatINR(pkg.discountedPrice)}{" "}
            <span className="text-sm font-normal text-gray-500">/Adult</span>
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-2 mt-auto pt-1">
          <button
            aria-label="Call us"
            className="flex-shrink-0 flex items-center justify-center border-2 border-blue-900 text-blue-900 hover:bg-blue-50 rounded-xl p-3 transition-colors duration-200"
          >
            <PhoneIcon />
          </button>
          <button className="flex-1 bg-blue-900 hover:bg-black active:scale-95 text-white font-bold text-sm py-3 rounded-xl transition-all duration-200 shadow-sm shadow-orange-200">
            Request Callback
          </button>
        </div>
      </div>
    </div>
  );
}


