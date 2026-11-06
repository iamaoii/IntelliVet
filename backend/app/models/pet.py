from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    species = Column(String(50), nullable=False)  # Dog, Cat, etc.
    breed = Column(String(100), nullable=True)
    sex = Column(String(20), nullable=True)        # Male, Female, Neutered, Spayed
    birth_date = Column(Date, nullable=True)
    microchip_id = Column(String(100), unique=True, nullable=True, index=True)
    allergies = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    owner = relationship("User", back_populates="pets")
    appointments = relationship("Appointment", back_populates="pet", cascade="all, delete-orphan")
    medical_records = relationship("MedicalRecord", back_populates="pet", cascade="all, delete-orphan")
    vaccinations = relationship("VaccinationRecord", back_populates="pet", cascade="all, delete-orphan")

