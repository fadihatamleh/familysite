import { motion } from "framer-motion";
import { Camera, Calendar, Users, ChevronDown, MapPin } from "lucide-react";
import { IMAGES } from "@/assets/images";
import { AlbumCard } from "@/components/AlbumCard";
import { albums, events, familyMembers, eventTypeIcons } from "@/lib/data";
import { useEffect, useState } from "react";
import { fetchDriveAlbums, driveConfigured } from "@/lib/googleDrive";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 30 } },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 px-3 py-1 bg-primary/10 rounded-full">
        {label}
      </span>
      <h2
        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground max-w-xl mx-auto text-base">{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const [displayAlbums, setDisplayAlbums] = useState(albums);
  useEffect(() => {
    if (!driveConfigured()) return;
    fetchDriveAlbums().then((driveAlbums) => {
      if (driveAlbums.length > 0) setDisplayAlbums(driveAlbums);
    });
  }, []);
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.FAMILY_6}
            alt="Family"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(80,30,10,0.72) 0%, rgba(40,15,5,0.55) 60%, rgba(20,10,5,0.40) 100%)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center mx-auto mb-6"
          >
            <Camera className="w-7 h-7 text-white" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/80 text-sm uppercase tracking-widest mb-4 font-medium"
          >
            Welcome to
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 250, damping: 28 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Family
            <br />
            <span className="text-amber-300">Memories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed"
          >
            A private space to collect, share, and relive every precious moment — together.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-8 flex-wrap mb-10"
          >
            {[
              { icon: Camera, value: "336+", label: "Photos" },
              { icon: Calendar, value: "5", label: "Events" },
              { icon: Users, value: "4", label: "Members" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 text-amber-300 mb-1" />
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</span>
                <span className="text-white/60 text-xs uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Scroll cue */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={() => document.getElementById("albums")?.scrollIntoView({ behavior: "smooth" })}
            className="text-white/60 hover:text-white flex flex-col items-center gap-2 mx-auto transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </section>

      {/* ── ALBUMS ───────────────────────────────────────────────────── */}
      <section id="albums" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <SectionHeading
              label="Photo Albums"
              title="Our Treasured Albums"
              subtitle="Browse through collections of photos organized by occasions, seasons, and milestones."
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerParent}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayAlbums.map((album) => (
              <motion.div key={album.id} variants={fadeUp}>
                <AlbumCard album={album} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS TIMELINE ──────────────────────────────────────────── */}
      <section id="events" className="py-24 px-6 bg-muted/40">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <SectionHeading
              label="Family Events"
              title="Milestones & Celebrations"
              subtitle="The key moments and events that have brought us all together."
            />
          </motion.div>

          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-px"
              style={{ background: "linear-gradient(to bottom, transparent, var(--primary), transparent)" }}
            />

            <div className="flex flex-col gap-10">
              {events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-md" />

                  {/* Card — alternating sides on desktop */}
                  <div className={`ml-14 md:ml-0 md:w-5/12 ${idx % 2 === 0 ? "md:pr-10" : "md:pl-10 md:ml-auto"}`}>
                    <div
                      className="bg-card border border-border rounded-xl overflow-hidden"
                      style={{ boxShadow: "0 4px 20px -4px rgba(139,69,19,0.10)" }}
                    >
                      <div className="h-40 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{eventTypeIcons[event.type]}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.date}
                          </span>
                        </div>
                        <h3
                          className="font-semibold text-card-foreground text-base mb-2"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAMILY MEMBERS ───────────────────────────────────────────── */}
      <section id="family" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <SectionHeading
              label="Our Family"
              title="The People We Love"
              subtitle="Every smile, every story — it all starts with the people who matter most."
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerParent}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {familyMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
                style={{ boxShadow: "0 4px 16px -4px rgba(139,69,19,0.08)" }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3
                  className="font-semibold text-card-foreground text-base mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {member.name}
                </h3>
                <p className="text-xs text-primary font-medium mb-3 uppercase tracking-wide">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CALL TO ACTION ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden text-center py-16 px-8"
            style={{ background: "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 100%)" }}
          >
            {/* Background image overlay */}
            <img
              src={IMAGES.FAMILY_4}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
            />
            <div className="relative z-10">
              <p className="text-white/80 text-sm uppercase tracking-widest mb-3 font-medium">Share the love</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Add Your Memories
              </h2>
              <p className="text-white/75 max-w-md mx-auto mb-8 text-base">
                Have photos from our last gathering? Share them with the family and keep the album growing.
              </p>
              <button
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                onClick={() => alert("Upload feature — connect to your storage provider to enable this!")}
              >
                <Camera className="w-4 h-4" />
                Upload Photos
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
