import { GoogleMapEmbed } from "../components/GoogleMapEmbed";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { BUSINESS, TRANSIT } from "../lib/content";
import { Seo } from "../seo/Seo";

export function Contact() {
  return (
    <div className="container section">
      <Seo
        title="Contact & Hours — Z Halal Restaurant | Bed-Stuy Brooklyn"
        description="Visit Z Halal Restaurant at 1168 Fulton St, Brooklyn, NY. Open 9am–1am daily. Call, WhatsApp, or get directions."
        path="/contact"
      />

      <h1>Contact & Hours</h1>

      <div className="contact-details">
        <p>{BUSINESS.address}</p>
        <p>
          <a href={BUSINESS.phoneTel}>{BUSINESS.phoneDisplay}</a>
        </p>
        <p>Hours: {BUSINESS.hours}</p>
        <WhatsAppButton label="Chat on WhatsApp" />
      </div>

      <GoogleMapEmbed />

      <div className="transit">
        <h2>Getting Here</h2>
        <ul>
          {TRANSIT.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
