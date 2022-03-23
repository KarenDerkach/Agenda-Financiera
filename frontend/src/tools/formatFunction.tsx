export function configDate (date: any)  {
    if(date === undefined || date === null) return '-'
    const day: string = date.split('-').pop().split('').slice(0,2).join('')
    const rest: string[] = date.split('-').slice(0,2)

    const allDay: string = rest.concat(day).reverse().join('/')
    return allDay
  }
  
 export const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })