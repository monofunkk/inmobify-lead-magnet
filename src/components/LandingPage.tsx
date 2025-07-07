import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, MapPin, Building, Wifi, Car, Clock, DollarSign, Frown, Check, Compass, Handshake, User } from 'lucide-react';
import EvaluationFormPopup from './EvaluationFormPopup';
import EvaluationFormInline from './EvaluationFormInline';

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto px-3 py-3 flex justify-center">
          <img
            src="/lovable-uploads/56117cfb-584b-4a69-b1a4-14004e8eacbf.png"
            alt="inmob. Logo"
            className="h-8 md:h-10"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-3 py-12 pt-20 md:py-20 md:pt-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight px-2">
              La <span className="text-primary">"Papita Única"</span> es Real. Pero este es el Error que te Podría Costar Más que solo el Dinero de tu Reserva.
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-2">
              Aquí te revelo el método exacto para blindar tu inversión, evaluando primero tu capacidad de crédito para que compres con total tranquilidad.
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-delay-1 px-3">
            <Button
              onClick={() => setIsFormPopupOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-base md:text-lg font-bold w-full max-w-md mx-auto h-12 md:h-auto"
            >
              QUIERO MI SESIÓN ESTRATÉGICA CON MATÍAS
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-12 md:py-20 px-3 fade-in-section">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-4 px-2">
            El Camino <span className="text-primary">Lento y Arriesgado</span> que Muchos Siguen
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 px-2">
            ¿Te has sentido identificado con alguna de estas situaciones?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <Card className="bg-destructive/5 backdrop-blur-sm border-destructive/20 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-destructive/20 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Meses de Búsqueda a Ciegas</h3>
                <p className="text-sm text-muted-foreground">
                  Inviertes tu valioso tiempo buscando proyectos sin saber con certeza si realmente puedes financiarlos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-destructive/5 backdrop-blur-sm border-destructive/20 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-destructive/20 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Reservar y Arriesgar tu Dinero</h3>
                <p className="text-sm text-muted-foreground">
                  Pagas una reserva con la emoción del momento, antes de tener la aprobación final del banco.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-destructive/5 backdrop-blur-sm border-destructive/20 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-destructive/20 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <Frown className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Crédito Rechazado, Dinero Perdido</h3>
                <p className="text-sm text-muted-foreground">
                  El banco no te aprueba el monto y pierdes parte o la totalidad de tu reserva y toda tu motivación.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 md:py-20 px-3 bg-card/30 fade-in-section">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-4 px-2">
            Nuestro Método: <span className="text-primary">Certeza, Eficiencia y Tranquilidad</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 px-2">
            La forma inteligente de invertir sin riesgos innecesarios
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Poder de Compra Validado</h3>
                <p className="text-sm text-muted-foreground">
                  Primero, analizamos tu capacidad de crédito y la pre-evaluamos con bancos y mutuarias para darte certeza total.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Búsqueda Enfocada y Eficiente</h3>
                <p className="text-sm text-muted-foreground">
                  Con tus números claros, te mostramos los proyectos perfectos para ti de nuestro portafolio de +180 opciones. Ahorras meses de trabajo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tranquilidad para Invertir</h3>
                <p className="text-sm text-muted-foreground">
                  Con la certeza del financiamiento, puedes reservar la "papita única" o cualquier otra, con la tranquilidad de que puede ser tuya.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Matías Credibility Section */}
      <section className="py-20 px-4 fade-in-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conoce a <span className="text-primary">Matías Furlong</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Fundador de Inmobify.cl
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
                  <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Matías Furlong</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Matías Furlong guía a cientos de clientes a encontrar su hogar ideal en Santiago a través de su servicio de Personal Shopper Inmobiliario.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm">Pionero en asesoría 100% personalizada, enfocada en los intereses del comprador para un proceso fácil y seguro.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Especialista en las oportunidades más atractivas de la Región Metropolitana para familias y profesionales.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Su metodología ahorra un promedio de 70 horas de búsqueda y visitas infructuosas.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Mantiene un récord de satisfacción del 100% con un proceso transparente y apoyo de principio a fin.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Experto consolidado en el mercado de la capital, permitiendo a sus clientes tomar las mejores decisiones.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Establece el nuevo estándar de la compra inteligente, demostrando que es un proceso sin estrés.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-card/30 fade-in-section">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que Dicen Nuestros <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Historias reales de inversiones exitosas
          </p>

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
          <div className="mt-8 md:mt-12 px-3">
            <Button
              onClick={() => setIsFormPopupOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-base md:text-lg font-bold w-full max-w-md mx-auto h-12 md:h-auto"
            >
              QUIERO MI SESIÓN ESTRATÉGICA CON MATÍAS
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 fade-in-section">
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

      {/* Value Stack Section */}
      <section className="py-20 px-4 bg-primary/10 fade-in-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Obtén tu <span className="text-primary">Hoja de Ruta</span> para Invertir de Forma Segura
            </h2>
            <p className="text-xl text-muted-foreground">
              En tu sesión estratégica con Matías recibirás:
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Certeza Financiera</h3>
                    <p className="text-sm text-muted-foreground">Sabrás tu capacidad de crédito exacta, validada con bancos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Acceso a Oportunidades</h3>
                    <p className="text-sm text-muted-foreground">Verás los mejores proyectos (+180) que calzan con tu perfil.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Ahorro de Meses de Trabajo</h3>
                    <p className="text-sm text-muted-foreground">Tu búsqueda será ultra-eficiente y enfocada.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Tranquilidad Absoluta</h3>
                    <p className="text-sm text-muted-foreground">Protegerás tu reserva y tomarás la decisión sin estrés.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-6 md:mb-8 px-3">
            <Button
              onClick={() => setIsFormPopupOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-base md:text-lg font-bold mb-4 w-full max-w-md mx-auto h-12 md:h-auto"
            >
              QUIERO AGENDAR MI SESIÓN CON MATÍAS
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
              Llena el siguiente formulario con tus datos. Mi asistente, Josefa, te contactará personalmente para coordinar un espacio en mi agenda para nuestra sesión estratégica. Es 100% gratuita y sin compromiso.
            </p>
          </div>
          
          <EvaluationFormInline />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-3 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <img
              src="/lovable-uploads/44b7caa2-ff79-41bf-b3dc-b39c756fcfaa.png"
              alt="Inmobify Logo"
              className="h-8 md:h-12 mx-auto mb-4"
            />
          </div>
          
          <div className="flex justify-center space-x-4 md:space-x-6 mb-6 md:mb-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Facebook
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              LinkedIn
            </a>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground px-2">
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
