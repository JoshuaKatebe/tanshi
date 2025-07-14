import { supabase } from './supabase'

export async function generateOrderId(): Promise<string> {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  try {
    // Get next sequential number from database
    const { data, error } = await supabase
      .rpc('get_next_order_number')
    
    if (error) throw error
    
    // Format the sequential number as 5 digits (00001-99999)
    const sequentialNumber = String(data).padStart(5, '0')
    
    return `TDS-QT-${year}${month}${day}-${sequentialNumber}`
  } catch (error) {
    console.error('Error generating order ID:', error)
    // Fallback to random number if database call fails
    const random = Math.floor(10000 + Math.random() * 90000)
    return `TDS-QT-${year}${month}${day}-${random}`
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-ZM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'submitted':
      return 'text-blue-400'
    case 'in_progress':
      return 'text-yellow-400'
    case 'completed':
      return 'text-green-400'
    case 'cancelled':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'submitted':
      return 'bg-blue-400/20'
    case 'in_progress':
      return 'bg-yellow-400/20'
    case 'completed':
      return 'bg-green-400/20'
    case 'cancelled':
      return 'bg-red-400/20'
    default:
      return 'bg-gray-400/20'
  }
}
