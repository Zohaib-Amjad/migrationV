'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FAQS } from '@/data/site-content'

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="faq" id="faq">
      <div className="faq__grid">
        <div>
          <h2 className="faq__title">Frequently Asked<br />Questions</h2>

          <div className="faq__card">
            <h3 className="faq__card-title">Still have a question?</h3>
            <p className="faq__card-text">Our team is ready to assist you with anything you need.</p>
            <Link href="/#consultation" className="btn btn--dark">
              Book a free consultation
              <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
            </Link>
          </div>
        </div>

        <div className="faq__list" data-faq>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="faq-item" data-open={isOpen ? 'true' : 'false'}>
                <button
                  type="button"
                  className="faq-item__question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                >
                  {faq.q}
                  <span className="faq-item__icon">
                    <svg className="faq-item__plus" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 0v12M0 6h12"
                        stroke="#e6f2ef"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg className="faq-item__minus" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M0 6h12"
                        stroke="#14161a"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div className="faq-item__panel">
                  <div className="faq-item__panel-inner">
                    <p className="faq-item__answer">{faq.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
