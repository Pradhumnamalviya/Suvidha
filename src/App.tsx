import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Flame, 
  Building2, 
  CreditCard, 
  PlusCircle, 
  MessageSquare, 
  Search, 
  Globe, 
  Mic, 
  LayoutDashboard,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowUp,
  X,
  CheckCircle2,
  Upload,
  Camera,
  Smartphone,
  Moon,
  User,
  ShieldCheck,
  Headphones,
  Droplets,
  Hash,
  Wallet,
  Maximize,
  Minimize,
  HelpCircle,
  AlertCircle,
  Delete,
  RefreshCw,
  TrendingUp,
  Activity,
  Bus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import Markdown from 'react-markdown';
//import { getVoiceAssistance, textToSpeech } from './services/gemini';
import { MobileLogin } from './components/MobileLogin';
import { api } from './utils/api';

// --- Types ---
type Language = 'en' | 'hi';
type View = 'home' | 'departments' | 'bills' | 'grievance' | 'municipal' | 'health' | 'auth' | 'pay-bill' | 'new-connection' | 'complaint' | 'track' | 'admin' | 'success' | 'consumer-id' | 'service-menu' | 'history' | 'electricity-grievance' | 'track-electricity-grievance';
type ServiceType = 'Electricity' | 'Water' | 'Gas' | 'Property Tax' | 'Trade License' | 'Birth/Death' | 'Waste Management' | 'Street Light' | 'Building Plan' | 'Health' | 'Public Transport' | '';

