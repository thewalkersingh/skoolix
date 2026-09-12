# 🏫 School Management System — Full Project Structure

## Root Layout
```
school-management-system/
├── backend/                        # Spring Boot Application
├── frontend/                       # React + Vite + TypeScript
├── docs/                           # API docs, ERD diagrams
├── docker-compose.yml              # MySQL + Backend + Frontend
├── .env.example
└── README.md
```

---

## 📦 Backend Structure (`/backend`)

```
backend/
├── pom.xml
├── Dockerfile
└── src/
    └── main/
        ├── java/com/school/
        │   │
        │   ├── SchoolManagementApplication.java
        │   │
        │   ├── config/
        │   │   ├── SecurityConfig.java               # Spring Security + JWT filter chain
        │   │   ├── JwtConfig.java                    # JWT properties
        │   │   ├── CorsConfig.java                   # CORS for React + Mobile
        │   │   ├── SwaggerConfig.java                # OpenAPI 3 / Swagger UI
        │   │   ├── AuditConfig.java                  # JPA auditing (createdAt, updatedAt)
        │   │   └── StripeConfig.java                 # Stripe API keys
        │   │
        │   ├── security/
        │   │   ├── JwtTokenProvider.java             # Generate/validate JWT
        │   │   ├── JwtAuthenticationFilter.java      # Filter for every request
        │   │   ├── JwtRefreshFilter.java             # Refresh token logic
        │   │   ├── CustomUserDetailsService.java     # Load user by email
        │   │   └── TenantContext.java                # ThreadLocal school_id (multi-tenant)
        │   │
        │   ├── common/
        │   │   ├── entity/
        │   │   │   └── BaseEntity.java               # id, createdAt, updatedAt, createdBy
        │   │   ├── exception/
        │   │   │   ├── GlobalExceptionHandler.java   # @ControllerAdvice
        │   │   │   ├── ResourceNotFoundException.java
        │   │   │   ├── UnauthorizedException.java
        │   │   │   ├── TenantAccessException.java
        │   │   │   └── PaymentException.java
        │   │   ├── response/
        │   │   │   ├── ApiResponse.java              # Wrapper: {success, message, data}
        │   │   │   └── PageResponse.java             # Wrapper for paginated results
        │   │   ├── enums/
        │   │   │   ├── Role.java                     # SUPER_ADMIN, SCHOOL_ADMIN, TEACHER, STUDENT, PARENT
        │   │   │   ├── Gender.java
        │   │   │   ├── AttendanceStatus.java         # PRESENT, ABSENT, LATE, EXCUSED
        │   │   │   ├── FeeStatus.java                # PAID, PENDING, OVERDUE, PARTIAL
        │   │   │   ├── ExamType.java                 # MIDTERM, FINAL, QUIZ, ASSIGNMENT
        │   │   │   └── NotificationType.java
        │   │   └── util/
        │   │       ├── DateUtil.java
        │   │       └── SlugUtil.java
        │   │
        │   ├── module/
        │   │   │
        │   │   ├── auth/
        │   │   │   ├── controller/AuthController.java
        │   │   │   ├── service/AuthService.java
        │   │   │   ├── dto/
        │   │   │   │   ├── LoginRequest.java
        │   │   │   │   ├── LoginResponse.java
        │   │   │   │   ├── RegisterRequest.java
        │   │   │   │   └── RefreshTokenRequest.java
        │   │   │   └── entity/RefreshToken.java
        │   │   │
        │   │   ├── school/                           # SUPER_ADMIN manages schools
        │   │   │   ├── controller/SchoolController.java
        │   │   │   ├── service/SchoolService.java
        │   │   │   ├── repository/SchoolRepository.java
        │   │   │   ├── entity/School.java
        │   │   │   └── dto/
        │   │   │       ├── SchoolRequest.java
        │   │   │       └── SchoolResponse.java
        │   │   │
        │   │   ├── user/                             # All users (any role)
        │   │   │   ├── controller/UserController.java
        │   │   │   ├── service/UserService.java
        │   │   │   ├── repository/UserRepository.java
        │   │   │   ├── entity/User.java
        │   │   │   └── dto/
        │   │   │       ├── UserRequest.java
        │   │   │       ├── UserResponse.java
        │   │   │       └── ChangePasswordRequest.java
        │   │   │
        │   │   ├── student/
        │   │   │   ├── controller/StudentController.java
        │   │   │   ├── service/StudentService.java
        │   │   │   ├── repository/
        │   │   │   │   ├── StudentRepository.java
        │   │   │   │   └── EnrollmentRepository.java
        │   │   │   ├── entity/
        │   │   │   │   ├── Student.java              # Profile: DOB, address, guardian
        │   │   │   │   └── Enrollment.java           # student + academicYear + section
        │   │   │   └── dto/
        │   │   │       ├── StudentRequest.java
        │   │   │       ├── StudentResponse.java
        │   │   │       └── EnrollmentRequest.java
        │   │   │
        │   │   ├── teacher/
        │   │   │   ├── controller/TeacherController.java
        │   │   │   ├── service/TeacherService.java
        │   │   │   ├── repository/
        │   │   │   │   ├── TeacherRepository.java
        │   │   │   │   └── SubjectAssignmentRepository.java
        │   │   │   ├── entity/
        │   │   │   │   ├── Teacher.java
        │   │   │   │   └── SubjectAssignment.java    # teacher + subject + section
        │   │   │   └── dto/
        │   │   │       ├── TeacherRequest.java
        │   │   │       └── TeacherResponse.java
        │   │   │
        │   │   ├── academic/                         # Academic year, classes, sections, subjects
        │   │   │   ├── controller/
        │   │   │   │   ├── AcademicYearController.java
        │   │   │   │   ├── ClassController.java
        │   │   │   │   ├── SectionController.java
        │   │   │   │   └── SubjectController.java
        │   │   │   ├── service/
        │   │   │   │   ├── AcademicYearService.java
        │   │   │   │   ├── ClassService.java
        │   │   │   │   ├── SectionService.java
        │   │   │   │   └── SubjectService.java
        │   │   │   ├── repository/
        │   │   │   │   ├── AcademicYearRepository.java
        │   │   │   │   ├── ClassRepository.java
        │   │   │   │   ├── SectionRepository.java
        │   │   │   │   └── SubjectRepository.java
        │   │   │   ├── entity/
        │   │   │   │   ├── AcademicYear.java         # 2024-2025
        │   │   │   │   ├── SchoolClass.java          # Grade 8, Grade 9
        │   │   │   │   ├── Section.java              # Grade 8-A, Grade 8-B
        │   │   │   │   └── Subject.java              # Math, Science, English
        │   │   │   └── dto/  (request/response DTOs)
        │   │   │
        │   │   ├── timetable/
        │   │   │   ├── controller/TimetableController.java
        │   │   │   ├── service/TimetableService.java
        │   │   │   ├── repository/TimetableRepository.java
        │   │   │   ├── entity/
        │   │   │   │   ├── Timetable.java            # section + day + period
        │   │   │   │   └── Period.java               # startTime, endTime, subject, teacher
        │   │   │   └── dto/
        │   │   │       ├── TimetableRequest.java
        │   │   │       └── TimetableResponse.java
        │   │   │
        │   │   ├── attendance/
        │   │   │   ├── controller/AttendanceController.java
        │   │   │   ├── service/AttendanceService.java
        │   │   │   ├── repository/AttendanceRepository.java
        │   │   │   ├── entity/Attendance.java        # student + section + date + status
        │   │   │   └── dto/
        │   │   │       ├── AttendanceRequest.java    # bulk mark attendance
        │   │   │       ├── AttendanceResponse.java
        │   │   │       └── AttendanceReportDto.java
        │   │   │
        │   │   ├── exam/
        │   │   │   ├── controller/
        │   │   │   │   ├── ExamController.java
        │   │   │   │   └── ExamResultController.java
        │   │   │   ├── service/
        │   │   │   │   ├── ExamService.java
        │   │   │   │   └── ExamResultService.java
        │   │   │   ├── repository/
        │   │   │   │   ├── ExamRepository.java
        │   │   │   │   └── ExamResultRepository.java
        │   │   │   ├── entity/
        │   │   │   │   ├── Exam.java                 # name, type, date, subject, section
        │   │   │   │   └── ExamResult.java           # student + exam + marks + grade
        │   │   │   └── dto/
        │   │   │       ├── ExamRequest.java
        │   │   │       ├── ExamResultRequest.java
        │   │   │       └── ReportCardDto.java
        │   │   │
        │   │   ├── fee/
        │   │   │   ├── controller/
        │   │   │   │   ├── FeeStructureController.java
        │   │   │   │   ├── FeePaymentController.java
        │   │   │   │   └── StripeWebhookController.java
        │   │   │   ├── service/
        │   │   │   │   ├── FeeStructureService.java
        │   │   │   │   ├── FeePaymentService.java
        │   │   │   │   └── StripeService.java
        │   │   │   ├── repository/
        │   │   │   │   ├── FeeStructureRepository.java
        │   │   │   │   └── FeePaymentRepository.java
        │   │   │   ├── entity/
        │   │   │   │   ├── FeeStructure.java         # school + class + academicYear + amount
        │   │   │   │   ├── FeeInstallment.java       # due dates, amounts per structure
        │   │   │   │   └── FeePayment.java           # student + installment + stripePaymentId
        │   │   │   └── dto/
        │   │   │       ├── FeeStructureRequest.java
        │   │   │       ├── PaymentIntentRequest.java
        │   │   │       ├── PaymentIntentResponse.java
        │   │   │       └── FeeReceiptDto.java
        │   │   │
        │   │   ├── parent/
        │   │   │   ├── controller/ParentController.java
        │   │   │   ├── service/ParentService.java
        │   │   │   ├── repository/ParentStudentRepository.java
        │   │   │   ├── entity/ParentStudent.java     # parent_user_id + student_id
        │   │   │   └── dto/
        │   │   │       └── ParentDashboardDto.java   # children's attendance, grades, fees
        │   │   │
        │   │   └── notification/
        │   │       ├── controller/NotificationController.java
        │   │       ├── service/
        │   │       │   ├── NotificationService.java
        │   │       │   └── EmailService.java         # JavaMailSender
        │   │       ├── repository/NotificationRepository.java
        │   │       ├── entity/
        │   │       │   ├── Notification.java
        │   │       │   └── NotificationRecipient.java
        │   │       └── dto/
        │   │           ├── NotificationRequest.java
        │   │           └── NotificationResponse.java
        │   │
        │   └── scheduler/
        │       └── FeeReminderScheduler.java         # @Scheduled daily overdue fee alerts
        │
        └── resources/
            ├── application.yml                       # Main config
            ├── application-dev.yml                   # Dev overrides
            ├── application-prod.yml                  # Prod overrides
            └── db/migration/                         # Flyway SQL migrations
                ├── V1__init_schema.sql               # Core tables
                ├── V2__schools_users.sql
                ├── V3__academic_structure.sql
                ├── V4__students_teachers.sql
                ├── V5__attendance_exams.sql
                ├── V6__fees.sql
                └── V7__notifications.sql
```

