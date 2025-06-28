
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MessageCircle } from 'lucide-react';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-12">
            <div className="animate-fade-in">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                ¡Gracias por tu Interés en <span className="text-primary">Inmobify</span>!
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Tu formulario ha sido enviado exitosamente. 
              </p>
              
              <div className="bg-primary/10 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-xl font-semibold">Próximos Pasos</h2>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-primary">Josefa</strong> se contactará contigo a través de <strong>WhatsApp</strong> para continuar con el proceso.
                </p>
              </div>
              
              <div className="text-left bg-card/30 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-3 text-center">Te consultaremos sobre:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Tu situación actual de ahorros
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    El tipo de inversión que más te interesa
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Las mejores opciones de inversión disponibles en el mercado chileno
                  </li>
                </ul>
              </div>
              
              <Button 
                onClick={() => window.location.href = '/'} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full"
              >
                Volver al Inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;
