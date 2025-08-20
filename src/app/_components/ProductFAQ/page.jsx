'use client';

export default function ProductFAQ() {
  const faqs = [
    {
      question:
        'What is the difference between cotton and polyester in clothing?',
      answer:
        'Cotton is a natural fabric known for its softness and breathability, ideal for sensitive skin. Polyester is synthetic, more durable, wrinkle-resistant, and less breathable.',
    },
    {
      question: 'How can I choose the right size when shopping online?',
      answer:
        'Always check the size chart provided on the site and compare it with your measurements. Also, read customer reviews to know if the item runs large or small.',
    },
    {
      question: 'What is the best way to wash clothes to preserve quality?',
      answer:
        'Follow the care label instructions. In general, use cold water, mild detergent, and avoid frequent tumble drying to extend fabric life.',
    },
    {
      question: 'Do colored clothes fade over time?',
      answer:
        'Yes, if not washed properly. To minimize fading, wash with cold water, separate from whites, and avoid direct sunlight drying.',
    },
    {
      question:
        'How can I tell the difference between original and fake clothes?',
      answer:
        'Check stitching quality, fabric type, logo details, and pricing. Original items have fine detailing and consistent branding, while fakes may have visible flaws.',
    },
  ];

  return (
    <div className="w-full px-4 py-10">
      <h2 className="text-20 md:text-32 font-roboto font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-y-10">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border border-opacity-30 border-black rounded-xl p-10"
          >
            <summary className="cursor-pointer text-15 font-semibold flex justify-between items-center">
              {faq.question}
              <span className="mt-2 text-[#00000067] group-open:rotate-180 transition-transform">
                &#9660;
              </span>
            </summary>
            <p className="mt-10 text-[#0000008b] leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
