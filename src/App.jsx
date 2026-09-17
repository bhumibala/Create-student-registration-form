import { useState } from 'react'
import './App.css'

const initialStudent = {
  fullName: '',
  enrollmentId: '',
  email: '',
  countryCode: '+1',
  phone: '',
  course: '',
  semester: '',
}

const courseOptions = [
  'Accounting', 'Actuarial Science', 'Agricultural Science', 'Architecture',
  'Artificial Intelligence', 'Biochemistry', 'Biology', 'Biomedical Engineering',
  'Biotechnology', 'Business Administration', 'Chemical Engineering', 'Chemistry',
  'Civil Engineering', 'Commerce', 'Computer Engineering', 'Computer Science',
  'Cybersecurity', 'Data Science', 'Dentistry', 'Design and Media',
  'Economics', 'Education', 'Electrical Engineering', 'Electronics Engineering',
  'English Literature', 'Environmental Science', 'Fashion Design', 'Finance',
  'Food Science', 'Forensic Science', 'Game Design', 'Geography',
  'Geology', 'Graphic Design', 'Healthcare Administration', 'History',
  'Hospitality Management', 'Human Resources', 'Information Technology',
  'International Relations', 'Journalism', 'Law', 'Linguistics',
  'Marketing', 'Mathematics', 'Mechanical Engineering', 'Medicine',
  'Microbiology', 'Music', 'Nursing', 'Nutrition and Dietetics',
  'Occupational Therapy', 'Pharmacy', 'Philosophy', 'Physics',
  'Political Science', 'Psychology', 'Public Health', 'Public Relations',
  'Robotics Engineering', 'Social Work', 'Sociology', 'Software Engineering',
  'Sports Science', 'Statistics', 'Supply Chain Management', 'Theatre Arts',
  'Tourism Management', 'Urban Planning', 'Veterinary Science', 'Web Development',
]

