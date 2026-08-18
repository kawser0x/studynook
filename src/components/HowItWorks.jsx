"use client";

import { FaSearch, FaCalendarAlt, FaCheckCircle, FaDoorOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: FaSearch,
    title: "Browse & Search",
    description: "Search rooms by name, amenities, floor, or hourly rate.",
  },
  {
    number: "02",
    icon: FaCalendarAlt,
    title: "Select Date & Time",
    description: "Pick your preferred date and hourly slot (08:00 to 20:00).",
  },
  {
    number: "03",
    icon: FaCheckCircle,
    title: "Instant Confirmation",
    description: "Real-time conflict check reserves your spot with zero overlap.",
  },
  {
    number: "04",
    icon: FaDoorOpen,
    title: "Study & Manage",
    description: "Enjoy private study time and manage reservations in your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            How <span className="text-primary">StudyNook</span> Works
          </h2>
          <p className="mt-3 text-sm text-base-content/70">
            Book your private study space in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="relative rounded-2xl border border-base-300 bg-base-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-black text-primary/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-bold text-base-content">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
