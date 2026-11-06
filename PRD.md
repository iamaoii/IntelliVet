# IntelliVet — Product Requirements Document (PRD)

**Project:** IntelliVet: An Intelligent Centralized Veterinary System for AI-Assisted Operations  
**Document type:** Product Requirements Document  
**Project context:** Systems Administration and Maintenance Project Concept Paper  
**Institution:** Polytechnic University of the Philippines, College of Computer and Information Sciences, Department of Information Technology  
**Target implementation:** One veterinary clinic in the Philippines  
**Status:** Detailed project requirements draft based on the submitted concept paper

---

## 1. Product overview

IntelliVet is a web-based Veterinary Information Management System (VIMS) intended to centralize and improve the day-to-day operations of a veterinary clinic. It brings appointment scheduling, pet and medical records, billing documentation, client communication, and operational reporting into one connected platform.

The system is designed for three primary user groups: clinic administrators or staff, veterinarians, and pet owners. Clinic personnel use the system to manage appointments, patient information, services, billing records, and operational data. Veterinarians use it to review and update clinical records. Pet owners use it to book appointments, monitor their pets' information, receive reminders, and access an AI-assisted pet-care assistant.

IntelliVet goes beyond being a digital record repository by incorporating AI-assisted scheduling support, a conversational assistant, personalized pet dashboards, and predictive analytics. These capabilities are intended to support users and improve operational planning. They do not replace veterinary expertise or make clinical decisions.

## 2. Background and problem statement

The concept paper identifies several problems affecting veterinary clinic operations:

- **Fragmented information:** Appointment, medical, and billing information may be stored separately. Updates in one place may not be reflected elsewhere.
- **Manual and repetitive processes:** Logbooks, index cards, and manual scheduling increase administrative workload and the possibility of mistakes.
- **Scheduling inefficiency:** Manual booking can create conflicts, make time-slot allocation difficult, and contribute to missed appointments.
- **Limited client communication:** Clinics need accessible ways to notify pet owners about appointments and routine care. SMS is specifically identified as an important local communication channel.
- **Limited operational insight:** Without organized historical data, clinic managers may find it difficult to identify peak hours, forecast appointment demand, and plan resources.
- **Limited access to integrated tools:** Small and medium-sized veterinary practices may not have access to affordable, localized, connected systems.

IntelliVet addresses these issues through a centralized web platform with connected operational modules and decision-support features.

## 3. Product vision

Provide a centralized, accessible, and intelligent veterinary clinic platform that reduces administrative friction, improves information consistency, supports communication with pet owners, and helps clinic personnel make better operational decisions.

## 4. Goals and objectives

### 4.1 General objective

Design and develop a web-based Veterinary Information Management System that integrates centralized patient records, automated appointment scheduling with AI-driven booking optimization, and a computation-based billing system, together with AI assistance and predictive analytics, to improve the efficiency, accessibility, and overall quality of veterinary clinic operations.

### 4.2 Specific objectives

1. Centralize pet patient records, including medical history, treatments, and vaccination details, in a cloud-based platform.
2. Provide appointment scheduling with automated SMS notifications to reduce missed appointments and improve client adherence.
3. Integrate billing and inventory management to streamline operations and maintain data consistency.
4. Provide AI-assisted basic pet-care guidance and recommendations to support pet owners before veterinary visits.
5. Apply predictive analytics to generate reminders for vaccinations, grooming, and routine pet care based on pet data.
6. Evaluate usability, functionality, and performance through feedback from veterinary practitioners and clinic staff.

## 5. Target users and roles

The concept paper defines three primary user groups. Permissions should be enforced according to role.

| User role | Primary responsibilities | Main system capabilities |
|---|---|---|
| Administrator / Clinic Staff | Coordinate clinic operations and maintain administrative information | Manage appointments, client and pet data as permitted, billing records, service records, operational data, and reports |
| Veterinarian | Review and maintain clinical information and provide professional care | Access pet histories, review consultations, record diagnoses and treatments, and update medical records |
| Pet Owner | Manage their pets' information and interact with the clinic | Book appointments, view permitted pet records, see appointment history, receive reminders, and use the AI assistant |

