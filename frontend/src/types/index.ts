export type UserRole = 'admin_staff' | 'veterinarian' | 'pet_owner'

export interface User {
  id: number
  email: string
  full_name: string
  phone_number?: string
  role: UserRole
  is_active: boolean
}

export interface Pet {
  id: number
  name: string
  species: string
  breed?: string
  sex?: string
  birth_date?: string
  microchip_id?: string
  allergies?: string
  notes?: string
  owner_id: number
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

export interface Appointment {
  id: number
  scheduled_at: string
  duration_minutes: number
  status: AppointmentStatus
  service_type: string
  reason?: string
  staff_notes?: string
  pet_id: number
  pet_name?: string
  owner_name?: string
  vet_name?: string
}

export interface MedicalRecord {
  id: number
  pet_id: number
  vet_name: string
  date: string
  weight_kg?: number
  temperature_celsius?: number
  subjective?: string
  objective?: string
  assessment?: string
  plan?: string
}

export interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface Invoice {
  id: number
  invoice_number: string
  owner_name: string
  pet_name: string
  subtotal: number
  tax_amount: number
  total_amount: number
  status: 'unpaid' | 'paid' | 'cancelled'
  created_at: string
  items: InvoiceItem[]
}

