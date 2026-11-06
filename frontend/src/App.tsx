import React, { useState } from 'react'
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  Receipt, 
  Bot, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle, 
  ChevronRight,
  Shield,
  Activity,
  HeartHandshake,
  Check,
  XCircle,
  Send
} from 'lucide-react'
import { MOCK_PETS, MOCK_APPOINTMENTS, MOCK_INVOICES } from './data/mockData'
import { UserRole, Appointment, Pet } from './types'
import { BookingModal } from './components/BookingModal'
import { ConsultationModal } from './components/ConsultationModal'

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('pet_owner')
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'pets' | 'billing' | 'assistant'>('overview')
  
  // State for dynamic appointments and pets
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [activeConsultationPet, setActiveConsultationPet] = useState<Pet | null>(null)

  // AI Assistant Chat State
  const [assistantInput, setAssistantInput] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant', text: string }>>([
    {
      sender: 'assistant',
      text: 'Hello! I am your IntelliVet AI Assistant. I can help answer routine pet-care questions, provide guidance on upcoming booster shots, or recommend clinic appointment slots. How can I assist you and your pet today?'
    }
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!assistantInput.trim()) return

    const userText = assistantInput
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }])
    setAssistantInput('')

    // Simulated AI response with clinical safeguards
    setTimeout(() => {
      let reply = "Thank you for reaching out! For routine maintenance, ensure adequate hydration and a balanced diet suitable for your pet's life stage."
      const lower = userText.toLowerCase()

      if (lower.includes('vomit') || lower.includes('blood') || lower.includes('letharg') || lower.includes('emergency')) {
        reply = "⚠️ Clinical Advisory Notice: Symptoms like severe lethargy, persistent vomiting, or bleeding can indicate acute distress. While I can provide general guidance, this requires direct examination by a licensed veterinarian. We recommend booking an urgent consultation or visiting the clinic immediately."
      } else if (lower.includes('vaccin') || lower.includes('booster') || lower.includes('shot')) {
        reply = "Standard immunization schedules for canines recommend annual 6-in-1 (DHPPiL) boosters alongside Rabies immunization. For felines, feline panleukopenia and respiratory complex (4-in-1) boosters are recommended. Milo has a booster due this month."
      } else if (lower.includes('book') || lower.includes('schedule') || lower.includes('slot')) {
        reply = "Dr. Cruz, DVM has open consultation slots tomorrow at 9:00 AM, 11:15 AM, and 2:15 PM. You can click 'Book Appointment' at the top right to reserve instantly!"
      }

      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply }])
    }, 450)
  }

  // Handle appointment status change (for staff / vet)
  const handleUpdateStatus = (id: number, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  // Handle new appointment booking
  const handleAddAppointment = (apptData: Partial<Appointment>) => {
    const newAppt: Appointment = {
      id: Date.now(),
      scheduled_at: apptData.scheduled_at || new Date().toISOString(),
      duration_minutes: 30,
      status: 'pending',
      service_type: apptData.service_type || 'Consultation',
      reason: apptData.reason,
      pet_id: apptData.pet_id || 1,
      pet_name: apptData.pet_name || 'Pet',
      owner_name: 'Maria Santos',
      vet_name: 'Dr. Cruz, DVM',
    }
    setAppointments(prev => [newAppt, ...prev])
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Intelli<span className="text-teal-600">Vet</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-100">
                Philippine Clinic Edition
              </span>
            </div>
          </div>

          {/* Role Switcher Demo Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium hidden md:inline">Active View:</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
              <button
                onClick={() => setCurrentRole('pet_owner')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  currentRole === 'pet_owner' ? 'bg-white text-teal-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pet Owner
              </button>
              <button
                onClick={() => setCurrentRole('veterinarian')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  currentRole === 'veterinarian' ? 'bg-white text-teal-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Veterinarian
              </button>
              <button
                onClick={() => setCurrentRole('admin_staff')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  currentRole === 'admin_staff' ? 'bg-white text-teal-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Clinic Staff
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 flex gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 flex items-center gap-2 ${
              activeTab === 'overview' ? 'border-teal-600 text-teal-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Activity className="h-4 w-4" /> Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3 border-b-2 flex items-center gap-2 ${
              activeTab === 'appointments' ? 'border-teal-600 text-teal-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="h-4 w-4" /> Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('pets')}
            className={`py-3 border-b-2 flex items-center gap-2 ${
              activeTab === 'pets' ? 'border-teal-600 text-teal-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="h-4 w-4" /> {currentRole === 'pet_owner' ? 'My Pets' : 'Patient Records'} ({pets.length})
          </button>
          {(currentRole === 'admin_staff' || currentRole === 'pet_owner') && (
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-3 border-b-2 flex items-center gap-2 ${
                activeTab === 'billing' ? 'border-teal-600 text-teal-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Receipt className="h-4 w-4" /> Billing & Invoices
            </button>
          )}
          <button
            onClick={() => setActiveTab('assistant')}
            className={`py-3 border-b-2 flex items-center gap-2 ${
              activeTab === 'assistant' ? 'border-teal-600 text-teal-600 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Bot className="h-4 w-4 text-teal-600" /> AI Pet Assistant
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Role Banner / Context */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-100 text-xs font-semibold uppercase tracking-wider mb-1">
              <Shield className="h-4 w-4" />
              Active Role: {currentRole === 'pet_owner' ? 'Pet Owner Portal' : currentRole === 'veterinarian' ? 'Veterinary EMR Portal' : 'Clinic Administrative Portal'}
            </div>
            <h1 className="text-2xl font-bold">
              {currentRole === 'pet_owner' && 'Welcome back, Maria!'}
              {currentRole === 'veterinarian' && 'Welcome, Dr. Cruz, DVM'}
              {currentRole === 'admin_staff' && 'Clinic Operations Dashboard'}
            </h1>
            <p className="text-teal-100 text-sm mt-1">
              {currentRole === 'pet_owner' && 'Track Milo and Luna’s vaccination timelines, upcoming appointments, and routine care.'}
              {currentRole === 'veterinarian' && 'Review consultation schedules, examine patient SOAP records, and log treatments.'}
              {currentRole === 'admin_staff' && 'Manage appointment queues, coordinate clinic inventory, and view service billing summaries.'}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('assistant')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <Bot className="h-4 w-4" /> Ask AI Care Guide
            </button>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-teal-800 hover:bg-teal-50 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" /> Book Appointment
            </button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase">Upcoming Visits</span>
                  <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">
                  {appointments.filter(a => a.status !== 'cancelled').length}
                </div>
                <span className="text-xs text-teal-600 font-medium">Automated slot validation active</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase">Registered Pets</span>
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">{pets.length}</div>
                <span className="text-xs text-slate-500">Milo, Luna, Barkley</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase">Vaccine Status</span>
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">Up to date</div>
                <span className="text-xs text-emerald-600 font-medium">Booster due in 3 weeks</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 uppercase">SMS Reminders</span>
                  <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">Active</div>
                <span className="text-xs text-slate-500">Automated 24h prior notification</span>
              </div>
            </div>

            {/* Split Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Appointments Queue */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal-600" />
                    Scheduled Appointments
                  </h2>
                  <button 
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
                  >
                    View All <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {appointments.slice(0, 3).map((appt) => (
                    <div key={appt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">{appt.pet_name}</span>
                          <span className="text-xs text-slate-500">• {appt.service_type}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            appt.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {appt.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{appt.reason}</p>
                      </div>
                      <div className="text-right sm:flex-shrink-0">
                        <div className="text-xs font-medium text-slate-900">
                          {new Date(appt.scheduled_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} at {new Date(appt.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-[11px] text-slate-500">{appt.vet_name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Quick Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <HeartHandshake className="h-5 w-5 text-teal-600" />
                    Patient Highlight
                  </h2>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-900 text-base">Milo</div>
                        <div className="text-xs text-slate-500">Golden Retriever • 2 yrs old</div>
                      </div>
                      <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md font-medium">Male</span>
                    </div>
                    <div className="mt-3 text-xs text-slate-600 space-y-1">
                      <div><strong>Microchip:</strong> 985141002348512</div>
                      <div><strong>Allergies:</strong> Chicken protein</div>
                      <div><strong>Next Booster:</strong> DHPPiL (Nov 2026)</div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('assistant')}
                  className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Bot className="h-4 w-4" /> Ask AI About Milo's Nutrition & Care
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Clinic Appointment Schedule</h2>
                <p className="text-xs text-slate-500 mt-1">Conflict-aware slot allocation and client appointment tracking</p>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <PlusCircle className="h-4 w-4" /> New Booking
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-900 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Owner</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Attending Vet</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{appt.pet_name}</td>
                      <td className="py-3.5 px-4">{appt.owner_name}</td>
                      <td className="py-3.5 px-4">{appt.service_type}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {new Date(appt.scheduled_at).toLocaleDateString('en-PH')} - {new Date(appt.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3.5 px-4">{appt.vet_name}</td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          appt.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          appt.status === 'completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {/* Role-based actions */}
                        {(currentRole === 'admin_staff' || currentRole === 'veterinarian') && appt.status === 'pending' && (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleUpdateStatus(appt.id, 'confirmed')}
                              className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold flex items-center gap-1 cursor-pointer"
                              title="Confirm Appointment"
                            >
                              <Check className="h-3 w-3" /> Confirm
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(appt.id, 'cancelled')}
                              className="px-2 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold flex items-center gap-1 cursor-pointer"
                              title="Cancel Appointment"
                            >
                              <XCircle className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                        {currentRole === 'veterinarian' && appt.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              const foundPet = pets.find(p => p.id === appt.pet_id) || pets[0]
                              setActiveConsultationPet(foundPet)
                              setIsConsultationOpen(true)
                            }}
                            className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold flex items-center gap-1 cursor-pointer ml-auto"
                          >
                            <Stethoscope className="h-3 w-3" /> SOAP Form
                          </button>
                        )}
                        {appt.status === 'completed' && (
                          <span className="text-[11px] text-slate-400 font-medium">Record Closed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Pets & Clinical Records */}
        {activeTab === 'pets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Patient Profiles & Medical Records</h2>
                <p className="text-xs text-slate-500 mt-1">Centralized health history, breed info, and allergy logs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <div key={pet.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{pet.species}</span>
                      <span className="text-xs text-slate-400 font-mono">#{pet.microchip_id?.slice(-6)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{pet.name}</h3>
                    <p className="text-xs text-slate-500">{pet.breed} • {pet.sex}</p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400">Allergies: </span>
                        <span className="font-medium text-slate-700">{pet.allergies || 'None'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Clinical Notes: </span>
                        <span className="text-slate-600">{pet.notes || 'No remarks recorded.'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveConsultationPet(pet)
                        setIsConsultationOpen(true)
                      }}
                      className="text-[11px] text-teal-600 font-semibold cursor-pointer hover:underline"
                    >
                      View / Add SOAP Notes
                    </button>
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Billing */}
        {activeTab === 'billing' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Billing Summaries & Clinic Invoices</h2>
                <p className="text-xs text-slate-500 mt-1">Accurate service itemization and local clinic payment tracking (Cash/Counter Payment)</p>
              </div>
            </div>

            <div className="space-y-6">
              {MOCK_INVOICES.map((inv) => (
                <div key={inv.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
                    <div>
                      <span className="font-mono font-bold text-slate-900 text-sm">{inv.invoice_number}</span>
                      <span className="text-xs text-slate-500 ml-2">• Patient: {inv.pet_name} (Owner: {inv.owner_name})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                        inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                      <span className="font-bold text-slate-900 text-base">₱{inv.total_amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {inv.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-slate-600">
                        <span>{item.description} (x{item.quantity})</span>
                        <span className="font-medium text-slate-800">₱{item.total_price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 text-right text-xs text-slate-500">
                    Includes 12% VAT (₱{inv.tax_amount.toFixed(2)}) • Recorded on {new Date(inv.created_at).toLocaleDateString('en-PH')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: AI Assistant */}
        {activeTab === 'assistant' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">IntelliVet AI Assistant</h3>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Online • Veterinary Guidance Support
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Non-Diagnostic Safeguards Active</span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-teal-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                placeholder="Ask about vaccination timing, pet care tips, or booking an appointment..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" /> Send
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBook={handleAddAppointment}
        pets={pets}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        pet={activeConsultationPet}
        onSave={(soapNotes) => {
          if (activeConsultationPet) {
            setPets(prev => prev.map(p => p.id === activeConsultationPet.id ? { ...p, notes: soapNotes.assessment || soapNotes.plan } : p))
          }
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          IntelliVet System — Polytechnic University of the Philippines, CCIS. Built for single-clinic operations in the Philippines.
        </div>
      </footer>
    </div>
  )
}

export default App