**Role-model clarification:** The scope section names Administrator/Clinic Staff and Veterinarians separately, while the use-case explanation groups Admin/Veterinarian as one actor. The implementation should retain distinct permissions for staff and veterinarians even if a shared interface or combined use-case diagram is used. The exact permission matrix requires clinic validation.

## 6. Product scope

### 6.1 In scope

- A web-based system for one veterinary clinic.
- Account access for administrators/clinic staff, veterinarians, and pet owners.
- Centralized pet profiles and electronic medical records.
- Appointment creation and management.
- Intelligent assistance for appointment slot allocation and conflict reduction.
- Automated SMS appointment notifications and reminders.
- Billing records and billing summaries for services rendered.
- Inventory management is identified as an objective and an integration need; detailed inventory workflows remain to be specified.
- AI-powered pet assistant for basic pet-care questions and appointment assistance.
- Personalized pet dashboard.
- Pet-care reminders, including vaccination and grooming reminders.
- Predictive analytics for appointment demand, peak clinic hours, and operational planning.
- Reports and operational summaries.
- Optional CSV import for initial data setup.
- Cloud-based deployment and internet-connected operation.

### 6.2 Out of scope and limitations

- **Online payment processing:** The system will not include a payment gateway. Payments continue to be handled physically at the clinic. Billing is for recording, tracking, and summarizing charges and services.
- **Veterinary diagnosis or prescription:** AI features and analytics are decision-support tools only. They must not diagnose, prescribe, or replace a licensed veterinarian.
- **Multi-clinic operation:** The initial system is intended for one clinic. Other clinics would require customization, testing, and validation.
- **Full offline operation:** Full functionality requires an internet connection. Previously loaded information may be available in a limited offline context, but live scheduling and analytics require connectivity.
- **Guaranteed prediction accuracy:** Analytics depend on the amount, quality, and completeness of historical data.
- **Unspecified external integrations:** The concept paper does not identify a specific SMS provider, payment processor, or external clinic system. Payment processing is explicitly excluded; other provider choices remain open.

## 7. Functional requirements

Priority labels are suggested for planning: **Must** = essential to the stated project; **Should** = important supporting capability; **To define** = mentioned in the concept paper but requires further workflow decisions.

### 7.1 Account and access management

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | The system shall support authenticated access for clinic staff, veterinarians, and pet owners. | Must |
| FR-02 | The system shall restrict access to records and actions according to the user's role. | Must |
| FR-03 | The system shall associate pet-owner access with the pet or pets the owner is authorized to view. | Must |
| FR-04 | The system shall provide a controlled way to maintain user and account information. | Should |

### 7.2 Pet profiles and electronic medical records

| ID | Requirement | Priority |
|---|---|---|
| FR-05 | The system shall maintain a centralized profile for each pet patient. | Must |
| FR-06 | A pet profile shall contain relevant identifying and ownership information. | Must |
| FR-07 | Authorized clinic users shall be able to record and review consultation history. | Must |
| FR-08 | Authorized veterinarians shall be able to record diagnoses and treatments. | Must |
| FR-09 | The system shall maintain vaccination details and relevant treatment history. | Must |
| FR-10 | Pet owners shall be able to view permitted pet health information through their dashboard. | Must |
| FR-11 | The system shall keep related records connected to the appropriate pet profile. | Must |

The exact clinical fields, attachments, record correction process, and retention rules should be validated with the clinic.

### 7.3 Appointment scheduling and notifications

