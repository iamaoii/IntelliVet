import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base

class UserRole(str, enum.Enum):
    ADMIN_STAFF = "admin_staff"
    VETERINARIAN = "veterinarian"
    PET_OWNER = "pet_owner"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    phone_number = Column(String(50), nullable=True, index=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.PET_OWNER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    pets = relationship("Pet", back_populates="owner", cascade="all, delete-orphan")
    appointments_as_owner = relationship("Appointment", foreign_keys="Appointment.owner_id", back_populates="owner")
    appointments_as_vet = relationship("Appointment", foreign_keys="Appointment.vet_id", back_populates="veterinarian")
    medical_records_authored = relationship("MedicalRecord", back_populates="veterinarian")