---

## 🎨 Frontend Structure (`/frontend`)

```
frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── Dockerfile
└── src/
    ├── main.tsx
    ├── App.tsx
    │
    ├── api/                              # All API calls (Axios)
    │   ├── axiosInstance.ts              # Base URL, interceptors, token refresh
    │   ├── authApi.ts
    │   ├── schoolApi.ts
    │   ├── studentApi.ts
    │   ├── teacherApi.ts
    │   ├── academicApi.ts
    │   ├── timetableApi.ts
    │   ├── attendanceApi.ts
    │   ├── examApi.ts
    │   ├── feeApi.ts
    │   ├── parentApi.ts
    │   └── notificationApi.ts
    │
    ├── store/                            # Zustand stores
    │   ├── authStore.ts                  # user, token, role
    │   ├── tenantStore.ts               # current school context
    │   └── notificationStore.ts
    │
    ├── hooks/                            # React Query custom hooks
    │   ├── useAuth.ts
    │   ├── useStudents.ts
    │   ├── useTeachers.ts
    │   ├── useAttendance.ts
    │   ├── useExams.ts
    │   ├── useFees.ts
    │   └── useNotifications.ts
    │
    ├── types/                            # TypeScript interfaces
    │   ├── auth.types.ts
    │   ├── school.types.ts
    │   ├── student.types.ts
    │   ├── teacher.types.ts
    │   ├── academic.types.ts
    │   ├── attendance.types.ts
    │   ├── exam.types.ts
    │   ├── fee.types.ts
    │   └── notification.types.ts
    │
    ├── router/
    │   ├── index.tsx                     # React Router v6 routes
    │   ├── ProtectedRoute.tsx            # Auth guard
    │   └── RoleRoute.tsx                 # Role-based guard
    │
    ├── layouts/
    │   ├── AuthLayout.tsx                # Login/Register shell
    │   ├── DashboardLayout.tsx           # Sidebar + topbar shell
    │   └── components/
    │       ├── Sidebar.tsx               # Role-aware nav links
    │       ├── Topbar.tsx                # Search, notifications, profile
    │       └── NotificationBell.tsx
    │
    ├── pages/
    │   ├── auth/
    │   │   ├── LoginPage.tsx
    │   │   └── ForgotPasswordPage.tsx
    │   │
    │   ├── super-admin/
    │   │   ├── SchoolsPage.tsx           # List + create schools
    │   │   └── SchoolDetailPage.tsx
    │   │
    │   ├── dashboard/
    │   │   ├── AdminDashboard.tsx        # Stats: students, fees, attendance
    │   │   ├── TeacherDashboard.tsx
    │   │   ├── StudentDashboard.tsx
    │   │   └── ParentDashboard.tsx
    │   │
    │   ├── students/
    │   │   ├── StudentListPage.tsx
    │   │   ├── StudentDetailPage.tsx
    │   │   └── EnrollStudentPage.tsx
    │   │
    │   ├── teachers/
    │   │   ├── TeacherListPage.tsx
    │   │   └── TeacherDetailPage.tsx
    │   │
    │   ├── academic/
    │   │   ├── AcademicYearPage.tsx
    │   │   ├── ClassesPage.tsx
    │   │   └── SubjectsPage.tsx
    │   │
    │   ├── timetable/
    │   │   ├── TimetableViewPage.tsx     # Visual grid view
    │   │   └── TimetableEditPage.tsx
    │   │
    │   ├── attendance/
    │   │   ├── MarkAttendancePage.tsx    # Teacher marks daily
    │   │   └── AttendanceReportPage.tsx  # Charts, filters
    │   │
    │   ├── exams/
    │   │   ├── ExamListPage.tsx
    │   │   ├── EnterResultsPage.tsx
    │   │   └── ReportCardPage.tsx        # Printable report card
    │   │
    │   ├── fees/
    │   │   ├── FeeStructurePage.tsx
    │   │   ├── StudentFeesPage.tsx
    │   │   ├── PaymentPage.tsx           # Stripe checkout
    │   │   └── FeeReceiptPage.tsx        # Printable receipt
    │   │
    │   ├── notifications/
    │   │   ├── NotificationsPage.tsx
    │   │   └── CreateAnnouncementPage.tsx
    │   │
    │   └── profile/
    │       └── ProfilePage.tsx
    │
    └── components/                       # Shared UI components
        ├── ui/                           # Shadcn base (Button, Input, etc.)
        ├── DataTable.tsx                 # Reusable table with pagination/sort
        ├── StatsCard.tsx                 # Dashboard stat widget
        ├── ConfirmDialog.tsx
        ├── FileUpload.tsx
        ├── SearchInput.tsx
        ├── RoleBadge.tsx
        ├── LoadingSpinner.tsx
        └── charts/
            ├── AttendanceChart.tsx       # Recharts bar chart
            └── FeeCollectionChart.tsx    # Recharts line chart
```