| ID | Requirement | Priority |
|---|---|---|
| FR-12 | Pet owners shall be able to submit appointment booking requests online. | Must |
| FR-13 | Clinic staff shall be able to view and manage clinic appointments. | Must |
| FR-14 | The scheduling module shall check availability and prevent conflicting bookings according to configured clinic schedules. | Must |
| FR-15 | The system shall provide AI-assisted or intelligent booking optimization to help allocate time slots and reduce conflicts. | Must |
| FR-16 | The system shall send automated SMS notifications related to appointments. | Must |
| FR-17 | Appointment history shall be available to authorized users. | Must |
| FR-18 | The system should support appointment status tracking and changes such as confirmation, cancellation, or rescheduling. | Should |

The concept paper does not define appointment statuses, appointment duration rules, veterinarian-specific calendars, emergency handling, cancellation windows, or the exact optimization algorithm. These require clinic agreement before implementation.

### 7.4 Billing and service records

| ID | Requirement | Priority |
|---|---|---|
| FR-19 | Authorized clinic personnel shall be able to record services rendered to a pet. | Must |
| FR-20 | The system shall calculate or compile charges from recorded services and applicable amounts. | Must |
| FR-21 | The system shall generate a billing summary for a visit or transaction record. | Must |
| FR-22 | The system shall maintain billing records for later review and reporting. | Must |
| FR-23 | The system shall not process online payments. Payment collection remains an in-clinic activity. | Must |

The detailed pricing model, discounts, taxes, refunds, partial payments, and official receipt requirements are not specified in the concept paper.

### 7.5 Inventory management

| ID | Requirement | Priority |
|---|---|---|
| FR-24 | The system should provide an inventory-management capability, consistent with the stated specific objective. | To define |
| FR-25 | Inventory data should be connected to relevant clinic operations where the clinic confirms the workflow. | To define |

The concept paper mentions inventory management but does not describe stock fields, stock movement, suppliers, purchase orders, low-stock thresholds, or whether inventory items are linked to services and billing. Those details must be elicited rather than assumed.

### 7.6 AI-powered pet assistant

| ID | Requirement | Priority |
|---|---|---|
| FR-26 | The system shall provide a conversational assistant for common pet-care inquiries. | Must |
| FR-27 | The assistant shall provide basic, general pet-care guidance and recommendations. | Must |
| FR-28 | The assistant shall assist users with the appointment-booking process. | Must |
| FR-29 | The assistant shall communicate that its guidance is not a veterinary diagnosis or prescription. | Must |
| FR-30 | The assistant shall direct users to consult a veterinarian for clinical assessment and decisions. | Must |

The concept paper identifies an OpenAI API integration as the proposed AI technology. Model selection, prompt design, safety controls, conversation retention, and escalation behavior remain implementation decisions.

### 7.7 Personalized pet dashboard and reminders

| ID | Requirement | Priority |
|---|---|---|
| FR-31 | The pet owner dashboard shall present the owner's permitted pet information. | Must |
| FR-32 | The dashboard shall show relevant medical-record information and appointment history. | Must |
| FR-33 | The dashboard shall display care reminders relevant to the pet. | Must |
| FR-34 | The system shall generate vaccination, grooming, and routine-care reminders based on available pet data. | Must |

The exact reminder rules, schedules, lead times, and whether reminders require veterinarian approval should be agreed with the clinic.

### 7.8 Predictive analytics and reporting

| ID | Requirement | Priority |
|---|---|---|
| FR-35 | The system shall analyze available historical appointment data to forecast future appointment demand. | Must |
| FR-36 | The system shall identify peak clinic hours and appointment trends. | Must |
| FR-37 | The system shall present insights that can assist scheduling and resource allocation. | Must |
| FR-38 | The system shall provide operational reports or summaries to authorized clinic users. | Should |
| FR-39 | Predictive outputs shall be presented as estimates based on available data, not guaranteed outcomes. | Must |

The concept paper does not specify a forecasting model, training procedure, minimum dataset size, evaluation metric, or forecast horizon. These must be established during technical design and validated with actual clinic data.

