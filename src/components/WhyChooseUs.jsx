"use client";

import { FaShieldAlt, FaClock, FaWifi, FaHeadphones } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: FaShieldAlt,
    title: "Guaranteed Reservation",
    description:
      "Our real-time time-conflict engine ensures your selected slot is 100% reserved without double-booking.",
  },
  {
    icon: FaClock,
    title: "Flexible Hourly Slots",
    description:
      "Book for 1 hour or an entire study session. Transparent per-hour rates automatically calculated.",
  },
  {
    icon: FaWifi,
    title: "Modern Amenities",
    description:
      "All rooms feature high-speed Wi-Fi, power outlets, whiteboards, and climate control.",
  },
  {
    icon: FaHeadphones,
    title: "Acoustic Noise Control",
    description:
      "Private study pods designed specifically for deep focus, exam prep, and group collaborations.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200/40 border-y border-base-300">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            Why Students Choose <span className="text-primary">StudyNook</span>
          </h2>
          <p className="mt-3 text-sm text-base-content/70">
            Designed to remove the friction of finding quiet study spaces during exams and project crunch time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="card border border-base-300 bg-base-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-base-content">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs text-base-content/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
