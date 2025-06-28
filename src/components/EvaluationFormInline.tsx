
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

    const qualifiedIncomes = ['$1.400.000 - $1.800.000', '$1.800.000 - $2.000.000', '$2.000.000 - $3.000.000', '$3.000.000 - $5.000.000', '$5.000.000 o más'];
    const shouldTriggerWebhook = qualifiedIncomes.includes(formData.income);
    
    if (shouldTriggerWebhook) {
      try {
        const response = await fetch('https://agenciau.app.n8n.cloud/webhook-test/form-recibido-calificados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        console.log('Webhook response:', response);
        if (response.ok) {
          window.location.href = '/thank-you';
        } else {
          throw new Error('Webhook failed');
        }
      } catch (error) {
        console.error('Webhook error:', error);
        toast({
          title: "Error",
          description: "Hubo un problema al enviar tu solicitud. Por favor intenta nuevamente.",
          variant: "destructive"
        });
      }
    } else {
      window.location.href = '/thank-you';
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inline-name">Nombre Completo *</Label>
              <Input
                id="inline-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-2"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <Label htmlFor="inline-email">Correo Electrónico *</Label>
              <Input
                id="inline-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-2"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inline-phone">Número de Teléfono *</Label>
              <Input
                id="inline-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-2"
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div>
              <Label htmlFor="inline-income">Ingreso Mensual (CLP) *</Label>
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
          </div>

          {showComplementaryFields && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inline-complements"
                  checked={formData.complementsIncome}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, complementsIncome: checked as boolean }))}
                />
                <Label htmlFor="inline-complements">¿Complementas renta?</Label>
              </div>

              {formData.complementsIncome && (
                <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
                  <div>
                    <Label htmlFor="inline-mainSalary">Tu sueldo líquido</Label>
                    <Input
                      id="inline-mainSalary"
                      type="text"
                      value={formatCurrency(formData.mainSalary)}
                      onChange={(e) => handleSalaryChange('mainSalary', e.target.value)}
                      className="mt-2"
                      placeholder="$500.000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inline-complementarySalary">Sueldo complementario</Label>
                    <Input
                      id="inline-complementarySalary"
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

          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {isSubmitting ? 'Enviando...' : 'Evalúame Para Invertir 🏠'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EvaluationFormInline;
