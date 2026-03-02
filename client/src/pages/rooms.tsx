import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rooms } from "@/lib/rooms";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Rooms() {
  return (
    <div className="pt-20">
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-primary text-sm font-medium tracking-[0.2em] uppercase"
            >
              Our Facilities
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl lg:text-5xl font-bold mt-3"
            >
              Premium Spaces Designed for Success
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-muted-foreground leading-relaxed"
            >
              Each space at Qucoon Studio is meticulously designed to provide the
              perfect environment for your business needs. Located on the 10th floor
              of Churchgate Tower II, Victoria Island, Lagos.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {rooms.map((room, idx) => (
        <section
          key={room.id}
          data-testid={`section-room-${room.id}`}
          className={`py-16 lg:py-24 ${idx % 2 === 0 ? "bg-card" : "bg-background"}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-10 lg:gap-16`}
            >
              <motion.div variants={fadeUp} custom={0} className="lg:w-1/2">
                <div className="relative rounded-md overflow-hidden aspect-video">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge variant="secondary">
                    {room.capacity} seats
                  </Badge>
                  <Badge variant="outline">
                    10th Floor
                  </Badge>
                </div>

                <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">
                  {room.name}
                </h2>
                <p className="text-primary text-sm font-medium mb-4">
                  {room.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {room.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">
                    Features & Equipment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {room.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">
                    Available Layouts
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {room.layouts.map((layout) => (
                      <Badge key={layout} variant="outline" className="no-default-active-elevate">
                        {layout}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/book">
                    <Button data-testid={`button-room-book-${room.id}`} size="sm">
                      Book This Room
                      <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">Churchgate Tower II, Churchgate Street, Victoria Island, Lagos</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-2xl lg:text-3xl font-bold mb-4"
            >
              Ready to Experience Excellence?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto mb-8"
            >
              Reserve your preferred space today and discover why leading organizations
              choose Qucoon Studio for their events.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Link href="/book">
                <Button data-testid="button-rooms-cta" size="lg">
                  Reserve a Space
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