const countryCodes = [
  ['Afghanistan', '+93'], ['Albania', '+355'], ['Algeria', '+213'], ['Andorra', '+376'], ['Angola', '+244'], ['Antigua and Barbuda', '+1-268'], ['Argentina', '+54'], ['Armenia', '+374'], ['Australia', '+61'], ['Austria', '+43'], ['Azerbaijan', '+994'],
  ['Bahamas', '+1-242'], ['Bahrain', '+973'], ['Bangladesh', '+880'], ['Barbados', '+1-246'], ['Belarus', '+375'], ['Belgium', '+32'], ['Belize', '+501'], ['Benin', '+229'], ['Bhutan', '+975'], ['Bolivia', '+591'], ['Bosnia and Herzegovina', '+387'], ['Botswana', '+267'], ['Brazil', '+55'], ['Brunei', '+673'], ['Bulgaria', '+359'], ['Burkina Faso', '+226'], ['Burundi', '+257'],
  ['Cabo Verde', '+238'], ['Cambodia', '+855'], ['Cameroon', '+237'], ['Canada', '+1'], ['Central African Republic', '+236'], ['Chad', '+235'], ['Chile', '+56'], ['China', '+86'], ['Colombia', '+57'], ['Comoros', '+269'], ['Congo, Democratic Republic', '+243'], ['Congo, Republic', '+242'], ['Costa Rica', '+506'], ['Croatia', '+385'], ['Cuba', '+53'], ['Cyprus', '+357'], ['Czechia', '+420'],
  ['Denmark', '+45'], ['Djibouti', '+253'], ['Dominica', '+1-767'], ['Dominican Republic', '+1-809'],
  ['Ecuador', '+593'], ['Egypt', '+20'], ['El Salvador', '+503'], ['Equatorial Guinea', '+240'], ['Eritrea', '+291'], ['Estonia', '+372'], ['Eswatini', '+268'], ['Ethiopia', '+251'],
  ['Fiji', '+679'], ['Finland', '+358'], ['France', '+33'],
  ['Gabon', '+241'], ['Gambia', '+220'], ['Georgia', '+995'], ['Germany', '+49'], ['Ghana', '+233'], ['Greece', '+30'], ['Grenada', '+1-473'], ['Guatemala', '+502'], ['Guinea', '+224'], ['Guinea-Bissau', '+245'], ['Guyana', '+592'],
  ['Haiti', '+509'], ['Honduras', '+504'], ['Hungary', '+36'],
  ['Iceland', '+354'], ['India', '+91'], ['Indonesia', '+62'], ['Iran', '+98'], ['Iraq', '+964'], ['Ireland', '+353'], ['Israel', '+972'], ['Italy', '+39'], ['Ivory Coast', '+225'],
  ['Jamaica', '+1-876'], ['Japan', '+81'], ['Jordan', '+962'],
  ['Kazakhstan', '+7'], ['Kenya', '+254'], ['Kiribati', '+686'], ['Kuwait', '+965'], ['Kyrgyzstan', '+996'],
  ['Laos', '+856'], ['Latvia', '+371'], ['Lebanon', '+961'], ['Lesotho', '+266'], ['Liberia', '+231'], ['Libya', '+218'], ['Liechtenstein', '+423'], ['Lithuania', '+370'], ['Luxembourg', '+352'],
  ['Madagascar', '+261'], ['Malawi', '+265'], ['Malaysia', '+60'], ['Maldives', '+960'], ['Mali', '+223'], ['Malta', '+356'], ['Marshall Islands', '+692'], ['Mauritania', '+222'], ['Mauritius', '+230'], ['Mexico', '+52'], ['Micronesia', '+691'], ['Moldova', '+373'], ['Monaco', '+377'], ['Mongolia', '+976'], ['Montenegro', '+382'], ['Morocco', '+212'], ['Mozambique', '+258'], ['Myanmar', '+95'],
  ['Namibia', '+264'], ['Nauru', '+674'], ['Nepal', '+977'], ['Netherlands', '+31'], ['New Zealand', '+64'], ['Nicaragua', '+505'], ['Niger', '+227'], ['Nigeria', '+234'], ['North Korea', '+850'], ['North Macedonia', '+389'], ['Norway', '+47'],
  ['Oman', '+968'],
  ['Pakistan', '+92'], ['Palau', '+680'], ['Palestine', '+970'], ['Panama', '+507'], ['Papua New Guinea', '+675'], ['Paraguay', '+595'], ['Peru', '+51'], ['Philippines', '+63'], ['Poland', '+48'], ['Portugal', '+351'],
  ['Qatar', '+974'],
  ['Romania', '+40'], ['Russia', '+7'], ['Rwanda', '+250'],
  ['Saint Kitts and Nevis', '+1-869'], ['Saint Lucia', '+1-758'], ['Saint Vincent and the Grenadines', '+1-784'], ['Samoa', '+685'], ['San Marino', '+378'], ['Sao Tome and Principe', '+239'], ['Saudi Arabia', '+966'], ['Senegal', '+221'], ['Serbia', '+381'], ['Seychelles', '+248'], ['Sierra Leone', '+232'], ['Singapore', '+65'], ['Slovakia', '+421'], ['Slovenia', '+386'], ['Solomon Islands', '+677'], ['Somalia', '+252'], ['South Africa', '+27'], ['South Korea', '+82'], ['South Sudan', '+211'], ['Spain', '+34'], ['Sri Lanka', '+94'], ['Sudan', '+249'], ['Suriname', '+597'], ['Sweden', '+46'], ['Switzerland', '+41'], ['Syria', '+963'],
  ['Taiwan', '+886'], ['Tajikistan', '+992'], ['Tanzania', '+255'], ['Thailand', '+66'], ['Timor-Leste', '+670'], ['Togo', '+228'], ['Tonga', '+676'], ['Trinidad and Tobago', '+1-868'], ['Tunisia', '+216'], ['Turkey', '+90'], ['Turkmenistan', '+993'], ['Tuvalu', '+688'],
  ['Uganda', '+256'], ['Ukraine', '+380'], ['United Arab Emirates', '+971'], ['United Kingdom', '+44'], ['United States', '+1'], ['Uruguay', '+598'], ['Uzbekistan', '+998'],
  ['Vanuatu', '+678'], ['Vatican City', '+379'], ['Venezuela', '+58'], ['Vietnam', '+84'],
  ['Yemen', '+967'],
  ['Zambia', '+260'], ['Zimbabwe', '+263'],
]

