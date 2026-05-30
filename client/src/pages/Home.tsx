import { useEffect, useState } from "react";
import { ChevronRight, Phone, MapPin, BookOpen, Users, Award, ArrowRight, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

/**
 * Prepgenesis Coaching Centre Website - Updated Version
 * Design: Modern Educational Excellence
 * Color Scheme: Navy Blue (#1E3A8A) + Amber Gold (#F59E0B)
 * Typography: Poppins (headings) + Inter (body)
 * Features: Interactive modals, Ravi Sir photo, dynamic course selection
 */

interface CourseCard {
  id: string;
  title: string;
  classes: string;
  subjects: string[];
  icon: string;
  color: string;
  image: string;
}

const courses: CourseCard[] = [
  {
    id: "junior",
    title: "Junior Programme",
    classes: "Classes 7-10",
    subjects: ["Mathematics", "Physics"],
    icon: "📚",
    color: "from-blue-500 to-blue-600",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/student-math-bHEz6RBUjyXRBgdJSLGccx.webp",
  },
  {
    id: "senior",
    title: "Senior Programme",
    classes: "Classes 11-12",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
    icon: "🔬",
    color: "from-amber-500 to-orange-600",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/student-physics-QHEegfYV6qXEZCrKs3TDWb.webp",
  },
];

const WaveDivider: React.FC<{ flip?: boolean }> = ({ flip = false }) => (
  <svg
    className={`w-full h-24 md:h-32 ${flip ? "rotate-180" : ""}`}
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
  >
    <path
      d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.87,168.19-17.28,250.6-.39C823.78,31,906.4,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
      fill="#F59E0B"
      fillOpacity="0.1"
    />
    <path
      d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c160-28.08,301.59-42.34,440.55-21.07C1014.22,57.86,1104.56,65,1200,61V0Z"
      fill="#1E3A8A"
      fillOpacity="0.05"
    />
  </svg>
);

const CourseCard: React.FC<{ course: CourseCard; index: number }> = ({ course, index }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-4 border-amber-400 ${
      index % 2 === 0 ? "-rotate-1 hover:rotate-0" : "rotate-1 hover:rotate-0"
    }`}
  >
    {/* Background Image */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-70 group-hover:opacity-60 transition-opacity duration-500`} />
    </div>

    {/* Content */}
    <div className="relative p-8 md:p-10 h-full flex flex-col justify-between min-h-80">
      <div>
        <div className="text-5xl mb-4">{course.icon}</div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-blue-100 font-semibold mb-6">{course.classes}</p>
      </div>

      <div>
        <div className="mb-6">
          <p className="text-amber-400 text-lg font-extrabold mb-3 uppercase tracking-widest bg-blue-950 bg-opacity-80 px-4 py-2 rounded-full inline-block shadow-lg border-2 border-amber-400">
            Subjects Covered
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            {course.subjects.map((subject, i) => (
              <span
                key={i}
                className="bg-amber-100 text-blue-900 px-5 py-2 rounded-full text-base font-bold hover:bg-amber-200 transition-all duration-300 shadow-md border border-amber-400"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Explore Courses Modal
const ExploreCourseModal: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ open, onOpenChange }) => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (selectedClass === "7-10") {
      setSubjects(["Mathematics", "Physics"]);
    } else if (selectedClass === "11-12") {
      setSubjects(["Physics", "Chemistry", "Biology", "Mathematics"]);
    } else {
      setSubjects([]);
    }
  }, [selectedClass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && selectedClass) {
      alert(`Thank you ${name}! You selected Classes ${selectedClass}. Our team will contact you soon.`);
      setName("");
      setSelectedClass("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900">Explore Courses</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-900 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Your Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-900 focus:outline-none"
              required
            >
              <option value="">Choose a class range</option>
              <option value="7-10">Classes 7-10</option>
              <option value="11-12">Classes 11-12</option>
            </select>
          </div>

          {subjects.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-3">Subjects for Classes {selectedClass}:</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject, i) => (
                  <span key={i} className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2">
              Get Details
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2 border-blue-900 text-blue-900"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Schedule Demo Modal
const ScheduleDemoModal: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ open, onOpenChange }) => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && selectedClass && mobile) {
      const message = `Hello! I would like to schedule a demo class. My name is ${name}, I am in class ${selectedClass}, and my phone number is ${mobile}.`;
      const whatsappUrl = `https://wa.me/917631699096?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      setName("");
      setSelectedClass("");
      setMobile("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900">Schedule a Demo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-900 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Your Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-900 focus:outline-none"
              required
            >
              <option value="">Select your class</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number</label>
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-900 focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2">
              Send via WhatsApp
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2 border-blue-900 text-blue-900"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Contact Options Modal
const ContactModal: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900">Contact Us</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <a
            href="tel:+917631699096"
            className="flex items-center gap-4 p-4 bg-blue-50 border-2 border-blue-900 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Phone className="text-blue-900" size={28} />
            <div>
              <p className="font-bold text-blue-900">Call Us</p>
              <p className="text-slate-600">+91 7631699096</p>
            </div>
          </a>

          <a
            href="https://wa.me/917631699096"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="text-green-500" size={28} />
            <div>
              <p className="font-bold text-green-700">WhatsApp Us</p>
              <p className="text-slate-600">+91 7631699096</p>
            </div>
          </a>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Home() {
  const [exploreCourseOpen, setExploreCourseOpen] = useState(false);
  const [scheduleDemoOpen, setScheduleDemoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-amber-500 bg-clip-text text-transparent">
              PREPGENESIS
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-slate-700 hover:text-blue-900 font-medium transition-colors">
              Courses
            </a>
            <a href="#about" className="text-slate-700 hover:text-blue-900 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-slate-700 hover:text-blue-900 font-medium transition-colors">
              Contact
            </a>
          </div>
          <Button className="btn-accent" onClick={() => setScheduleDemoOpen(true)}>Enroll Now</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/hero-students-AHqWPrRwU42RomzLtVzzpE.webp"
            alt="Students studying"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-transparent to-white" />
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-4 leading-tight">
                  Think Results <br />
                  <span className="text-amber-500">Think Us</span>
                </h1>
                <p className="text-xl text-slate-700 leading-relaxed">
                  Prepgenesis is your gateway to academic excellence. We provide comprehensive coaching for classes 7-12 with expert faculty and proven results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="btn-primary text-lg px-8 py-6 rounded-lg"
                  onClick={() => setExploreCourseOpen(true)}
                >
                  Explore Courses <ChevronRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-lg border-2 border-blue-900 text-blue-900 hover:bg-blue-50"
                  onClick={() => setScheduleDemoOpen(true)}
                >
                  Schedule Demo
                </Button>
              </div>

              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-amber-500" size={20} />
                  <span className="text-slate-700 font-medium">Near Gas Godown, Sherpur, Muzaffarpur</span>
                </div>
              </div>
            </div>

            {/* Floating Student Figure */}
            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-amber-50 rounded-3xl opacity-50 blur-2xl" />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/student-math-bHEz6RBUjyXRBgdJSLGccx.webp"
                alt="Student studying"
                className="relative z-10 w-80 h-80 object-cover rounded-2xl shadow-2xl float-animation"
                style={{ animationDelay: "0s" }}
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <WaveDivider />
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 md:py-32 bg-gradient-light">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Our Programmes</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive coaching designed to help students master their subjects and excel in their academics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Subject Showcase */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-amber-500 mb-4 drop-shadow-lg">Subject Expertise</h2>
            <p className="text-2xl text-blue-900 font-bold">Expert instruction in all key subjects</p>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { name: "Mathematics", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/student-math-bHEz6RBUjyXRBgdJSLGccx.webp", emoji: "🔢" },
              { name: "Physics", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/student-physics-QHEegfYV6qXEZCrKs3TDWb.webp", emoji: "⚛️" },
              { name: "Chemistry", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/student-chemistry-Mv5eLsqF6Gkt5G9EBza8ZE.webp", emoji: "🧪" },
              { name: "Biology", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663626720270/KxHGzeFrf2K2QF4TaDuj8b/student-biology-R5tNNELJ2Z9WcuPgSKpYqH.webp", emoji: "🔬" },
            ].map((subject, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl h-72 cursor-pointer transform hover:scale-110 transition-all duration-300 border-4 border-blue-900 shadow-xl"
              >
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <div className="text-6xl mb-3 transform group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
                    {subject.emoji}
                  </div>
                  <h3 className="text-3xl font-extrabold text-amber-400 text-center drop-shadow-lg">
                    {subject.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Prepgenesis</h2>
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                Prepgenesis is a premier coaching institute dedicated to nurturing academic excellence. We focus on providing comprehensive education with personalized attention to every student.
              </p>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Our expert faculty, comprehensive curriculum, and personalized approach ensure that every student reaches their full potential and achieves their academic goals.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Award className="text-amber-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Expert Faculty</h4>
                    <p className="text-blue-100">Highly qualified teachers with years of experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BookOpen className="text-amber-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Comprehensive Curriculum</h4>
                    <p className="text-blue-100">Complete coverage of all subjects and topics</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="text-amber-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Personalized Attention</h4>
                    <p className="text-blue-100">Small batch sizes for individual focus</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl opacity-30 blur-2xl" />
              <div className="relative bg-white rounded-3xl p-8 border-2 border-amber-400 shadow-2xl flex flex-col items-center text-slate-800 transition-all duration-300 hover:shadow-amber-400/20 hover:scale-[1.02]">
                <img
                  src="/ravi-sir.jpeg"
                  alt="Ravi Sir"
                  className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-amber-400 shadow-lg"
                />
                <h3 className="text-4xl font-extrabold mb-2 text-center text-blue-900 drop-shadow-lg">Ravi Sir</h3>
                <p className="text-amber-600 text-2xl font-bold mb-4 text-center">Head of Institute</p>
                <p className="text-blue-900 text-center leading-relaxed font-semibold text-lg bg-amber-100 rounded-xl px-4 py-3 border-2 border-amber-400 shadow-md">
                  With extensive experience in education and a passion for student success, <span className="text-amber-500 font-bold">Ravi Sir</span> leads Prepgenesis with vision and dedication. His commitment to excellence has transformed the lives of many students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-12 md:p-16 text-white text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-amber-400 drop-shadow-lg">Get In Touch</h2>
            <p className="text-2xl text-white font-bold mb-12 max-w-2xl mx-auto bg-blue-900 bg-opacity-80 rounded-xl px-6 py-4 border-2 border-amber-400 shadow-lg">
              Ready to start your journey towards academic excellence? <span className="text-amber-400">Contact us today!</span>
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-center justify-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <MapPin className="text-amber-500 flex-shrink-0" size={28} />
                <div className="text-left">
                  <p className="font-bold mb-1 text-blue-900">Location</p>
                  <p className="text-slate-600 font-medium">Near Gas Godown, Sherpur, Muzaffarpur</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <Phone className="text-amber-500 flex-shrink-0" size={28} />
                <div className="text-left">
                  <p className="font-bold mb-1 text-blue-900">WhatsApp</p>
                  <p className="text-slate-600 font-medium">+91 7631699096</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-12 py-6 rounded-lg"
              onClick={() => setContactOpen(true)}
            >
              Contact Us Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Prepgenesis</h4>
              <p className="text-sm">Premier coaching institute for academic excellence</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Programmes</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Classes 7-10</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Classes 11-12</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-sm mb-2">📍 Sherpur, Muzaffarpur</p>
              <p className="text-sm">📱 +91 7631699096</p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Prepgenesis. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ExploreCourseModal open={exploreCourseOpen} onOpenChange={setExploreCourseOpen} />
      <ScheduleDemoModal open={scheduleDemoOpen} onOpenChange={setScheduleDemoOpen} />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
