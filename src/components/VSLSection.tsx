
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface VSLSectionProps {
  onCTAClick: () => void;
}

const VSLSection: React.FC<VSLSectionProps> = ({ onCTAClick }) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 fade-in-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Descubre Cómo <span className="text-primary">Proteger tu Inversión</span> Inmobiliaria
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
            Matías te explica paso a paso el método que garantiza tu tranquilidad financiera
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6 lg:p-8">
            {/* Wistia Video Player */}
            <div className="relative rounded-lg overflow-hidden shadow-lg mb-6">
              <wistia-player 
                media-id="77cc5muon3" 
                aspect="1.7777777777777777"
              />
            </div>

            {/* Video Description */}
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                El Método Exacto que Evita Pérdidas Innecesarias
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                En este video, Matías revela por qué evaluar tu capacidad de crédito ANTES de reservar 
                es la diferencia entre una inversión exitosa y una experiencia frustrante.
              </p>

              {/* CTA Button */}
              <Button
                onClick={onCTAClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-6 lg:px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-sm md:text-base lg:text-lg font-bold w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto h-12 md:h-14"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                QUIERO MI SESIÓN CON MATÍAS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VSLSection;
