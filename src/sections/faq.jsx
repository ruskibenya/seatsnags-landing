import { useState } from 'react';
import { Section } from '../lib/ui.jsx';

const FAQ_ITEMS = [
  { q: 'What is SeatSnags?', a: 'SeatSnags gets you tickets at a price you set. Pick an event and the sections you\'d sit in, and set the most you\'d pay, fees included. We watch the resale market for you, and the moment tickets fit your max, we buy them and let you know. No refreshing, and nothing to do when the price finally drops.' },
  { q: 'How is SeatSnags different from other ticket sites?', a: 'Most ticket sites can alert you when a price drops, but you still have to see the alert and buy before someone else does. SeatSnags skips that step. When tickets fit your max, we buy them, then tell you it\'s done.' },
  { q: 'How does it work?', a: 'Choose your event, the sections you\'re open to and the most you\'d pay per ticket. We keep watching listings, and the moment a match appears at or below your max, we buy the tickets.' },
  { q: 'Am I charged when I set a bid?', a: 'No. When your bid goes live we place a hold on your card for your max, and you\'re only actually charged if we snag. If your bid expires or you cancel, the hold is released.' },
  { q: 'Why do I need a credit card to set a bid?', a: 'Good listings go fast. Having your card on file means we can buy the moment a match appears, instead of asking you to confirm and losing the tickets while you do.' },
  { q: 'Will I always pay my maximum price?', a: 'No. Your max is a ceiling, not a price. When tickets come in under it, you\'re often charged less.' },
  { q: 'What happens when a match is found?', a: 'We secure the tickets, process your payment, and arrange delivery. You\'ll get a notification as soon as it\'s done.' },
  { q: 'What if no matching tickets are found?', a: 'Your bid expires and you\'re charged nothing.' },
  { q: 'Can I use SeatSnags for sold-out events?', a: 'Yes — and sold-out events are often where SeatSnags works best. We monitor resale listings continuously, so if tickets surface at your price at any point, we\'ll catch them.' },
  { q: 'Can I cancel a bid?', a: 'Yes. You can cancel any active bid before tickets are secured, and you won\'t be charged.' },
  { q: 'Is there a SeatSnags app?', a: 'Yes. SeatSnags installs straight from your browser, no App Store needed. Open app.seatsnags.com/install on your phone and it walks you through the two taps.' },
  { q: 'Do ticket prices really drop before an event?', a: 'Often, yes. Resale prices tend to slide as the event gets closer and sellers get nervous. Not always, though, and that\'s why you set a max: if prices never reach it, you pay nothing.' },
  { q: 'Are there any hidden fees?', a: 'No. Your max is all-in, fees included. The number you set is the most you\'ll ever pay, and nothing gets added at checkout.' },
  { q: 'Can I pick my exact seats?', a: 'You pick the sections you\'re open to and how many seats you need together. We grab the best match at or under your max: your full quantity, seated together, in your chosen sections.' },
  { q: 'Are the tickets legitimate?', a: 'Yes. Every ticket comes from licensed professional brokers, the same inventory network that supplies major marketplaces like StubHub, Vivid Seats, and SeatGeek. And every order is backed by our Buyer Guarantee.' },
  { q: 'What happens if my event is canceled or postponed?', a: 'If it\'s postponed, your tickets usually stay valid for the new date. If it\'s canceled, we pass along the refund or replacement our ticketing partner provides.' },
  { q: 'How will I receive my tickets?', a: 'Electronically, through whatever transfer platform the seller uses — typically Ticketmaster, AXS, or a similar system.' },
  { q: 'When will my tickets arrive?', a: 'It depends on the event and seller. Some tickets arrive immediately; others closer to the event date. We\'ll keep you updated either way.' },
];

// FAQPage structured data for search rich results, generated from FAQ_ITEMS so
// the markup can never drift from the visible answers.
function FaqSchema() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}/>;
}

export function Faq() {
  // The first question is open on arrival; clicking it closes it again.
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <Section index="05" label="Questions?">
      <FaqSchema/>
      <div className="split">
        <h2 className="headline headline-sec faq-title">Frequently asked questions.</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-glyph" aria-hidden="true">{open ? '\u2212' : '+'}</span>
                </button>
                {open && <p className="faq-a">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