function StudentForm({ student, onChange, onSubmit }) {
  const fields = [
    { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'e.g. Alex Morgan' },
    { id: 'enrollmentId', label: 'Enrollment ID', type: 'text', placeholder: 'e.g. ENR-2026-0142' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'alex@example.com' },
  ]

  return (
    <form className="registration-form" onSubmit={onSubmit}>
      <div className="field-grid">
        {fields.map((field) => (
          <label className="field" htmlFor={field.id} key={field.id}>
            <span>{field.label}</span>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={student[field.id]}
              onChange={onChange}
              required
            />
          </label>
        ))}
        <label className="field" htmlFor="course">
          <span>Course</span>
          <select id="course" name="course" value={student.course} onChange={onChange} required>
            <option value="">Select a course</option>
            {courseOptions.map((course) => <option value={course} key={course}>{course}</option>)}
          </select>
        </label>
        <label className="field" htmlFor="semester">
          <span>Semester</span>
          <select id="semester" name="semester" value={student.semester} onChange={onChange} required>
            <option value="">Select semester</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option>
          </select>
        </label>
        <div className="field phone-field">
          <span>Phone Number</span>
          <div className="phone-input">
            <select id="countryCode" name="countryCode" value={student.countryCode} onChange={onChange} aria-label="Country code" required>
              {countryCodes.map(([country, code]) => <option value={code} key={`${country}-${code}`}>{country} ({code})</option>)}
            </select>
            <input id="phone" name="phone" type="tel" placeholder="555 010 2040" value={student.phone} onChange={onChange} aria-label="Phone number" required />
          </div>
        </div>
      </div>
      <button className="register-button" type="submit">
        Register <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}

function RegistrationResult({ student }) {
  return (
    <section className="result" aria-live="polite">
      <div className="success-heading">
        <span className="success-icon" aria-hidden="true">✓</span>
        <div>
          <p className="eyebrow">Submitted successfully</p>
          <h2>Registration Successful</h2>
        </div>
      </div>
      <dl className="student-details">
        <div><dt>Full Name</dt><dd>{student.fullName}</dd></div>
        <div><dt>Enrollment ID</dt><dd>{student.enrollmentId}</dd></div>
        <div><dt>Email</dt><dd>{student.email}</dd></div>
        <div><dt>Phone Number</dt><dd>{student.countryCode} {student.phone}</dd></div>
        <div><dt>Course</dt><dd>{student.course}</dd></div>
        <div><dt>Semester</dt><dd>{student.semester}</dd></div>
      </dl>
    </section>
  )
}

function App() {
  const [student, setStudent] = useState(initialStudent)
  const [registeredStudent, setRegisteredStudent] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setStudent((currentStudent) => ({ ...currentStudent, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setRegisteredStudent(student)
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">SR</div>
        <p className="header-label">Student services <span>•</span> 2026 intake</p>
      </header>
      <section className="intro">
        <p className="eyebrow">New student registration</p>
        <h1>Start your next<br /><em>chapter.</em></h1>
        <p className="intro-copy">Complete your details below to create your student profile and begin your academic journey.</p>
      </section>
      <section className="form-panel">
        <div className="panel-heading">
          <div><span className="step-number">01</span><h2>Student details</h2></div>
          <p>All fields are required</p>
        </div>
        <StudentForm student={student} onChange={handleChange} onSubmit={handleSubmit} />
      </section>
      {registeredStudent && <RegistrationResult student={registeredStudent} />}
      <footer>Student Registration Portal <span>•</span> Your information is kept private.</footer>
    </main>
  )
}

export default App