### 7.9 Data import

| ID | Requirement | Priority |
|---|---|---|
| FR-40 | The system may support CSV import for initial data setup. | Should |
| FR-41 | Imported data shall be checked for required fields and basic validity before being accepted. | Proposed detail |

CSV import is described as optional in the concept paper. The import templates, supported entities, duplicate handling, and error-report format remain to be defined.

## 8. Core user workflows

### 8.1 Pet owner appointment workflow

1. The pet owner signs in to IntelliVet.
2. The owner selects an existing pet profile or provides the required pet information.
3. The owner views available appointment options.
4. The scheduling module checks availability and applies the configured booking rules.
5. The owner submits the booking request.
6. The system records the appointment and makes it visible to authorized clinic personnel.
7. The system sends an SMS notification through the configured messaging provider.
8. The appointment appears in the owner's appointment history and dashboard.

The exact confirmation model (automatic confirmation or staff approval) is not specified and must be decided with the clinic.

### 8.2 Veterinary consultation and record workflow

1. Authorized clinic personnel locate the pet's profile and appointment.
2. The veterinarian reviews the pet's available medical history.
3. The veterinarian records consultation information, diagnosis, and treatment.
4. The record is saved against the pet's centralized medical history.
5. Authorized users can access the updated information according to their permissions.

### 8.3 Billing workflow

1. Clinic personnel record the services rendered.
2. The system calculates or compiles the corresponding charges using configured service amounts.
3. The system generates a billing summary.
4. The clinic records or handles payment outside the online system, according to its physical payment process.
5. The billing record remains available for authorized review.

### 8.4 Pet-care reminder workflow

1. The system reads relevant pet information, such as vaccination or grooming details.
2. A reminder rule determines whether a care reminder is due.
3. The system creates a reminder for the pet owner.
4. The reminder is displayed in the dashboard and may be sent through the configured notification channel.

The concept paper specifically identifies automated SMS appointment notifications and automated pet-care reminders. Whether every care reminder is also sent by SMS should be confirmed.

### 8.5 AI assistant workflow

1. A user submits a question or asks for help with an appointment.
2. The system sends the permitted conversational context to the AI service.
3. The assistant returns general pet-care information or booking assistance.
4. The system displays the response with clear limits on medical advice.
5. Clinical concerns requiring assessment are referred to a veterinarian.

### 8.6 Clinic analytics workflow

1. The system collects appointment and operational records as part of normal use.
2. The analytics component processes available historical data.
3. The system calculates appointment trends, demand forecasts, and peak-hour indicators.
4. Authorized clinic personnel review the insights.
5. Clinic personnel use the information as decision support when planning schedules and resources.

## 9. Business rules and constraints

1. A pet's medical information must remain associated with the correct pet profile.
2. Only authorized users may create or modify clinical and administrative records.
3. Pet owners may only access pets and information associated with their account.
4. Appointment booking must respect clinic availability and configured scheduling constraints.
5. Appointment notifications depend on valid contact information and an operational SMS provider.
6. Billing records document services and charges; the system does not collect online payments.
7. AI-generated information is informational and must not be treated as a diagnosis or prescription.
8. Clinical decisions remain the responsibility of a licensed veterinarian.
9. Predictive analytics must be interpreted in the context of the historical data available.
10. The initial deployment is limited to a single veterinary clinic.
11. Full functionality requires internet connectivity.
12. Personal and medical information must be handled in line with the Philippine Data Privacy Act of 2012 (RA 10173) and appropriate veterinary record-keeping practices.

## 10. Non-functional requirements

The concept paper establishes the need for security, accessibility, reliability, and performance but does not provide measurable service-level targets. The following are proposed quality requirements to guide implementation and testing.

| Category | Requirement |
|---|---|
| Security | Authenticate users and enforce role-based access to administrative, owner, and clinical information. |
| Privacy | Collect and expose only information needed for the system's purposes; protect personal and medical information in accordance with RA 10173. |
| Data integrity | Validate input and maintain consistent relationships among owners, pets, appointments, medical records, and billing records. |
| Availability | Host the application on cloud infrastructure and provide dependable access when the clinic has internet connectivity. |
| Performance | Keep common actions such as opening a pet profile, viewing appointments, and saving records responsive under the clinic's expected workload. Numeric response-time targets require agreement. |
| Usability | Provide clear workflows for clinic staff, veterinarians, and pet owners with differing technical experience. |
| Scalability | Support the expected workload of the initial clinic and allow infrastructure capacity to be adjusted if usage grows. |
| Maintainability | Organize the application into understandable modules and maintain technical documentation and tests. |
| Compatibility | Provide a responsive web interface suitable for commonly used desktop and mobile browsers. Exact browser support requires definition. |
| Recoverability | Establish database backup and restoration procedures. Recovery-point and recovery-time targets require definition. |
| Connectivity | Make internet dependency clear; real-time scheduling and analytics require connectivity. |

## 11. Data domains

The following are conceptual data domains implied by the required capabilities. They are not a finalized database schema.

- **Users and roles:** login identity, role, account status, and access relationships.
- **Pet owners:** owner contact and profile information.
- **Pets:** pet identity, owner relationship, and relevant care information.
- **Medical records:** consultations, diagnoses, treatments, and clinical history.
- **Vaccination and care records:** vaccination details, grooming information, and care schedules.
- **Appointments:** booking details, schedule, status, and notification state.
- **Services and billing:** services rendered, charges, billing summaries, and payment-recording details if the clinic requires them.
- **Inventory:** stock and inventory information, subject to workflow definition.
- **Notifications:** SMS or other reminder content, recipient, delivery state, and timestamps.
- **AI interactions:** only the minimum data needed to support the assistant, subject to privacy and retention decisions.
- **Analytics outputs:** aggregate appointment trends, forecasts, and peak-hour indicators.

## 12. Integrations and external dependencies

| Integration | Purpose | Status in concept paper |
|---|---|---|
| OpenAI API | AI-powered pet assistant | Named as proposed technology |
| SMS gateway/provider | Send appointment notifications and reminders | SMS is required; provider is not named |
| Cloud hosting | Host the web application and database | AWS or Azure are named examples; final provider is undecided |
| PostgreSQL | Structured data storage | Named database technology |
| CSV import | Initial data setup | Optional capability |

## 13. Success measures and evaluation

The concept paper states that the system will be evaluated for usability, functionality, and performance through feedback from veterinary practitioners and clinic staff. The following measures are suggested; numerical targets should be agreed with the clinic before evaluation.

- **Usability:** user feedback, task completion, and observed difficulty across the three user groups.
- **Functionality:** successful completion of core workflows, including booking, record updates, billing summaries, and reminders.
- **Scheduling quality:** frequency of conflicting bookings and the usefulness of scheduling recommendations.
- **Communication:** successful notification delivery and user-reported usefulness of reminders.
- **Data quality:** completeness and consistency of pet, appointment, and medical records.
- **Analytics usefulness:** whether forecasts and peak-hour summaries support clinic planning.
- **Performance:** response time and stability under representative clinic usage.

Do not claim that the system has reduced no-shows or improved clinic efficiency until those outcomes have been measured in an appropriate evaluation.

## 14. Risks and mitigations

