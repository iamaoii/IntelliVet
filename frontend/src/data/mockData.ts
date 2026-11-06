import { Pet, Appointment, Invoice } from '../types'

export const MOCK_PETS: Pet[] = [
  {
    id: 1,
    name: 'Milo',
    species: 'Dog',
    breed: 'Golden Retriever',
    sex: 'Male',
    birth_date: '2022-04-15',
    microchip_id: '985141002348512',
    allergies: 'Chicken protein sensitivity',
    notes: 'Friendly, slightly nervous during ear cleaning.',
    owner_id: 101,
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    sex: 'Female (Spayed)',
    birth_date: '2023-01-20',
    microchip_id: '985141009841123',
    allergies: 'None recorded',
    notes: 'Indoor cat, up-to-date on rabies vaccine.',
    owner_id: 101,
  },
  {
    id: 3,
    name: 'Barkley',
    species: 'Dog',
    breed: 'Beagle',
    sex: 'Male',
    birth_date: '2021-08-10',
    microchip_id: '985141004512999',
    allergies: 'Flea bite dermatitis',
    notes: 'Requires muzzle for nail trims.',
    owner_id: 102,
  }
]

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    scheduled_at: '2026-11-07T09:00:00',
    duration_minutes: 30,
    status: 'confirmed',
    service_type: 'Annual Routine Checkup & Booster',
    reason: 'Annual vaccination update and physical checkup',
    pet_id: 1,
    pet_name: 'Milo',
    owner_name: 'Maria Santos',
    vet_name: 'Dr. Cruz, DVM',
  },
  {
    id: 2,
    scheduled_at: '2026-11-07T10:30:00',
    duration_minutes: 45,
    status: 'pending',
    service_type: 'Dental Cleaning Assessment',
    reason: 'Bad breath and tartar buildup noticed',
    pet_id: 2,
    pet_name: 'Luna',
    owner_name: 'Maria Santos',
    vet_name: 'Dr. Cruz, DVM',
  },
  {
    id: 3,
    scheduled_at: '2026-11-07T13:00:00',
    duration_minutes: 30,
    status: 'completed',
    service_type: 'Skin Dermatology Follow-up',
    reason: 'Post-treatment follow-up for flea dermatitis',
    pet_id: 3,
    pet_name: 'Barkley',
    owner_name: 'Juan Dela Cruz',
    vet_name: 'Dr. Cruz, DVM',
  },
]

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 1,
    invoice_number: 'INV-2026-001',
    owner_name: 'Maria Santos',
    pet_name: 'Milo',
    subtotal: 1850.00,
    tax_amount: 222.00,
    total_amount: 2072.00,
    status: 'paid',
    created_at: '2026-11-06T15:30:00',
    items: [
      { id: 1, description: 'General Consultation', quantity: 1, unit_price: 500, total_price: 500 },
      { id: 2, description: 'DHPPiL 6-in-1 Vaccine', quantity: 1, unit_price: 850, total_price: 850 },
      { id: 3, description: 'Deworming Tablet (Broad Spectrum)', quantity: 2, unit_price: 250, total_price: 500 },
    ]
  },
  {
    id: 2,
    invoice_number: 'INV-2026-002',
    owner_name: 'Juan Dela Cruz',
    pet_name: 'Barkley',
    subtotal: 1200.00,
    tax_amount: 144.00,
    total_amount: 1344.00,
    status: 'unpaid',
    created_at: '2026-11-07T13:45:00',
    items: [
      { id: 4, description: 'Follow-up Consultation', quantity: 1, unit_price: 400, total_price: 400 },
      { id: 5, description: 'Medicated Skin Shampoo 250ml', quantity: 1, unit_price: 800, total_price: 800 },
    ]
  }
]