const translations = {
  en: {
    title: "SUVIDHA ONETOUCH",
    subtitle: "UNIFIED CIVIC SERVICES PLATFORM",
    electricity: "ELECTRICITY BILL",
    water: "WATER TAX",
    gas: "GAS CONNECTION",
    property: "PROPERTY TAX",
    bills: "BILL PAYMENTS",
    grievance: "GRIEVANCE REDRESSAL",
    municipal: "MUNICIPAL SERVICES",
    lodge: "Lodge New Grievance",
    track: "Track Grievance Status",
    trade: "Trade License",
    birthDeath: "Birth & Death Certificates",
    waste: "Waste Management",
    payBill: "Pay Bill",
    newConn: "New Connection",
    lodgeComplaint: "Lodge Complaint",
    trackReq: "Track Request",
    admin: "Admin Dashboard",
    back: "Back",
    next: "Next",
    confirm: "Confirm",
    otpTitle: "Verify Identity",
    otpSub: "Enter the 4-digit OTP sent to your mobile",
    paymentTitle: "Payment Gateway",
    uploadDoc: "Upload Documents",
    voicePrompt: "How can I help you today?",
    success: "Transaction Successful",
    home: "Home",
    welcome: "Welcome to SUVIDHA OneTouch",
    heroSub: "Access to municipal and utility services under the Digital India initiative. Please select a service to begin.",
    azadi: "AZADI KA AMRIT MAHOTSAV",
    proceed: "PROCEED TO BILL PAYMENT",
    status: "KIOSK STATUS: ACTIVE",
    secure: "SECURE CONNECTION",
    timeout: "SESSION SECURITY TIMEOUT",
    step1: "Step 1: Details",
    step2: "Step 2: Evidence",
    step3: "Step 3: Submit",
    help: "Help",
    hint: "Need help? Tap the help icon or ask SUVIDHA AI.",
    deptBills: "Bills Department",
    deptGrievance: "Grievance Department",
    deptMunicipal: "Municipal Departments",
    deptElectricity: "Electricity Department",
    deptWater: "Water Department",
    deptGas: "Gas Department",
    deptMunicipalCorp: "Municipal Corporation",
    deptTransport: "Public Transport",
    transportSub: "Bus pass recharge, route planner, metro cards",
    transportId: "Pass Number / Card ID",
    busPassRecharge: "Recharge Bus Pass",
    routePlanner: "Route Planner",
    metroCard: "New Metro Card",
    deptBillsSub: "Pay Electricity, Water, Gas and other utility bills",
    deptGrievanceSub: "Lodge complaints and track their resolution status",
    deptMunicipalSub: "Birth/Death certificates, licenses and other services",
    electricityId: "Consumer Number",
    waterId: "Connection ID",
    gasId: "BP Number",
    propertyId: "Property ID / PIN",
    tradeId: "License Number",
    birthDeathId: "Registration Number",
    wasteId: "Area Code",
    downloadReceipt: "Download Receipt",
    printReceipt: "Print Receipt",
    newConnTitle: "New Connection Request",
    newConnSub: "Apply for a new connection",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    address: "Installation Address",
    submitApp: "Submit Application",
    docReq: "Document Verification Required",
    docReqSub: "You will need to upload your Aadhar Card and Property Ownership documents in the next step.",
    consumptionHistory: "Consumption History",
    powerCutComplaint: "Power-cut Complaint",
    leakageComplaint: "Gas Leakage Complaint",
    garbageComplaint: "Garbage Pickup Complaint",
    streetlightComplaint: "Streetlight Complaint",
    viewBill: "View Bill",
    applyNewMeter: "Apply for New Meter",
    appStatus: "Application Status",
    apply: "Apply Now",
    renew: "Renew License",
    deptHealth: "Health Department",
    deptHealthSub: "OPD Token booking and health services",
    opdBooking: "OPD Token Booking",
    waterComplaint: "Water Supply Complaint",
    trackingId: "Tracking ID",
    complaintSuccess: "Complaint lodged successfully. Your Tracking ID is:",
    opdTitle: "OPD Token Booking",
    opdSub: "Book your appointment for government hospitals",
    patientName: "Patient Name",
    hospitalName: "Select Hospital",
    bookToken: "Book Token",
    healthSub: "Digital healthcare services for all citizens",
    opdToken: "OPD Token",
    opdTokenSub: "Book instant OPD tokens for government hospitals.",
    healthRecords: "Health Records",
    healthRecordsSub: "Access your digital health records and reports.",
    viewRecords: "View Records",
    ayushmanBharat: "Ayushman Bharat",
    ayushmanBharatSub: "Apply for health insurance under PM-JAY scheme.",
    trackStatus: "Track Status",
    appGrievanceId: "Application / Grievance ID",
    trackNow: "Track Now",
    currentStatus: "Current Status",
    lastUpdated: "Last Updated",
    recentSearches: "Recent Searches",
    saveIdHint: "Please save this ID for future reference",
    describeIssue: "Describe the Issue",
    complaintPlaceholder: "Please provide details about your complaint...",
    capturePhoto: "Capture Photo",
    uploadDocument: "Upload Document",
    readyToSubmit: "Ready to Submit",
    reviewDetails: "Please review your details before final submission.",
    patientNamePlaceholder: "Enter patient name",
    fullNamePlaceholder: "Enter your full name",
    mobilePlaceholder: "10-digit mobile number",
    addressPlaceholder: "Enter complete address for installation",
    appointmentConfirmed: "Appointment Confirmed via SMS",
    tokenSmsHint: "You will receive a token number on your mobile after submission.",
    cancelBack: "Cancel and Go Back",
    deptSelect: "Select Department",
    deptSelectSub: "Choose a department to access its services",
    enterDept: "Enter Department",
    department: "Department",
    inProgress: "In Progress",
    unifiedInterface: "Unified Civic Interface",
    accessServices: "Access Services",
    aiAssistant: "AI Assistant",
    officialPortal: "Official Portal",
    heroDescription: "A premier digital gateway for Municipal & Utility Services. Empowering citizens through technology and transparency.",
    powerToEmpower: "Power To Empower",
    digitalIndiaInitiative: "A Digital India Initiative",
    ministry: "Ministry of Electronics & IT",
    govIndia: "Government of India",
    lodgeSub: "Submit a new grievance for any department and get a tracking ID.",
    trackSub: "Check the real-time status of your submitted grievance or request.",
    municipalSub: "Smart municipal services for a better tomorrow",
    propertySub: "View and pay your annual property tax securely.",
    payPropertyTax: "Pay Property Tax",
    tradeSub: "Apply for new licenses or renew existing ones.",
    applyNew: "Apply New",
    renewBtn: "Renew",
    birthDeathSub: "Request official certificates for vital records.",
    reqCert: "Request Certificate",
    wasteSub: "Manage waste collection and recycling requests.",
    wasteServices: "Waste Services",
    streetLightSub: "Report faulty street lights in your locality.",
    reportIssue: "Report Issue",
    buildingPlanSub: "Track approval status of your building plans.",
    trackApproval: "Track Approval",
    billPayment: "Bill Payment",
    consumerAccount: "Consumer Account",
    citizenName: "Rajesh Kumar",
    verified: "Verified",
    billingPeriod: "Billing Period",
    periodValue: "Jan - Feb 2026",
    dueDate: "Due Date",
    dueValue: "25 Feb 2026",
    totalPayable: "Total Payable Amount",
    upiPayment: "UPI Payment",
    upiSub: "GPay, PhonePe, Paytm",
    cardPayment: "Debit/Credit Card",
    cardSub: "Visa, Mastercard, RuPay",
    netBanking: "Net Banking",
    netSub: "All Major Banks",
    instantVerify: "Instant Verification",
    kioskCash: "Kiosk Cash",
    payCounter: "Pay at Counter",
    digitalWallets: "Digital Wallets",
    walletSub: "Paytm, Mobikwik",
    selectPayment: "Select Payment Method",
    secureGateway: "Secure Payment Gateway",
    secureSub: "All transactions are encrypted and secure.",
    payNow: "Pay Now",
    services: "Services",
    selectAction: "Select an action to proceed",
    usageUnits: "Usage (Units)",
    adminCenter: "Admin Command Center",
    adminSub: "Real-time Kiosk Monitoring & Analytics",
    totalRevenue: "Total Revenue",
    applications: "Applications",
    pendingGrievances: "Pending Grievances",
    systemHealth: "System Health",
    transactionFor: "Your transaction for",
    hasBeenConfirmed: "has been confirmed.",
    processing: "Processing...",
    retryPayment: "Retry Payment",
    paymentFailed: "Payment failed. Please try again.",
    voiceTitle: "Suvidha AI Voice",
    activeSession: "Active Session",
    officialInterface: "Official Government Virtual Interface • Secure Connection",
    readyToCommunicate: "Ready to Communicate",
    listening: "I'm listening... How can I assist you today?",
    typeRequest: "Type your request or use voice...",
    encrypted: "End-to-End Encrypted",
    multiLang: "Multi-Language Support",
    assistance247: "24/7 Assistance",
    openAssistant: "Open Assistant",
    billsSub: "Pay your utility bills instantly and securely",
    electricitySub: "Pay your monthly electricity bill using your Consumer Number.",
    payElectricity: "Pay Electricity Bill",
    waterSub: "Settle your water tax and connection charges online.",
    payWater: "Pay Water Tax",
    reportComplaint: "Report Complaint",
    gasSub: "Pay your piped gas bills using your BP Number.",
    payGas: "Pay Gas Bill",
    grievanceSub: "Lodge a new complaint or track existing ones",
    enterDetailsFor: "Enter details for"
  },
  hi: {
    title: "सुविधा वन-टच",
    subtitle: "एकीकृत नागरिक सेवा मंच",
    electricity: "बिजली बिल",
    water: "जल कर",
    gas: "गैस कनेक्शन",
    property: "संपत्ति कर",
    bills: "बिल भुगतान",
    grievance: "शिकायत निवारण",
    municipal: "नगर निगम सेवाएं",
    lodge: "नई शिकायत दर्ज करें",
    track: "शिकायत की स्थिति ट्रैक करें",
    trade: "व्यापार लाइसेंस",
    birthDeath: "जन्म और मृत्यु प्रमाण पत्र",
    waste: "कचरा प्रबंधन",
    payBill: "बिल भुगतान",
    newConn: "नया कनेक्शन",
    lodgeComplaint: "शिकायत दर्ज करें",
    trackReq: "अनुरोध ट्रैक करें",
    admin: "एडमिन डैशबोर्ड",
    back: "पीछे",
    next: "आगे",
    confirm: "पुष्टि करें",
    otpTitle: "पहचान सत्यापित करें",
    otpSub: "अपने मोबाइल पर भेजा गया 4-अंकीय ओटीपी दर्ज करें",
    paymentTitle: "पेमेंट गेटवे",
    uploadDoc: "दस्तावेज़ अपलोड करें",
    voicePrompt: "मैं आज आपकी क्या मदद कर सकता हूँ?",
    success: "लेनदेन सफल रहा",
    home: "होम",
    welcome: "सुविधा वन-टच में आपका स्वागत है",
    heroSub: "डिजिटल इंडिया पहल के तहत नगर निगम और उपयोगिता सेवाओं तक पहुंच। कृपया शुरू करने के लिए एक सेवा चुनें।",
    azadi: "आजादी का अमृत महोत्सव",
    proceed: "बिल भुगतान के लिए आगे बढ़ें",
    status: "कियोस्क स्थिति: सक्रिय",
    secure: "सुरक्षित कनेक्शन",
    timeout: "सत्र सुरक्षा समय समाप्त",
    step1: "चरण 1: विवरण",
    step2: "चरण 2: साक्ष्य",
    step3: "चरण 3: जमा करें",
    help: "सहायता",
    hint: "मदद चाहिए? सहायता आइकन पर टैप करें या सुविधा AI से पूछें।",
    deptBills: "बिल विभाग",
    deptGrievance: "शिकायत विभाग",
    deptMunicipal: "नगर निगम विभाग",
    deptElectricity: "बिजली विभाग",
    deptWater: "जल विभाग",
    deptGas: "गैस विभाग",
    deptMunicipalCorp: "नगर निगम",
    deptTransport: "सार्वजनिक परिवहन",
    transportSub: "बस पास रिचार्ज, रूट प्लानर, मेट्रो कार्ड",
    transportId: "पास नंबर / कार्ड आईडी",
    busPassRecharge: "बस पास रिचार्ज",
    routePlanner: "रूट प्लानर",
    metroCard: "नया मेट्रो कार्ड",
    deptBillsSub: "बिजली, पानी, गैस और अन्य बिलों का भुगतान करें",
    deptGrievanceSub: "शिकायतें दर्ज करें और उनकी स्थिति ट्रैक करें",
    deptMunicipalSub: "जन्म/मृत्यु प्रमाण पत्र, लाइसेंस और अन्य सेवाएं",
    electricityId: "उपभोक्ता संख्या",
    waterId: "कनेक्शन आईडी",
    gasId: "बीपी नंबर",
    propertyId: "संपत्ति आईडी / पिन",
    tradeId: "लाइसेंस संख्या",
    birthDeathId: "पंजीकरण संख्या",
    wasteId: "क्षेत्र कोड",
    downloadReceipt: "रसीद डाउनलोड करें",
    printReceipt: "रसीद प्रिंट करें",
    newConnTitle: "नए कनेक्शन का अनुरोध",
    newConnSub: "नए कनेक्शन के लिए आवेदन करें",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    address: "स्थापना का पता",
    submitApp: "आवेदन जमा करें",
    docReq: "दस्तावेज़ सत्यापन आवश्यक",
    docReqSub: "आपको अगले चरण में अपना आधार कार्ड और संपत्ति के स्वामित्व के दस्तावेज़ अपलोड करने होंगे।",
    consumptionHistory: "खपत का इतिहास",
    powerCutComplaint: "बिजली कटौती की शिकायत",
    leakageComplaint: "गैस रिसाव की शिकायत",
    garbageComplaint: "कचरा उठाने की शिकायत",
    streetlightComplaint: "स्ट्रीटलाइट की शिकायत",
    viewBill: "बिल देखें",
    applyNewMeter: "नए मीटर के लिए आवेदन करें",
    appStatus: "आवेदन की स्थिति",
    apply: "अभी आवेदन करें",
    renew: "लाइसेंस नवीनीकरण",
    deptHealth: "स्वास्थ्य विभाग",
    deptHealthSub: "ओपीडी टोकन बुकिंग और स्वास्थ्य सेवाएं",
    opdBooking: "ओपीडी टोकन बुकिंग",
    waterComplaint: "जल आपूर्ति की शिकायत",
    trackingId: "ट्रैकिंग आईडी",
    complaintSuccess: "शिकायत सफलतापूर्वक दर्ज की गई। आपकी ट्रैकिंग आईडी है:",
    opdTitle: "ओपीडी टोकन बुकिंग",
    opdSub: "सरकारी अस्पतालों के लिए अपनी नियुक्ति बुक करें",
    patientName: "रोगी का नाम",
    hospitalName: "अस्पताल चुनें",
    bookToken: "टोकन बुक करें",
    healthSub: "सभी नागरिकों के लिए डिजिटल स्वास्थ्य सेवाएं",
    opdToken: "ओपीडी टोकन",
    opdTokenSub: "सरकारी अस्पतालों के लिए तत्काल ओपीडी टोकन बुक करें।",
    healthRecords: "स्वास्थ्य रिकॉर्ड",
    healthRecordsSub: "अपने डिजिटल स्वास्थ्य रिकॉर्ड और रिपोर्ट एक्सेस करें।",
    viewRecords: "रिकॉर्ड देखें",
    ayushmanBharat: "आयुष्मान भारत",
    ayushmanBharatSub: "पीएम-जेएवाई योजना के तहत स्वास्थ्य बीमा के लिए आवेदन करें।",
    trackStatus: "स्थिति ट्रैक करें",
    appGrievanceId: "आवेदन / शिकायत आईडी",
    trackNow: "अभी ट्रैक करें",
    currentStatus: "वर्तमान स्थिति",
    lastUpdated: "अंतिम अपडेट",
    recentSearches: "हाल की खोजें",
    saveIdHint: "कृपया भविष्य के संदर्भ के लिए इस आईडी को सहेजें",
    describeIssue: "समस्या का वर्णन करें",
    complaintPlaceholder: "कृपया अपनी शिकायत के बारे में विवरण प्रदान करें...",
    capturePhoto: "फोटो खींचें",
    uploadDocument: "दस्तावेज़ अपलोड करें",
    readyToSubmit: "जमा करने के लिए तैयार",
    reviewDetails: "कृपया अंतिम जमा करने से पहले अपने विवरण की समीक्षा करें।",
    patientNamePlaceholder: "रोगी का नाम दर्ज करें",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    mobilePlaceholder: "10-अंकीय मोबाइल नंबर",
    addressPlaceholder: "स्थापना के लिए पूरा पता दर्ज करें",
    appointmentConfirmed: "एसएमएस के माध्यम से नियुक्ति की पुष्टि",
    tokenSmsHint: "जमा करने के बाद आपको अपने मोबाइल पर एक टोकन नंबर प्राप्त होगा।",
    cancelBack: "रद्द करें और वापस जाएं",
    deptSelect: "विभाग चुनें",
    deptSelectSub: "इसकी सेवाओं तक पहुँचने के लिए एक विभाग चुनें",
    enterDept: "विभाग में प्रवेश करें",
    department: "विभाग",
    inProgress: "प्रगति में",
    unifiedInterface: "एकीकृत नागरिक इंटरफेस",
    accessServices: "सेवाओं तक पहुँचें",
    aiAssistant: "एआई सहायक",
    officialPortal: "आधिकारिक पोर्टल",
    heroDescription: "नगर निगम और उपयोगिता सेवाओं के लिए एक प्रमुख डिजिटल गेटवे। प्रौद्योगिकी और पारदर्शिता के माध्यम से नागरिकों को सशक्त बनाना।",
    powerToEmpower: "सशक्त बनाने की शक्ति",
    digitalIndiaInitiative: "एक डिजिटल इंडिया पहल",
    ministry: "इलेक्ट्रॉनिक्स और आईटी मंत्रालय",
    govIndia: "भारत सरकार",
    lodgeSub: "किसी भी विभाग के लिए नई शिकायत दर्ज करें और ट्रैकिंग आईडी प्राप्त करें।",
    trackSub: "अपनी जमा की गई शिकायत या अनुरोध की वास्तविक समय की स्थिति की जाँच करें।",
    municipalSub: "कल के बेहतर भविष्य के लिए स्मार्ट नगर निगम सेवाएं",
    propertySub: "अपना वार्षिक संपत्ति कर सुरक्षित रूप से देखें और भुगतान करें।",
    payPropertyTax: "संपत्ति कर का भुगतान करें",
    tradeSub: "नए लाइसेंस के लिए आवेदन करें या मौजूदा लाइसेंस का नवीनीकरण करें।",
    applyNew: "नया आवेदन करें",
    renewBtn: "नवीनीकरण",
    birthDeathSub: "महत्वपूर्ण रिकॉर्ड के लिए आधिकारिक प्रमाण पत्र का अनुरोध करें।",
    reqCert: "प्रमाण पत्र का अनुरोध करें",
    wasteSub: "कचरा संग्रहण और पुनर्चक्रण अनुरोधों का प्रबंधन करें।",
    wasteServices: "कचरा सेवाएं",
    streetLightSub: "अपने इलाके में खराब स्ट्रीट लाइट की रिपोर्ट करें।",
    reportIssue: "समस्या की रिपोर्ट करें",
    buildingPlanSub: "अपने भवन योजनाओं की स्वीकृति स्थिति को ट्रैक करें।",
    trackApproval: "स्वीकृति ट्रैक करें",
    billPayment: "बिल भुगतान",
    consumerAccount: "उपभोक्ता खाता",
    citizenName: "राजेश कुमार",
    verified: "सत्यापित",
    billingPeriod: "बिलिंग अवधि",
    periodValue: "जनवरी - फरवरी 2026",
    dueDate: "नियत तिथि",
    dueValue: "25 फरवरी 2026",
    totalPayable: "कुल देय राशि",
    upiPayment: "यूपीआई भुगतान",
    upiSub: "जीपे, फोनपे, पेटीएम",
    cardPayment: "डेबिट/क्रेडिट कार्ड",
    cardSub: "वीजा, मास्टरकार्ड, रुपे",
    netBanking: "नेट बैंकिंग",
    netSub: "सभी प्रमुख बैंक",
    instantVerify: "तत्काल सत्यापन",
    kioskCash: "कियोस्क नकद",
    payCounter: "काउंटर पर भुगतान करें",
    digitalWallets: "डिजिटल वॉलेट",
    walletSub: "पेटीएम, मोबिक्विक",
    selectPayment: "भुगतान विधि चुनें",
    secureGateway: "सुरक्षित भुगतान गेटवे",
    secureSub: "सभी लेनदेन एन्क्रिप्टेड और सुरक्षित हैं।",
    payNow: "अभी भुगतान करें",
    services: "सेवाएं",
    selectAction: "आगे बढ़ने के लिए एक क्रिया चुनें",
    usageUnits: "उपयोग (इकाइयां)",
    adminCenter: "एडमिन कमांड सेंटर",
    adminSub: "वास्तविक समय कियोस्क निगरानी और विश्लेषण",
    totalRevenue: "कुल राजस्व",
    applications: "आवेदन",
    pendingGrievances: "लंबित शिकायतें",
    systemHealth: "सिस्टम स्वास्थ्य",
    transactionFor: "आपका लेनदेन",
    hasBeenConfirmed: "के लिए सफल रहा है।",
    processing: "प्रसंस्करण...",
    retryPayment: "भुगतान पुनः प्रयास करें",
    paymentFailed: "भुगतान विफल रहा। कृपया पुनः प्रयास करें।",
    voiceTitle: "सुविधा AI वॉयस",
    activeSession: "सक्रिय सत्र",
    officialInterface: "आधिकारिक सरकारी वर्चुअल इंटरफेस • सुरक्षित कनेक्शन",
    readyToCommunicate: "संवाद के लिए तैयार",
    listening: "मैं सुन रहा हूँ... मैं आज आपकी कैसे सहायता कर सकता हूँ?",
    typeRequest: "अपना अनुरोध टाइप करें या वॉयस का उपयोग करें...",
    encrypted: "एंड-टू-एंड एन्क्रिप्टेड",
    multiLang: "बहु-भाषा समर्थन",
    assistance247: "24/7 सहायता",
    openAssistant: "सहायक खोलें",
    billsSub: "अपने उपयोगिता बिलों का तुरंत और सुरक्षित रूप से भुगतान करें",
    electricitySub: "अपने उपभोक्ता नंबर का उपयोग करके अपना मासिक बिजली बिल भरें।",
    payElectricity: "बिजली बिल का भुगतान करें",
    waterSub: "अपने पानी के कर और कनेक्शन शुल्क का ऑनलाइन भुगतान करें।",
    payWater: "जल कर का भुगतान करें",
    reportComplaint: "शिकायत दर्ज करें",
    gasSub: "अपने बीपी नंबर का उपयोग करके अपने पाइप्ड गैस बिल का भुगतान करें।",
    payGas: "गैस बिल का भुगतान करें",
    grievanceSub: "नई शिकायत दर्ज करें या मौजूदा शिकायतों को ट्रैक करें",
    enterDetailsFor: "विवरण दर्ज करें"
  }
};

// --- Components ---

const LanguageToggle = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => (
  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
    <Globe size={18} className="text-slate-500" />
    <select 
      value={lang}
      onChange={(e) => setLang(e.target.value as Language)}
      className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
    </select>
    <ChevronDown size={14} className="text-slate-400" />
  </div>
);

const ServiceCard = ({ icon: Icon, label, onClick, color, description, isDarkMode, buttons }: any) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    className={`rounded-[2.5rem] p-10 border flex flex-col items-center text-center gap-6 transition-all duration-500 min-h-[320px] ${isDarkMode ? 'bg-slate-900 border-white/5 shadow-2xl shadow-black/40 hover:bg-slate-800' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}
  >
    <div className={`p-6 rounded-2xl ${color} shadow-lg`}>
      <Icon size={40} className="text-white" />
    </div>
    <div className="flex-1 flex flex-col items-center">
      <h3 className={`text-2xl font-black tracking-tight leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{label}</h3>
      <p className={`text-sm mt-3 font-medium transition-colors max-w-[200px] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{description}</p>
    </div>
    
    {buttons ? (
      <div className="w-full mt-4 flex gap-3">
        {buttons.map((btn: any, idx: number) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); btn.onClick(); }}
            className={`flex-1 py-4 rounded-xl font-black text-sm transition-all active:scale-95 ${btn.variant === 'outline' 
              ? (isDarkMode ? 'border-2 border-white/10 text-white hover:bg-white/5' : 'border-2 border-slate-100 text-slate-600 hover:bg-slate-50')
              : `${btn.color || 'bg-gov-blue'} text-white shadow-lg hover:opacity-90`}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    ) : (
      <button 
        onClick={onClick}
        className={`w-full mt-4 py-4 rounded-xl font-black text-sm transition-all active:scale-95 ${color} text-white shadow-lg hover:opacity-90`}
      >
        Select Service
      </button>
    )}
  </motion.div>
);