| Risk | Potential impact | Mitigation direction |
|---|---|---|
| Incomplete or inconsistent historical data | Weak forecasts and unreliable analytics | Validate inputs, document data quality, and communicate prediction limitations. |
| Incorrect or unsafe AI response | Pet owner may misunderstand general guidance as medical advice | Use clear boundaries, safety instructions, and veterinarian referral for clinical decisions. |
| SMS provider outage or invalid contact details | Notifications may not reach pet owners | Track delivery status and provide clinic-side visibility into failed notifications. |
| Scheduling rules are not fully defined | Conflicts or unsuitable appointment allocation | Validate clinic hours, appointment types, durations, and staff availability before implementation. |
| Unauthorized access to medical or personal data | Privacy breach | Apply authentication, role-based authorization, secure transport, and appropriate operational controls. |
| Internet or cloud service outage | Real-time system functions become unavailable | Establish backup, recovery, and clinic contingency procedures. |
| Scope expansion | Delays and incomplete core modules | Prioritize the defined core workflows and formally approve additions. |

## 15. Assumptions and open questions

The following points are not fully settled by the concept paper and must be confirmed with the target clinic and project team:

1. Will appointments be automatically confirmed, or must staff approve each request?
2. What are the clinic's operating hours, appointment types, durations, buffers, and veterinarian availability rules?
3. What does “AI-assisted smart booking optimization” mean in the first release: rule-based slot recommendations, prediction-assisted allocation, or a more advanced optimizer?
4. Which SMS provider will be used, and what are the expected message costs and delivery requirements?
5. Which reminders are sent by SMS, which appear only in the dashboard, and how far in advance are they generated?
6. What clinical fields, attachments, and record correction/audit requirements does the clinic need?
7. What inventory workflows are required, given that inventory is named in the objectives but not detailed in the module description?
8. What pricing, discount, tax, and payment-recording rules apply to billing?
9. What CSV templates and legacy data sources are available?
10. What is the minimum historical data volume needed for useful appointment forecasting?
11. What forecast horizon and evaluation metrics should be used?
12. Which cloud provider (AWS or Azure) will be selected, and what budget is available?
13. What data retention, consent, privacy notice, backup, and incident-response procedures will the clinic adopt?
14. What measurable performance and availability targets should be used for acceptance testing?

## 16. Delivery approach

The concept paper adopts Agile software development. A practical delivery sequence is:

1. **Requirements discovery:** observe clinic workflows, review current records and scheduling practices, and confirm user roles.
2. **System design:** prepare UI/UX, data model, API design, and system architecture.
3. **Core implementation:** build authentication, pet profiles, medical records, and appointment management.
4. **Operations implementation:** add billing, service records, and the clinic-approved inventory scope.
5. **Intelligence and communication:** integrate SMS, AI assistant, reminders, and analytics.
6. **Testing and validation:** perform unit, integration, and user acceptance testing.
7. **Deployment:** deploy to the selected cloud environment and prepare operational documentation.
8. **Evaluation and refinement:** assess usability, functionality, and performance using practitioner and staff feedback.

## 17. Acceptance overview

The initial release should not be considered complete until:

- The three user groups can access the functions permitted for their roles.
- Authorized users can create and retrieve pet profiles and medical records.
- Pet owners can submit appointment requests and clinic personnel can manage them.
- Scheduling prevents conflicts under the clinic's agreed rules.
- Appointment SMS notifications can be triggered and delivery outcomes can be tracked.
- Clinic personnel can record services and produce billing summaries without online payment processing.
- Pet owners can view their permitted pet information and care reminders.
- The AI assistant provides basic guidance and booking assistance while clearly deferring clinical decisions to veterinarians.
- Analytics can display appointment trends and forecasts when sufficient data is available, with limitations disclosed.
- The system passes agreed functional, usability, security, and performance tests.

---

## Source alignment note

This PRD is based on the submitted IntelliVet concept paper. It preserves the stated single-clinic scope, three primary user groups, centralized patient records, appointment scheduling, SMS notifications, non-payment billing, AI pet assistant, personalized dashboard, predictive analytics, optional CSV import, cloud deployment, Agile methodology, and Philippine Data Privacy Act reference.

Items marked **proposed**, **to define**, or **open question** are elaborations needed to make the concept implementable. They should be validated rather than treated as approved clinic requirements.
