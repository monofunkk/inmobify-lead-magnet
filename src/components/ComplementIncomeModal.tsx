
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateCombinedIncome } from '@/services/metaPixel';

interface ComplementIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (complementData: any) => void;
  primaryIncome: number;
  primaryName: string;
  primaryEmail: string;
  primaryPhone: string;
}

const ComplementIncomeModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  primaryIncome,
  primaryName,
  primaryEmail,
  primaryPhone
}: ComplementIncomeModalProps) => {
  const [complementData, setComplementData] = useState({
    name: '',
    email: '',
    phone: '',
    income: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    const formattedValue = parseInt(numericValue).toLocaleString('es-CL');
    return `$${formattedValue}`;
  };

  const handleIncomeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setComplementData(prev => ({
      ...prev,
      income: numericValue
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const complementIncomeNum = parseInt(complementData.income) || 0;
      
      // Validate combined income
      if (!validateCombinedIncome(primaryIncome, complementIncomeNum)) {
        setError('La suma de ambos ingresos debe ser de al menos $2.000.000 para calificar');
        setIsSubmitting(false);
        return;
      }

      // Validate required fields
      if (!complementData.name || !complementData.email || !complementData.phone || !complementData.income) {
        setError('Por favor completa todos los campos');
        setIsSubmitting(false);
        return;
      }

      console.log('💼 Complement income validation passed:', {
        primaryIncome,
        complementIncome: complementIncomeNum,
        totalIncome: primaryIncome + complementIncomeNum
      });

      await onSubmit(complementData);
      onClose();
      
    } catch (error) {
      console.error('Error submitting complement data:', error);
      setError('Error al procesar la información. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalIncome = primaryIncome + (parseInt(complementData.income) || 0);
  const isQualified = totalIncome >= 2000000;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[95vh] overflow-y-auto mx-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center">
            Complementar <span className="text-primary">Ingresos</span>
          </DialogTitle>
          <p className="text-center text-muted-foreground text-sm md:text-base">
            Ingresa los datos de tu complemento de renta
          </p>
        </DialogHeader>

        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Resumen de Ingresos:</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Tu ingreso principal:</span>
              <span className="font-medium">${primaryIncome.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between">
              <span>Ingreso complementario:</span>
              <span className="font-medium">
                ${(parseInt(complementData.income) || 0).toLocaleString('es-CL')}
              </span>
            </div>
            <div className="border-t pt-1 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span className={isQualified ? 'text-green-600' : 'text-red-600'}>
                  ${totalIncome.toLocaleString('es-CL')}
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {isQualified ? 
                '✅ Califica para evaluación' : 
                '❌ Necesitas al menos $2.000.000 en total'
              }
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="complement-name" className="text-sm md:text-base">
              Nombre Completo del Complemento *
            </Label>
            <Input
              id="complement-name"
              type="text"
              required
              value={complementData.name}
              onChange={(e) => setComplementData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-2 h-12 md:h-14 rounded-xl"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <Label htmlFor="complement-email" className="text-sm md:text-base">
              Correo Electrónico *
            </Label>
            <Input
              id="complement-email"
              type="email"
              required
              value={complementData.email}
              onChange={(e) => setComplementData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-2 h-12 md:h-14 rounded-xl"
              placeholder="correo@email.com"
            />
          </div>

          <div>
            <Label htmlFor="complement-phone" className="text-sm md:text-base">
              Teléfono *
            </Label>
            <Input
              id="complement-phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9+\-\s]*"
              required
              value={complementData.phone}
              onChange={(e) => setComplementData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-2 h-12 md:h-14 rounded-xl"
              placeholder="+56 9 1234 5678"
            />
          </div>

          <div>
            <Label htmlFor="complement-income" className="text-sm md:text-base">
              Ingreso Mensual del Complemento *
            </Label>
            <Input
              id="complement-income"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              value={formatCurrency(complementData.income)}
              onChange={(e) => handleIncomeChange(e.target.value)}
              className="mt-2 h-12 md:h-14 rounded-xl"
              placeholder="$800.000"
            />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !isQualified}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 md:py-4 text-sm md:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 h-12 md:h-14 min-h-[44px]"
          >
            {isSubmitting ? 'Enviando...' : 'CONTINUAR CON EVALUACIÓN'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComplementIncomeModal;
