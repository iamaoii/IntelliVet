from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Text, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=False, index=True)
    vet_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"), nullable=True, unique=True)

    weight_kg = Column(Float, nullable=True)
    temperature_celsius = Column(Float, nullable=True)
    heart_rate_bpm = Column(Integer, nullable=True)
    
    # SOAP Clinical Structure
    subjective = Column(Text, nullable=True)  # Chief complaint, owner-reported symptoms
    objective = Column(Text, nullable=True)   # Physical exam findings, vitals
    assessment = Column(Text, nullable=True)  # Diagnosis / Clinical impression
    plan = Column(Text, nullable=True)        # Treatment plan, prescriptions, advice

    follow_up_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    pet = relationship("Pet", back_populates="medical_records")
    veterinarian = relationship("User", back_populates="medical_records_authored")
    appointment = relationship("Appointment", back_populates="medical_record")

class VaccinationRecord(Base):
    __tablename__ = "vaccination_records"

    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=False, index=True)
    vaccine_name = Column(String(150), nullable=False)
    batch_number = Column(String(100), nullable=True)
    administered_date = Column(Date, nullable=False, default=date.today)
    next_due_date = Column(Date, nullable=True, index=True)
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    pet = relationship("Pet", back_populates="vaccinations")

