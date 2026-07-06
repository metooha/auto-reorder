import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon as ChevronLeft, PhoneIcon as Phone, ClockIcon as Clock, MapIcon as MapPin } from "@/components/icons";
import { BottomNav } from "@/components/BottomNav";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function PharmacyDelivery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="tertiary"
            size="small"
            onClick={() => navigate('/')}
            className="flex-shrink-0 !p-0 !h-auto"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-[20px] font-bold text-foreground">Pharmacy Delivery</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6 pb-32">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#00A862] to-[#007A47] rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[28px] font-bold mb-2">Pharmacy</h2>
                <p className="text-[16px] opacity-90">Fast, reliable prescription delivery</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 13.3333H17.3333V6.66667C17.3333 5.93333 16.7333 5.33333 16 5.33333C15.2667 5.33333 14.6667 5.93333 14.6667 6.66667V13.3333H8C7.26667 13.3333 6.66667 13.9333 6.66667 14.6667C6.66667 15.4 7.26667 16 8 16H14.6667V22.6667C14.6667 23.4 15.2667 24 16 24C16.7333 24 17.3333 23.4 17.3333 22.6667V16H24C24.7333 16 25.3333 15.4 25.3333 14.6667C25.3333 13.9333 24.7333 13.3333 24 13.3333Z" fill="white"/>
                </svg>
              </div>
            </div>
            <Button
              variant="secondary"
              size="medium"
              className="bg-white !text-[#00A862] hover:bg-gray-50"
            >
              Transfer prescription
            </Button>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F0FFF9] rounded-lg p-3 text-center">
              <Clock className="w-6 h-6 text-[#00A862] mx-auto mb-2" />
              <p className="text-[12px] font-semibold text-foreground">Same-day</p>
              <p className="text-[10px] text-muted-foreground">delivery</p>
            </div>
            <div className="bg-[#F0FFF9] rounded-lg p-3 text-center">
              <MapPin className="w-6 h-6 text-[#00A862] mx-auto mb-2" />
              <p className="text-[12px] font-semibold text-foreground">Local</p>
              <p className="text-[10px] text-muted-foreground">pharmacy</p>
            </div>
            <div className="bg-[#F0FFF9] rounded-lg p-3 text-center">
              <Phone className="w-6 h-6 text-[#00A862] mx-auto mb-2" />
              <p className="text-[12px] font-semibold text-foreground">24/7</p>
              <p className="text-[10px] text-muted-foreground">support</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[18px] font-bold text-foreground mb-3">Services</h3>
            <div className="space-y-2">
              {[
                { title: 'Refill prescriptions', desc: 'Quick and easy refills' },
                { title: 'New prescriptions', desc: 'Transfer or start new' },
                { title: 'Over-the-counter', desc: 'Health & wellness products' },
                { title: 'Immunizations', desc: 'Flu shots & vaccines' },
                { title: 'Health screenings', desc: 'Check-ups and tests' }
              ].map((service, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="medium"
                  isFullWidth
                  className="!justify-between !rounded-lg !h-auto !py-4 hover:!bg-[#F0FFF9]"
                  trailing={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                >
                  <div className="text-left flex-1">
                    <h4 className="text-[16px] font-semibold text-foreground">{service.title}</h4>
                    <p className="text-[14px] text-muted-foreground font-normal">{service.desc}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[var(--ld-semantic-color-fill-brand-subtle,#F5F8FF)] rounded-lg p-4">
            <h3 className="text-[16px] font-bold text-foreground mb-2">Need help?</h3>
            <p className="text-[14px] text-muted-foreground mb-3">Our pharmacy team is here to assist you</p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="medium"
                className="flex-1"
                leading={<Phone className="w-4 h-4" />}
              >
                Call pharmacy
              </Button>
              <Button
                variant="secondary"
                size="medium"
                className="flex-1"
              >
                Chat now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
