
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface EvaluationFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EvaluationFormPopup = ({ isOpen, onClose }: EvaluationFormPopupProps) => {
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
    
    console.log('Popup form submitted with data:', formData);

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
            onClose();
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
          onClose();
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
        onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Da el <span className="text-primary">Primer Paso</span>
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Completa tu Evaluación en 60 Segundos
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <Label htmlFor="name">Nombre Completo *</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-2"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-2"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Número de Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-2"
              placeholder="+56 9 1234 5678"
            />
          </div>

          <div>
            <Label htmlFor="income">Ingreso Mensual (CLP) *</Label>
            <Select value={formData.income} onValueChange={handleIncomeChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecciona tu rango de ingresos" />
              </SelectTrigger>
              <SelectContent>
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

          {showComplementaryFields && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="complements"
                  checked={formData.complementsIncome}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, complementsIncome: checked as boolean }))}
                />
                <Label htmlFor="complements">¿Complementas renta?</Label>
              </div>

              {formData.complementsIncome && (
                <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
                  <div>
                    <Label htmlFor="mainSalary">Tu sueldo líquido</Label>
                    <Input
                      id="mainSalary"
                      type="text"
                      value={formatCurrency(formData.mainSalary)}
                      onChange={(e) => handleSalaryChange('mainSalary', e.target.value)}
                      className="mt-2"
                      placeholder="$500.000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="complementarySalary">Sueldo complementario</Label>
                    <Input
                      id="complementarySalary"
                      type="text"
                      value={formatCurrency(formData.complementarySalary)}
                      onChange={(e) => handleSalaryChange('complementarySalary', e.target.value)}
                      className="mt-2"
                      placeholder="$300.000"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {isSubmitting ? 'Enviando...' : 'Sí, Quiero Ser Inversionista 🏠'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationFormPopup;
