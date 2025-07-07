
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const EvaluationFormInline = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    income: '',
    complementsIncome: false,
    mainSalary: '',
    complementarySalary: ''
  });
  const [showComplementaryFields, setShowComplementaryFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    const formattedValue = parseInt(numericValue).toLocaleString('es-CL');
    return `$${formattedValue}`;
  };

  const handleIncomeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      income: value
    }));
    setShowComplementaryFields(value === 'Menos de $1.000.000' || value === '$1.000.000 - $1.400.000');
    if (value !== 'Menos de $1.000.000' && value !== '$1.000.000 - $1.400.000') {
      setFormData(prev => ({
        ...prev,
        complementsIncome: false,
        mainSalary: '',
        complementarySalary: ''
      }));
    }
  };

  const handleSalaryChange = (field: 'mainSalary' | 'complementarySalary', value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Inline form submitted with data:', formData);

    try {
      const qualifiedIncomes = ['$1.400.000 - $1.800.000', '$1.800.000 - $2.000.000', '$2.000.000 - $3.000.000', '$3.000.000 - $5.000.000', '$5.000.000 o más'];
      const shouldTriggerWebhook = qualifiedIncomes.includes(formData.income);
      
      if (shouldTriggerWebhook) {
        try {
          const response = await fetch('https://agenciau.app.n8n.cloud/webhook/form-recibido-calificados', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          
          console.log('Webhook response status:', response.status);
          
          if (response.ok) {
            toast({
              title: "¡Éxito!",
              description: "Tu solicitud ha sido enviada correctamente.",
            });
            window.location.href = '/thank-you';
          } else {
            throw new Error(`Webhook failed with status: ${response.status}`);
          }
        } catch (webhookError) {
          console.error('Webhook error:', webhookError);
          toast({
            title: "Enviado",
            description: "Tu solicitud ha sido recibida. Te contactaremos pronto.",
          });
          // Still redirect to thank you page even if webhook fails
          setTimeout(() => {
            window.location.href = '/thank-you';
          }, 2000);
        }
      } else {
        toast({
          title: "¡Gracias!",
          description: "Tu información ha sido recibida correctamente.",
        });
        window.location.href = '/thank-you';
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl shadow-lg">
        <CardContent className="p-4 md:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <Label htmlFor="inline-name" className="text-sm md:text-base">Nombre Completo *</Label>
                <Input
                  id="inline-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-2 h-12 md:h-14 rounded-xl text-sm md:text-base"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <Label htmlFor="inline-email" className="text-sm md:text-base">Correo Electrónico *</Label>
                <Input
                  id="inline-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-2 h-12 md:h-14 rounded-xl text-sm md:text-base"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <Label htmlFor="inline-phone" className="text-sm md:text-base">Número de Teléfono *</Label>
                <Input
                  id="inline-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-2 h-12 md:h-14 rounded-xl text-sm md:text-base"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div>
                <Label htmlFor="inline-income" className="text-sm md:text-base">Ingreso Mensual (CLP) *</Label>
                <Select value={formData.income} onValueChange={handleIncomeChange}>
                  <SelectTrigger className="mt-2 h-12 md:h-14 rounded-xl text-sm md:text-base">
                    <SelectValue placeholder="Selecciona tu rango de ingresos" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Menos de $1.000.000">Menos de $1.000.000</SelectItem>
                    <SelectItem value="$1.000.000 - $1.400.000">$1.000.000 - $1.400.000</SelectItem>
                    <SelectItem value="$1.400.000 - $1.800.000">$1.400.000 - $1.800.000</SelectItem>
                    <SelectItem value="$1.800.000 - $2.000.000">$1.800.000 - $2.000.000</SelectItem>
                    <SelectItem value="$2.000.000 - $3.000.000">$2.000.000 - $3.000.000</SelectItem>
                    <SelectItem value="$3.000.000 - $5.000.000">$3.000.000 - $5.000.000</SelectItem>
                    <SelectItem value="$5.000.000 o más">$5.000.000 o más</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showComplementaryFields && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inline-complements"
                    checked={formData.complementsIncome}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, complementsIncome: checked as boolean }))}
                  />
                  <Label htmlFor="inline-complements" className="text-sm md:text-base">¿Complementas renta?</Label>
                </div>

                {formData.complementsIncome && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <Label htmlFor="inline-mainSalary" className="text-sm md:text-base">Tu sueldo líquido</Label>
                      <Input
                        id="inline-mainSalary"
                        type="text"
                        value={formatCurrency(formData.mainSalary)}
                        onChange={(e) => handleSalaryChange('mainSalary', e.target.value)}
                        className="mt-2 h-12 md:h-14 rounded-xl text-sm md:text-base"
                        placeholder="$500.000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inline-complementarySalary" className="text-sm md:text-base">Sueldo complementario</Label>
                      <Input
                        id="inline-complementarySalary"
                        type="text"
                        value={formatCurrency(formData.complementarySalary)}
                        onChange={(e) => handleSalaryChange('complementarySalary', e.target.value)}
                        className="mt-2 h-12 md:h-14 rounded-xl text-sm md:text-base"
                        placeholder="$300.000"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="text-center pt-2 md:pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-6 lg:px-8 py-3 md:py-4 text-sm md:text-base lg:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto h-12 md:h-14"
              >
                {isSubmitting ? 'Enviando...' : 'QUIERO MI SESIÓN CON MATÍAS'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationFormInline;
