import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { rooms } from "@/lib/rooms";
import { ArrowRight, MapPin, Users, Monitor, Lightbulb, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const services = [
  {
    title: "Training Facilities",
    description: "High-end, flexible training environments with cutting-edge technology for corporate development programs.",
    icon: Users,
  },
  {
    title: "Meeting Rooms",
    description: "Premium boardroom spaces designed for executive meetings and high-stakes business discussions.",
    icon: Monitor,
  },
  {
    title: "Seminar Halls",
    description: "State-of-the-art seminar rooms with superior sound, video, and adaptable lighting systems.",
    icon: Lightbulb,
  },
  {
    title: "Equipment Rentals",
    description: "Professional-grade studio equipment available for rental, from displays to audio-visual systems.",
    icon: Monitor,
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt="Lagos Victoria Island skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-primary font-medium text-sm tracking-[0.3em] uppercase mb-6">
              Premium Facility Rentals
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Where Business<br />
              Meets <span className="text-primary">Excellence</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              World-class training facilities, meeting rooms, and seminar halls at
              Churchgate Tower II, Victoria Island, Lagos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/book">
              <Button data-testid="button-hero-book" size="lg" className="min-w-[200px]">
                Reserve a Space
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/rooms">
              <Button
                data-testid="button-hero-explore"
                variant="outline"
                size="lg"
                className="min-w-[200px] text-white border-white/30 bg-white/5 backdrop-blur-sm"
              >
                Explore Facilities
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 flex items-center justify-center gap-2 text-white/50 text-sm"
          >
            <MapPin className="w-4 h-4" />
            <span>Churchgate Tower II, Victoria Island, Lagos</span>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-primary text-sm font-medium tracking-[0.2em] uppercase"
            >
              Our Services
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl lg:text-4xl font-bold mt-3"
            >
              Comprehensive Facility Solutions
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-muted-foreground max-w-xl mx-auto"
            >
              A cost-effective alternative to 5-star hotels, delivering speed, flexibility,
              and uncompromising quality.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="p-6 h-full border-border/50">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-primary text-sm font-medium tracking-[0.2em] uppercase"
            >
              Our Facilities
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl lg:text-4xl font-bold mt-3"
            >
              Premium Spaces for Every Occasion
            </motion.h2>
          </motion.div>

          <div className="space-y-20">
            {rooms.map((room, i) => (
              <motion.div
                key={room.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                <motion.div variants={fadeUp} custom={0} className="lg:w-1/2">
                  <div className="relative rounded-md overflow-hidden aspect-video">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-md">
                        Up to {room.capacity} seats
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} custom={1} className="lg:w-1/2">
                  <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-2">
                    {room.id === "clinton" ? "01" : room.id === "obama" ? "02" : "03"}
                  </p>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-3">
                    {room.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {room.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {room.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/book">
                      <Button data-testid={`button-book-${room.id}`} size="sm">
                        Book This Room
                        <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href="/rooms">
                      <Button
                        data-testid={`button-details-${room.id}`}
                        variant="outline"
                        size="sm"
                      >
                        View Details
                        <ChevronRight className="ml-1 w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-md overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src="/images/hero-bg.png"
                alt="Lagos skyline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
            </div>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="relative z-10 py-16 lg:py-24 px-8 lg:px-16 max-w-2xl"
            >
              <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Value Proposition
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
                A Cost-Effective Alternative to 5-Star Hotels
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Experience premium facilities with unmatched flexibility. Our spaces adapt to
                your needs while maintaining the highest standards of quality and professionalism.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 mb-8">
                <div>
                  <p className="text-3xl font-bold text-primary">3</p>
                  <p className="text-white/60 text-sm mt-1">Premium Spaces</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">71</p>
                  <p className="text-white/60 text-sm mt-1">Total Capacity</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">10th</p>
                  <p className="text-white/60 text-sm mt-1">Floor Views</p>
                </div>
              </div>
              <Link href="/book">
                <Button data-testid="button-cta-book" size="lg">
                  Reserve Your Space Today
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-primary text-sm font-medium tracking-[0.2em] uppercase"
            >
              Our Team
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl lg:text-4xl font-bold mt-3"
            >
              Account & Relationship Managers
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { name: "John Smith", email: "john.smith@Qucoon.com" },
              { name: "Emily Johnson", email: "emily.johnson@Qucoon.com" },
              { name: "Daniel Williams", email: "daniel.williams@Qucoon.com" },
              { name: "Olivia Brown", email: "olivia.brown@Qucoon.com" },
              { name: "Lota Okeke", email: "Lota.Okeke@qucoon.com" },
              { name: "Michael Taylor", email: "michael.taylor@Qucoon.com" },
            ].map((person, i) => (
              <motion.div key={person.email} variants={fadeUp} custom={i}>
                <Card className="p-5 border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-semibold text-sm">
                        {person.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{person.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{person.email}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
