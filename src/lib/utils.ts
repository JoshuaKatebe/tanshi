export function generateOrderId(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  // Generate a random 4-digit number
  const random = Math.floor(1000 + Math.random() * 9000)
  
  return `TDS-QT-${year}${month}${day}-${random}`
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