const NumericKeypad = ({ onInput, onDelete, onConfirm }: { onInput: (v: string) => void, onDelete: () => void, onConfirm: () => void }) => (
  <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((key) => (
      <motion.button
        key={key}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (key === 'C') onDelete();
          else if (key === 'OK') onConfirm();
          else onInput(key.toString());
        }}
        className={`h-20 rounded-2xl text-2xl font-black flex items-center justify-center shadow-sm border-2 transition-all ${
          key === 'OK' ? 'bg-emerald-500 text-white border-emerald-400' : 
          key === 'C' ? 'bg-red-50 text-red-500 border-red-100' : 
          'bg-white text-slate-700 border-slate-100 hover:border-gov-blue'
        }`}
      >
        {key === 'C' ? <Delete size={32} /> : key}
      </motion.button>
    ))}
  </div>
);

const VirtualKeyboard = ({ 
  onInput, 
  onDelete, 
  onClose, 
  isDarkMode 
}: { 
  onInput: (v: string) => void, 
  onDelete: () => void, 
  onClose: () => void,
  isDarkMode: boolean
}) => {
  const [isShift, setIsShift] = useState(false);
  
  const rows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back'],
    ['Clear', 'Space', 'Done']
  ];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className={`fixed bottom-0 left-0 right-0 z-[100] p-6 pb-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-3">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center gap-2">
            {row.map((key) => {
              const isSpecial = ['Shift', 'Back', 'Space', 'Done', 'Clear'].includes(key);
              let displayKey = key;
              if (!isSpecial && !isShift) displayKey = key.toLowerCase();
              
              return (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (key === 'Shift') setIsShift(!isShift);
                    else if (key === 'Back') onDelete();
                    else if (key === 'Done') onClose();
                    else if (key === 'Space') onInput(' ');
                    else if (key === 'Clear') {
                      // We need a clear callback, but for now let's just delete multiple times or add a clear prop
                      onInput('CLEAR_ALL');
                    }
                    else onInput(displayKey);
                  }}
                  className={`h-16 rounded-xl font-bold text-lg flex items-center justify-center transition-all shadow-sm border-2 ${
                    key === 'Space' ? 'flex-[4]' : 
                    key === 'Done' ? 'flex-[2] bg-gov-blue text-white border-gov-blue' :
                    key === 'Clear' ? 'flex-[1.5] bg-red-50 text-red-500 border-red-100' :
                    key === 'Shift' ? `flex-[1.5] ${isShift ? 'bg-gov-accent text-white border-gov-accent' : (isDarkMode ? 'bg-slate-800 text-slate-300 border-white/5' : 'bg-slate-50 text-slate-600 border-slate-100')}` :
                    key === 'Back' ? 'flex-[1.5] bg-red-50 text-red-500 border-red-100' :
                    `flex-1 ${isDarkMode ? 'bg-slate-800 text-slate-200 border-white/5 hover:border-gov-accent' : 'bg-white text-slate-700 border-slate-100 hover:border-gov-blue'}`
                  }`}
                >
                  {key === 'Back' ? <Delete size={24} /> : 
                   key === 'Shift' ? <ArrowUp size={24} /> : 
                   displayKey}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<View>('home');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [consumerId, setConsumerId] = useState('');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [complaintStep, setComplaintStep] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [newConnData, setNewConnData] = useState({ name: '', mobile: '', address: '' });
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [trackingId, setTrackingId] = useState('');
  const [trackSearch, setTrackSearch] = useState('');
  const [trackResult, setTrackResult] = useState<any>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardTarget, setKeyboardTarget] = useState<{ value: string, setter: (v: any) => void, field?: string } | null>(null);
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<string | null>(null);
  const [billDetails, setBillDetails] = useState<any>(null);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);
  const [isFetchingBill, setIsFetchingBill] = useState(false);
  const [isSubmittingGrievance, setIsSubmittingGrievance] = useState(false);
  const [electricityGrievanceId, setElectricityGrievanceId] = useState('');
  const [trackGrievanceId, setTrackGrievanceId] = useState('');
  const [trackGrievanceResult, setTrackGrievanceResult] = useState<any>(null);
  const [isTrackingGrievance, setIsTrackingGrievance] = useState(false);
  const [grievanceConsumerId, setGrievanceConsumerId] = useState('');
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const t = translations[lang];

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const requireAuth = (action: () => void) => {
    if (isAuthenticated()) {
      action();
    } else {
      setPendingAction(() => action);
      setIsAuthModalOpen(true);
    }
  };

  const openKeyboard = (value: string, setter: (v: any) => void, field?: string) => {
    setKeyboardTarget({ value, setter, field });
    setIsKeyboardOpen(true);
  };

  const handleKeyboardInput = (char: string) => {
    if (keyboardTarget) {
      if (char === 'CLEAR_ALL') {
        if (keyboardTarget.field) {
          keyboardTarget.setter((prev: any) => ({
            ...prev,
            [keyboardTarget.field!]: ''
          }));
        } else {
          keyboardTarget.setter('');
        }
        return;
      }
      if (keyboardTarget.field) {
        // Handle nested state like newConnData
        keyboardTarget.setter((prev: any) => ({
          ...prev,
          [keyboardTarget.field!]: prev[keyboardTarget.field!] + char
        }));
      } else {
        keyboardTarget.setter((prev: string) => prev + char);
      }
    }
  };

  const handleKeyboardDelete = () => {
    if (keyboardTarget) {
      if (keyboardTarget.field) {
        keyboardTarget.setter((prev: any) => ({
          ...prev,
          [keyboardTarget.field!]: prev[keyboardTarget.field!].slice(0, -1)
        }));
      } else {
        keyboardTarget.setter((prev: string) => prev.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteraction;
      
      // Show hint after 20s
      if (timeSinceLastInteraction > 20000 && view !== 'home' && view !== 'success') {
        setShowHint(true);
      }
      
      // Auto session reset after 2 minutes (120000ms)
      if (timeSinceLastInteraction > 120000) {
        localStorage.removeItem('token');
        setView('home');
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [lastInteraction, view]);

  useEffect(() => {
    if (view === 'admin') {
      fetch('/api/stats').then(res => res.json()).then(setAdminData);
      fetch('/api/analytics/chart').then(res => res.json()).then(setChartData);
    }
    if (view === 'consumer-id') {
      setCaptchaValue(Math.random().toString(36).substring(2, 8).toUpperCase());
      setCaptchaInput('');
      setCaptchaError(false);
    }
  }, [view]);

  const resetInteraction = () => {
    setLastInteraction(Date.now());
    setShowHint(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', resetInteraction);
    window.addEventListener('touchstart', resetInteraction);
    return () => {
      window.removeEventListener('mousedown', resetInteraction);
      window.removeEventListener('touchstart', resetInteraction);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    let recognition: any = null;
    
    if (isListening) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setVoiceQuery(transcript);
          handleVoiceAssist(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        console.warn("Speech recognition not supported in this browser.");
        // Fallback to simulation if needed, but we'll just stop
        setIsListening(false);
      }
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening, lang]);

  useEffect(() => {
    if (isVoiceOpen) {
      setVoiceResponse('');
      setVoiceQuery('');
    }
  }, [isVoiceOpen]);

  const audioContextRef = React.useRef<AudioContext | null>(null);

  const playPCM = async (base64Data: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const audioContext = audioContextRef.current;
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const arrayBuffer = bytes.buffer;
      const float32Data = new Float32Array(len / 2);
      const view = new DataView(arrayBuffer);
      for (let i = 0; i < float32Data.length; i++) {
        float32Data[i] = view.getInt16(i * 2, true) / 32768;
      }
      
      const audioBuffer = audioContext.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (e) {
      console.error("Error playing PCM:", e);
    }
  };

  const handleVoiceAssist = async (query?: string) => {
    const activeQuery = query || voiceQuery;
    if (!activeQuery) return;
    setIsListening(true);
    const response = await getVoiceAssistance(activeQuery, lang);
    setVoiceResponse(response || '');
    setIsListening(false);

    // TTS
    if (response) {
      const cleanText = response.replace(/\[ACTION:.*?\]/g, '').trim();
      const base64Audio = await textToSpeech(cleanText, lang);
      if (base64Audio) {
        await playPCM(base64Audio);
      }
    }

    // Action detection
    if (response?.includes('[ACTION:PAY_BILL:ELECTRICITY]') || activeQuery.toLowerCase().includes('pay my bills automatically') || activeQuery.toLowerCase().includes('pay all my bills')) {
      setSelectedService('Electricity');
      setSelectedAction('pay');
      setView('consumer-id');
    } else if (response?.includes('[ACTION:VIEW_HISTORY:ELECTRICITY]')) {
      setSelectedService('Electricity');
      setSelectedAction('history');
      setView('consumer-id');
    } else if (response?.includes('[ACTION:COMPLAINT:POWER_CUT]')) {
      setSelectedService('Electricity');
      setSelectedAction('complaint');
      setView('auth');
    } else if (response?.includes('[ACTION:PAY_BILL:WATER]')) {
      setSelectedService('Water');
      setSelectedAction('pay');
      setView('consumer-id');
    } else if (response?.includes('[ACTION:PAY_BILL:GAS]')) {
      setSelectedService('Gas');
      setSelectedAction('pay');
      setView('consumer-id');
    } else if (response?.includes('[ACTION:COMPLAINT:GAS_LEAKAGE]')) {
      setSelectedService('Gas');
      setSelectedAction('complaint');
      setView('auth');
    } else if (response?.includes('[ACTION:PAY_BILL:PROPERTY]')) {
      setSelectedService('Property Tax');
      setSelectedAction('pay');
      setView('consumer-id');
    } else if (response?.includes('[ACTION:COMPLAINT:GARBAGE]')) {
      setSelectedService('Waste Management');
      setSelectedAction('complaint');
      setView('auth');
    } else if (response?.includes('[ACTION:COMPLAINT:STREETLIGHT]')) {
      setSelectedService('Street Light');
      setSelectedAction('complaint');
      setView('auth');
    } else if (response?.includes('[ACTION:TRACK:BIRTH_DEATH]')) {
      setSelectedService('Birth/Death');
      setSelectedAction('track');
      setView('track');
    } else if (response?.includes('[ACTION:NAVIGATE:HOME]')) {
      setView('home');
    } else if (response?.includes('[ACTION:NAVIGATE:DEPARTMENTS]')) {
      setView('departments');
    } else if (response?.includes('[ACTION:NAVIGATE:GRIEVANCE]')) {
      setView('grievance');
    } else if (response?.includes('[ACTION:NAVIGATE:MUNICIPAL]')) {
      setView('municipal');
    }
  };

  const handlePayment = async (methodId: string) => {
    requireAuth(async () => {
      setIsProcessingPayment(methodId);
      
      try {
        if (selectedService === 'Electricity') {
          const response = await api.post('/billing/electricity/pay', { consumerId });
          if (response.success && response.data) {
            setReceiptDetails(response.data);
            setTimeout(() => {
              setIsProcessingPayment(null);
              setView('success');
            }, 1000);
          } else {
            throw new Error(response.error || 'Payment failed');
          }
        } else {
          // Mock payment for other services
          setTimeout(() => {
            setReceiptDetails({
              transactionId: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
              receiptNumber: 'REC-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
              amount: 1250,
              paymentTimestamp: new Date().toISOString(),
              department: selectedService,
              status: 'SUCCESS'
            });
            setIsProcessingPayment(null);
            setView('success');
          }, 1500);
        }
      } catch (error: any) {
        console.error('Payment Error:', error);
        setIsProcessingPayment(null);
        alert(error.message || (t as any).paymentFailed);
      }
    });
  };

  const renderHeader = () => (
    <header className={`px-10 py-3 flex justify-between items-center z-40 transition-colors duration-500 border-b-4 ${isDarkMode ? 'bg-slate-900 border-gov-accent shadow-2xl shadow-black/50' : 'bg-white border-gov-blue shadow-md'}`}>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 border-r-2 border-slate-100 pr-8">
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
              alt="National Emblem of India" 
              className="h-16 w-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-[11px] font-black tracking-widest uppercase leading-none ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Government of India</span>
            <span className={`text-[11px] font-black tracking-widest uppercase mt-1.5 leading-none ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>भारत सरकार</span>
            <span className={`text-[9px] font-bold tracking-[0.4em] uppercase mt-1.5 leading-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>सत्यमेव जयते</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className={`text-2xl font-black tracking-tighter leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{t.title}</h1>
          <p className={`text-[10px] font-bold mt-1.5 tracking-[0.25em] uppercase transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleFullscreen}
          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
          title="Fullscreen Mode"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
        <LanguageToggle lang={lang} setLang={setLang} />
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-400 shadow-inner shadow-black/20' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
          >
            <Moon size={20} fill={isDarkMode ? "currentColor" : "none"} />
          </button>
          <button className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all flex items-center gap-2 ${isDarkMode ? 'bg-gov-accent text-white shadow-gov-accent/20 hover:bg-blue-600' : 'bg-gov-blue text-white shadow-gov-blue/20 hover:bg-slate-800'}`} onClick={() => setView('admin')}>
            <User size={16} /> {(t as any).admin}
          </button>
        </div>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="flex-1 flex flex-col p-6 md:p-10 gap-6 md:gap-10 max-w-7xl mx-auto w-full">
      {/* Hero Section - Official Government Portal Style */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-[2rem] border-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row justify-between items-center relative overflow-hidden group transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-white/5 shadow-black/60' : 'bg-white border-slate-100'}`}
      >
        {/* Official Tricolor Ribbon - More Elegant */}
        <div className="absolute top-0 left-0 w-full h-3 flex shadow-sm z-20">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>

        {/* Left Side - Content */}
        <div className="flex-1 z-10 p-8 md:p-12 lg:p-16 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-12">
            <div className={`flex items-center gap-4 px-5 py-2.5 rounded-xl shadow-sm border transition-colors ${isDarkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-100'}`}>
              <div className="bg-white p-1.5 rounded-lg">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
                  alt="" 
                  className="h-10 w-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-[10px] font-black uppercase leading-none tracking-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>{(t as any).ministry}</span>
                <span className={`text-[9px] font-bold uppercase mt-1 leading-none tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{(t as any).govIndia}</span>
              </div>
            </div>
            <div className={`flex items-center gap-3 px-5 py-2.5 border rounded-xl shadow-sm transition-colors ${isDarkMode ? 'bg-emerald-900/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
              <ShieldCheck size={18} className="text-emerald-600" />
              <span className={`text-[11px] font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-emerald-500' : 'text-emerald-700'}`}>{(t as any).officialPortal}</span>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h3 className={`font-black text-sm uppercase tracking-[0.4em] mb-2 opacity-60 ${isDarkMode ? 'text-gov-accent' : 'text-gov-blue'}`}>{(t as any).unifiedInterface}</h3>
            <h2 className={`text-6xl md:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {t.title.split(' ')[0]} <br />
              <span className={isDarkMode ? 'text-gov-accent' : 'text-gov-blue'}>{t.title.split(' ')[1]}</span>
            </h2>
          </div>
          
          <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {(t as any).heroDescription}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            <button 
              onClick={() => setView('departments')}
              className={`px-14 py-6 rounded-2xl font-black text-xl shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-4 ${isDarkMode ? 'bg-gov-accent text-white shadow-gov-accent/20 hover:bg-blue-600' : 'bg-gov-blue text-white shadow-gov-blue/40 hover:bg-slate-800'}`}
            >
              {(t as any).accessServices} <ChevronRight size={28} />
            </button>
            <button 
              onClick={() => setIsVoiceOpen(true)}
              className={`px-14 py-6 rounded-2xl font-black text-xl hover:-translate-y-1 transition-all flex items-center gap-4 shadow-xl ${isDarkMode ? 'bg-slate-800 border-2 border-white/5 text-slate-300 shadow-black/40 hover:bg-slate-700' : 'bg-white border-2 border-slate-100 text-slate-700 shadow-slate-200/50 hover:bg-slate-50'}`}
            >
              <Mic size={28} className={isDarkMode ? 'text-gov-accent' : 'text-gov-blue'} /> {(t as any).aiAssistant}
            </button>
          </div>
        </div>

        {/* Right Side - Branding Visual */}
        <div className={`lg:w-[45%] h-full border-l flex flex-col items-center justify-center p-12 lg:p-16 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-800/50 border-white/5' : 'bg-slate-50/50 border-slate-100'}`}>
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#3B82F6' : '#001F3F'} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full scale-150 blur-[100px] ${isDarkMode ? 'bg-gov-accent/20' : 'bg-gov-blue/10'}`}></div>
              <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.15)] flex items-center justify-center p-14 relative border-4 ring-1 transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-slate-800 ring-white/5' : 'bg-white border-white ring-slate-100'}`}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/1200px-Digital_India_logo.svg.png" 
                  alt="Digital India" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-1 w-10 bg-orange-500 rounded-full"></div>
                <p className={`text-sm font-black tracking-[0.6em] uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>{(t as any).powerToEmpower}</p>
                <div className="h-1 w-10 bg-emerald-500 rounded-full"></div>
              </div>
              <p className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).digitalIndiaInitiative}</p>
            </div>
          </div>

          {/* Large Background Emblem - Integrated as a Seal */}
          <div className="absolute -right-24 -bottom-24 opacity-10 pointer-events-none select-none group-hover:opacity-20 transition-opacity duration-1000">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
              alt="" 
              className={`w-[650px] h-auto ${isDarkMode ? 'brightness-0 invert' : ''}`}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderDepartments = () => (
    <div className="flex-1 flex flex-col p-10 gap-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-5xl font-display font-black text-gov-blue">{(t as any).deptSelect}</h2>
          <p className="text-xl text-slate-500 mt-2 font-medium">{(t as any).deptSelectSub}</p>
        </div>
        <button onClick={() => setView('home')} className="bg-white border border-slate-200 px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-slate-700 hover:bg-slate-50 transition-all">
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.button
          whileHover={{ scale: 1.02, y: -8 }}
          onClick={() => { setSelectedService('Electricity'); setView('service-menu'); }}
          className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl flex flex-col items-center text-center gap-8 group transition-all"
        >
          <div className="w-28 h-28 bg-orange-50 rounded-[2rem] flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/10">
            <Zap size={56} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{(t as any).deptElectricity}</h3>
            <p className="text-sm text-slate-500 mt-4 font-medium leading-relaxed">{(t as any).electricitySub}</p>
          </div>
          <div className="mt-4 w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:bg-gov-blue group-hover:text-white transition-all">
            {(t as any).enterDept}
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -8 }}
          onClick={() => { setSelectedService('Public Transport'); setView('service-menu'); }}
          className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl flex flex-col items-center text-center gap-8 group transition-all"
        >
          <div className="w-28 h-28 bg-purple-50 rounded-[2rem] flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/10">
            <Bus size={56} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{(t as any).deptTransport}</h3>
            <p className="text-sm text-slate-500 mt-4 font-medium leading-relaxed">{(t as any).transportSub}</p>
          </div>
          <div className="mt-4 w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:bg-gov-blue group-hover:text-white transition-all">
            {(t as any).enterDept}
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -8 }}
          onClick={() => { setSelectedService('Gas'); setView('service-menu'); }}
          className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl flex flex-col items-center text-center gap-8 group transition-all"
        >
          <div className="w-28 h-28 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/10">
            <Flame size={56} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{(t as any).deptGas}</h3>
            <p className="text-sm text-slate-500 mt-4 font-medium leading-relaxed">{(t as any).gasSub}</p>
          </div>
          <div className="mt-4 w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:bg-gov-blue group-hover:text-white transition-all">
            {(t as any).enterDept}
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -8 }}
          onClick={() => setView('municipal')}
          className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl flex flex-col items-center text-center gap-8 group transition-all"
        >
          <div className="w-28 h-28 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/10">
            <Building2 size={56} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{(t as any).deptMunicipalCorp}</h3>
            <p className="text-sm text-slate-500 mt-4 font-medium leading-relaxed">{(t as any).deptMunicipalSub}</p>
          </div>
          <div className="mt-4 w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:bg-gov-blue group-hover:text-white transition-all">
            {(t as any).enterDept}
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -8 }}
          onClick={() => setView('health')}
          className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl flex flex-col items-center text-center gap-8 group transition-all"
        >
          <div className="w-28 h-28 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
            <Activity size={56} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{(t as any).deptHealth}</h3>
            <p className="text-sm text-slate-500 mt-4 font-medium leading-relaxed">{(t as any).deptHealthSub}</p>
          </div>
          <div className="mt-4 w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:bg-gov-blue group-hover:text-white transition-all">
            {(t as any).enterDept}
          </div>
        </motion.button>
      </div>
    </div>
  );

  const renderBills = () => (
    <div className="flex-1 flex flex-col p-10 gap-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-5xl font-display font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{t.bills}</h2>
          <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).billsSub}</p>
        </div>
        <button onClick={() => setView('departments')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700 shadow-lg shadow-black/20' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm'}`}>
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={Zap} 
          label={t.electricity} 
          description={(t as any).electricitySub}
          color="bg-orange-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).payElectricity, color: 'bg-orange-500', onClick: () => { setSelectedService('Electricity'); setSelectedAction('pay'); setView('consumer-id'); } }
          ]}
        />
        <ServiceCard 
          icon={Droplets} 
          label={t.water} 
          description={(t as any).waterSub}
          color="bg-blue-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).payWater, color: 'bg-blue-500', onClick: () => { setSelectedService('Water'); setSelectedAction('pay'); setView('consumer-id'); } },
            { label: (t as any).reportComplaint, variant: 'outline', onClick: () => { setSelectedService('Water'); setSelectedAction('complaint'); setView('auth'); } }
          ]}
        />
        <ServiceCard 
          icon={Flame} 
          label={t.gas} 
          description={(t as any).gasSub}
          color="bg-red-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).payGas, color: 'bg-red-500', onClick: () => { setSelectedService('Gas'); setSelectedAction('pay'); setView('consumer-id'); } }
          ]}
        />
      </div>
    </div>
  );

  const renderGrievance = () => (
    <div className="flex-1 flex flex-col p-10 gap-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-5xl font-display font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{t.grievance}</h2>
          <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).grievanceSub}</p>
        </div>
        <button onClick={() => setView('municipal')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700 shadow-lg shadow-black/20' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm'}`}>
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.button
          whileHover={{ y: -8 }}
          onClick={() => { setSelectedService(''); setSelectedAction('complaint'); setView('auth'); }}
          className={`rounded-[3.5rem] p-16 border shadow-xl flex flex-col items-center text-center gap-8 group relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[5rem] -mr-10 -mt-10 transition-colors ${isDarkMode ? 'bg-rose-900/20' : 'bg-rose-50'}`}></div>
          <div className={`w-32 h-32 text-rose-500 rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/10 ${isDarkMode ? 'bg-rose-900/40' : 'bg-rose-50'}`}>
            <MessageSquare size={64} />
          </div>
          <div className="relative z-10">
            <h3 className={`text-4xl font-black uppercase tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t.lodge}</h3>
            <p className={`text-xl mt-4 font-medium leading-relaxed max-w-md transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).lodgeSub}</p>
          </div>
          <div className="mt-4 px-10 py-5 bg-rose-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-rose-500/20 group-hover:bg-rose-600 transition-all">
            {t.lodgeComplaint}
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -8 }}
          onClick={() => { setSelectedService(''); setView('track'); }}
          className={`rounded-[3.5rem] p-16 border shadow-xl flex flex-col items-center text-center gap-8 group relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[5rem] -mr-10 -mt-10 transition-colors ${isDarkMode ? 'bg-sky-900/20' : 'bg-sky-50'}`}></div>
          <div className={`w-32 h-32 text-sky-500 rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-sky-500/10 ${isDarkMode ? 'bg-sky-900/40' : 'bg-sky-50'}`}>
            <Search size={64} />
          </div>
          <div className="relative z-10">
            <h3 className={`text-4xl font-black uppercase tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t.track}</h3>
            <p className={`text-xl mt-4 font-medium leading-relaxed max-w-md transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).trackSub}</p>
          </div>
          <div className="mt-4 px-10 py-5 bg-sky-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-sky-500/20 group-hover:bg-sky-600 transition-all">
            {t.trackStatus}
          </div>
        </motion.button>
      </div>
    </div>
  );

  const renderMunicipal = () => (
    <div className="flex-1 flex flex-col p-10 gap-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-5xl font-display font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{t.municipal}</h2>
          <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).municipalSub}</p>
        </div>
        <button onClick={() => setView('departments')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700 shadow-lg shadow-black/20' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm'}`}>
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          icon={MessageSquare} 
          label={(t as any).deptGrievance} 
          description={(t as any).deptGrievanceSub}
          color="bg-red-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).lodge, color: 'bg-red-500', onClick: () => setView('grievance') },
            { label: (t as any).track, variant: 'outline', onClick: () => setView('track') }
          ]}
        />

        <ServiceCard 
          icon={Droplets} 
          label={t.water} 
          description={(t as any).waterSub}
          color="bg-blue-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).payWater, color: 'bg-blue-500', onClick: () => { setSelectedService('Water'); setSelectedAction('pay'); setView('consumer-id'); } },
            { label: (t as any).reportComplaint, variant: 'outline', onClick: () => { setSelectedService('Water'); setSelectedAction('complaint'); setView('auth'); } }
          ]}
        />

        <ServiceCard 
          icon={Building2} 
          label={t.property} 
          description={(t as any).propertySub}
          color="bg-emerald-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).payPropertyTax, color: 'bg-emerald-500', onClick: () => { setSelectedService('Property Tax'); setSelectedAction('pay'); setView('consumer-id'); } }
          ]}
        />

        <ServiceCard 
          icon={PlusCircle} 
          label={t.trade} 
          description={(t as any).tradeSub}
          color="bg-indigo-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).applyNew, color: 'bg-indigo-500', onClick: () => { setSelectedService('Trade License'); setSelectedAction('new'); setView('auth'); } },
            { label: (t as any).renewBtn, variant: 'outline', onClick: () => { setSelectedService('Trade License'); setSelectedAction('renew'); setView('auth'); } }
          ]}
        />

        <ServiceCard 
          icon={CheckCircle2} 
          label={t.birthDeath} 
          description={(t as any).birthDeathSub}
          color="bg-sky-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).reqCert, color: 'bg-sky-500', onClick: () => { setSelectedService('Birth/Death'); setSelectedAction('new'); setView('auth'); } }
          ]}
        />

        <ServiceCard 
          icon={Droplets} 
          label={t.waste} 
          description={(t as any).wasteSub}
          color="bg-teal-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).wasteServices, color: 'bg-teal-500', onClick: () => { setSelectedService('Waste Management'); setSelectedAction('complaint'); setView('auth'); } }
          ]}
        />

        <ServiceCard 
          icon={Zap} 
          label={t.streetlightComplaint.split(' ')[0] + ' ' + t.streetlightComplaint.split(' ')[1]} 
          description={(t as any).streetLightSub}
          color="bg-yellow-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).reportIssue, color: 'bg-yellow-500', onClick: () => { setSelectedService('Street Light'); setSelectedAction('complaint'); setView('auth'); } }
          ]}
        />

        <ServiceCard 
          icon={ShieldCheck} 
          label={t.buildingPlanSub.split(' ')[0] + ' ' + t.buildingPlanSub.split(' ')[1]} 
          description={(t as any).buildingPlanSub}
          color="bg-slate-800"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).trackApproval, color: 'bg-slate-800', onClick: () => { setSelectedService('Building Plan'); setSelectedAction('track'); setView('auth'); } }
          ]}
        />
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="flex-1 flex flex-col p-10 gap-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-5xl font-display font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{(t as any).deptHealth}</h2>
          <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).healthSub}</p>
        </div>
        <button onClick={() => setView('departments')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700 shadow-lg shadow-black/20' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm'}`}>
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          icon={Activity} 
          label={(t as any).opdToken} 
          description={(t as any).opdTokenSub}
          color="bg-blue-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).opdBooking, color: 'bg-blue-500', onClick: () => { setSelectedService('Health'); setSelectedAction('new'); setView('auth'); } }
          ]}
        />

        <ServiceCard 
          icon={Search} 
          label={(t as any).healthRecords} 
          description={(t as any).healthRecordsSub}
          color="bg-indigo-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).viewRecords, color: 'bg-indigo-500', onClick: () => { setSelectedService('Health'); setSelectedAction('track'); setView('auth'); } }
          ]}
        />

        <ServiceCard 
          icon={PlusCircle} 
          label={(t as any).ayushmanBharat} 
          description={(t as any).ayushmanBharatSub}
          color="bg-emerald-500"
          isDarkMode={isDarkMode}
          buttons={[
            { label: (t as any).apply, color: 'bg-emerald-500', onClick: () => { setSelectedService('Health'); setSelectedAction('new'); setView('auth'); } }
          ]}
        />
      </div>
    </div>
  );

  const renderTrack = () => (
    <div className="flex-1 flex flex-col p-10 max-w-4xl mx-auto w-full gap-10">
      <div className="flex items-center justify-between">
        <h2 className={`text-4xl font-display font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{(t as any).trackStatus}</h2>
        <button onClick={() => {
          if (['Electricity', 'Water', 'Gas', 'Waste Management', 'Street Light', 'Public Transport', 'Birth/Death', 'Trade License', 'Building Plan', 'Property Tax'].includes(selectedService as string)) {
            setView('service-menu');
          } else {
            setView('grievance');
          }
        }} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>

      <div className={`p-12 rounded-[3rem] border shadow-sm flex flex-col gap-10 transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
        <div className="space-y-4">
          <label className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{(t as any).appGrievanceId}</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={trackSearch}
              readOnly
              onFocus={() => openKeyboard(trackSearch, setTrackSearch)}
              placeholder="e.g. GRV-123456" 
              className={`flex-1 rounded-2xl px-8 py-6 text-2xl outline-none border-2 transition-all ${isDarkMode ? 'bg-slate-800 border-white/5 text-white focus:border-gov-accent' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-gov-blue'}`}
            />
            <button 
              onClick={async () => {
                if (!trackSearch) return;
                if (trackSearch.startsWith('ELEC-GRV-')) {
                  requireAuth(async () => {
                    try {
                      const res = await api.get(`/grievance/electricity/${trackSearch}`);
                      if (res.grievanceId) {
                        setTrackResult({
                          id: res.grievanceId,
                          status: res.status,
                          date: new Date(res.createdAt).toLocaleDateString(),
                          dept: res.department
                        });
                      } else {
                        alert('Grievance not found');
                      }
                    } catch (err: any) {
                      alert(err.message || 'Failed to track grievance');
                    }
                  });
                } else {
                  setTrackResult({
                    id: trackSearch,
                    status: (t as any).inProgress,
                    date: new Date().toLocaleDateString(),
                    dept: selectedService || (t as any).department
                  });
                }
              }}
              className={`px-12 py-6 rounded-2xl text-xl font-bold shadow-lg transition-all ${isDarkMode ? 'bg-gov-accent text-white hover:bg-blue-600' : 'bg-gov-blue text-white hover:bg-slate-800'}`}
            >
              {(t as any).trackNow}
            </button>
          </div>
        </div>

        {trackResult && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-10 rounded-[2.5rem] border-2 flex flex-col gap-6 transition-colors ${isDarkMode ? 'bg-emerald-900/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{(t as any).currentStatus}</p>
                <h4 className={`text-4xl font-black mt-2 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>{trackResult.status}</h4>
              </div>
              <div className={`px-6 py-3 rounded-xl border shadow-sm transition-colors ${isDarkMode ? 'bg-slate-800 border-emerald-500/20' : 'bg-white border-emerald-200'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).trackingId}</p>
                <p className={`text-lg font-black ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{trackResult.id}</p>
              </div>
            </div>
            
            <div className={`h-px w-full ${isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-200/50'}`}></div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>{(t as any).department}</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>{trackResult.dept}</p>
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>{(t as any).lastUpdated}</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>{trackResult.date}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className={`p-8 rounded-3xl border transition-colors ${isDarkMode ? 'bg-slate-800/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          <div className="flex items-center gap-4 text-slate-400 mb-4">
            <Search size={20} />
            <span className="font-bold uppercase tracking-widest text-xs">{(t as any).recentSearches}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {['GRV-982134', 'APP-002341', 'TAX-882131'].map(id => (
              <button 
                key={id} 
                onClick={() => setTrackSearch(id)}
                className={`bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:border-gov-blue transition-all ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderServiceSelect = () => null; // Replaced by specific section renders

   const renderAuth = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[3.5rem] w-full max-w-2xl border border-slate-100 shadow-2xl flex flex-col gap-8"
      >
        <div className="mx-auto w-20 h-20 bg-brand-accent/10 rounded-3xl flex items-center justify-center text-brand-accent">
          <Smartphone size={40} />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900">{t.otpTitle}</h2>
          <p className="text-lg text-slate-500 mt-2">{t.otpSub}</p>
        </div>
        
        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-16 h-20 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center justify-center text-4xl font-black text-slate-700">
              {otp[i] || <span className="text-slate-200">_</span>}
            </div>
          ))}
        </div>

        <NumericKeypad 
          onInput={(v) => otp.length < 4 && setOtp(prev => prev + v)}
          onDelete={() => setOtp(prev => prev.slice(0, -1))}
          onConfirm={() => {
            if (otp.length === 4) {
              if (selectedAction === 'pay') setView('pay-bill');
              else if (selectedAction === 'complaint') {
                if (selectedService === 'Electricity') setView('electricity-grievance');
                else setView('complaint');
              }
              else setView('new-connection');
            }
          }}
        />

        <button onClick={() => setView('home')} className="w-full py-4 rounded-xl font-bold text-slate-400 hover:text-slate-600 transition-all">{(t as any).cancelBack}</button>
      </motion.div>
    </div>
  );

  const getFieldLabel = () => {
    switch (selectedService) {
      case 'Electricity': return t.electricityId;
      case 'Water': return t.waterId;
      case 'Gas': return t.gasId;
      case 'Property Tax': return t.propertyId;
      case 'Trade License': return t.tradeId;
      case 'Birth/Death': return t.birthDeathId;
      case 'Waste Management': return t.wasteId;
      case 'Public Transport': return (t as any).transportId;
      default: return (t as any).consumerAccount;
    }
  };

  const renderConsumerId = () => (
    <div className={`flex-1 flex flex-col items-center justify-center p-10 transition-all duration-300 ${isKeyboardOpen ? 'pb-[400px]' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[3.5rem] w-full max-w-2xl border border-slate-100 shadow-2xl flex flex-col gap-8 relative overflow-hidden"
      >
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gov-blue/5 rounded-bl-[5rem] -mr-10 -mt-10"></div>
        
        <div className="mx-auto w-24 h-24 bg-gov-blue/10 rounded-[2rem] flex items-center justify-center text-gov-blue shadow-inner">
          <Hash size={48} />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{getFieldLabel()}</h2>
          <p className="text-xl text-slate-500 font-medium">{(t as any).enterDetailsFor} <span className="text-gov-blue font-bold">{selectedService}</span></p>
        </div>
        
        <div className="relative group cursor-pointer" onClick={() => openKeyboard(consumerId, setConsumerId)}>
          <div className="absolute -inset-1 bg-gradient-to-r from-gov-blue/20 to-gov-accent/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-8 text-4xl font-black text-center tracking-[0.2em] min-h-[110px] flex items-center justify-center shadow-inner text-gov-blue">
            {consumerId || <span className="text-slate-200">_ _ _ _ _ _ _ _</span>}
          </div>
        </div>

        <button 
          onClick={async () => {
            if (consumerId.length > 5) {
              if (selectedAction === 'history') {
                fetch('/api/analytics/chart').then(res => res.json()).then(setChartData);
                setView('history');
              } else {
                if (selectedService === 'Electricity') {
                  setIsFetchingBill(true);
                  try {
                    const res = await api.get(`/billing/electricity/${consumerId}`);
                    if (res.success && res.data) {
                      setBillDetails(res.data);
                      setView('pay-bill');
                    } else {
                      alert('Could not fetch bill details.');
                    }
                  } catch (err: any) {
                    alert(err.message || 'Failed to fetch bill');
                  } finally {
                    setIsFetchingBill(false);
                  }
                } else {
                  // Mock for other services
                  setView('pay-bill');
                }
              }
            }
          }}
          disabled={isFetchingBill || consumerId.length <= 5}
          className={`w-full py-5 rounded-2xl font-black text-white text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${consumerId.length > 5 && !isFetchingBill ? 'bg-gov-blue hover:opacity-90 active:scale-95' : 'bg-slate-300 cursor-not-allowed'}`}
        >
          {isFetchingBill ? (
            <>
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              Fetching Details...
            </>
          ) : (
            'Verify & Proceed'
          )}
        </button>

        <button 
          onClick={() => {
            if (['Electricity', 'Water', 'Gas', 'Public Transport'].includes(selectedService as string)) {
              setView('service-menu');
            } else if (['Property Tax'].includes(selectedService as string)) {
              setView('municipal');
            } else {
              setView('departments');
            }
          }} 
          className="w-full py-4 rounded-2xl font-black text-slate-400 hover:text-gov-blue hover:bg-slate-50 transition-all uppercase tracking-widest text-sm"
        >
          ← {(t as any).cancelBack}
        </button>
      </motion.div>
    </div>
  );

  const renderPayBill = () => {
    const getPaymentMethods = () => {
      switch (selectedService) {
        case 'Electricity':
          return [
            { id: 'upi', label: (t as any).upiPayment, sub: (t as any).upiSub, icon: 'UPI' },
            { id: 'card', label: (t as any).cardPayment, sub: (t as any).cardSub, icon: <CreditCard size={24} /> },
            { id: 'net', label: (t as any).netBanking, sub: (t as any).netSub, icon: <Building2 size={24} /> }
          ];
        case 'Water':
          return [
            { id: 'upi', label: (t as any).upiPayment, sub: (t as any).instantVerify, icon: 'UPI' },
            { id: 'cash', label: (t as any).kioskCash, sub: (t as any).payCounter, icon: <Wallet size={24} /> }
          ];
        case 'Gas':
          return [
            { id: 'upi', label: (t as any).upiPayment, sub: (t as any).upiSub, icon: 'UPI' },
            { id: 'wallet', label: (t as any).digitalWallets, sub: (t as any).walletSub, icon: <Smartphone size={24} /> }
          ];
        default:
          return [
            { id: 'upi', label: (t as any).upiPayment, sub: (t as any).upiSub, icon: 'UPI' },
            { id: 'card', label: (t as any).cardPayment, sub: (t as any).cardSub, icon: <CreditCard size={24} /> }
          ];
      }
    };

    return (
      <div className="flex-1 flex flex-col p-10 max-w-6xl mx-auto w-full gap-10">
        <div className="flex items-center justify-between">
          <h2 className={`text-4xl font-display font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{(t as any).billPayment}</h2>
          <button onClick={() => setView('consumer-id')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
            <ArrowLeft size={24} /> {t.back}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className={`p-10 rounded-[2.5rem] border shadow-sm flex flex-col gap-8 transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`font-bold uppercase tracking-widest text-sm transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).consumerAccount}</p>
                  <h3 className={`text-3xl font-bold mt-1 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{(t as any).citizenName}</h3>
                  <p className={`text-lg font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>ID: {consumerId || '1002938475'} • {selectedService}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                  <CheckCircle2 size={16} /> {(t as any).verified}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className={`p-6 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-800 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <p className={`font-bold text-xs uppercase transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).billingPeriod}</p>
                  <p className={`text-xl font-bold mt-1 transition-colors ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                    {billDetails?.billing_cycle || (t as any).periodValue}
                  </p>
                </div>
                <div className={`p-6 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-800 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <p className={`font-bold text-xs uppercase transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).dueDate}</p>
                  <p className="text-xl font-bold mt-1 text-red-500">
                    {billDetails?.due_date ? new Date(billDetails.due_date).toLocaleDateString() : (t as any).dueValue}
                  </p>
                </div>
              </div>

              <div className={`p-10 rounded-[2rem] flex justify-between items-center shadow-xl relative overflow-hidden transition-all ${isDarkMode ? 'bg-gov-accent shadow-gov-accent/20' : 'bg-gov-blue shadow-gov-blue/20'}`}>
                <div className="relative z-10">
                  <p className="text-white/60 font-bold uppercase text-sm">{(t as any).totalPayable}</p>
                  <p className="text-6xl font-black mt-2 text-white">
                    ₹ {billDetails?.amount ? billDetails.amount.toFixed(2) : '1,250.00'}
                  </p>
                </div>
                <div className="hidden sm:block relative z-10">
                  <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    {selectedService === 'Electricity' && <Zap size={48} className="text-orange-300" />}
                    {selectedService === 'Water' && <Droplets size={48} className="text-blue-300" />}
                    {selectedService === 'Gas' && <Flame size={48} className="text-rose-300" />}
                    {selectedService === 'Property Tax' && <Building2 size={48} className="text-emerald-300" />}
                  </div>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className={`p-10 rounded-[2.5rem] border shadow-sm flex flex-col gap-8 h-full transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
              <h3 className={`text-2xl font-bold flex items-center gap-3 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <CreditCard size={24} className="text-gov-blue" />
                {(t as any).selectPayment}
              </h3>
              <div className="flex flex-col gap-4">
                {getPaymentMethods().map((method) => (
                  <button 
                    key={method.id} 
                    onClick={() => handlePayment(method.id)}
                    disabled={isProcessingPayment !== null}
                    className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all group ${method.id === 'upi' ? 'border-gov-blue bg-gov-blue/5' : 'border-slate-100 hover:border-gov-blue hover:bg-slate-50'} ${isProcessingPayment !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black shadow-sm transition-transform ${isProcessingPayment === null ? 'group-hover:scale-110' : ''} ${method.id === 'upi' ? 'bg-white text-gov-blue' : 'bg-slate-50 text-slate-400'}`}>
                      {isProcessingPayment === method.id ? (
                        <div className="w-6 h-6 border-4 border-gov-blue border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        typeof method.icon === 'string' ? method.icon : method.icon
                      )}
                    </div>
                    <div className="text-left">
                      <p className={`font-black transition-colors ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {isProcessingPayment === method.id ? (t as any).processing : method.label}
                      </p>
                      <p className={`text-xs font-bold uppercase tracking-tight transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{method.sub}</p>
                    </div>
                    <ChevronRight size={20} className={`ml-auto ${method.id === 'upi' ? 'text-gov-blue' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
              <div className={`mt-auto p-6 rounded-2xl border transition-colors ${isDarkMode ? 'bg-slate-800/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-3 text-emerald-600 font-bold text-sm">
                  <ShieldCheck size={18} />
                  {(t as any).secureGateway}
                </div>
                <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest leading-relaxed transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).secureSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComplaint = () => (
    <div className="flex-1 flex flex-col p-10 max-w-4xl mx-auto w-full gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className={`text-4xl font-display font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{(t as any).lodgeComplaint}</h2>
          <div className="flex items-center gap-4 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${complaintStep >= s ? 'bg-gov-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {s}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${complaintStep === s ? 'text-gov-blue' : 'text-slate-400'}`}>
                  {s === 1 ? t.step1 : s === 2 ? t.step2 : t.step3}
                </span>
                {s < 3 && <div className="w-8 h-0.5 bg-slate-100"></div>}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => {
          if (['Water', 'Gas', 'Waste Management', 'Street Light'].includes(selectedService as string)) {
            setView('service-menu');
          } else {
            setView('grievance');
          }
        }} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 h-16 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'}`}>
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>

      <div className={`p-12 rounded-[3rem] border shadow-sm flex flex-col gap-10 transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
        {complaintStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-4">
              <label className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{(t as any).describeIssue}</label>
              <textarea 
                className={`w-full h-56 p-8 text-xl rounded-3xl border-2 outline-none transition-all resize-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-gov-accent' : 'bg-slate-50/50 border-slate-100 focus:border-gov-blue focus:bg-white'}`}
                placeholder={(t as any).complaintPlaceholder}
                value={complaintDesc}
                readOnly
                onFocus={() => openKeyboard(complaintDesc, setComplaintDesc)}
              ></textarea>
            </div>
            <button onClick={() => setComplaintStep(2)} className={`w-full py-6 rounded-2xl text-2xl font-bold shadow-xl h-20 flex items-center justify-center gap-3 transition-all ${isDarkMode ? 'bg-gov-accent text-white shadow-gov-accent/20 hover:bg-blue-600' : 'bg-gov-blue text-white shadow-gov-blue/20 hover:bg-slate-800'}`}>
              {t.next} <ChevronRight size={28} />
            </button>
          </motion.div>
        )}

        {complaintStep === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <button className={`p-10 rounded-3xl border-2 border-dashed flex flex-col items-center gap-3 transition-all min-h-[200px] justify-center ${isDarkMode ? 'bg-slate-800 border-white/10 text-slate-400 hover:border-gov-accent hover:text-gov-accent' : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:border-gov-blue hover:text-gov-blue'}`}>
                <Camera size={48} />
                <span className="font-bold text-xl">{(t as any).capturePhoto}</span>
              </button>
              <button className={`p-10 rounded-3xl border-2 border-dashed flex flex-col items-center gap-3 transition-all min-h-[200px] justify-center ${isDarkMode ? 'bg-slate-800 border-white/10 text-slate-400 hover:border-gov-accent hover:text-gov-accent' : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:border-gov-blue hover:text-gov-blue'}`}>
                <Upload size={48} />
                <span className="font-bold text-xl">{(t as any).uploadDocument}</span>
              </button>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setComplaintStep(1)} className={`flex-1 py-6 rounded-2xl border-2 font-bold text-xl h-20 transition-all ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}>{t.back}</button>
              <button onClick={() => setComplaintStep(3)} className={`flex-[2] py-6 rounded-2xl text-2xl font-bold shadow-xl h-20 transition-all ${isDarkMode ? 'bg-gov-accent text-white shadow-gov-accent/20 hover:bg-blue-600' : 'bg-gov-blue text-white shadow-gov-blue/20 hover:bg-slate-800'}`}>{t.next}</button>
            </div>
          </motion.div>
        )}

        {complaintStep === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-colors ${isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-500'}`}>
              <CheckCircle2 size={48} />
            </div>
            <div>
              <h3 className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{(t as any).readyToSubmit}</h3>
              <p className={`mt-2 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).reviewDetails}</p>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setComplaintStep(2)} className={`flex-1 py-6 rounded-2xl border-2 font-bold text-xl h-20 transition-all ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}>{t.back}</button>
              <button 
                onClick={() => {
                  requireAuth(async () => {
                    const id = `GRV-${Math.floor(100000 + Math.random() * 900000)}`;
                    setTrackingId(id);
                    await fetch('/api/complaint', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ service: selectedService, description: 'Test', trackingId: id })
                    });
                    setView('success');
                  });
                }}
                className={`flex-[2] py-6 rounded-2xl text-2xl font-bold shadow-2xl h-20 transition-all ${isDarkMode ? 'bg-emerald-600 text-white shadow-emerald-900/20 hover:bg-emerald-700' : 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600'}`}
              >
                {t.confirm}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  const trackElectricityGrievance = async () => {
    if (!trackGrievanceId) return;
    setIsTrackingGrievance(true);
    try {
      const res = await api.get(`/grievance/electricity/${trackGrievanceId}`);
      setTrackGrievanceResult(res);
    } catch (err: any) {
      alert(err.message || 'Grievance not found');
      setTrackGrievanceResult(null);
    } finally {
      setIsTrackingGrievance(false);
    }
  };

  const submitElectricityGrievance = async () => {
    if (!grievanceConsumerId || !complaintType || !complaintText) {
      alert('Please fill all required fields');
      return;
    }
    
    const action = async () => {
      setIsSubmittingGrievance(true);
      try {
        const res = await api.post('/grievance/electricity', {
          consumerId: grievanceConsumerId,
          complaintType: complaintType,
          description: complaintText
        });
        setElectricityGrievanceId(res.grievanceId);
        setView('success');
      } catch (err: any) {
        alert(err.message || 'Failed to submit grievance');
      } finally {
        setIsSubmittingGrievance(false);
      }
    };

    requireAuth(action);
  };

  const renderElectricityGrievance = () => {
    const categories = [
      { id: 'power_cut', type: 'OUTAGE', label: 'Power Outage / No Supply', icon: <Zap size={24} /> },
      { id: 'voltage', type: 'OUTAGE', label: 'Voltage Fluctuation', icon: <Activity size={24} /> },
      { id: 'meter', type: 'METER_FAULT', label: 'Meter Fault / Burnt', icon: <AlertCircle size={24} /> },
      { id: 'billing', type: 'BILLING_ISSUE', label: 'Billing Issue', icon: <CreditCard size={24} /> },
      { id: 'other', type: 'OUTAGE', label: 'Other Issue', icon: <MessageSquare size={24} /> }
    ];

    return (
      <div className="flex-1 flex flex-col p-10 max-w-4xl mx-auto w-full gap-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className={`text-4xl font-display font-black transition-colors ${isDarkMode ? 'text-white' : 'text-orange-500'}`}>Electricity Grievance</h2>
            <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Report an issue with your electricity service</p>
          </div>
          <button onClick={() => setView('service-menu')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 h-16 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'}`}>
            <ArrowLeft size={24} /> {t.back}
          </button>
        </div>

        <div className={`p-12 rounded-[3rem] border shadow-sm flex flex-col gap-10 transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
          <div className="space-y-4">
            <label className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.electricityId}</label>
            <div 
              onClick={() => openKeyboard(grievanceConsumerId, setGrievanceConsumerId)}
              className={`p-6 rounded-2xl border-2 text-2xl font-black tracking-widest text-center cursor-pointer transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-800'}`}
            >
              {grievanceConsumerId || 'Enter Consumer Number'}
            </div>
          </div>

          <div className="space-y-4">
            <label className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Select Issue Category</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => {
                    setComplaintDesc(cat.label);
                    setComplaintType(cat.type);
                  }}
                  className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all text-left ${complaintType === cat.type && complaintDesc === cat.label ? 'border-orange-500 bg-orange-50 text-orange-600' : isDarkMode ? 'border-slate-700 text-slate-300 hover:border-orange-500/50' : 'border-slate-200 text-slate-600 hover:border-orange-200'}`}
                >
                  <div className={complaintType === cat.type && complaintDesc === cat.label ? 'text-orange-500' : 'text-slate-400'}>{cat.icon}</div>
                  <span className="font-bold text-lg">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Description</label>
            <textarea 
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              onFocus={() => openKeyboard(complaintText, setComplaintText)}
              className={`w-full h-32 p-6 text-lg rounded-2xl border-2 outline-none transition-all resize-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-orange-500' : 'bg-slate-50/50 border-slate-100 focus:border-orange-500 focus:bg-white'}`}
              placeholder="Provide any specific details about the issue..."
            ></textarea>
          </div>
          
          <button 
            onClick={submitElectricityGrievance} 
            disabled={!complaintType || !grievanceConsumerId || !complaintText || isSubmittingGrievance}
            className={`w-full py-6 rounded-2xl text-2xl font-bold shadow-xl h-20 flex items-center justify-center gap-3 transition-all ${!complaintType || !grievanceConsumerId || !complaintText || isSubmittingGrievance ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
          >
            {isSubmittingGrievance ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>Submit Grievance <ChevronRight size={28} /></>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderTrackElectricityGrievance = () => {
    const steps = [
      { id: 'REGISTERED', label: 'Registered', icon: <CheckCircle2 size={24} /> },
      { id: 'ASSIGNED', label: 'Assigned', icon: <User size={24} /> },
      { id: 'IN_PROGRESS', label: 'In Progress', icon: <Activity size={24} /> },
      { id: 'RESOLVED', label: 'Resolved', icon: <ShieldCheck size={24} /> }
    ];

    const currentStepIndex = trackGrievanceResult ? steps.findIndex(s => s.id === trackGrievanceResult.status) : -1;

    return (
      <div className="flex-1 flex flex-col p-10 max-w-4xl mx-auto w-full gap-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className={`text-4xl font-display font-black transition-colors ${isDarkMode ? 'text-white' : 'text-sky-500'}`}>Track Electricity Grievance</h2>
            <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Check the status of your reported issue</p>
          </div>
          <button onClick={() => setView('service-menu')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 h-16 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'}`}>
            <ArrowLeft size={24} /> {t.back}
          </button>
        </div>

        <div className={`p-12 rounded-[3rem] border shadow-sm flex flex-col gap-10 transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
          <div className="space-y-4">
            <label className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Enter Grievance ID</label>
            <div className="flex gap-4">
              <div 
                onClick={() => openKeyboard(trackGrievanceId, setTrackGrievanceId)}
                className={`flex-1 p-6 rounded-2xl border-2 text-2xl font-black tracking-widest text-center cursor-pointer transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-800'}`}
              >
                {trackGrievanceId || 'ELEC-GRV-XXXX'}
              </div>
              <button 
                onClick={trackElectricityGrievance}
                disabled={!trackGrievanceId || isTrackingGrievance}
                className={`px-10 rounded-2xl bg-sky-500 text-white font-black text-xl shadow-lg hover:bg-sky-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed`}
              >
                {isTrackingGrievance ? <RefreshCw className="animate-spin" /> : 'Track'}
              </button>
            </div>
          </div>

          {trackGrievanceResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 pt-6">
              <div className="grid grid-cols-2 gap-8 p-8 rounded-3xl bg-sky-500/5 border border-sky-500/10">
                <div>
                  <p className="text-xs font-black text-sky-500 uppercase tracking-widest">Consumer ID</p>
                  <p className="text-2xl font-black mt-1">{trackGrievanceResult.consumerId}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-sky-500 uppercase tracking-widest">Complaint Type</p>
                  <p className="text-2xl font-black mt-1">{trackGrievanceResult.complaintType}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-black text-sky-500 uppercase tracking-widest">Description</p>
                  <p className="text-lg font-medium mt-1">{trackGrievanceResult.description || 'No description provided'}</p>
                </div>
              </div>

              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-sky-500 -translate-y-1/2 transition-all duration-1000" 
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                ></div>

                <div className="relative flex justify-between">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${isCompleted ? 'bg-sky-500 border-white text-white shadow-xl shadow-sky-500/20' : 'bg-white border-slate-200 text-slate-300'}`}>
                          {step.icon}
                        </div>
                        <p className={`text-sm font-black uppercase tracking-tight ${isActive ? 'text-sky-500' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center">
                <p className="text-slate-400 text-sm font-bold">Last Updated: {new Date(trackGrievanceResult.updatedAt || trackGrievanceResult.createdAt).toLocaleString()}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const renderNewConnection = () => {
    const isHealth = selectedService === 'Health';
    return (
      <div className="flex-1 flex flex-col p-10 max-w-4xl mx-auto w-full gap-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-4xl font-display font-black transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>
              {isHealth ? (t as any).opdTitle : (t as any).newConnTitle}
            </h2>
            <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {isHealth ? (t as any).opdSub : (t as any).newConnSub} for <span className="text-gov-accent font-bold">{selectedService}</span>
            </p>
          </div>
          <button onClick={() => setView(isHealth ? 'health' : 'municipal')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'}`}>
            <ArrowLeft size={24} /> {t.back}
          </button>
        </div>

        <div className={`p-12 rounded-[3rem] border shadow-sm flex flex-col gap-10 transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400">
                {isHealth ? (t as any).patientName : (t as any).fullName}
              </label>
              <input 
                type="text" 
                value={newConnData.name}
                readOnly
                onFocus={() => openKeyboard(newConnData.name, setNewConnData, 'name')}
                className={`w-full p-6 border-2 rounded-2xl outline-none focus:border-gov-blue transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`} 
                placeholder={isHealth ? (t as any).patientNamePlaceholder : (t as any).fullNamePlaceholder} 
              />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400">{(t as any).mobileNumber}</label>
              <input 
                type="tel" 
                value={newConnData.mobile}
                readOnly
                onFocus={() => openKeyboard(newConnData.mobile, setNewConnData, 'mobile')}
                className={`w-full p-6 border-2 rounded-2xl outline-none focus:border-gov-blue transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`} 
                placeholder={(t as any).mobilePlaceholder} 
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-sm font-black uppercase tracking-widest text-slate-400">
              {isHealth ? (t as any).hospitalName : (t as any).address}
            </label>
            {isHealth ? (
              <select 
                className={`w-full p-6 border-2 rounded-2xl outline-none focus:border-gov-blue transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`}
              >
                <option>District General Hospital</option>
                <option>City Civil Hospital</option>
                <option>Municipal Medical Center</option>
              </select>
            ) : (
              <textarea 
                value={newConnData.address}
                readOnly
                onFocus={() => openKeyboard(newConnData.address, setNewConnData, 'address')}
                className={`w-full h-32 p-6 border-2 rounded-2xl outline-none focus:border-gov-blue transition-all resize-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`} 
                placeholder={(t as any).addressPlaceholder}
              ></textarea>
            )}
          </div>

          <div className={`p-8 border-2 rounded-3xl flex items-start gap-6 ${isDarkMode ? 'bg-blue-900/20 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
            <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                {isHealth ? (t as any).appointmentConfirmed : (t as any).docReq}
              </h4>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-blue-400/70' : 'text-blue-700/70'}`}>
                {isHealth ? (t as any).tokenSmsHint : (t as any).docReqSub}
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              if (!newConnData.name || !newConnData.mobile) {
                alert('Please fill all fields');
                return;
              }
              requireAuth(async () => {
                const id = isHealth ? `OPD-${Math.floor(100000 + Math.random() * 900000)}` : '';
                if (isHealth) setTrackingId(id);
                
                await fetch('/api/apply', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    service: selectedService, 
                    ...newConnData,
                    trackingId: id
                  })
                });
                setView('success');
                setNewConnData({ name: '', mobile: '', address: '' });
              });
            }}
            className={`w-full py-6 rounded-2xl text-2xl font-black shadow-xl transition-all ${isDarkMode ? 'bg-gov-accent text-white shadow-gov-accent/20 hover:bg-blue-600' : 'bg-gov-blue text-white shadow-gov-blue/20 hover:bg-slate-800'}`}
          >
            {isHealth ? (t as any).bookToken : (t as any).submitApp}
          </button>
        </div>
      </div>
    );
  };

  const renderServiceMenu = () => {
    const getActions = () => {
      switch (selectedService) {
        case 'Electricity':
          return [
            { id: 'pay', label: (t as any).viewBill, icon: CreditCard, color: 'bg-orange-500', desc: 'View and pay your current bill' },
            { id: 'history', label: (t as any).consumptionHistory, icon: TrendingUp, color: 'bg-blue-500', desc: 'View your usage trends' },
            { id: 'complaint', label: (t as any).grievance, icon: AlertCircle, color: 'bg-red-500', desc: 'Report an issue or outage' },
            { id: 'track', label: (t as any).trackReq, icon: Search, color: 'bg-sky-500', desc: 'Track grievance status' },
            { id: 'new', label: (t as any).applyNewMeter, icon: PlusCircle, color: 'bg-emerald-500', desc: 'Apply for a new connection' }
          ];
        case 'Gas':
          return [
            { id: 'pay', label: (t as any).viewBill, icon: CreditCard, color: 'bg-red-500', desc: 'Check your gas usage and bill' },
            { id: 'complaint', label: (t as any).leakageComplaint, icon: AlertCircle, color: 'bg-orange-500', desc: 'Report gas leakage immediately' },
            { id: 'new', label: (t as any).newConn, icon: PlusCircle, color: 'bg-emerald-500', desc: 'Apply for a new gas connection' }
          ];
        case 'Public Transport':
          return [
            { id: 'pay', label: (t as any).busPassRecharge, icon: CreditCard, color: 'bg-purple-500', desc: 'Recharge your bus pass' },
            { id: 'track', label: (t as any).routePlanner, icon: Search, color: 'bg-sky-500', desc: 'Plan your journey' },
            { id: 'new', label: (t as any).metroCard, icon: PlusCircle, color: 'bg-emerald-500', desc: 'Apply for a new metro card' }
          ];
        case 'Waste Management':
          return [
            { id: 'complaint', label: (t as any).garbageComplaint, icon: MessageSquare, color: 'bg-teal-500', desc: 'Report missed garbage pickup' },
            { id: 'track', label: (t as any).trackReq, icon: Search, color: 'bg-sky-500', desc: 'Check status of your request' }
          ];
        case 'Street Light':
          return [
            { id: 'complaint', label: (t as any).streetlightComplaint, icon: AlertCircle, color: 'bg-yellow-500', desc: 'Report faulty street lights' },
            { id: 'track', label: (t as any).trackReq, icon: Search, color: 'bg-sky-500', desc: 'Check repair status' }
          ];
        case 'Birth/Death':
          return [
            { id: 'new', label: (t as any).newConn, icon: PlusCircle, color: 'bg-sky-500', desc: 'Apply for a new certificate' },
            { id: 'track', label: (t as any).appStatus, icon: Search, color: 'bg-indigo-500', desc: 'Check application status' }
          ];
        case 'Trade License':
          return [
            { id: 'new', label: (t as any).apply, icon: PlusCircle, color: 'bg-indigo-500', desc: 'Apply for a new trade license' },
            { id: 'renew', label: (t as any).renew, icon: RefreshCw, color: 'bg-orange-500', desc: 'Renew your existing license' },
            { id: 'track', label: (t as any).trackReq, icon: Search, color: 'bg-sky-500', desc: 'Track application status' }
          ];
        case 'Building Plan':
          return [
            { id: 'new', label: (t as any).apply, icon: PlusCircle, color: 'bg-slate-800', desc: 'Submit a new building plan' },
            { id: 'track', label: (t as any).trackReq, icon: Search, color: 'bg-sky-500', desc: 'Track approval status' }
          ];
        case 'Property Tax':
          return [
            { id: 'pay', label: (t as any).payBill, icon: CreditCard, color: 'bg-emerald-500', desc: 'Pay your annual property tax' },
            { id: 'track', label: (t as any).trackReq, icon: Search, color: 'bg-sky-500', desc: 'View payment history' }
          ];
        default:
          return [
            { id: 'pay', label: (t as any).payBill, icon: CreditCard, color: 'bg-gov-blue', desc: 'Pay your dues online' },
            { id: 'complaint', label: (t as any).lodgeComplaint, icon: MessageSquare, color: 'bg-red-500', desc: 'Report an issue' },
            { id: 'track', label: (t as any).trackReq, icon: Search, color: 'bg-sky-500', desc: 'Track your request' }
          ];
      }
    };

    return (
      <div className="flex-1 flex flex-col p-10 gap-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-5xl font-display font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{selectedService} {(t as any).services}</h2>
            <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).selectAction}</p>
          </div>
          <button onClick={() => {
            if (['Trade License', 'Birth/Death', 'Waste Management', 'Street Light', 'Building Plan', 'Property Tax'].includes(selectedService as string)) {
              setView('municipal');
            } else {
              setView('departments');
            }
          }} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'}`}>
            <ArrowLeft size={24} /> {t.back}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getActions().map((action) => (
            <ServiceCard 
              key={action.id}
              icon={action.icon}
              label={action.label}
              description={action.desc}
              color={action.color}
              isDarkMode={isDarkMode}
              onClick={() => {
                setSelectedAction(action.id);
                if (action.id === 'pay' || action.id === 'history') setView('consumer-id');
                else if (action.id === 'track') {
                  if (selectedService === 'Electricity') {
                    requireAuth(() => setView('track-electricity-grievance'));
                  } else {
                    setView('track');
                  }
                }
                else if (action.id === 'new' || action.id === 'renew') setView('auth');
                else if (action.id === 'complaint') {
                  if (selectedService === 'Electricity') {
                    setView('electricity-grievance');
                  } else {
                    setView('auth');
                  }
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderHistory = () => (
    <div className="flex-1 flex flex-col p-10 gap-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-5xl font-display font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{(t as any).consumptionHistory}</h2>
          <p className={`text-xl mt-2 font-medium transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Usage trends for <span className="text-gov-accent font-bold">{selectedService}</span></p>
        </div>
        <button onClick={() => setView('service-menu')} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'}`}>
          <ArrowLeft size={24} /> {t.back}
        </button>
      </div>

      <div className={`p-10 rounded-[3rem] border shadow-xl h-[600px] flex flex-col gap-8 transition-colors ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gov-accent/20 text-gov-accent' : 'bg-gov-blue/10 text-gov-blue'}`}>
              <Zap size={24} />
            </div>
            <div>
              <p className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).consumerAccount}</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{consumerId}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gov-accent"></div>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(t as any).usageUnits}</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
            <XAxis dataKey="name" stroke={isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: isDarkMode ? '#1E293B' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}
            />
            <Bar dataKey="transactions" fill={isDarkMode ? "#3B82F6" : "#001F3F"} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white overflow-hidden">
      <div className="p-10 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-accent/40">
            <LayoutDashboard size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-display font-black">{(t as any).adminCenter}</h2>
            <p className="text-slate-400 font-medium">{(t as any).adminSub}</p>
          </div>
        </div>
        <button onClick={() => setView('home')} className="bg-white/10 hover:bg-white/20 p-5 rounded-2xl transition-all"><X size={28} /></button>
      </div>
      
      <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
          {[
            { label: (t as any).totalRevenue, value: `₹${(adminData?.transactions || 0) * 1250}`, color: 'text-brand-success', icon: CreditCard },
            { label: (t as any).transactions, value: adminData?.transactions || 0, color: 'text-brand-accent', icon: Zap },
            { label: (t as any).applications, value: adminData?.applications || 0, color: 'text-indigo-400', icon: Building2 },
            { label: (t as any).pendingGrievances, value: adminData?.complaints || 0, color: 'text-brand-warning', icon: MessageSquare },
            { label: (t as any).systemHealth, value: '99.9%', color: 'text-emerald-400', icon: CheckCircle2 },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
                <p className={`text-4xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] h-[500px]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold">Service Utilization Trends</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-accent"></div>
                  <span className="text-sm text-slate-400">Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-warning"></div>
                  <span className="text-sm text-slate-400">Complaints</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="transactions" stroke="#3B82F6" strokeWidth={4} dot={{ r: 6, fill: '#3B82F6', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="complaints" stroke="#F59E0B" strokeWidth={4} dot={{ r: 6, fill: '#F59E0B', strokeWidth: 0 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Recent Live Activity</h3>
            <div className="flex flex-col gap-4">
              {adminData?.recent?.map((r: any) => (
                <div key={r.id} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{r.service} Payment</p>
                    <p className="text-xs text-slate-500 font-mono">{new Date(r.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <span className="font-black text-brand-success">₹{r.amount}</span>
                </div>
              ))}
              {(!adminData?.recent || adminData.recent.length === 0) && (
                <div className="text-center py-20 text-slate-500 italic">No recent activity</div>
              )}
            </div>
            <button className="mt-auto w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all">View Full Logs</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => {
    const handleDownload = () => {
      const content = `SUVIDHA OneTouch Receipt\nService: ${selectedService}\nID: ${consumerId}\nStatus: SUCCESS\nDate: ${new Date().toLocaleString()}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${selectedService.toLowerCase()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };

    const handlePrint = () => {
      window.print();
    };

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`p-20 rounded-[4rem] text-center flex flex-col items-center gap-10 max-w-3xl border-4 shadow-2xl transition-all ${isDarkMode ? 'bg-slate-900 border-emerald-500/20 shadow-emerald-900/10' : 'bg-white border-emerald-100 shadow-[0_40px_100px_-20px_rgba(16,185,129,0.15)]'}`}
        >
          <div className={`w-48 h-48 rounded-full flex items-center justify-center shadow-2xl relative transition-colors ${isDarkMode ? 'bg-emerald-900/20 text-emerald-400 shadow-emerald-900/20' : 'bg-emerald-50 text-emerald-500 shadow-emerald-500/10'}`}>
            <CheckCircle2 size={120} />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className={`absolute -top-2 -right-2 w-16 h-16 rounded-full flex items-center justify-center border-4 transition-colors ${isDarkMode ? 'bg-emerald-500 text-white border-slate-900' : 'bg-emerald-500 text-white border-white'}`}
            >
              <ShieldCheck size={32} />
            </motion.div>
          </div>
          <div>
            <h2 className={`text-6xl font-display font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{t.success}</h2>
            <p className={`text-2xl mt-6 font-medium leading-relaxed max-w-xl transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {(t as any).transactionFor} <span className="text-gov-accent font-bold">{selectedService}</span> {(t as any).hasBeenConfirmed}
            </p>
            
            {receiptDetails && (
              <div className={`mt-8 p-6 border-2 border-dashed rounded-3xl text-left transition-colors ${isDarkMode ? 'bg-gov-accent/10 border-gov-accent/20' : 'bg-gov-blue/5 border-gov-blue/20'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Transaction ID</p>
                    <p className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{receiptDetails.transactionId}</p>
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Receipt No.</p>
                    <p className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{receiptDetails.receiptNumber}</p>
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Amount Paid</p>
                    <p className={`text-lg font-black tracking-tight text-emerald-500`}>₹ {receiptDetails.amount?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Date & Time</p>
                    <p className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{new Date(receiptDetails.paymentTimestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {trackingId && !receiptDetails && (
              <div className={`mt-8 p-6 border-2 border-dashed rounded-3xl transition-colors ${isDarkMode ? 'bg-gov-accent/10 border-gov-accent/20' : 'bg-gov-blue/5 border-gov-blue/20'}`}>
                <p className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-gov-accent' : 'text-gov-blue/60'}`}>{(t as any).trackingId}</p>
                <p className={`text-4xl font-black mt-2 tracking-tighter ${isDarkMode ? 'text-white' : 'text-gov-blue'}`}>{trackingId}</p>
                <p className={`text-xs font-bold mt-2 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{(t as any).saveIdHint}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-6 w-full">
              <button 
                onClick={handleDownload}
                className={`flex-1 py-6 rounded-2xl text-xl font-black shadow-xl transition-all flex items-center justify-center gap-3 border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
              >
                <Upload size={24} className="rotate-180" /> {t.downloadReceipt}
              </button>
              <button 
                onClick={handlePrint}
                className={`flex-1 py-6 rounded-2xl text-xl font-black shadow-xl transition-all flex items-center justify-center gap-3 border-2 ${isDarkMode ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
              >
                <CreditCard size={24} /> {t.printReceipt}
              </button>
            </div>
            <button 
              onClick={() => { 
                localStorage.removeItem('token');
                setView('home'); 
                setConsumerId(''); 
                setOtp(''); 
                setTrackingId(''); 
                setBillDetails(null);
                setReceiptDetails(null);
              }}
              className={`w-full py-8 rounded-3xl text-3xl font-black shadow-2xl transition-all mt-4 ${isDarkMode ? 'bg-gov-accent text-white shadow-gov-accent/20 hover:bg-blue-600' : 'bg-gov-blue text-white shadow-gov-blue/40 hover:bg-slate-800'}`}
            >
              {t.home}
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={`kiosk-container select-none transition-colors duration-500 ${isDarkMode ? 'dark bg-slate-950' : 'bg-[#F0F2F5]'}`}>
      {view !== 'admin' && renderHeader()}
      
      {/* Auth Modal */}
      <MobileLogin 
        isOpen={isAuthModalOpen} 
        isDarkMode={isDarkMode}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingAction(null);
        }}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 flex flex-col relative"
        >
          {view === 'home' && renderHome()}
          {view === 'departments' && renderDepartments()}
          {view === 'bills' && renderBills()}
          {view === 'grievance' && renderGrievance()}
          {view === 'municipal' && renderMunicipal()}
          {view === 'health' && renderHealth()}
          {view === 'track' && renderTrack()}
          {view === 'consumer-id' && renderConsumerId()}
          {view === 'auth' && renderAuth()}
          {view === 'pay-bill' && renderPayBill()}
          {view === 'complaint' && renderComplaint()}
          {view === 'electricity-grievance' && renderElectricityGrievance()}
          {view === 'track-electricity-grievance' && renderTrackElectricityGrievance()}
          {view === 'new-connection' && renderNewConnection()}
          {view === 'service-menu' && renderServiceMenu()}
          {view === 'history' && renderHistory()}
          {view === 'admin' && renderAdmin()}
          {view === 'success' && renderSuccess()}

          {/* Contextual Help Icon on each flow */}
          {view !== 'home' && view !== 'admin' && view !== 'success' && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVoiceOpen(true)}
              className="fixed bottom-28 right-10 w-20 h-20 bg-gov-blue text-white rounded-full shadow-2xl flex flex-col items-center justify-center z-30 border-4 border-white"
            >
              <HelpCircle size={32} />
              <span className="text-[10px] font-black uppercase mt-1">{t.help}</span>
            </motion.button>
          )}

          {/* Idle Hint Tooltip */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="fixed bottom-52 right-10 max-w-xs bg-white p-6 rounded-3xl shadow-2xl border-2 border-gov-blue z-40 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-gov-blue/10 rounded-xl flex items-center justify-center text-gov-blue shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">{t.hint}</p>
                  <button onClick={() => setIsVoiceOpen(true)} className="text-xs font-black text-gov-blue uppercase mt-2 hover:underline">{(t as any).openAssistant}</button>
                </div>
                <button onClick={() => setShowHint(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </AnimatePresence>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {isVoiceOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-32 right-10 w-[450px] max-h-[600px] bg-slate-900/95 backdrop-blur-2xl z-[100] flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gov-blue/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Top Bar */}
            <div className="px-8 py-6 flex justify-between items-center relative z-10 border-b border-white/5 bg-slate-900/40">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gov-blue rounded-lg flex items-center justify-center shadow-lg shadow-gov-blue/20">
                  <Mic size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white tracking-tight uppercase">SUVIDHA <span className="text-gov-accent">AI</span></h2>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsVoiceOpen(false)} 
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col p-8 relative z-10 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-6">
                
                {/* Visualizer Section */}
                <div className="flex items-center justify-center h-12 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isListening ? {
                        height: [8, Math.random() * 32 + 8, 8],
                      } : { height: 4 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.4 + Math.random() * 0.4,
                        ease: "easeInOut"
                      }}
                      className={`w-1.5 rounded-full ${isListening ? 'bg-gov-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  {voiceResponse ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl"
                    >
                      <div className="text-white/90 text-sm leading-relaxed font-medium markdown-body">
                        <Markdown>{voiceResponse}</Markdown>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gov-accent font-black text-[10px] uppercase tracking-[0.4em] mb-2">{(t as any).readyToCommunicate}</p>
                      <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                        {isListening ? (t as any).listening : t.voicePrompt}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Suggested Queries */}
                {!voiceResponse && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(view === 'consumer-id' ? ['Where is my consumer ID?', 'Help with electricity bill'] :
                      view === 'complaint' ? ['How to describe grievance?', 'Submit complaint'] :
                      ['Pay my electricity bill', 'Track my grievance status', 'Apply for birth certificate']).map(q => (
                      <button 
                        key={q} 
                        onClick={() => { setVoiceQuery(q); handleVoiceAssist(q); }}
                        className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white/60 text-xs font-bold hover:bg-gov-blue hover:text-white hover:border-gov-blue transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="p-6 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 relative z-10">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={voiceQuery}
                    readOnly
                    onFocus={() => openKeyboard(voiceQuery, setVoiceQuery)}
                    placeholder={(t as any).typeRequest}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-gov-blue/50 transition-all"
                  />
                  <button 
                    onClick={() => handleVoiceAssist()}
                    disabled={!voiceQuery || isListening}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${voiceQuery && !isListening ? 'bg-gov-blue text-white' : 'text-white/20'}`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                
                <button 
                  onClick={() => setIsListening(!isListening)}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-xl ${isListening ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/20' : 'bg-gov-blue text-white hover:bg-blue-600 shadow-gov-blue/20'}`}
                >
                  <Mic size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      {view !== 'admin' && (
        <footer className={`px-10 py-4 border-t flex justify-between items-center transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{t.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className={isDarkMode ? 'text-slate-600' : 'text-slate-400'} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{t.secure}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>{t.timeout}</span>
              <span className={`text-sm font-black font-mono ${isDarkMode ? 'text-gov-accent' : 'text-gov-blue'}`}>04:42</span>
            </div>
            <div className="flex items-center gap-4">
              <Headphones size={18} className={`${isDarkMode ? 'text-slate-500 hover:text-gov-accent' : 'text-slate-400 hover:text-gov-blue'} cursor-pointer`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isDarkMode ? 'bg-white/5 text-slate-500 hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                ?
              </div>
            </div>
          </div>
        </footer>
      )}
      {/* Virtual Keyboard */}
      <AnimatePresence>
        {isKeyboardOpen && (
          <VirtualKeyboard 
            onInput={handleKeyboardInput}
            onDelete={handleKeyboardDelete}
            onClose={() => setIsKeyboardOpen(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