---

## 🐳 Docker & Config

```
docker-compose.yml
├── mysql:8.0          (port 3306)
├── backend:           (port 8080)  Spring Boot
└── frontend:          (port 5173)  Vite dev / Nginx prod

.env.example
├── DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS
├── JWT_SECRET, JWT_EXPIRY_MS, JWT_REFRESH_EXPIRY_MS
├── STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
├── MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS
└── FRONTEND_URL (for CORS)
```

---

## 🗃️ Database ERD (Entities & Key Relations)

```
schools ──< users (school_id)
schools ──< academic_years
academic_years ──< school_classes ──< sections
sections ──< enrollments >── students
sections ──< subject_assignments >── teachers >── subjects
sections ──< timetable_periods

students ──< attendance (section, date, status)
students ──< exam_results >── exams >── subjects
students ──< fee_payments >── fee_installments >── fee_structures

users (PARENT) ──< parent_students >── students

notifications ──< notification_recipients >── users
```

---

## 🔑 API Endpoint Summary

| Module | Endpoints |
|--------|-----------|
| Auth | POST /login, /register, /refresh, /logout |
| Schools | GET/POST /schools, GET/PUT/DELETE /schools/{id} |
| Users | CRUD /users, /users/{id}/change-password |
| Students | CRUD /students, POST /students/{id}/enroll |
| Teachers | CRUD /teachers, POST /teachers/{id}/assign-subject |
| Academic | CRUD /academic-years, /classes, /sections, /subjects |
| Timetable | GET/POST /timetable, GET /timetable/section/{id} |
| Attendance | POST /attendance/mark (bulk), GET /attendance/report |
| Exams | CRUD /exams, POST /exams/{id}/results, GET /report-card/{studentId} |
| Fees | CRUD /fee-structures, POST /payments/create-intent, POST /webhook/stripe |
| Parent | GET /parent/dashboard, GET /parent/children |
| Notifications | GET/POST /notifications, PUT /notifications/{id}/read |

---

## 📋 Development Order (Phase-by-Phase)

```
Phase 1 → DB Migration (Flyway) + Auth (JWT) + School + User APIs
Phase 2 → Student, Teacher, Academic, Timetable modules
Phase 3 → Attendance + Exams/Grades
Phase 4 → Fee Structures + Stripe Integration
Phase 5 → Parent Portal + Notifications + Email
Phase 6 → Full React Frontend (all pages)
Phase 7 → API response hardening for Android/iOS (versioning, error codes)
```
