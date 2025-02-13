export function formatearFechaHora(fecha: string, hora: string): string {
    const [dia, mes, año] = fecha.split('-').map(Number);
    const [horas, minutos] = hora.split(':').map(Number);
  
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    const fechaObjeto = new Date(año, mes - 1, dia, horas, minutos);
  
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  
    const horaFormateada = new Intl.DateTimeFormat('es-ES', opcionesHora).format(fechaObjeto);
  
    return `${dia} ${meses[mes - 1]} ${horaFormateada}`;
  }

  export function formatearFecha(fecha: string): string {
    try {
      // Validate input format (dd/MM/yyyy)
      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha)) {
        throw new Error('Invalid date format. Expected dd/MM/yyyy');
      }

      const [dia, mes, año] = fecha.split('/').map(Number);
      
      // Validate date values
      if (mes < 1 || mes > 12) throw new Error('Invalid month');
      if (dia < 1 || dia > 31) throw new Error('Invalid day');
      if (año < 1000 || año > 9999) throw new Error('Invalid year');

      const fechaObjeto = new Date(año, mes - 1, dia);

      // Verify if the resulting date is valid
      if (isNaN(fechaObjeto.getTime())) {
        throw new Error('Invalid date combination');
      }

      const opcionesHora: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };

      return new Intl.DateTimeFormat('es-ES', opcionesHora).format(fechaObjeto);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha inválida';
    }
  }