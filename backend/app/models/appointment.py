import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base

class AppointmentStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    scheduled_at = Column(DateTime, nullable=False, index=True)
    duration_minutes = Column(Integer, default=30, nullable=False)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.PENDING, nullable=False, index=True)
    service_type = Column(String(100), nullable=False)  # Consultation, Vaccination, Grooming, Surgery, etc.
    reason = Column(Text, nullable=True)
    staff_notes = Column(Text, nullable=True)

    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=False, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    vet_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    pet = relationship("Pet", back_populates="appointments")
    owner = relationship("User", foreign_keys=[owner_id], back_populates="appointments_as_owner")
    veterinarian = relationship("User", foreign_keys=[vet_id], back_populates="appointments_as_vet")
    medical_record = relationship("MedicalRecord", back_populates="appointment", uselist=False)

