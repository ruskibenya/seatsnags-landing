import React, { useState } from "react";
import {
  Target,
  Bell,
  Zap,
  Check,
  ArrowRight,
  Mail,
  Shield,
  Database,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong sending your message. Please try again.");
    }
  };


  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen relative">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SeatSnags
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Join Waitlist
            </button>
          </motion.div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                Tickets on Your Terms
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Name Your Price for the{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Perfect Seat
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              SeatSnags is a next-generation ticket marketplace where buyers set
              the price. Place section-specific bids for live events, and our
              system automatically buys tickets when prices match — no manual
              searching, no hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 flex items-center"
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Join the Waitlist
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>

              <button
                className="border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-blue-400 px-8 py-4 text-lg font-semibold rounded-xl transition-colors"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn How It Works
              </button>
            </div>
          </motion.div>

          {/* Decorative orbs */}
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-60 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl -z-10" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get the tickets you want at the price you choose. It&apos;s that
              simple.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-slate-800">
                  01
                </div>
                <h3 className="text-2xl font-bold mb-4">Set Your Bid</h3>
                <p className="text-slate-400 leading-relaxed">
                  Choose your event and section, then name your price. Set the
                  maximum you&apos;re willing to pay and let our system do the
                  rest.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-slate-800">
                  02
                </div>
                <h3 className="text-2xl font-bold mb-4">We Track &amp; Alert</h3>
                <p className="text-slate-400 leading-relaxed">
                  Our system monitors verified listings from top partners,
                  searching 24/7 for your perfect match.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-slate-800">
                  03
                </div>
                <h3 className="text-2xl font-bold mb-4">Auto-Purchase</h3>
                <p className="text-slate-400 leading-relaxed">
                  When tickets hit your price, we buy them automatically. No
                  hidden fees, no last-minute stress — just your seats, secured.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Value props */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              "No Manual Searching",
              "No Hidden Fees",
              "Verified Partners Only",
              "Price You Control",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/30 rounded-lg px-6 py-4"
              >
                <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRUSTED / MARKET DATA */}
      <section className="py-24 px-6 bg-slate-950/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by Verified Market Data
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              SeatSnags connects with leading ticket exchanges and licensed
              brokers to ensure every purchase is verified and secure.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {[
              {
                icon: Shield,
                title: "Verified Sources",
                description:
                  "All partners are licensed and vetted ticket brokers",
              },
              {
                icon: Activity,
                title: "Live Data Streams",
                description:
                  "Real-time pricing and availability from multiple exchanges",
              },
              {
                icon: Database,
                title: "Aggregated Listings",
                description:
                  "Compare thousands of listings in one central marketplace",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-slate-500 text-sm">
              * Partner integrations launching in phases.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT / WAITLIST */}
      <section id="contact" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Stay in Touch
            </h2>
            <p className="text-xl text-slate-400">
              We&apos;re redefining how fans buy tickets. Get early access and
              be the first to know when we launch.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg bg-slate-900/50 border border-slate-700 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-lg bg-slate-900/50 border border-slate-700 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-lg bg-slate-900/50 border border-slate-700 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 resize-none"
                      placeholder="Tell us what events you're interested in..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Join the Waitlist
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                  <p className="text-slate-400">
                    We&apos;ve received your information. We&apos;ll be in touch
                    soon with updates on our launch.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SeatSnags
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                © 2025 SeatSnags LLC. All rights reserved.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <a
                href="mailto:info@seatsnags.com"
                className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                info@seatsnags.com
              </a>

              <div className="flex gap-4">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-700 hover:border-blue-500/50 text-sm font-semibold"
                >
                  𝕏
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-700 hover:border-blue-500/50 text-sm font-semibold"
                >
                  in
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors border border-slate-700 hover:border-blue-500/50 text-sm font-semibold"
                >
                  IG
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
