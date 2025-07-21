
import React from 'react';
import { Button } from '@/components/ui/button';

interface VSLSectionProps {
  onCTAClick: () => void;
}

const VSLSection = ({ onCTAClick }: VSLSectionProps) => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-3 safe-area-px">
      <div className="max-w-4xl mx-auto text-center">
        {/* Video Container */}
        <div className="relative mb-6 md:mb-8 lg:mb-12">
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <wistia-player 
                media-id="77cc5muon3" 
                aspect="1.7777777777777777"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            ¿Listo para tu <span className="text-primary">Próxima Inversión</span>?
          </h2>
          
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Agenda tu sesión estratégica gratuita con Matías y descubre las mejores oportunidades inmobiliarias para ti.
          </p>

          <Button
            onClick={onCTAClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-sm md:text-base lg:text-lg font-bold w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto h-12 md:h-14 min-h-[44px]"
          >
            QUIERO MI SESIÓN CON MATÍAS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VSLSection;
