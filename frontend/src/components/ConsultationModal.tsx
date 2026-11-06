import React, { useState } from 'react'
import { X, Stethoscope, Save } from 'lucide-react'
import { Pet } from '../types'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  pet: Pet | null
  onSave: (notes: { subjective: string; objective: string; assessment: string; plan: string }) => void
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  pet,
  onSave,
}) => {
  const [subjective, setSubjective] = useState('')
  const [objective, setObjective] = useState('')
  const [assessment, setAssessment] = useState('')
  const [plan, setPlan] = useState('')

  if (!isOpen || !pet) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ subjective, objective, assessment, plan })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">SOAP Consultation Record</h3>
              <p className="text-xs text-slate-500">Patient: {pet.name} ({pet.species} • {pet.breed})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
              [S] Subjective (Owner Observations / Chief Complaint)
            </label>
            <textarea
              rows={2}
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              placeholder="e.g. Mild loss of appetite for 2 days, drinking water normally..."
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
              [O] Objective (Physical Exam / Vitals / Lab Findings)
            </label>
            <textarea
              rows={2}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="e.g. Temp: 38.5°C, CRT < 2s, Hydration adequate, Lungs clear..."
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
              [A] Assessment (Clinical Diagnosis / Impression)
            </label>
            <textarea
              rows={2}
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="e.g. Acute mild gastritis secondary to dietary indiscretion."
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
              [P] Plan (Prescriptions / Procedures / Follow-up)
            </label>
            <textarea
              rows={2}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="e.g. Prescribed probiotic paste, bland gastrointestinal diet for 5 days. Re-eval in 1 week if not resolved."
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

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
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" /> Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

