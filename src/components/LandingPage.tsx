
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, MapPin, Building, Wifi, Car } from 'lucide-react';
import EvaluationFormPopup from './EvaluationFormPopup';

const LandingPage = () => {
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);

  const testimonials = [
    {
      name: "María González",
      profession: "Ingeniera Comercial",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "Inmobify hizo que mi primera inversión fuera simple y rentable. ¡El mejor paso financiero que he dado!"
    },
    {
      name: "Carlos Mendoza",
      profession: "Contador Auditor", 
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "La asesoría fue excepcional. Ahora tengo mi departamento y mi patrimonio está creciendo cada mes."
    },
    {
      name: "Andrea Silva",
      profession: "Arquitecta",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: "Excelente ubicación y proyecto. La plusvalía ya se nota y apenas llevo 6 meses como propietaria."
    }
  ];

  useEffect(() => {
    // Trigger fade-in animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter']">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="text-primary">Invierte en tu Futuro:</span><br />
              Departamentos con Hasta 10% de Bono Pie<br />
              y Opciones de <span className="text-primary">Pie Cero</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Deja que tus ahorros trabajen por ti. Descubre cómo miles de chilenos ya están construyendo su patrimonio con nosotros.
            </p>
          </div>

          {/* Wistia Video Section */}
          <div className="animate-fade-in-delay-1 mb-8">
            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <wistia-player media-id="lad2rp50h1" aspect="1.7777777777777777"></wistia-player>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-delay-2">
            <Button
              onClick={() => setIsFormPopupOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg font-bold"
            >
              Evalúame Para Invertir Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 fade-in-section">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Más de <span className="text-primary">180 proyectos</span> nos respaldan
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Únete a miles de inversionistas exitosos
          </p>

          {/* Logos */}
          <div className="flex justify-center items-center space-x-8 mb-16 opacity-60">
            <div className="text-2xl font-bold">Forbes</div>
            <div className="text-2xl font-bold">La Tercera</div>
            <div className="text-2xl font-bold">Banco de Chile</div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.profession}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button after testimonials */}
          <div className="mt-12">
            <Button
              onClick={() => setIsFormPopupOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg font-bold"
            >
              Evalúame Para Invertir Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="py-20 px-4 bg-card/30 fade-in-section">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu Departamento en la Ubicación con <span className="text-primary">Mayor Plusvalía</span> de Santiago
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Invierte en el futuro de la zona más prometedora de la capital
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Conectividad Total</h3>
                <p className="text-sm text-muted-foreground">
                  A pasos del Metro Ñuñoa (Líneas 5, 6 y futura 7)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Todo a tu Alcance</h3>
                <p className="text-sm text-muted-foreground">
                  Junto al próximo Mall Vivo Santiago
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Vive a Otro Nivel</h3>
                <p className="text-sm text-muted-foreground">
                  Más de 1.000m² de espacios comunes (Gimnasio, Piscina, Sala de Juegos, Quincho)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Diseño y Confort</h3>
                <p className="text-sm text-muted-foreground">
                  Departamentos de 1 y 2 dormitorios desde 2.400 UF con terrazas amplias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card/30 fade-in-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas <span className="text-primary">Frecuentes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Resolvemos tus dudas más comunes
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/50 backdrop-blur-sm border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:text-primary">
                ¿Qué necesito para invertir?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Solo necesitas tener ganas de hacer crecer tu dinero, un ingreso estable y nosotros te guiamos en todo el proceso del crédito hipotecario.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/50 backdrop-blur-sm border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:text-primary">
                ¿Es seguro invertir en este proyecto?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutamente. Estás invirtiendo en una de las zonas con mayor crecimiento y plusvalía de Santiago, asegurando el futuro de tu inversión.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/50 backdrop-blur-sm border-border/50 rounded-lg px-6">
              <AccordionTrigger className="text-left hover:text-primary">
                ¿Qué es el "Bono Pie"?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Es una ayuda que te entregamos para cubrir hasta el 10% del pie de tu departamento, facilitando tu acceso a la compra.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/lovable-uploads/44b7caa2-ff79-41bf-b3dc-b39c756fcfaa.png"
              alt="Inmobify Logo"
              className="h-12 mx-auto mb-4"
            />
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 Inmobify. Todos los derechos reservados. | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Términos y Condiciones</a> | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Política de Privacidad</a>
          </p>
        </div>
      </footer>

      {/* Popup Form */}
      <EvaluationFormPopup 
        isOpen={isFormPopupOpen} 
        onClose={() => setIsFormPopupOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
