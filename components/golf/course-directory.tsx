"use client";

import type { Course } from "@/lib/golf/types";

interface CourseWithStats extends Course {
  timesPlayed: number;
  bestScore: number;
  avgScore: number;
}

interface CourseDirectoryProps {
  courses: CourseWithStats[];
}

export function CourseDirectory({ courses }: CourseDirectoryProps) {
  return (
    <div className="rounded-xl border border-[#e0e0d8] bg-white shadow-sm">
      <div className="border-b border-[#e0e0d8] p-4 sm:p-5">
        <h2 className="text-lg font-bold text-[#1a1a1a]">My Courses</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group flex flex-col overflow-hidden rounded-lg border border-[#e0e0d8] transition-shadow hover:shadow-md"
          >
            {/* Course image placeholder */}
            <div className="relative h-28 bg-[#1a3c27]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white/20">{course.name[0]}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#1a3c27]/80 p-2 backdrop-blur-sm">
                <p className="truncate text-sm font-semibold text-white">{course.name}</p>
                <p className="flex items-center gap-1 text-xs text-white/70">
                  <MapPinIcon />
                  {course.location}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-3">
              <div className="flex items-center justify-between text-xs text-[#888888]">
                <span>Par {course.par}</span>
                <span>{course.timesPlayed} rounds</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <TrophyIcon />
                  <span className="text-sm font-bold text-[#1a1a1a]">{course.bestScore}</span>
                  <span className="text-xs text-[#888888]">best</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUpIcon />
                  <span className="text-sm font-bold text-[#1a1a1a]">{course.avgScore}</span>
                  <span className="text-xs text-[#888888]">avg</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2d7a3e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2d7a3e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
