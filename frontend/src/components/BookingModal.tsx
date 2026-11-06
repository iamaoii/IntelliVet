import React, { useState } from 'react'
import { X, Calendar, Clock, User, FileText, CheckCircle2 } from 'lucide-react'
import { Appointment, Pet } from '../types'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onBook: (appointment: Partial<Appointment>) => void
  pets: Pet[]
}

const SERVICE_TYPES = [
  'General Consultation & Physical Exam',
  'Routine Vaccination Booster (DHPPiL / 4-in-1)',
  'Anti-Rabies Shot',
  'Deworming & Parasite Control',
  'Dental Cleaning & Assessment',
  'Skin / Dermatology Consultation',
  'Minor Surgery / Spay & Neuter',
  'Grooming & Hygiene Care',
]

const TIME_SLOTS = [
  '09:00 AM',
  '09:45 AM',
  '10:30 AM',
  '11:15 AM',
  '01:30 PM',
  '02:15 PM',
  '03:00 PM',
  '03:45 PM',
  '04:30 PM',
]

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBook,
  pets,
}) => {
  const [selectedPetId, setSelectedPetId] = useState<number>(pets[0]?.id || 1)
  const [serviceType, setServiceType] = useState<string>(SERVICE_TYPES[0])
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-11-08')
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0])
  const [reason, setReason] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pet = pets.find((p) => p.id === Number(selectedPetId)) || pets[0]

    onBook({
      pet_id: pet.id,
      pet_name: pet.name,
      service_type: serviceType,
      scheduled_at: `${appointmentDate}T${selectedSlot.includes('PM') && !selectedSlot.startsWith('12') ? (parseInt(selectedSlot) + 12) : selectedSlot}:00`,
      status: 'pending',
      reason: reason || 'Routine wellness visit',
      vet_name: 'Dr. Cruz, DVM',
    })

    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Book an Appointment</h3>
              <p className="text-xs text-slate-500">IntelliVet Automated Conflict-Free Booking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Appointment Requested!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your appointment has been logged in the queue. You will receive an SMS confirmation once validated by clinic staff.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Pet Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-teal-600" />
                Select Patient / Pet
              </label>
              <select
                value={selectedPetId}
                onChange={(e) => setSelectedPetId(Number(e.target.value))}
                className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.species} • {p.breed})
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-teal-600" />
                Requested Service
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-teal-600" />
                  Date
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-teal-600" />
                  Available Time Slot
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reason / Symptoms */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Reason for Visit or Observed Symptoms
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Due for yearly booster shot, scratching ears frequently..."
                className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm transition-colors"
              >
                Confirm Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

