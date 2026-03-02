import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer data-testid="footer" className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <span className="font-serif text-xl font-bold tracking-tight">
              <span className="text-primary">Q</span>ucoon
              <span className="text-xs font-sans font-normal tracking-widest uppercase ml-2 text-muted-foreground">
                Studio
              </span>
            </span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Premium training facilities, meeting rooms, seminar halls, and studio services
              in the heart of Victoria Island, Lagos.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Facilities</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/rooms">
                  <span data-testid="link-footer-clinton" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Clinton Training Room
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/rooms">
                  <span data-testid="link-footer-obama" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Obama Seminar Room
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/rooms">
                  <span data-testid="link-footer-kings" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    King's Space
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/book">
                  <span data-testid="link-footer-book" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Reserve a Space
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span data-testid="link-footer-contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Churchgate Tower II, Churchgate Street, Victoria Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+234 816 389 8989</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">Lota.Okeke@qucoon.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Qucoon Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">
                Speed. Flexibility. Quality.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
