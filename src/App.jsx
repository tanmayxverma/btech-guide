import { useState, useMemo } from "react";

const COLLEGES = [
  // ===== TIER 1: OLD IITs (1-15) =====
  { id:1,  name:"IIT Bombay",              city:"Mumbai",          state:"Maharashtra",    tier:"IIT",          exam:"JEE Advanced", fee:"~₹9-10L total",    avg22:21.5, avg23:21.82,avg24:23.5, median24:17.92,top24:367,topDom24:168,placed24:74.5, cse_avg:50,  cse_top:220, mech_avg:18, ece_avg:30, civil_avg:14, cutoff:"CSE ~1-50 AIR (Gen)" },
  { id:2,  name:"IIT Delhi",               city:"New Delhi",       state:"Delhi",          tier:"IIT",          exam:"JEE Advanced", fee:"~₹8-10L total",    avg22:20.5, avg23:21.9, avg24:22,   median24:19.08,top24:250,topDom24:100,placed24:90,   cse_avg:45,  cse_top:200, mech_avg:17, ece_avg:28, civil_avg:13, cutoff:"CSE ~50-100 AIR (Gen)" },
  { id:3,  name:"IIT Madras",              city:"Chennai",         state:"Tamil Nadu",     tier:"IIT",          exam:"JEE Advanced", fee:"~₹8-10L total",    avg22:19,   avg23:20,   avg24:22,   median24:19.6, top24:131,topDom24:131,placed24:80,   cse_avg:52,  cse_top:131, mech_avg:15, ece_avg:27, civil_avg:12, cutoff:"CSE ~100-150 AIR (Gen)" },
  { id:4,  name:"IIT Kanpur",              city:"Kanpur",          state:"Uttar Pradesh",  tier:"IIT",          exam:"JEE Advanced", fee:"~₹8-10L total",    avg22:20,   avg23:23,   avg24:26.27,median24:18,   top24:550,topDom24:150,placed24:82,   cse_avg:55,  cse_top:200, mech_avg:20, ece_avg:32, civil_avg:14, cutoff:"CSE ~150-250 AIR (Gen)" },
  { id:5,  name:"IIT Kharagpur",           city:"Kharagpur",       state:"West Bengal",    tier:"IIT",          exam:"JEE Advanced", fee:"~₹8-10L total",    avg22:17,   avg23:18.5, avg24:19,   median24:13.5, top24:260,topDom24:130,placed24:80,   cse_avg:48,  cse_top:260, mech_avg:16, ece_avg:25, civil_avg:12, cutoff:"CSE ~200-350 AIR (Gen)" },
  { id:6,  name:"IIT Roorkee",             city:"Roorkee",         state:"Uttarakhand",    tier:"IIT",          exam:"JEE Advanced", fee:"~₹8-10L total",    avg22:18,   avg23:19.5, avg24:21,   median24:16,   top24:200,topDom24:90, placed24:78,   cse_avg:42,  cse_top:120, mech_avg:15, ece_avg:22, civil_avg:13, cutoff:"CSE ~300-500 AIR (Gen)" },
  { id:7,  name:"IIT Guwahati",            city:"Guwahati",        state:"Assam",          tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:22,   avg23:24,   avg24:25.75,median24:21.6, top24:120,topDom24:90, placed24:83,   cse_avg:40,  cse_top:120, mech_avg:18, ece_avg:25, civil_avg:12, cutoff:"CSE ~500-800 AIR (Gen)" },
  { id:8,  name:"IIT Hyderabad",           city:"Hyderabad",       state:"Telangana",      tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:16,   avg23:18,   avg24:19,   median24:14,   top24:90, topDom24:90, placed24:74.5, cse_avg:35,  cse_top:90,  mech_avg:14, ece_avg:20, civil_avg:10, cutoff:"CSE ~800-1200 AIR (Gen)" },
  { id:9,  name:"IIT BHU (Varanasi)",      city:"Varanasi",        state:"Uttar Pradesh",  tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:14,   avg23:15.5, avg24:17,   median24:13,   top24:100,topDom24:80, placed24:75,   cse_avg:32,  cse_top:100, mech_avg:13, ece_avg:20, civil_avg:10, cutoff:"CSE ~1200-1800 AIR (Gen)" },
  { id:10, name:"IIT Indore",              city:"Indore",          state:"Madhya Pradesh", tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:13,   avg23:15,   avg24:16.5, median24:13,   top24:85, topDom24:70, placed24:72,   cse_avg:30,  cse_top:85,  mech_avg:12, ece_avg:18, civil_avg:9,  cutoff:"CSE ~1800-2500 AIR (Gen)" },
  { id:11, name:"IIT Bhubaneswar",         city:"Bhubaneswar",     state:"Odisha",         tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:14,   avg23:16,   avg24:17.16,median24:13,   top24:64, topDom24:52.6,placed24:84.6, cse_avg:28,  cse_top:64,  mech_avg:12, ece_avg:17, civil_avg:9,  cutoff:"CSE ~2500-3500 AIR (Gen)" },
  { id:12, name:"IIT Gandhinagar",         city:"Gandhinagar",     state:"Gujarat",        tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:14,   avg23:15,   avg24:16,   median24:12,   top24:75, topDom24:60, placed24:70,   cse_avg:30,  cse_top:75,  mech_avg:12, ece_avg:17, civil_avg:9,  cutoff:"CSE ~3000-4000 AIR (Gen)" },
  { id:13, name:"IIT Jodhpur",             city:"Jodhpur",         state:"Rajasthan",      tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:12,   avg23:14,   avg24:15,   median24:11,   top24:60, topDom24:55, placed24:68,   cse_avg:28,  cse_top:60,  mech_avg:11, ece_avg:16, civil_avg:8,  cutoff:"CSE ~3500-5000 AIR (Gen)" },
  { id:14, name:"IIT Mandi",               city:"Mandi",           state:"Himachal Pradesh",tier:"IIT",         exam:"JEE Advanced", fee:"~₹9L total",       avg22:11,   avg23:13,   avg24:14.5, median24:10,   top24:55, topDom24:50, placed24:65,   cse_avg:26,  cse_top:55,  mech_avg:10, ece_avg:15, civil_avg:8,  cutoff:"CSE ~4500-6000 AIR (Gen)" },
  { id:15, name:"IIT Patna",               city:"Patna",           state:"Bihar",          tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:11,   avg23:13,   avg24:14,   median24:10,   top24:50, topDom24:45, placed24:65,   cse_avg:25,  cse_top:50,  mech_avg:10, ece_avg:14, civil_avg:8,  cutoff:"CSE ~5000-7000 AIR (Gen)" },

  // ===== TIER 1: TOP NITs (16-32) =====
  { id:16, name:"NIT Trichy",              city:"Tiruchirappalli", state:"Tamil Nadu",     tier:"NIT",          exam:"JEE Main",     fee:"~₹5-6L total",    avg22:19,   avg23:21,   avg24:22,   median24:14.35,top24:64, topDom24:64, placed24:88.9, cse_avg:27.17,cse_top:64, mech_avg:9,  ece_avg:21.74,civil_avg:7, cutoff:"CSE ~3K-7K (Gen)" },
  { id:17, name:"NIT Warangal",            city:"Warangal",        state:"Telangana",      tier:"NIT",          exam:"JEE Main",     fee:"~₹5-6L total",    avg22:13,   avg23:14.5, avg24:15.6, median24:12.5, top24:88, topDom24:88, placed24:76,   cse_avg:30.8, cse_top:88, mech_avg:8,  ece_avg:18,   civil_avg:6, cutoff:"CSE ~5K-10K (Gen)" },
  { id:18, name:"NIT Surathkal (NITK)",    city:"Mangaluru",       state:"Karnataka",      tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:18,   avg23:20,   avg24:21.91,median24:15,   top24:58, topDom24:55, placed24:100,  cse_avg:27.68,cse_top:55, mech_avg:12.57,ece_avg:19, civil_avg:7, cutoff:"CSE ~7K-12K (Gen)" },
  { id:19, name:"NIT Calicut",             city:"Kozhikode",       state:"Kerala",         tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:18,   avg23:20,   avg24:22.03,median24:13,   top24:47, topDom24:47, placed24:100,  cse_avg:25,  cse_top:47, mech_avg:10, ece_avg:18,   civil_avg:7, cutoff:"CSE ~8K-14K (Gen)" },
  { id:20, name:"NIT Rourkela",            city:"Rourkela",        state:"Odisha",         tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:11,   avg23:12.5, avg24:13.43,median24:11,   top24:120,topDom24:120,placed24:100,  cse_avg:22,  cse_top:120,mech_avg:9,  ece_avg:16,   civil_avg:7, cutoff:"CSE ~10K-16K (Gen)" },
  { id:21, name:"MNIT Jaipur",             city:"Jaipur",          state:"Rajasthan",      tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:17,   avg23:19,   avg24:20.96,median24:14,   top24:57.75,topDom24:57.75,placed24:83.9,cse_avg:24,  cse_top:57, mech_avg:10, ece_avg:17,   civil_avg:7, cutoff:"CSE ~12K-18K (Gen)" },
  { id:22, name:"NIT Delhi",               city:"New Delhi",       state:"Delhi",          tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:14,   avg23:16,   avg24:17.72,median24:13,   top24:82, topDom24:82, placed24:90,   cse_avg:22,  cse_top:82, mech_avg:9,  ece_avg:16,   civil_avg:7, cutoff:"CSE ~15K-22K (Gen)" },
  { id:23, name:"MANIT Bhopal",            city:"Bhopal",          state:"Madhya Pradesh", tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:16,   avg23:18,   avg24:20.4, median24:12,   top24:64, topDom24:64, placed24:66,   cse_avg:22,  cse_top:64, mech_avg:9,  ece_avg:15,   civil_avg:7, cutoff:"CSE ~18K-26K (Gen)" },
  { id:24, name:"NIT Silchar",             city:"Silchar",         state:"Assam",          tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:10,   avg23:12,   avg24:13,   median24:10,   top24:42, topDom24:42, placed24:80,   cse_avg:18,  cse_top:42, mech_avg:8,  ece_avg:13,   civil_avg:6, cutoff:"CSE ~22K-32K (Gen)" },
  { id:25, name:"NIT Hamirpur",            city:"Hamirpur",        state:"Himachal Pradesh",tier:"NIT",         exam:"JEE Main",     fee:"~₹5L total",      avg22:11,   avg23:13,   avg24:14,   median24:10,   top24:112,topDom24:112,placed24:80,   cse_avg:20,  cse_top:112,mech_avg:8,  ece_avg:14,   civil_avg:6, cutoff:"CSE ~25K-38K (Gen)" },
  { id:26, name:"NIT Durgapur",            city:"Durgapur",        state:"West Bengal",    tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:9,    avg23:10,   avg24:11,   median24:9,    top24:24, topDom24:24, placed24:80,   cse_avg:16,  cse_top:24, mech_avg:7,  ece_avg:12,   civil_avg:6, cutoff:"CSE ~28K-40K (Gen)" },
  { id:27, name:"SVNIT Surat",             city:"Surat",           state:"Gujarat",        tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:10,   avg23:12,   avg24:13,   median24:10,   top24:45, topDom24:45, placed24:75,   cse_avg:18,  cse_top:45, mech_avg:8,  ece_avg:14,   civil_avg:6, cutoff:"CSE ~26K-38K (Gen)" },
  { id:28, name:"MNNIT Allahabad",         city:"Prayagraj",       state:"Uttar Pradesh",  tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:10,   avg23:12,   avg24:13.5, median24:10,   top24:40, topDom24:40, placed24:78,   cse_avg:18,  cse_top:40, mech_avg:8,  ece_avg:13,   civil_avg:6, cutoff:"CSE ~27K-40K (Gen)" },
  { id:29, name:"NIT Kurukshetra",         city:"Kurukshetra",     state:"Haryana",        tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:9,    avg23:11,   avg24:12,   median24:9,    top24:38, topDom24:38, placed24:75,   cse_avg:17,  cse_top:38, mech_avg:7,  ece_avg:13,   civil_avg:6, cutoff:"CSE ~28K-42K (Gen)" },
  { id:30, name:"NIT Raipur",              city:"Raipur",          state:"Chhattisgarh",   tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:9,    avg23:11,   avg24:12,   median24:8,    top24:55, topDom24:55, placed24:90,   cse_avg:16,  cse_top:55, mech_avg:7,  ece_avg:12,   civil_avg:5, cutoff:"CSE ~32K-48K (Gen)" },
  { id:31, name:"NIT Patna",               city:"Patna",           state:"Bihar",          tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:8,    avg23:9.5,  avg24:9.9,  median24:8,    top24:41.37,topDom24:41,placed24:90,   cse_avg:14,  cse_top:41, mech_avg:7,  ece_avg:11,   civil_avg:5, cutoff:"CSE ~35K-52K (Gen)" },
  { id:32, name:"NIT Jalandhar",           city:"Jalandhar",       state:"Punjab",         tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:9,    avg23:10.5, avg24:11.5, median24:9,    top24:40, topDom24:40, placed24:75,   cse_avg:16,  cse_top:40, mech_avg:7,  ece_avg:12,   civil_avg:6, cutoff:"CSE ~30K-45K (Gen)" },

  // ===== IIITs TIER 1 (33-38) =====
  { id:33, name:"IIIT Hyderabad",          city:"Hyderabad",       state:"Telangana",      tier:"IIIT",         exam:"UGEE/JEE Adv", fee:"~₹9-12L total",   avg22:18,   avg23:22,   avg24:24,   median24:18,   top24:90, topDom24:90, placed24:85,   cse_avg:35,  cse_top:90, mech_avg:null,ece_avg:22,  civil_avg:null,cutoff:"UGEE rank <500" },
  { id:34, name:"IIIT Delhi",              city:"New Delhi",       state:"Delhi",          tier:"IIIT",         exam:"JEE Main",     fee:"~₹13-15L total",  avg22:16,   avg23:19,   avg24:21,   median24:16,   top24:70, topDom24:70, placed24:82,   cse_avg:28,  cse_top:70, mech_avg:null,ece_avg:20,  civil_avg:null,cutoff:"CSE ~5K-12K (Gen)" },
  { id:35, name:"IIIT Allahabad",          city:"Prayagraj",       state:"Uttar Pradesh",  tier:"IIIT",         exam:"JEE Main",     fee:"~₹7-8L total",    avg22:13,   avg23:15,   avg24:17,   median24:13,   top24:60, topDom24:60, placed24:80,   cse_avg:24,  cse_top:60, mech_avg:null,ece_avg:18,  civil_avg:null,cutoff:"CSE ~10K-18K (Gen)" },
  { id:36, name:"ABV-IIITM Gwalior",       city:"Gwalior",         state:"Madhya Pradesh", tier:"IIIT",         exam:"JEE Main",     fee:"~₹6-7L total",    avg22:12,   avg23:14,   avg24:15.5, median24:12,   top24:55, topDom24:55, placed24:78,   cse_avg:22,  cse_top:55, mech_avg:null,ece_avg:16,  civil_avg:null,cutoff:"CSE ~12K-20K (Gen)" },
  { id:37, name:"IIIT Bangalore (IIITB)",  city:"Bengaluru",       state:"Karnataka",      tier:"IIIT",         exam:"Own Entrance",fee:"~₹14-16L total",   avg22:17,   avg23:19,   avg24:20,   median24:16,   top24:65, topDom24:65, placed24:80,   cse_avg:26,  cse_top:65, mech_avg:null,ece_avg:19,  civil_avg:null,cutoff:"Own entrance + merit" },
  { id:38, name:"IIITDM Jabalpur",         city:"Jabalpur",        state:"Madhya Pradesh", tier:"IIIT",         exam:"JEE Main",     fee:"~₹6L total",      avg22:10,   avg23:12,   avg24:13.5, median24:10,   top24:45, topDom24:45, placed24:72,   cse_avg:20,  cse_top:45, mech_avg:9,  ece_avg:15,  civil_avg:null,cutoff:"CSE ~18K-28K (Gen)" },

  // ===== TOP PRIVATE (39-50) =====
  { id:39, name:"BITS Pilani",             city:"Pilani",          state:"Rajasthan",      tier:"Private",      exam:"BITSAT",       fee:"~₹20-22L total",  avg22:14,   avg23:16,   avg24:17,   median24:13,   top24:120,topDom24:80, placed24:62.57,cse_avg:28,  cse_top:120,mech_avg:14, ece_avg:22,   civil_avg:null,cutoff:"BITSAT ≥350 for CSE" },
  { id:40, name:"BITS Goa",                city:"Goa",             state:"Goa",            tier:"Private",      exam:"BITSAT",       fee:"~₹20-22L total",  avg22:13,   avg23:15,   avg24:16,   median24:12,   top24:90, topDom24:75, placed24:60,   cse_avg:26,  cse_top:90, mech_avg:13, ece_avg:20,   civil_avg:null,cutoff:"BITSAT ≥330 for CSE" },
  { id:41, name:"BITS Hyderabad",          city:"Hyderabad",       state:"Telangana",      tier:"Private",      exam:"BITSAT",       fee:"~₹20-22L total",  avg22:12,   avg23:14,   avg24:15,   median24:11,   top24:80, topDom24:70, placed24:58,   cse_avg:24,  cse_top:80, mech_avg:12, ece_avg:18,   civil_avg:null,cutoff:"BITSAT ≥310 for CSE" },
  { id:42, name:"VIT Vellore",             city:"Vellore",         state:"Tamil Nadu",     tier:"Private",      exam:"VITEEE",       fee:"~₹8-10L total",   avg22:8.5,  avg23:9.5,  avg24:9.9,  median24:7.5,  top24:102,topDom24:80, placed24:85,   cse_avg:14,  cse_top:102,mech_avg:5,  ece_avg:9,    civil_avg:4, cutoff:"VITEEE rank <5000" },
  { id:43, name:"Thapar Institute Patiala",city:"Patiala",         state:"Punjab",         tier:"Private",      exam:"JEE Main",     fee:"~₹14-16L total",  avg22:10,   avg23:12,   avg24:13.5, median24:10,   top24:47, topDom24:47, placed24:80,   cse_avg:18,  cse_top:47, mech_avg:8,  ece_avg:14,   civil_avg:null,cutoff:"CSE ~30K-55K (Gen)" },
  { id:44, name:"SRM Institute Chennai",   city:"Kattankulathur",  state:"Tamil Nadu",     tier:"Private",      exam:"SRMJEEE",      fee:"~₹8-12L total",   avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:40, topDom24:40, placed24:80,   cse_avg:10,  cse_top:40, mech_avg:4,  ece_avg:7,    civil_avg:3, cutoff:"SRMJEEE rank <10K" },
  { id:45, name:"Manipal Inst. of Tech",   city:"Manipal",         state:"Karnataka",      tier:"Private",      exam:"MET/JEE Main", fee:"~₹14-16L total",  avg22:7.5,  avg23:8.5,  avg24:9,    median24:7,    top24:50, topDom24:50, placed24:78,   cse_avg:13,  cse_top:50, mech_avg:5,  ece_avg:9,    civil_avg:4, cutoff:"MET rank <15K" },
  { id:46, name:"RVCE Bangalore",          city:"Bengaluru",       state:"Karnataka",      tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹10-12L total",  avg22:8,    avg23:9,    avg24:10,   median24:7.5,  top24:60, topDom24:60, placed24:82,   cse_avg:15,  cse_top:60, mech_avg:6,  ece_avg:10,   civil_avg:5, cutoff:"KCET <5000 / COMEDK <3000" },
  { id:47, name:"PSG College of Technology",city:"Coimbatore",     state:"Tamil Nadu",     tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:42, topDom24:42, placed24:85,   cse_avg:13,  cse_top:42, mech_avg:6,  ece_avg:10,   civil_avg:5, cutoff:"TNEA state merit cutoff" },
  { id:48, name:"Amrita Vishwa Vidyapeetham",city:"Coimbatore",    state:"Tamil Nadu",     tier:"Private",      exam:"AEEE",         fee:"~₹8-12L total",   avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:38, topDom24:38, placed24:80,   cse_avg:13,  cse_top:38, mech_avg:5,  ece_avg:9,    civil_avg:4, cutoff:"AEEE rank <15K" },
  { id:49, name:"Shiv Nadar University",   city:"Greater Noida",   state:"Uttar Pradesh",  tier:"Private",      exam:"SNUSAT/JEE",   fee:"~₹18-22L total",  avg22:11,   avg23:13,   avg24:14.5, median24:11,   top24:55, topDom24:55, placed24:78,   cse_avg:20,  cse_top:55, mech_avg:9,  ece_avg:15,   civil_avg:null,cutoff:"SNUSAT/JEE Main merit" },
  { id:50, name:"VIT AP",                  city:"Amaravati",       state:"Andhra Pradesh", tier:"Private",      exam:"VITEEE",       fee:"~₹8-10L total",   avg22:7,    avg23:8.5,  avg24:9.5,  median24:7,    top24:40, topDom24:40, placed24:78,   cse_avg:12,  cse_top:40, mech_avg:5,  ece_avg:8,    civil_avg:null,cutoff:"VITEEE rank <8000" },

  // ===== STATE GOVT + SEMI-GOVT (51-60) =====
  { id:51, name:"DTU Delhi",               city:"New Delhi",       state:"Delhi",          tier:"State Govt",   exam:"JEE Main",     fee:"~₹4-6L total",    avg22:13,   avg23:15,   avg24:16,   median24:12,   top24:50, topDom24:50, placed24:85,   cse_avg:22,  cse_top:50, mech_avg:9,  ece_avg:16,   civil_avg:6, cutoff:"CSE ~8K-15K (Delhi quota)" },
  { id:52, name:"NSUT (Netaji Subhas)",    city:"New Delhi",       state:"Delhi",          tier:"State Govt",   exam:"JEE Main",     fee:"~₹3-5L total",    avg22:11,   avg23:13,   avg24:14.5, median24:11,   top24:45, topDom24:45, placed24:82,   cse_avg:19,  cse_top:45, mech_avg:8,  ece_avg:14,   civil_avg:6, cutoff:"CSE ~12K-20K (Delhi quota)" },
  { id:53, name:"Jadavpur University",     city:"Kolkata",         state:"West Bengal",    tier:"State Govt",   exam:"WBJEE/State",  fee:"~₹0.5-1L total",  avg22:9,    avg23:11,   avg24:12,   median24:9,    top24:40, topDom24:40, placed24:75,   cse_avg:16,  cse_top:40, mech_avg:7,  ece_avg:12,   civil_avg:6, cutoff:"WBJEE rank <2000" },
  { id:54, name:"COEP Pune",               city:"Pune",            state:"Maharashtra",    tier:"State Govt",   exam:"MHT-CET",      fee:"~₹2-4L total",    avg22:9,    avg23:11,   avg24:12,   median24:9,    top24:42, topDom24:42, placed24:78,   cse_avg:17,  cse_top:42, mech_avg:8,  ece_avg:13,   civil_avg:6, cutoff:"MHT-CET 98+ %ile" },
  { id:55, name:"BMS College of Engineering",city:"Bengaluru",     state:"Karnataka",      tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹10-12L total",  avg22:7.5,  avg23:9,    avg24:10,   median24:7.5,  top24:40, topDom24:40, placed24:80,   cse_avg:14,  cse_top:40, mech_avg:6,  ece_avg:10,   civil_avg:5, cutoff:"KCET <6000 / COMEDK <4000" },
  { id:56, name:"PES University",          city:"Bengaluru",       state:"Karnataka",      tier:"Private",      exam:"PESSAT/COMEDK",fee:"~₹12-15L total",  avg22:8,    avg23:9.5,  avg24:10.5, median24:8,    top24:45, topDom24:45, placed24:80,   cse_avg:15,  cse_top:45, mech_avg:6,  ece_avg:10,   civil_avg:null,cutoff:"COMEDK <5000" },
  { id:57, name:"MS Ramaiah Inst. of Tech",city:"Bengaluru",       state:"Karnataka",      tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹10-13L total",  avg22:7,    avg23:8.5,  avg24:9.5,  median24:7,    top24:38, topDom24:38, placed24:78,   cse_avg:13,  cse_top:38, mech_avg:6,  ece_avg:9,    civil_avg:5, cutoff:"COMEDK <6000" },
  { id:58, name:"Nirma University",        city:"Ahmedabad",       state:"Gujarat",        tier:"Private",      exam:"JEE Main",     fee:"~₹12-15L total",  avg22:8,    avg23:9.5,  avg24:11,   median24:8,    top24:40, topDom24:40, placed24:78,   cse_avg:15,  cse_top:40, mech_avg:6,  ece_avg:11,   civil_avg:5, cutoff:"JEE Main 80+ %ile" },
  { id:59, name:"LNMIIT Jaipur",           city:"Jaipur",          state:"Rajasthan",      tier:"Private",      exam:"JEE Main",     fee:"~₹10-12L total",  avg22:9,    avg23:11,   avg24:13,   median24:10,   top24:40, topDom24:40, placed24:80,   cse_avg:18,  cse_top:40, mech_avg:null,ece_avg:15,  civil_avg:null,cutoff:"JEE Main ~75K-120K" },
  { id:60, name:"Symbiosis Institute of Tech",city:"Pune",         state:"Maharashtra",    tier:"Private",      exam:"SET/JEE Main", fee:"~₹14-18L total",  avg22:7,    avg23:8.5,  avg24:9.5,  median24:7,    top24:35, topDom24:35, placed24:75,   cse_avg:13,  cse_top:35, mech_avg:6,  ece_avg:10,   civil_avg:null,cutoff:"SET + JEE Main" },

  // ===== NEW IITs (61-65) =====
  { id:61, name:"IIT Tirupati",            city:"Tirupati",        state:"Andhra Pradesh", tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:10,   avg23:12,   avg24:13.5, median24:10,   top24:48, topDom24:45, placed24:60,   cse_avg:24,  cse_top:48, mech_avg:9,  ece_avg:15,   civil_avg:7, cutoff:"CSE ~4000-6000 AIR (Gen)" },
  { id:62, name:"IIT Dharwad",             city:"Dharwad",         state:"Karnataka",      tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:9,    avg23:11,   avg24:12.5, median24:9,    top24:42, topDom24:40, placed24:58,   cse_avg:22,  cse_top:42, mech_avg:9,  ece_avg:14,   civil_avg:7, cutoff:"CSE ~5000-7000 AIR (Gen)" },
  { id:63, name:"IIT Palakkad",            city:"Palakkad",        state:"Kerala",         tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:9,    avg23:10.5, avg24:12,   median24:9,    top24:40, topDom24:38, placed24:57,   cse_avg:21,  cse_top:40, mech_avg:8,  ece_avg:14,   civil_avg:7, cutoff:"CSE ~5000-7500 AIR (Gen)" },
  { id:64, name:"NIT Meghalaya",           city:"Shillong",        state:"Meghalaya",      tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:7,    avg23:9,    avg24:10,   median24:7,    top24:30, topDom24:30, placed24:70,   cse_avg:14,  cse_top:30, mech_avg:6,  ece_avg:10,   civil_avg:5, cutoff:"CSE ~50K-75K (Gen)" },
  { id:65, name:"NIT Goa",                 city:"Farmagudi",       state:"Goa",            tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:9,    avg23:10.5, avg24:11,   median24:8,    top24:35, topDom24:35, placed24:72,   cse_avg:16,  cse_top:35, mech_avg:7,  ece_avg:12,   civil_avg:5, cutoff:"CSE ~38K-56K (Gen)" },

  // ===== MORE IIIT & OTHERS (66-100) =====
  { id:66, name:"IIITDM Kancheepuram",     city:"Chennai",         state:"Tamil Nadu",     tier:"IIIT",         exam:"JEE Main",     fee:"~₹6L total",      avg22:9,    avg23:11,   avg24:12,   median24:9,    top24:40, topDom24:40, placed24:72,   cse_avg:18,  cse_top:40, mech_avg:8,  ece_avg:13,  civil_avg:null,cutoff:"CSE ~20K-30K (Gen)" },
  { id:67, name:"Amity University Noida",  city:"Noida",           state:"Uttar Pradesh",  tier:"Private",      exam:"Amity JEE",    fee:"~₹8-12L total",   avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:35, topDom24:35, placed24:75,   cse_avg:10,  cse_top:35, mech_avg:4,  ece_avg:8,    civil_avg:null,cutoff:"Amity JEE / Direct" },
  { id:68, name:"Chandigarh University",   city:"Mohali",          state:"Punjab",         tier:"Private",      exam:"CUCET/JEE",    fee:"~₹8-12L total",   avg22:5.5,  avg23:6.5,  avg24:7.5,  median24:5.5,  top24:45, topDom24:45, placed24:85,   cse_avg:11,  cse_top:45, mech_avg:4,  ece_avg:8,    civil_avg:null,cutoff:"CUCET / Direct admission" },
  { id:69, name:"KIIT Bhubaneswar",        city:"Bhubaneswar",     state:"Odisha",         tier:"Private",      exam:"KIITEE",       fee:"~₹9-12L total",   avg22:6,    avg23:7,    avg24:8,    median24:6.5,  top24:42, topDom24:42, placed24:78,   cse_avg:12,  cse_top:42, mech_avg:5,  ece_avg:9,    civil_avg:null,cutoff:"KIITEE rank <10K" },
  { id:70, name:"LPU Phagwara",            city:"Phagwara",        state:"Punjab",         tier:"Private",      exam:"LPUNEST/JEE",  fee:"~₹6-9L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:40, topDom24:40, placed24:80,   cse_avg:9,   cse_top:40, mech_avg:4,  ece_avg:7,    civil_avg:null,cutoff:"LPUNEST / Merit" },
  { id:71, name:"VIT Chennai",             city:"Chennai",         state:"Tamil Nadu",     tier:"Private",      exam:"VITEEE",       fee:"~₹8-10L total",   avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:40, topDom24:40, placed24:80,   cse_avg:12,  cse_top:40, mech_avg:5,  ece_avg:8,    civil_avg:null,cutoff:"VITEEE rank <8000" },
  { id:72, name:"Sathyabama Institute",    city:"Chennai",         state:"Tamil Nadu",     tier:"Private",      exam:"TNEA/Direct",  fee:"~₹5-7L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:28, topDom24:28, placed24:72,   cse_avg:8,   cse_top:28, mech_avg:4,  ece_avg:6,    civil_avg:null,cutoff:"TNEA / Direct" },
  { id:73, name:"Bharati Vidyapeeth Pune", city:"Pune",            state:"Maharashtra",    tier:"Private",      exam:"MHT-CET",      fee:"~₹8-10L total",   avg22:6,    avg23:7,    avg24:8,    median24:6,    top24:30, topDom24:30, placed24:72,   cse_avg:11,  cse_top:30, mech_avg:5,  ece_avg:8,    civil_avg:null,cutoff:"MHT-CET 90+ %ile" },
  { id:74, name:"Anna University (CEG)",   city:"Chennai",         state:"Tamil Nadu",     tier:"State Govt",   exam:"TNEA",         fee:"~₹0.5-1.5L total",avg22:8,    avg23:9.5,  avg24:11,   median24:8,    top24:38, topDom24:38, placed24:78,   cse_avg:14,  cse_top:38, mech_avg:6,  ece_avg:11,   civil_avg:5, cutoff:"TNEA state merit cutoff" },
  { id:75, name:"ICT Mumbai",              city:"Mumbai",          state:"Maharashtra",    tier:"State Govt",   exam:"MHT-CET",      fee:"~₹2-4L total",    avg22:8,    avg23:9,    avg24:10,   median24:8,    top24:35, topDom24:35, placed24:78,   cse_avg:14,  cse_top:35, mech_avg:6,  ece_avg:10,   civil_avg:null,cutoff:"MHT-CET 97+ %ile" },
  { id:76, name:"PICT Pune",               city:"Pune",            state:"Maharashtra",    tier:"Private",      exam:"MHT-CET",      fee:"~₹6-8L total",    avg22:7,    avg23:8.5,  avg24:9.5,  median24:7,    top24:35, topDom24:35, placed24:75,   cse_avg:13,  cse_top:35, mech_avg:5,  ece_avg:9,    civil_avg:null,cutoff:"MHT-CET 95+ %ile" },
  { id:77, name:"Thadomal Shahani (TSEC)", city:"Mumbai",          state:"Maharashtra",    tier:"Private",      exam:"MHT-CET",      fee:"~₹8-10L total",   avg22:6.5,  avg23:8,    avg24:9,    median24:7,    top24:32, topDom24:32, placed24:73,   cse_avg:12,  cse_top:32, mech_avg:5,  ece_avg:8,    civil_avg:null,cutoff:"MHT-CET 94+ %ile" },
  { id:78, name:"K.J. Somaiya Inst. of Tech",city:"Mumbai",        state:"Maharashtra",    tier:"Private",      exam:"MHT-CET",      fee:"~₹8-12L total",   avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:35, topDom24:35, placed24:74,   cse_avg:12,  cse_top:35, mech_avg:5,  ece_avg:9,    civil_avg:null,cutoff:"MHT-CET 93+ %ile" },
  { id:79, name:"Dayananda Sagar Univ",    city:"Bengaluru",       state:"Karnataka",      tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹10-12L total",  avg22:6.5,  avg23:7.5,  avg24:8.5,  median24:6.5,  top24:33, topDom24:33, placed24:73,   cse_avg:12,  cse_top:33, mech_avg:5,  ece_avg:9,    civil_avg:null,cutoff:"COMEDK <8000" },
  { id:80, name:"RV College of Engineering",city:"Bengaluru",      state:"Karnataka",      tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹10-12L total",  avg22:7.5,  avg23:9,    avg24:10,   median24:7.5,  top24:40, topDom24:40, placed24:80,   cse_avg:14,  cse_top:40, mech_avg:6,  ece_avg:10,   civil_avg:5, cutoff:"KCET <5000 / COMEDK <4000" },
  { id:81, name:"Christ University (Engg)",city:"Bengaluru",       state:"Karnataka",      tier:"Private",      exam:"CUET/JEE Main",fee:"~₹10-14L total",  avg22:6,    avg23:7,    avg24:8,    median24:6.5,  top24:30, topDom24:30, placed24:70,   cse_avg:11,  cse_top:30, mech_avg:5,  ece_avg:8,    civil_avg:null,cutoff:"CUET / Direct" },
  { id:82, name:"NIT Srinagar",            city:"Srinagar",        state:"J&K",            tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:7,    avg23:8.5,  avg24:9.5,  median24:7,    top24:32, topDom24:32, placed24:70,   cse_avg:13,  cse_top:32, mech_avg:6,  ece_avg:10,   civil_avg:5, cutoff:"CSE ~40K-60K (Gen)" },
  { id:83, name:"NIT Agartala",            city:"Agartala",        state:"Tripura",        tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:6.5,  avg23:8,    avg24:9,    median24:7,    top24:28, topDom24:28, placed24:68,   cse_avg:12,  cse_top:28, mech_avg:5,  ece_avg:9,    civil_avg:5, cutoff:"CSE ~45K-70K (Gen)" },
  { id:84, name:"NIT Manipur",             city:"Imphal",          state:"Manipur",        tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:6,    avg23:7,    avg24:8,    median24:6,    top24:25, topDom24:25, placed24:65,   cse_avg:11,  cse_top:25, mech_avg:5,  ece_avg:9,    civil_avg:4, cutoff:"CSE ~55K-80K (Gen)" },
  { id:85, name:"SASTRA University",       city:"Thanjavur",       state:"Tamil Nadu",     tier:"Private",      exam:"JEE Main/SASTRA",fee:"~₹8-10L total",  avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:35, topDom24:35, placed24:75,   cse_avg:13,  cse_top:35, mech_avg:5,  ece_avg:9,    civil_avg:null,cutoff:"SASTRA Entrance / JEE" },
  { id:86, name:"Vel Tech Rangarajan",     city:"Chennai",         state:"Tamil Nadu",     tier:"Private",      exam:"TNEA/Direct",  fee:"~₹5-7L total",    avg22:5,    avg23:6,    avg24:7,    median24:5.5,  top24:30, topDom24:30, placed24:70,   cse_avg:9,   cse_top:30, mech_avg:4,  ece_avg:7,    civil_avg:null,cutoff:"TNEA / Direct" },
  { id:87, name:"Alliance University",     city:"Bengaluru",       state:"Karnataka",      tier:"Private",      exam:"Alliance Entr.",fee:"~₹8-12L total",   avg22:5,    avg23:6,    avg24:7,    median24:5.5,  top24:28, topDom24:28, placed24:68,   cse_avg:9,   cse_top:28, mech_avg:4,  ece_avg:7,    civil_avg:null,cutoff:"Alliance JEE / Direct" },
  { id:88, name:"Jain University (SET)",   city:"Bengaluru",       state:"Karnataka",      tier:"Private",      exam:"JEE Main/Own", fee:"~₹10-14L total",  avg22:5.5,  avg23:6.5,  avg24:7.5,  median24:6,    top24:30, topDom24:30, placed24:70,   cse_avg:10,  cse_top:30, mech_avg:4,  ece_avg:8,    civil_avg:null,cutoff:"Own Entrance / JEE Main" },
  { id:89, name:"Graphic Era University",  city:"Dehradun",        state:"Uttarakhand",    tier:"Private",      exam:"JEE Main/Own", fee:"~₹7-10L total",   avg22:5.5,  avg23:7,    avg24:8,    median24:6,    top24:32, topDom24:32, placed24:72,   cse_avg:11,  cse_top:32, mech_avg:5,  ece_avg:8,    civil_avg:null,cutoff:"GEU Entrance / JEE Main" },
  { id:90, name:"Medi-caps University",    city:"Indore",          state:"Madhya Pradesh", tier:"Private",      exam:"JEE Main/Own", fee:"~₹7-9L total",    avg22:5,    avg23:6,    avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:65,   cse_avg:9,   cse_top:26, mech_avg:4,  ece_avg:7,    civil_avg:null,cutoff:"Own Entrance / JEE Main" },
  { id:91, name:"Mahindra University",     city:"Hyderabad",       state:"Telangana",      tier:"Private",      exam:"JEE Main/Own", fee:"~₹14-18L total",  avg22:8,    avg23:9.5,  avg24:11,   median24:8.5,  top24:40, topDom24:40, placed24:75,   cse_avg:16,  cse_top:40, mech_avg:7,  ece_avg:12,   civil_avg:null,cutoff:"JEE Main / Own Entrance" },
  { id:92, name:"SRM AP University",       city:"Amaravati",       state:"Andhra Pradesh", tier:"Private",      exam:"SRMJEEE",      fee:"~₹8-12L total",   avg22:6,    avg23:7,    avg24:8,    median24:6,    top24:35, topDom24:35, placed24:72,   cse_avg:11,  cse_top:35, mech_avg:4,  ece_avg:8,    civil_avg:null,cutoff:"SRMJEEE rank <15K" },
  { id:93, name:"UPES Dehradun",           city:"Dehradun",        state:"Uttarakhand",    tier:"Private",      exam:"UPESEAT/JEE",  fee:"~₹10-14L total",  avg22:7,    avg23:8.5,  avg24:9.5,  median24:7.5,  top24:36, topDom24:36, placed24:74,   cse_avg:13,  cse_top:36, mech_avg:6,  ece_avg:10,   civil_avg:null,cutoff:"UPESEAT / JEE Main" },
  { id:94, name:"Presidency Univ Bangalore",city:"Bengaluru",      state:"Karnataka",      tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹8-11L total",   avg22:5.5,  avg23:6.5,  avg24:7.5,  median24:6,    top24:30, topDom24:30, placed24:70,   cse_avg:10,  cse_top:30, mech_avg:4,  ece_avg:8,    civil_avg:null,cutoff:"COMEDK <10000" },
  { id:95, name:"GD Goenka University",    city:"Gurugram",        state:"Haryana",        tier:"Private",      exam:"JEE Main/Own", fee:"~₹8-12L total",   avg22:5,    avg23:6,    avg24:7,    median24:5.5,  top24:28, topDom24:28, placed24:68,   cse_avg:9,   cse_top:28, mech_avg:4,  ece_avg:7,    civil_avg:null,cutoff:"GD Goenka Entrance / JEE" },
  { id:96, name:"Woxsen University",       city:"Hyderabad",       state:"Telangana",      tier:"Private",      exam:"Own Entrance",  fee:"~₹16-20L total",  avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:32, topDom24:32, placed24:70,   cse_avg:13,  cse_top:32, mech_avg:6,  ece_avg:10,   civil_avg:null,cutoff:"Own Entrance / JEE" },
  { id:97, name:"NITTE Deemed Univ",       city:"Mangaluru",       state:"Karnataka",      tier:"Private",      exam:"COMEDK/Own",   fee:"~₹8-11L total",   avg22:6,    avg23:7,    avg24:8,    median24:6,    top24:30, topDom24:30, placed24:70,   cse_avg:11,  cse_top:30, mech_avg:5,  ece_avg:9,    civil_avg:null,cutoff:"COMEDK <10000" },
  { id:98, name:"KL University",           city:"Vijayawada",      state:"Andhra Pradesh", tier:"Private",      exam:"KLEEE/JEE",    fee:"~₹7-10L total",   avg22:5.5,  avg23:7,    avg24:8,    median24:6,    top24:35, topDom24:35, placed24:72,   cse_avg:11,  cse_top:35, mech_avg:4,  ece_avg:8,    civil_avg:null,cutoff:"KLEEE / JEE Main" },
  { id:99, name:"GITAM University",        city:"Visakhapatnam",   state:"Andhra Pradesh", tier:"Private",      exam:"GAT/JEE Main", fee:"~₹8-11L total",   avg22:5.5,  avg23:6.5,  avg24:7.5,  median24:6,    top24:30, topDom24:30, placed24:70,   cse_avg:10,  cse_top:30, mech_avg:4,  ece_avg:8,    civil_avg:null,cutoff:"GAT / JEE Main" },
  { id:100,name:"Marwadi University",      city:"Rajkot",          state:"Gujarat",        tier:"Private",      exam:"JEE Main/Own", fee:"~₹5-8L total",    avg22:5,    avg23:6,    avg24:7,    median24:5.5,  top24:28, topDom24:28, placed24:65,   cse_avg:9,   cse_top:28, mech_avg:4,  ece_avg:7,    civil_avg:null,cutoff:"Own Entrance / JEE Main" },

  // ===================================================
  // ===== COLLEGES 101–200 =====
  // ===================================================

  // New IITs (101-104)
  { id:101,name:"IIT Ropar",               city:"Ropar",           state:"Punjab",         tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:13,   avg23:14.5, avg24:15.85,median24:12,   top24:60, topDom24:55, placed24:85,   cse_avg:26,  cse_top:60, mech_avg:10, ece_avg:16,  civil_avg:8,  cutoff:"CSE ~4500-6500 AIR (Gen)" },
  { id:102,name:"IIT Jammu",               city:"Jammu",           state:"J&K",            tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:12,   avg23:14,   avg24:16,   median24:12,   top24:60, topDom24:58, placed24:92.5, cse_avg:19,  cse_top:60, mech_avg:10, ece_avg:16,  civil_avg:7,  cutoff:"CSE ~5000-7000 AIR (Gen)" },
  { id:103,name:"IIT Goa",                 city:"Goa",             state:"Goa",            tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:15,   avg23:16,   avg24:15.92,median24:11.5, top24:51, topDom24:51, placed24:93,   cse_avg:17.19,cse_top:51,mech_avg:10, ece_avg:15,  civil_avg:null,cutoff:"CSE ~5000-7000 AIR (Gen)" },
  { id:104,name:"IIT Bhilai",              city:"Bhilai",          state:"Chhattisgarh",   tier:"IIT",          exam:"JEE Advanced", fee:"~₹9L total",       avg22:11,   avg23:12,   avg24:13,   median24:10,   top24:42, topDom24:40, placed24:60,   cse_avg:20,  cse_top:42, mech_avg:9,  ece_avg:14,  civil_avg:6,  cutoff:"CSE ~6000-8500 AIR (Gen)" },

  // Remaining NITs (105-111)
  { id:105,name:"NIT Uttarakhand",         city:"Srinagar (Garhwal)",state:"Uttarakhand",  tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:6.5,  avg23:7.5,  avg24:8,    median24:6.5,  top24:28, topDom24:28, placed24:68,   cse_avg:12,  cse_top:28, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"CSE ~50K-75K (Gen)" },
  { id:106,name:"NIT Puducherry",          city:"Karaikal",         state:"Puducherry",    tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:25, topDom24:25, placed24:68,   cse_avg:11,  cse_top:25, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"CSE ~55K-80K (Gen)" },
  { id:107,name:"NIT Andhra Pradesh",      city:"Tadepalligudem",   state:"Andhra Pradesh",tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:26, topDom24:26, placed24:66,   cse_avg:11,  cse_top:26, mech_avg:5,  ece_avg:8,   civil_avg:4,  cutoff:"CSE ~55K-80K (Gen)" },
  { id:108,name:"NIT Nagaland",            city:"Dimapur",          state:"Nagaland",      tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:5.5,  avg23:6,    avg24:6.5,  median24:5.5,  top24:22, topDom24:22, placed24:62,   cse_avg:9,   cse_top:22, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"CSE ~70K-95K (Gen)" },
  { id:109,name:"NIT Sikkim",              city:"Ravangla",         state:"Sikkim",        tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:22, topDom24:22, placed24:62,   cse_avg:10,  cse_top:22, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"CSE ~65K-90K (Gen)" },
  { id:110,name:"NIT Mizoram",             city:"Aizawl",           state:"Mizoram",       tier:"NIT",          exam:"JEE Main",     fee:"~₹5L total",      avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:20, topDom24:20, placed24:60,   cse_avg:9,   cse_top:20, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"CSE ~70K-100K (Gen)" },
  { id:111,name:"NIT Arunachal Pradesh",   city:"Yupia",            state:"Arunachal Pradesh",tier:"NIT",       exam:"JEE Main",     fee:"~₹5L total",      avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:20, topDom24:20, placed24:60,   cse_avg:9,   cse_top:20, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"CSE ~75K-105K (Gen)" },

  // State / Deemed Tier 2 Govts (112-116)
  { id:112,name:"DA-IICT Gandhinagar",     city:"Gandhinagar",      state:"Gujarat",       tier:"State Govt",   exam:"JEE Main/Own", fee:"~₹10-12L total",  avg22:12,   avg23:13.5, avg24:14,   median24:12,   top24:50, topDom24:50, placed24:82,   cse_avg:20,  cse_top:50, mech_avg:null,ece_avg:16,  civil_avg:null,cutoff:"JEE Main 90+ %ile / DA-IICT entrance" },
  { id:113,name:"VJTI Mumbai",             city:"Mumbai",           state:"Maharashtra",   tier:"State Govt",   exam:"MHT-CET",      fee:"~₹2-4L total",    avg22:10,   avg23:12,   avg24:13,   median24:10.9, top24:54, topDom24:54, placed24:82,   cse_avg:20,  cse_top:54, mech_avg:9,  ece_avg:15,  civil_avg:7,  cutoff:"MHT-CET 97+ %ile" },
  { id:114,name:"BIT Mesra Ranchi",        city:"Ranchi",           state:"Jharkhand",     tier:"Private",      exam:"JEE Main",     fee:"~₹10-12L total",  avg22:8.5,  avg23:10,   avg24:11,   median24:8.5,  top24:40, topDom24:40, placed24:76,   cse_avg:16,  cse_top:40, mech_avg:7,  ece_avg:12,  civil_avg:5,  cutoff:"CSE ~45K-70K (Gen)" },
  { id:115,name:"CUSAT Kochi",             city:"Kochi",            state:"Kerala",        tier:"State Govt",   exam:"CAT (CUSAT)",  fee:"~₹3-5L total",    avg22:8,    avg23:9.5,  avg24:11,   median24:8,    top24:42, topDom24:42, placed24:78,   cse_avg:16,  cse_top:42, mech_avg:7,  ece_avg:12,  civil_avg:6,  cutoff:"CUSAT CAT rank / JEE Main" },
  { id:116,name:"SPIT Mumbai",             city:"Mumbai",           state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹8-12L total",   avg22:9,    avg23:10.5, avg24:11,   median24:8,    top24:42, topDom24:42, placed24:78,   cse_avg:16,  cse_top:42, mech_avg:6,  ece_avg:12,  civil_avg:null,cutoff:"MHT-CET 95+ %ile" },

  // More IIITs (117-124)
  { id:117,name:"IIIT Vadodara",           city:"Vadodara",         state:"Gujarat",       tier:"IIIT",         exam:"JEE Main",     fee:"~₹6-7L total",    avg22:9,    avg23:10.5, avg24:11,   median24:9,    top24:40, topDom24:40, placed24:74,   cse_avg:18,  cse_top:40, mech_avg:null,ece_avg:14,  civil_avg:null,cutoff:"CSE ~20K-32K (Gen)" },
  { id:118,name:"IIIT Kota",               city:"Kota",             state:"Rajasthan",     tier:"IIIT",         exam:"JEE Main",     fee:"~₹5-6L total",    avg22:8.5,  avg23:10,   avg24:10.5, median24:8.5,  top24:38, topDom24:38, placed24:73,   cse_avg:17,  cse_top:38, mech_avg:null,ece_avg:13,  civil_avg:null,cutoff:"CSE ~25K-38K (Gen)" },
  { id:119,name:"IIIT Kurnool",            city:"Kurnool",          state:"Andhra Pradesh",tier:"IIIT",         exam:"JEE Main",     fee:"~₹5-6L total",    avg22:7.5,  avg23:8.5,  avg24:9.5,  median24:7.5,  top24:32, topDom24:32, placed24:70,   cse_avg:15,  cse_top:32, mech_avg:null,ece_avg:12,  civil_avg:null,cutoff:"CSE ~30K-45K (Gen)" },
  { id:120,name:"IIIT Sri City",           city:"Chittoor",         state:"Andhra Pradesh",tier:"IIIT",         exam:"JEE Main",     fee:"~₹5-7L total",    avg22:8,    avg23:9.5,  avg24:10.5, median24:8,    top24:38, topDom24:38, placed24:72,   cse_avg:16,  cse_top:38, mech_avg:null,ece_avg:13,  civil_avg:null,cutoff:"CSE ~28K-42K (Gen)" },
  { id:121,name:"IIIT Lucknow",            city:"Lucknow",          state:"Uttar Pradesh", tier:"IIIT",         exam:"JEE Main",     fee:"~₹5-6L total",    avg22:8,    avg23:9,    avg24:10,   median24:8,    top24:35, topDom24:35, placed24:71,   cse_avg:16,  cse_top:35, mech_avg:null,ece_avg:12,  civil_avg:null,cutoff:"CSE ~30K-46K (Gen)" },
  { id:122,name:"IIIT Ranchi",             city:"Ranchi",           state:"Jharkhand",     tier:"IIIT",         exam:"JEE Main",     fee:"~₹5-6L total",    avg22:7.5,  avg23:8.5,  avg24:9.5,  median24:7.5,  top24:30, topDom24:30, placed24:70,   cse_avg:15,  cse_top:30, mech_avg:null,ece_avg:12,  civil_avg:null,cutoff:"CSE ~32K-48K (Gen)" },
  { id:123,name:"IIIT Nagpur",             city:"Nagpur",           state:"Maharashtra",   tier:"IIIT",         exam:"JEE Main",     fee:"~₹5-6L total",    avg22:7.5,  avg23:8.5,  avg24:9.5,  median24:7.5,  top24:30, topDom24:30, placed24:70,   cse_avg:15,  cse_top:30, mech_avg:null,ece_avg:12,  civil_avg:null,cutoff:"CSE ~32K-48K (Gen)" },
  { id:124,name:"IIIT Bhopal",             city:"Bhopal",           state:"Madhya Pradesh",tier:"IIIT",         exam:"JEE Main",     fee:"~₹5-6L total",    avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:28, topDom24:28, placed24:68,   cse_avg:14,  cse_top:28, mech_avg:null,ece_avg:11,  civil_avg:null,cutoff:"CSE ~35K-52K (Gen)" },

  // SSN + South Private (125-137)
  { id:125,name:"SSN College of Engineering",city:"Chennai",        state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:8,    avg23:9,    avg24:10,   median24:8.6,  top24:58, topDom24:58, placed24:82,   cse_avg:14,  cse_top:58, mech_avg:6,  ece_avg:10,  civil_avg:5,  cutoff:"TNEA ~197+ (very high cutoff)" },
  { id:126,name:"Thiagarajar College of Engg",city:"Madurai",       state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹3-5L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:30, topDom24:30, placed24:75,   cse_avg:11,  cse_top:30, mech_avg:5,  ece_avg:8,   civil_avg:5,  cutoff:"TNEA state merit cutoff" },
  { id:127,name:"Kongu Engineering College", city:"Erode",           state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹3-5L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:28, topDom24:28, placed24:73,   cse_avg:10,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },
  { id:128,name:"Kumaraguru College of Tech", city:"Coimbatore",    state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹3-5L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:30, topDom24:30, placed24:74,   cse_avg:11,  cse_top:30, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },
  { id:129,name:"Mepco Schlenk Engg College",city:"Sivakasi",       state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹3-4L total",    avg22:5.5,  avg23:6,    avg24:6.5,  median24:5.5,  top24:26, topDom24:26, placed24:72,   cse_avg:9,   cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },
  { id:130,name:"Model Engineering College", city:"Kochi",           state:"Kerala",        tier:"State Govt",   exam:"KEAM",         fee:"~₹2-4L total",    avg22:7,    avg23:8,    avg24:8.5,  median24:7,    top24:35, topDom24:35, placed24:76,   cse_avg:12,  cse_top:35, mech_avg:5,  ece_avg:10,  civil_avg:5,  cutoff:"KEAM rank <3000 (Kerala)" },
  { id:131,name:"GEC Thrissur",              city:"Thrissur",        state:"Kerala",        tier:"State Govt",   exam:"KEAM",         fee:"~₹1-2L total",    avg22:6.5,  avg23:7.5,  avg24:8,    median24:6.5,  top24:30, topDom24:30, placed24:74,   cse_avg:12,  cse_top:30, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"KEAM rank <5000 (Kerala)" },
  { id:132,name:"CET Trivandrum",            city:"Thiruvananthapuram",state:"Kerala",      tier:"State Govt",   exam:"KEAM",         fee:"~₹1-2L total",    avg22:7.5,  avg23:8.5,  avg24:9,    median24:7,    top24:35, topDom24:35, placed24:76,   cse_avg:13,  cse_top:35, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"KEAM rank <2500 (Kerala)" },
  { id:133,name:"CBIT Hyderabad",            city:"Hyderabad",       state:"Telangana",     tier:"Private",      exam:"TS EAMCET",    fee:"~₹4-7L total",    avg22:7,    avg23:8,    avg24:8.5,  median24:6.5,  top24:35, topDom24:35, placed24:76,   cse_avg:13,  cse_top:35, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"TS EAMCET rank <5000" },
  { id:134,name:"VNR Vignana Jyothi",        city:"Hyderabad",       state:"Telangana",     tier:"Private",      exam:"TS EAMCET",    fee:"~₹4-7L total",    avg22:7.5,  avg23:8.5,  avg24:9,    median24:7.5,  top24:38, topDom24:38, placed24:78,   cse_avg:14,  cse_top:38, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"TS EAMCET rank <5000" },
  { id:135,name:"Vasavi College of Engineering",city:"Hyderabad",    state:"Telangana",     tier:"Private",      exam:"TS EAMCET",    fee:"~₹4-6L total",    avg22:6.5,  avg23:7.5,  avg24:8,    median24:6.5,  top24:32, topDom24:32, placed24:75,   cse_avg:12,  cse_top:32, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"TS EAMCET rank <6000" },
  { id:136,name:"CVR College of Engineering", city:"Hyderabad",      state:"Telangana",     tier:"Private",      exam:"TS EAMCET",    fee:"~₹4-6L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:72,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:4,  cutoff:"TS EAMCET rank <7000" },
  { id:137,name:"CVSIT Hyderabad",           city:"Hyderabad",       state:"Telangana",     tier:"Private",      exam:"TS EAMCET",    fee:"~₹4-6L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:70,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"TS EAMCET rank <8000" },

  // North India Private (138-148)
  { id:138,name:"Chitkara University Punjab",city:"Rajpura",         state:"Punjab",        tier:"Private",      exam:"Chitkara Entr.",fee:"~₹7-10L total",   avg22:6.5,  avg23:7.5,  avg24:8,    median24:6.5,  top24:35, topDom24:35, placed24:75,   cse_avg:12,  cse_top:35, mech_avg:5,  ece_avg:8,   civil_avg:null,cutoff:"Chitkara Entrance / JEE Main" },
  { id:139,name:"KIET Group (Ghaziabad)",    city:"Ghaziabad",       state:"Uttar Pradesh", tier:"Private",      exam:"JEE Main",     fee:"~₹7-10L total",   avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:70,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"JEE Main ~85-90 %ile" },
  { id:140,name:"MAIT Delhi",                city:"New Delhi",       state:"Delhi",         tier:"Private",      exam:"JEE Main",     fee:"~₹5-8L total",    avg22:7.5,  avg23:8.5,  avg24:9.5,  median24:7.5,  top24:35, topDom24:35, placed24:78,   cse_avg:14,  cse_top:35, mech_avg:5,  ece_avg:10,  civil_avg:null,cutoff:"JEE Main (Delhi domicile)" },
  { id:141,name:"MSIT Delhi",                city:"New Delhi",       state:"Delhi",         tier:"State Govt",   exam:"JEE Main",     fee:"~₹4-6L total",    avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:32, topDom24:32, placed24:77,   cse_avg:13,  cse_top:32, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"JEE Main (Delhi domicile)" },
  { id:142,name:"GNDEC Ludhiana",            city:"Ludhiana",        state:"Punjab",        tier:"State Govt",   exam:"JEE Main/State",fee:"~₹3-5L total",   avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:72,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:5,  cutoff:"Punjab State Rank / JEE Main" },
  { id:143,name:"Bennett University",        city:"Greater Noida",   state:"Uttar Pradesh", tier:"Private",      exam:"Bennett Entr.", fee:"~₹10-14L total",  avg22:6.5,  avg23:7.5,  avg24:8.5,  median24:6.5,  top24:35, topDom24:35, placed24:74,   cse_avg:13,  cse_top:35, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"BU Entrance / JEE Main" },
  { id:144,name:"Ajay Kumar Garg Engg Col", city:"Ghaziabad",        state:"Uttar Pradesh", tier:"Private",      exam:"JEE Main",     fee:"~₹6-8L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:24, topDom24:24, placed24:68,   cse_avg:9,   cse_top:24, mech_avg:4,  ece_avg:6,   civil_avg:null,cutoff:"JEE Main (UP State)" },
  { id:145,name:"GL Bajaj Institute",        city:"Greater Noida",   state:"Uttar Pradesh", tier:"Private",      exam:"JEE Main",     fee:"~₹5-7L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:22, topDom24:22, placed24:67,   cse_avg:9,   cse_top:22, mech_avg:4,  ece_avg:6,   civil_avg:null,cutoff:"JEE Main (UP State)" },
  { id:146,name:"Sharda University",         city:"Greater Noida",   state:"Uttar Pradesh", tier:"Private",      exam:"Sharda Entr.", fee:"~₹7-10L total",   avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:28, topDom24:28, placed24:70,   cse_avg:10,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"Sharda Entrance / JEE Main" },
  { id:147,name:"NIET Greater Noida",        city:"Greater Noida",   state:"Uttar Pradesh", tier:"Private",      exam:"JEE Main",     fee:"~₹6-9L total",    avg22:5.5,  avg23:6,    avg24:7,    median24:5.5,  top24:25, topDom24:25, placed24:68,   cse_avg:10,  cse_top:25, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"JEE Main (UP State)" },
  { id:148,name:"GLA University Mathura",    city:"Mathura",         state:"Uttar Pradesh", tier:"Private",      exam:"JEE Main/Own", fee:"~₹6-8L total",    avg22:5.5,  avg23:6,    avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:68,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"GLA Entrance / JEE Main" },

  // West India Private (149-162)
  { id:149,name:"DJSCE Mumbai",              city:"Mumbai",           state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹8-12L total",   avg22:8.5,  avg23:9.5,  avg24:10.5, median24:8,    top24:38, topDom24:38, placed24:76,   cse_avg:15,  cse_top:38, mech_avg:5,  ece_avg:10,  civil_avg:null,cutoff:"MHT-CET 94+ %ile" },
  { id:150,name:"FRCRCE Mumbai",             city:"Mumbai",           state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹8-12L total",   avg22:8,    avg23:9,    avg24:10,   median24:7.5,  top24:36, topDom24:36, placed24:75,   cse_avg:14,  cse_top:36, mech_avg:5,  ece_avg:10,  civil_avg:null,cutoff:"MHT-CET 93+ %ile" },
  { id:151,name:"Rajiv Gandhi IT Mumbai",    city:"Mumbai",           state:"Maharashtra",   tier:"State Govt",   exam:"MHT-CET",      fee:"~₹2-3L total",    avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:32, topDom24:32, placed24:74,   cse_avg:13,  cse_top:32, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"MHT-CET 93+ %ile" },
  { id:152,name:"Sardar Patel CoE (SPCE)",   city:"Mumbai",           state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹8-11L total",   avg22:8.5,  avg23:9.5,  avg24:10,   median24:7.5,  top24:38, topDom24:38, placed24:76,   cse_avg:14,  cse_top:38, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"MHT-CET 93+ %ile" },
  { id:153,name:"MIT ADT University Pune",   city:"Pune",             state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹10-14L total",  avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:32, topDom24:32, placed24:73,   cse_avg:13,  cse_top:32, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"MHT-CET 92+ %ile" },
  { id:154,name:"RCOEM Nagpur",              city:"Nagpur",           state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹7-10L total",   avg22:7,    avg23:8,    avg24:9,    median24:7,    top24:35, topDom24:35, placed24:74,   cse_avg:13,  cse_top:35, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"MHT-CET 92+ %ile" },
  { id:155,name:"GH Raisoni College Nagpur", city:"Nagpur",           state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹6-9L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:70,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:4,  cutoff:"MHT-CET 90+ %ile" },
  { id:156,name:"YCCE Nagpur",               city:"Nagpur",           state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹6-9L total",    avg22:6.5,  avg23:7.5,  avg24:8,    median24:6.5,  top24:30, topDom24:30, placed24:72,   cse_avg:12,  cse_top:30, mech_avg:5,  ece_avg:8,   civil_avg:4,  cutoff:"MHT-CET 91+ %ile" },
  { id:157,name:"Sinhgad CoE Pune",          city:"Pune",             state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹5-8L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:68,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"MHT-CET 90+ %ile" },
  { id:158,name:"DY Patil CoE Pune",         city:"Pune",             state:"Maharashtra",   tier:"Private",      exam:"MHT-CET",      fee:"~₹8-12L total",   avg22:6,    avg23:7,    avg24:8,    median24:6,    top24:30, topDom24:30, placed24:71,   cse_avg:11,  cse_top:30, mech_avg:4,  ece_avg:8,   civil_avg:null,cutoff:"MHT-CET 90+ %ile" },
  { id:159,name:"SGSITS Indore",             city:"Indore",           state:"Madhya Pradesh",tier:"State Govt",   exam:"JEE Main",     fee:"~₹3-5L total",    avg22:7,    avg23:8,    avg24:8.5,  median24:7,    top24:32, topDom24:32, placed24:74,   cse_avg:13,  cse_top:32, mech_avg:5,  ece_avg:9,   civil_avg:5,  cutoff:"JEE Main ~80+ %ile (MP Quota)" },
  { id:160,name:"Manipal University Jaipur", city:"Jaipur",           state:"Rajasthan",     tier:"Private",      exam:"MU OET/JEE",   fee:"~₹8-12L total",   avg22:5.5,  avg23:6.5,  avg24:7.5,  median24:5.5,  top24:30, topDom24:30, placed24:70,   cse_avg:10,  cse_top:30, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"MU OET / JEE Main" },
  { id:161,name:"Nirma Univ (Alt listing)", city:"Ahmedabad",         state:"Gujarat",       tier:"Private",      exam:"JEE Main",     fee:"~₹12-15L total",  avg22:8,    avg23:10,   avg24:11.5, median24:9,    top24:42, topDom24:42, placed24:79,   cse_avg:16,  cse_top:42, mech_avg:6,  ece_avg:11,  civil_avg:null,cutoff:"JEE Main 80+ %ile (Gujarati merit)" },

  // South India – Karnataka Private (162-168)
  { id:162,name:"JSS Academy of Tech Edu",   city:"Bengaluru",        state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹7-11L total",   avg22:7,    avg23:8,    avg24:8.5,  median24:7,    top24:33, topDom24:33, placed24:74,   cse_avg:12,  cse_top:33, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"COMEDK <7000 / KCET <8000" },
  { id:163,name:"Acharya Inst. of Technology",city:"Bengaluru",       state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹7-10L total",   avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:71,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:null,cutoff:"COMEDK <8000" },
  { id:164,name:"New Horizon College of Engg",city:"Bengaluru",       state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹8-11L total",   avg22:6.5,  avg23:7.5,  avg24:8,    median24:6.5,  top24:30, topDom24:30, placed24:73,   cse_avg:12,  cse_top:30, mech_avg:5,  ece_avg:8,   civil_avg:null,cutoff:"COMEDK <8000" },
  { id:165,name:"MVJ College of Engineering", city:"Bengaluru",       state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹7-10L total",   avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:70,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:null,cutoff:"COMEDK <9000" },
  { id:166,name:"JSS Science & Tech Univ",    city:"Mysuru",          state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹8-11L total",   avg22:7.5,  avg23:8.5,  avg24:9.5,  median24:7.5,  top24:36, topDom24:36, placed24:76,   cse_avg:14,  cse_top:36, mech_avg:5,  ece_avg:10,  civil_avg:null,cutoff:"COMEDK <7000" },
  { id:167,name:"SDM College of Engg Dharwad",city:"Dharwad",         state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹5-8L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:70,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:5,  cutoff:"COMEDK <9000" },
  { id:168,name:"Srinivas Inst. of Technology",city:"Mangaluru",      state:"Karnataka",     tier:"Private",      exam:"COMEDK",       fee:"~₹5-8L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:24, topDom24:24, placed24:68,   cse_avg:10,  cse_top:24, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"COMEDK <10000" },

  // East India (169-175)
  { id:169,name:"Heritage Inst. of Technology",city:"Kolkata",        state:"West Bengal",   tier:"Private",      exam:"WBJEE",        fee:"~₹6-9L total",    avg22:6.5,  avg23:7.5,  avg24:8,    median24:6.5,  top24:30, topDom24:30, placed24:72,   cse_avg:12,  cse_top:30, mech_avg:5,  ece_avg:8,   civil_avg:4,  cutoff:"WBJEE rank <8000" },
  { id:170,name:"Techno India (Kolkata)",      city:"Kolkata",         state:"West Bengal",   tier:"Private",      exam:"WBJEE",        fee:"~₹5-8L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:25, topDom24:25, placed24:70,   cse_avg:10,  cse_top:25, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"WBJEE rank <10000" },
  { id:171,name:"RCC Institute of IT (Kolkata)",city:"Kolkata",        state:"West Bengal",   tier:"State Govt",   exam:"WBJEE",        fee:"~₹3-5L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:72,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:null,cutoff:"WBJEE rank <7000" },
  { id:172,name:"SOA University Bhubaneswar", city:"Bhubaneswar",      state:"Odisha",        tier:"Private",      exam:"OJEE/JEE Main",fee:"~₹8-11L total",   avg22:6.5,  avg23:7.5,  avg24:8.5,  median24:6.5,  top24:35, topDom24:35, placed24:73,   cse_avg:12,  cse_top:35, mech_avg:5,  ece_avg:8,   civil_avg:null,cutoff:"OJEE / JEE Main" },
  { id:173,name:"Silicon Inst. of Technology", city:"Bhubaneswar",    state:"Odisha",        tier:"Private",      exam:"OJEE/JEE",     fee:"~₹6-9L total",    avg22:6,    avg23:7,    avg24:8,    median24:6,    top24:30, topDom24:30, placed24:70,   cse_avg:12,  cse_top:30, mech_avg:4,  ece_avg:8,   civil_avg:null,cutoff:"OJEE / JEE Main" },
  { id:174,name:"Centurion University",        city:"Bhubaneswar",    state:"Odisha",        tier:"Private",      exam:"OJEE/JEE",     fee:"~₹5-8L total",    avg22:5.5,  avg23:6.5,  avg24:7.5,  median24:5.5,  top24:28, topDom24:28, placed24:70,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"OJEE / JEE Main" },
  { id:175,name:"IEM Kolkata",                 city:"Kolkata",         state:"West Bengal",   tier:"Private",      exam:"WBJEE/JEE",    fee:"~₹5-8L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:25, topDom24:25, placed24:68,   cse_avg:10,  cse_top:25, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"WBJEE rank <12000" },

  // More Tamil Nadu / South (176-182)
  { id:176,name:"Sri Ramakrishna Engg College",city:"Coimbatore",     state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹3-5L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:70,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },
  { id:177,name:"Rajalakshmi Engg College",    city:"Chennai",         state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:72,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },
  { id:178,name:"Bannari Amman Inst. of Tech", city:"Erode",           state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹3-5L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:24, topDom24:24, placed24:68,   cse_avg:9,   cse_top:24, mech_avg:4,  ece_avg:6,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },
  { id:179,name:"Karunya Inst. of Technology", city:"Coimbatore",     state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:24, topDom24:24, placed24:68,   cse_avg:9,   cse_top:24, mech_avg:4,  ece_avg:6,   civil_avg:null,cutoff:"TNEA state merit cutoff" },
  { id:180,name:"St. Joseph's CoE Chennai",    city:"Chennai",         state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:71,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },
  { id:181,name:"Kalasalingam University",     city:"Krishnankoil",   state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:24, topDom24:24, placed24:67,   cse_avg:9,   cse_top:24, mech_avg:4,  ece_avg:6,   civil_avg:null,cutoff:"TNEA state merit cutoff" },
  { id:182,name:"Sri Venkateswara CoE",        city:"Sriperumbudur",  state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:72,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"TNEA state merit cutoff" },

  // AP / Telangana extras (183-185)
  { id:183,name:"MVGR College of Engineering", city:"Vizianagaram",   state:"Andhra Pradesh",tier:"Private",      exam:"AP EAMCET",    fee:"~₹3-5L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:70,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"AP EAMCET rank <5000" },
  { id:184,name:"CMR Engg College Hyderabad",  city:"Hyderabad",      state:"Telangana",     tier:"Private",      exam:"TS EAMCET",    fee:"~₹4-6L total",    avg22:5.5,  avg23:6.5,  avg24:7.5,  median24:5.5,  top24:28, topDom24:28, placed24:70,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"TS EAMCET rank <8000" },
  { id:185,name:"Ncerc (Mar Athanasius)",       city:"Kothamangalam",  state:"Kerala",        tier:"Private",      exam:"KEAM",         fee:"~₹4-6L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:30, topDom24:30, placed24:72,   cse_avg:11,  cse_top:30, mech_avg:4,  ece_avg:8,   civil_avg:5,  cutoff:"KEAM rank <8000 (Kerala)" },

  // Rajasthan / MP extras (186-190)
  { id:186,name:"Poornima University",          city:"Jaipur",         state:"Rajasthan",     tier:"Private",      exam:"JEE Main/Own", fee:"~₹6-8L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:24, topDom24:24, placed24:65,   cse_avg:9,   cse_top:24, mech_avg:4,  ece_avg:6,   civil_avg:null,cutoff:"Own Entrance / JEE Main" },
  { id:187,name:"JECRC University",             city:"Jaipur",         state:"Rajasthan",     tier:"Private",      exam:"JEE Main/Own", fee:"~₹6-8L total",    avg22:5.5,  avg23:6,    avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:68,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"Own Entrance / JEE Main" },
  { id:188,name:"LNCT Bhopal",                  city:"Bhopal",         state:"Madhya Pradesh",tier:"Private",      exam:"JEE Main",     fee:"~₹5-7L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:67,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"JEE Main (MP Quota)" },
  { id:189,name:"Arya College of Engineering",  city:"Jaipur",         state:"Rajasthan",     tier:"Private",      exam:"JEE Main",     fee:"~₹5-7L total",    avg22:5,    avg23:5.5,  avg24:6.5,  median24:5,    top24:22, topDom24:22, placed24:64,   cse_avg:9,   cse_top:22, mech_avg:4,  ece_avg:6,   civil_avg:null,cutoff:"JEE Main (Raj. Quota)" },
  { id:190,name:"UIT RGPV Bhopal",              city:"Bhopal",         state:"Madhya Pradesh",tier:"State Govt",   exam:"JEE Main",     fee:"~₹2-4L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:26, topDom24:26, placed24:68,   cse_avg:11,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:4,  cutoff:"JEE Main (MP State Rank)" },

  // Miscellaneous well-known colleges (191-200)
  { id:191,name:"Hindustan Inst. of Tech",      city:"Chennai",        state:"Tamil Nadu",    tier:"Private",      exam:"TNEA/HICAT",   fee:"~₹5-8L total",    avg22:5,    avg23:5.5,  avg24:6.5,  median24:5,    top24:25, topDom24:25, placed24:67,   cse_avg:9,   cse_top:25, mech_avg:3,  ece_avg:6,   civil_avg:null,cutoff:"TNEA / HICAT" },
  { id:192,name:"BMS Inst. of Technology",      city:"Bengaluru",      state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹7-10L total",   avg22:6.5,  avg23:7.5,  avg24:8.5,  median24:7,    top24:32, topDom24:32, placed24:73,   cse_avg:12,  cse_top:32, mech_avg:5,  ece_avg:9,   civil_avg:null,cutoff:"COMEDK <8000" },
  { id:193,name:"CGC Technical Campus",         city:"Mohali",         state:"Punjab",        tier:"Private",      exam:"JEE Main/Own", fee:"~₹6-9L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:24, topDom24:24, placed24:66,   cse_avg:9,   cse_top:24, mech_avg:4,  ece_avg:6,   civil_avg:null,cutoff:"JEE Main / Own Entrance" },
  { id:194,name:"Thapar Polytechnic (TPT)",     city:"Patiala",        state:"Punjab",        tier:"Private",      exam:"JEE Main",     fee:"~₹10-14L total",  avg22:8,    avg23:9.5,  avg24:11,   median24:8.5,  top24:40, topDom24:40, placed24:77,   cse_avg:16,  cse_top:40, mech_avg:7,  ece_avg:12,  civil_avg:null,cutoff:"JEE Main 75+ %ile" },
  { id:195,name:"Pondicherry Univ (Engg Dept)", city:"Puducherry",     state:"Puducherry",    tier:"State Govt",   exam:"JEE Main/CUCET",fee:"~₹1-3L total",   avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:70,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:null,cutoff:"CUCET / JEE Main" },
  { id:196,name:"Easwari Engineering College",  city:"Chennai",        state:"Tamil Nadu",    tier:"Private",      exam:"TNEA",         fee:"~₹4-6L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:25, topDom24:25, placed24:69,   cse_avg:10,  cse_top:25, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"TNEA state merit cutoff" },
  { id:197,name:"Vel Tech Multi Tech Chennai",  city:"Chennai",        state:"Tamil Nadu",    tier:"Private",      exam:"TNEA/Own",     fee:"~₹4-6L total",    avg22:5,    avg23:6,    avg24:6.5,  median24:5,    top24:24, topDom24:24, placed24:66,   cse_avg:9,   cse_top:24, mech_avg:3,  ece_avg:6,   civil_avg:null,cutoff:"TNEA / Own Entrance" },
  { id:198,name:"PESCE Mandya (Karnataka)",     city:"Mandya",         state:"Karnataka",     tier:"Private",      exam:"COMEDK/KCET",  fee:"~₹5-8L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:26, topDom24:26, placed24:68,   cse_avg:10,  cse_top:26, mech_avg:4,  ece_avg:7,   civil_avg:5,  cutoff:"COMEDK <10000 / KCET <12000" },
  { id:199,name:"BIT Sindri",                   city:"Dhanbad",        state:"Jharkhand",     tier:"State Govt",   exam:"JEE Main",     fee:"~₹1-3L total",    avg22:6,    avg23:7,    avg24:7.5,  median24:6,    top24:28, topDom24:28, placed24:70,   cse_avg:11,  cse_top:28, mech_avg:4,  ece_avg:8,   civil_avg:4,  cutoff:"JEE Main (Jharkhand Rank)" },
  { id:200,name:"VIT Bhopal",                   city:"Bhopal",         state:"Madhya Pradesh",tier:"Private",      exam:"VITEEE",       fee:"~₹7-9L total",    avg22:5.5,  avg23:6.5,  avg24:7,    median24:5.5,  top24:28, topDom24:28, placed24:68,   cse_avg:10,  cse_top:28, mech_avg:4,  ece_avg:7,   civil_avg:null,cutoff:"VITEEE rank <12000" },
];

// =================== EXAMS DATA ===================
const EXAMS = [
  { name:"JEE Advanced",  full:"Joint Entrance Exam Advanced", for:"All 23 IITs",                     eligibility:"12th PCM ≥75% Gen / 65% SC·ST·PwD. Must clear JEE Main first (top ~2.5L). Age ≤25 Gen. Max 2 attempts.", marks:"360 marks (Phy+Chem+Math). 3-hr paper. Negative marking. Objective + Numerical.", cutoff:"IIT Bombay/Delhi CSE: 220-250 AIR; IIT Kanpur CSE: 250-400; Newer IITs CSE: 1000-8000+", link:"jeeadv.ac.in" },
  { name:"JEE Main",      full:"Joint Entrance Exam Main",     for:"NITs, IIITs, GFTIs, many private", eligibility:"12th PCM ≥75% Gen / 65% SC·ST·PwD. No age limit (from 2024). Max 3 consecutive sessions.", marks:"300 marks (Phy+Chem+Math). 90 questions. MCQ + Numerical. −1 for wrong MCQ.", cutoff:"NIT Trichy CSE: 97%ile+; NIT Warangal: 96%ile+; General NITs: 90-95%ile+", link:"jeemain.nta.ac.in" },
  { name:"BITSAT",        full:"BITS Admission Test",           for:"BITS Pilani, Goa, Hyderabad",     eligibility:"12th PCM ≥75% overall AND ≥60% individually. Only 2024/2025 Class 12 pass-outs eligible.", marks:"390 questions in 3 hrs. No negative marking (changed in 2023). Phy+Chem+Math+English+Aptitude.", cutoff:"CSE Pilani: ≥350+; CSE Goa: ≥330+; CSE Hyderabad: ≥310+", link:"bitsadmission.com" },
  { name:"VITEEE",        full:"VIT Engineering Entrance Exam", for:"VIT Vellore, Chennai, AP, Bhopal", eligibility:"12th PCM/PCB ≥60% Gen / 50% SC·ST. Age 17-23. Appearing candidates eligible.", marks:"125 questions in 2.5 hrs. No negative marking. Math + Physics + Chemistry + English + Aptitude.", cutoff:"CSE Vellore: rank <5000; CSE Chennai: <8000; CSE AP: <12000", link:"viteee.vit.ac.in" },
  { name:"SRMJEEE",       full:"SRM Joint Engineering Entrance Exam", for:"SRM (Chennai, Delhi-NCR, AP, Sikkim)", eligibility:"12th PCM ≥60%. Age 17-22. Appearing candidates eligible.", marks:"125 questions in 2.5 hrs. No negative marking. Phy+Chem+Math+English+Aptitude.", cutoff:"CSE Kattankulathur: rank <10,000", link:"srmist.edu.in" },
  { name:"MET (Manipal)", full:"Manipal Entrance Test",         for:"MIT Manipal, Manipal Jaipur, Dubai", eligibility:"12th PCM ≥50%. No age bar. Appearing eligible.", marks:"200 questions in 150 mins. No negative marking. Phy+Chem+Math+English+GK.", cutoff:"CSE Manipal: rank <15,000", link:"manipal.edu" },
  { name:"COMEDK",        full:"Consortium of ME & Dental Colleges of Karnataka", for:"180+ private colleges in Karnataka", eligibility:"12th PCM ≥45% Gen / 40% reserved.", marks:"180 questions in 3 hrs. No negative marking. Phy+Chem+Math.", cutoff:"RVCE/BMS CSE: <4000; Mid-tier KA: <8000", link:"comedk.org" },
  { name:"KCET",          full:"Karnataka Common Entrance Test", for:"Govt & aided colleges in Karnataka (state quota)", eligibility:"12th PCM ≥45% + Karnataka domicile/study certificate.", marks:"180 questions in 3 hrs. No negative marking.", cutoff:"RVCE CSE: <5000; BMS: <6000", link:"kea.kar.nic.in" },
  { name:"MHT-CET",       full:"Maharashtra Common Entrance Test", for:"All engineering colleges in Maharashtra", eligibility:"12th PCM ≥50% Gen / 45% reserved. Maharashtra domicile for state quota.", marks:"150 questions in 3 hrs (Math 100 + Phy+Chem 50 each). No negative marking.", cutoff:"COEP CSE: 99%ile+; VJTI: 97%ile+; Good private: 93-95%ile+", link:"cetcell.mahacet.org" },
  { name:"WBJEE",         full:"West Bengal Joint Entrance Exam", for:"Engineering colleges in West Bengal (Jadavpur Univ etc.)", eligibility:"12th PCM ≥45% Gen / 40% SC·ST. WB domicile for state colleges.", marks:"155 questions. Negative marking −1/3. Math 75 + Phy+Chem 40 each.", cutoff:"Jadavpur CSE: <500; Other top WB: <2000-5000", link:"wbjeeb.nic.in" },
  { name:"TNEA",          full:"Tamil Nadu Engineering Admissions", for:"All Anna University affiliated colleges in Tamil Nadu", eligibility:"12th PCM + TN domicile. No entrance exam — pure merit on Class 12 marks.", marks:"Class 12 marks: Math 200 + Phy 100 + Chem 100 = 400 max. Normalised for boards.", cutoff:"Anna Univ CEG CSE: 195+/200 in Math; SSN: Very high cutoff; Top TN private: 185+", link:"tneaonline.org" },
  { name:"UGEE (IIIT-H)", full:"Undergraduate Entrance Exam",   for:"IIIT Hyderabad",                  eligibility:"12th PCM ≥60%. JEE Main shortlisting required + UGEE paper + Interview.", marks:"2-stage: JEE Main %ile shortlist + UGEE (Math+RP+STS) + Interview for Research Mode.", cutoff:"JEE Main 95+%ile for shortlisting; final UGEE rank <500", link:"iiit.ac.in" },
  { name:"KEAM",          full:"Kerala Engineering Architecture Medical", for:"Engineering colleges in Kerala (state quota)", eligibility:"12th PCM ≥45%. Kerala domicile or study for state quota.", marks:"Based on JEE Main %ile + Class 12 marks (50:50 weightage).", cutoff:"CET Trivandrum CSE: KEAM rank <2500; Model Engineering: <3000; GEC Thrissur: <5000", link:"cee.kerala.gov.in" },
  { name:"AEEE",          full:"Amrita Engineering Entrance Exam", for:"Amrita Vishwa Vidyapeetham campuses", eligibility:"12th PCM ≥60% Gen / 55% SC·ST. Age 17-25.", marks:"100 questions in 2.5 hrs. No negative marking. Math+Phy+Chem.", cutoff:"CSE Coimbatore campus: rank <15,000", link:"amrita.edu" },
  { name:"AP/TS EAMCET",  full:"Engineering Agriculture Medical Common Entrance Test", for:"All engineering colleges in AP & Telangana", eligibility:"12th PCM ≥45%. AP/TS domicile for state quota.", marks:"160 questions in 3 hrs. Math 80 + Phy+Chem 40 each. Negative marking −1/4.", cutoff:"CBIT/VNR CSE: rank <5000; Good TS/AP private: <8000", link:"eamcet.tsche.ac.in" },
];

// =================== BRANCHES DATA ===================
const BRANCHES = [
  { name:"Computer Science Engineering (CSE)", code:"CSE", demand:"🔥 Extreme",    avg_package:"₹15-55 LPA (varies by tier)",  top_package:"₹5.5 Cr (IIT Kanpur – Jane Street)", eligibility:"PCM in 12th, ≥75% for IITs/NITs. JEE Advanced for IITs, JEE Main for NITs.", skills:"DSA, OOP, DBMS, OS, CN, ML/AI, System Design", top_roles:"SDE, SWE, ML Engineer, Quant Analyst, Product Manager", trend:"Highest avg packages; CSE from top IITs often 3–5× other branches", companies:"Google, Microsoft, Amazon, Goldman Sachs, DE Shaw, Tower Research, Jane Street" },
  { name:"Data Science & AI (new branch)",     code:"DS/AI",demand:"🔥 Extreme",    avg_package:"₹15-45 LPA",                   top_package:"₹1 Cr+ (IITs & IIITs)",             eligibility:"PCM. New branch at select IITs, IIITs, private colleges from 2019-20 onwards.", skills:"ML, Deep Learning, Statistics, Python, NLP, Data Engineering", top_roles:"ML Engineer, Data Scientist, AI Researcher, Research Scientist", trend:"Newest and fastest-growing; packages close to CSE at good institutes", companies:"Google DeepMind, OpenAI, Microsoft AI, Amazon Science, Flipkart DS" },
  { name:"Information Technology (IT)",        code:"IT",   demand:"🔥 High",       avg_package:"₹12-40 LPA",                   top_package:"₹90+ LPA",                           eligibility:"Same as CSE for most colleges. Slightly lower cutoffs at some.", skills:"Same as CSE + Networking, Cybersecurity, Cloud Computing, DevOps", top_roles:"SDE, DevOps Engineer, Cybersecurity Analyst, Cloud Architect", trend:"Near-identical to CSE in most colleges; only marginally lower at a few", companies:"Same as CSE: Google, Microsoft, Amazon, TCS, Infosys, Wipro" },
  { name:"Electronics & Communication (ECE)",  code:"ECE",  demand:"🔶 High",       avg_package:"₹10-32 LPA",                   top_package:"₹90 LPA (IIT Hyderabad)",            eligibility:"PCM in 12th. Same exam as CSE for respective institutes.", skills:"Signals, VLSI, Embedded Systems, Communication, Digital Electronics, RF", top_roles:"VLSI Engineer, Embedded Developer, Hardware Design, RF Engineer", trend:"2nd best after CSE; VLSI roles pay comparable to software at top IITs", companies:"Qualcomm, Texas Instruments, Samsung Semi, Intel, Nvidia, AMD" },
  { name:"Electrical Engineering (EE/EEE)",    code:"EE",   demand:"🔶 High",       avg_package:"₹9-22 LPA",                    top_package:"₹60-80 LPA",                         eligibility:"PCM in 12th. Same entrance exams.", skills:"Power Systems, Control Systems, Electrical Machines, Signal Processing", top_roles:"Power Engineer, Control Engineer, R&D, Systems Engineer", trend:"Strong at IITs; many switch to software/data science roles", companies:"Siemens, L&T, ABB, Schneider Electric, BHEL, Indian Army Tech Corps" },
  { name:"Mechanical Engineering (ME)",        code:"ME",   demand:"🔷 Moderate",   avg_package:"₹7-20 LPA",                    top_package:"₹50-60 LPA",                         eligibility:"PCM in 12th. Same entrance exams.", skills:"CAD/CAM, Thermodynamics, Manufacturing, Fluid Mechanics, FEA", top_roles:"Design Engineer, Manufacturing Engineer, Product Manager, R&D", trend:"Lower avg than CSE/ECE; switching to IT/consulting is common from top IITs", companies:"Tata Motors, Maruti Suzuki, ISRO, DRDO, L&T, McKinsey (consulting)" },
  { name:"Civil Engineering (CE)",             code:"CE",   demand:"🔷 Moderate",   avg_package:"₹6-14 LPA",                    top_package:"₹30-45 LPA",                         eligibility:"PCM in 12th. Same entrance exams. Popular for PSU/Govt jobs.", skills:"Structural Analysis, Geotechnical, Transportation, AutoCAD, Surveying", top_roles:"Site Engineer, Project Manager, Structural Design, Urban Planner", trend:"PSU & Govt sector dominant; UPSC IES exam popular; stable career path", companies:"L&T Construction, NHAI, DMRC, CPWD, PWD, Indian Railways" },
  { name:"Chemical Engineering (ChE)",         code:"ChE",  demand:"🔷 Moderate",   avg_package:"₹8-18 LPA",                    top_package:"₹40-60 LPA",                         eligibility:"PCM in 12th. Available at IITs and select NITs.", skills:"Process Design, Thermodynamics, Reaction Engineering, Safety, Simulation", top_roles:"Process Engineer, R&D Chemist, Petroleum Engineer, Consultant", trend:"Oil & Gas sector bounced back; IIT ChemE grads do well; niche demand", companies:"Reliance, ONGC, HPCL, BASF, Shell, Procter & Gamble (Mfg)" },
  { name:"Aerospace Engineering",              code:"AE",   demand:"🔹 Niche",      avg_package:"₹8-20 LPA",                    top_package:"₹50+ LPA",                           eligibility:"PCM in 12th. Available mainly at IITs (Bombay, Madras, Kharagpur) and IIST Trivandrum.", skills:"Aerodynamics, Propulsion, Structures, Flight Mechanics, CFD", top_roles:"Aerospace Engineer, Defence R&D, Commercial Aviation, Satellite Tech", trend:"ISRO, DRDO top employers; private sector growing; many pursue MS abroad", companies:"ISRO, DRDO, HAL, Air India, Boeing, Airbus (via MS route)" },
  { name:"Metallurgical/Materials Engg",       code:"MT",   demand:"🔹 Niche",      avg_package:"₹7-16 LPA",                    top_package:"₹35-50 LPA",                         eligibility:"PCM in 12th. Available at select IITs and NITs.", skills:"Material Science, Heat Treatment, Alloys, Corrosion, Manufacturing", top_roles:"Material Scientist, Steel Plant Engineer, R&D, Quality Control", trend:"Core sector; IIT graduates often switch to CSE/coding roles", companies:"Tata Steel, JSW, SAIL, NALCO, BHEL, BEL" },
];

const TIERS   = ["All","IIT","NIT","IIIT","Private","State Govt","Private-Aided"];
const SORT_OPT= [
  {label:"Avg Package 2024", key:"avg24"},
  {label:"Median Package",   key:"median24"},
  {label:"Top Package",      key:"top24"},
  {label:"Placement %",      key:"placed24"},
  {label:"CSE Avg",          key:"cse_avg"},
];
const fmtCr = v => v == null ? "N/A" : v >= 100 ? `₹${(v/100).toFixed(2)} Cr` : `₹${v} LPA`;
const TC = { IIT:"#f59e0b",NIT:"#3b82f6",IIIT:"#a855f7",Private:"#10b981","State Govt":"#ef4444","Private-Aided":"#06b6d4" };

export default function BtechGuide() {
  const [tab,     setTab]     = useState("colleges");
  const [search,  setSearch]  = useState("");
  const [tier,    setTier]    = useState("All");
  const [sortKey, setSortKey] = useState("avg24");
  const [expBr,   setExpBr]   = useState(null);
  const [expEx,   setExpEx]   = useState(null);
  const [expCol,  setExpCol]  = useState(null);

  const filtered = useMemo(() => {
    let list = [...COLLEGES];
    if (tier !== "All") list = list.filter(c => c.tier === tier);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q) || c.exam.toLowerCase().includes(q));
    }
    list.sort((a,b)=>(b[sortKey]??0)-(a[sortKey]??0));
    return list;
  }, [search, tier, sortKey]);

  return (
    <div style={{fontFamily:"'IBM Plex Mono',monospace",background:"#080810",color:"#e2e8f0",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#222 #080810}
        ::-webkit-scrollbar{width:5px;height:5px} ::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
        .tb{background:none;border:none;color:#64748b;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:11px;padding:9px 16px;border-bottom:2px solid transparent;transition:all .2s;letter-spacing:.08em;text-transform:uppercase}
        .tb.active{color:#f59e0b;border-bottom:2px solid #f59e0b} .tb:hover{color:#cbd5e1}
        .card{background:#0f0f1c;border:1px solid #1a1a2e;border-radius:6px;padding:14px;transition:border-color .15s;cursor:pointer}
        .card:hover{border-color:#2a2a4e} .card.on{border-color:#f59e0b}
        .pill{display:inline-block;padding:2px 8px;border-radius:3px;font-size:10px;font-weight:600;letter-spacing:.08em}
        .sb{background:#0d0d1a;border:1px solid #1a1a2e;border-radius:4px;padding:9px 12px;text-align:center}
        input,select{background:#0f0f1c;border:1px solid #222236;border-radius:4px;color:#e2e8f0;padding:7px 11px;font-family:'IBM Plex Mono',monospace;font-size:11px;outline:none;transition:border-color .2s}
        input:focus,select:focus{border-color:#f59e0b}
        .note{background:#100f00;border:1px solid #3a2e00;border-radius:4px;padding:10px 14px;font-size:10px;color:#fbbf24;line-height:1.7}
      `}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#0c0c1a 0%,#150a05 100%)",borderBottom:"1px solid #1a1a2e",padding:"20px 18px 0"}}>
        <div style={{width:"100%"}}>
          <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:4}}>
            <span style={{fontSize:20,fontWeight:800,color:"#f59e0b",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:"-.02em"}}>BTech India 200</span>
            <span style={{fontSize:10,color:"#475569",letterSpacing:".15em",textTransform:"uppercase"}}>Placement Intelligence · 2022–2024</span>
          </div>
          <p style={{fontSize:10,color:"#475569",marginBottom:10}}>200 colleges · Ranked by real placement data (not NIRF) · Entrance exams · Full eligibility · Branch-wise breakdown</p>
          <div className="note" style={{marginBottom:10}}>
            ⚡ NIRF excluded per request. Ranked by avg/median placement (2024). Data: official placement reports + NIRF disclosures + verified media. Colleges 130–200 use approximate/estimated data — treat as directional guidance. Always verify at official college sites.
          </div>
          <div style={{display:"flex",gap:0,overflowX:"auto"}}>
            {[{id:"colleges",label:"🏛 200 Rankings"},{id:"branches",label:"⚙ Branches"},{id:"exams",label:"📋 Exams & Eligibility"},{id:"analysis",label:"📈 3-Year Analysis"}].map(t=>(
              <button key={t.id} className={`tb ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{width:"100%",padding:"18px 14px"}}>

        {/* ========== TAB: COLLEGES ========== */}
        {tab==="colleges" && (
          <div>
            <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
              <input placeholder="🔍 Search name / city / state / exam..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:"1 1 200px",minWidth:170}} />
              <select value={tier} onChange={e=>setTier(e.target.value)}>
                {TIERS.map(t=><option key={t} value={t}>{t==="All"?"All Tiers":t}</option>)}
              </select>
              <select value={sortKey} onChange={e=>setSortKey(e.target.value)}>
                {SORT_OPT.map(o=><option key={o.key} value={o.key}>↓ {o.label}</option>)}
              </select>
              <span style={{fontSize:10,color:"#475569",whiteSpace:"nowrap"}}>{filtered.length} / 200</span>
            </div>

            {/* Tier legend */}
            <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
              {Object.entries(TC).map(([t,c])=>(
                <span key={t} onClick={()=>setTier(tier===t?"All":t)}
                  style={{cursor:"pointer",fontSize:10,padding:"2px 9px",borderRadius:3,background:`${c}18`,border:`1px solid ${c}55`,color:c,opacity:tier!=="All"&&tier!==t?.35:1,transition:"opacity .2s"}}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {filtered.map((col, idx) => {
                const isExp = expCol===col.id;
                const tc = TC[col.tier]||"#888";
                return (
                  <div key={col.id} className={`card ${isExp?"on":""}`} onClick={()=>setExpCol(isExp?null:col.id)}>
                    <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                      {/* Rank in current sorted list */}
                      <span style={{minWidth:30,fontSize:13,color:"#f59e0b",fontWeight:700,fontFamily:"'Space Grotesk',sans-serif"}}>
                        #{idx+1}
                      </span>
                      <span className="pill" style={{background:`${tc}18`,border:`1px solid ${tc}55`,color:tc,minWidth:70,textAlign:"center"}}>{col.tier}</span>
                      <div style={{flex:1,minWidth:130}}>
                        <div style={{fontSize:13,fontWeight:600,color:"#f1f5f9",lineHeight:1.3}}>{col.name}</div>
                        <div style={{fontSize:9,color:"#475569"}}>{col.city}, {col.state}</div>
                      </div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <div className="sb"><div style={{fontSize:8,color:"#475569",marginBottom:1}}>AVG'24</div><div style={{fontSize:12,color:"#10b981",fontWeight:700}}>{col.avg24}L</div></div>
                        <div className="sb"><div style={{fontSize:8,color:"#475569",marginBottom:1}}>MEDIAN</div><div style={{fontSize:12,color:"#3b82f6",fontWeight:700}}>{col.median24}L</div></div>
                        <div className="sb"><div style={{fontSize:8,color:"#475569",marginBottom:1}}>TOP'24</div><div style={{fontSize:12,color:"#f59e0b",fontWeight:700}}>{fmtCr(col.top24)}</div></div>
                        <div className="sb"><div style={{fontSize:8,color:"#475569",marginBottom:1}}>PLACED%</div><div style={{fontSize:12,color:"#a855f7",fontWeight:700}}>{col.placed24}%</div></div>
                      </div>
                      <span style={{fontSize:12,color:isExp?"#f59e0b":"#334155",transform:isExp?"rotate(90deg)":"rotate(0deg)",display:"inline-block",transition:"transform .2s",marginLeft:4}}>▶</span>
                    </div>

                    {isExp && (
                      <div style={{marginTop:12,borderTop:"1px solid #1a1a2e",paddingTop:12}} onClick={e=>e.stopPropagation()}>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
                          {/* Trend */}
                          <div>
                            <div style={{fontSize:9,color:"#f59e0b",marginBottom:7,letterSpacing:".1em"}}>📊 PLACEMENT TREND</div>
                            {[{yr:"2022",v:col.avg22},{yr:"2023",v:col.avg23},{yr:"2024",v:col.avg24}].map(({yr,v})=>(
                              <div key={yr} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                                <span style={{fontSize:9,color:"#475569",minWidth:28}}>{yr}</span>
                                <div style={{flex:1,background:"#0a0a14",borderRadius:2,height:6,overflow:"hidden"}}>
                                  <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#f59e0b,#10b981)",width:`${Math.min(100,(v/30)*100)}%`}}/>
                                </div>
                                <span style={{fontSize:10,color:"#e2e8f0",minWidth:32,textAlign:"right"}}>₹{v}L</span>
                              </div>
                            ))}
                          </div>
                          {/* Branch */}
                          <div>
                            <div style={{fontSize:9,color:"#f59e0b",marginBottom:7,letterSpacing:".1em"}}>⚙ BRANCH AVG (2024)</div>
                            {[["CSE",col.cse_avg,col.cse_top],["ECE",col.ece_avg,null],["Mech",col.mech_avg,null],["Civil",col.civil_avg,null]]
                              .filter(([,a])=>a!=null).map(([b,avg,top])=>(
                              <div key={b} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,padding:"3px 7px",background:"#0a0a14",borderRadius:3}}>
                                <span style={{fontSize:9,color:"#94a3b8",minWidth:28}}>{b}</span>
                                <span style={{fontSize:10,color:"#10b981"}}>₹{avg}L avg</span>
                                {top && <span style={{fontSize:9,color:"#f59e0b"}}>Top {fmtCr(top)}</span>}
                              </div>
                            ))}
                          </div>
                          {/* Admission */}
                          <div>
                            <div style={{fontSize:9,color:"#f59e0b",marginBottom:7,letterSpacing:".1em"}}>📋 ADMISSION</div>
                            <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.7}}>
                              <div><span style={{color:"#e2e8f0"}}>Exam: </span>{col.exam}</div>
                              <div><span style={{color:"#e2e8f0"}}>Fee: </span>{col.fee}</div>
                              <div><span style={{color:"#e2e8f0"}}>Cutoff: </span>{col.cutoff}</div>
                              <div style={{marginTop:6,fontSize:9,color:"#475569"}}>12th: PCM ≥75% for IIT/NIT. ≥45-60% for private.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{textAlign:"center",padding:40,color:"#475569",fontSize:12}}>No colleges match your search / filter.</div>
              )}
            </div>
          </div>
        )}

        {/* ========== TAB: BRANCHES ========== */}
        {tab==="branches" && (
          <div>
            <div style={{marginBottom:12,fontSize:10,color:"#64748b"}}>Complete guide to all major BTech branches — demand, packages, eligibility & career paths</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {BRANCHES.map(br=>{
                const isExp = expBr===br.code;
                const dc = br.demand.includes("Extreme")?"#f59e0b":br.demand.includes("High")?"#10b981":br.demand.includes("Moderate")?"#3b82f6":"#94a3b8";
                return (
                  <div key={br.code} className={`card ${isExp?"on":""}`} onClick={()=>setExpBr(isExp?null:br.code)}>
                    <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                      <div style={{flex:1,minWidth:140}}>
                        <div style={{fontSize:13,fontWeight:600,color:"#f1f5f9"}}>{br.name}</div>
                        <div style={{fontSize:9,color:"#475569",marginTop:2}}>Code: {br.code}</div>
                      </div>
                      <div className="sb"><div style={{fontSize:8,color:"#475569",marginBottom:1}}>DEMAND</div><div style={{fontSize:10,color:dc,fontWeight:700}}>{br.demand}</div></div>
                      <div className="sb"><div style={{fontSize:8,color:"#475569",marginBottom:1}}>AVG PKG</div><div style={{fontSize:10,color:"#10b981",fontWeight:600}}>{br.avg_package}</div></div>
                      <div className="sb"><div style={{fontSize:8,color:"#475569",marginBottom:1}}>TOP PKG</div><div style={{fontSize:10,color:"#f59e0b",fontWeight:600}}>{br.top_package}</div></div>
                      <span style={{fontSize:12,color:isExp?"#f59e0b":"#334155",transform:isExp?"rotate(90deg)":"rotate(0)",display:"inline-block",transition:".2s"}}>▶</span>
                    </div>
                    {isExp && (
                      <div style={{marginTop:12,borderTop:"1px solid #1a1a2e",paddingTop:12,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}} onClick={e=>e.stopPropagation()}>
                        <div><div style={{fontSize:9,color:"#f59e0b",marginBottom:5}}>📋 ELIGIBILITY</div><div style={{fontSize:10,color:"#94a3b8",lineHeight:1.7}}>{br.eligibility}</div></div>
                        <div>
                          <div style={{fontSize:9,color:"#f59e0b",marginBottom:5}}>🛠 KEY SKILLS</div><div style={{fontSize:10,color:"#94a3b8",lineHeight:1.7}}>{br.skills}</div>
                          <div style={{marginTop:7,fontSize:9,color:"#f59e0b",marginBottom:4}}>💼 TOP ROLES</div><div style={{fontSize:10,color:"#94a3b8"}}>{br.top_roles}</div>
                        </div>
                        <div>
                          <div style={{fontSize:9,color:"#f59e0b",marginBottom:5}}>🏢 TOP COMPANIES</div><div style={{fontSize:10,color:"#94a3b8",lineHeight:1.7,marginBottom:8}}>{br.companies}</div>
                          <div style={{padding:"7px",background:"#0a1410",border:"1px solid #0d2e1e",borderRadius:4}}>
                            <div style={{fontSize:9,color:"#10b981",marginBottom:3}}>📈 TREND</div>
                            <div style={{fontSize:9,color:"#94a3b8"}}>{br.trend}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:14,background:"#0a1410",border:"1px solid #0d2e1e",borderRadius:6,padding:14}}>
              <div style={{fontSize:10,color:"#10b981",marginBottom:8,fontWeight:700}}>💡 BRANCH SELECTION STRATEGY</div>
              <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.9}}>
                <strong style={{color:"#e2e8f0"}}>IIT branch order by avg pkg:</strong> CSE / DS-AI {'>'} IT {'>'} ECE {'>'} EE {'>'} Chemical {'>'} Aerospace {'>'} Mech {'>'} Civil {'>'} Metallurgy<br/>
                <strong style={{color:"#e2e8f0"}}>Key rule:</strong> Lower branch at IIT Bombay still beats most branches at mid-tier NITs. But NIT Trichy CSE vs IIT Dhanbad Mech — NIT Trichy CSE wins easily.<br/>
                <strong style={{color:"#e2e8f0"}}>Switch trend:</strong> Mech/Civil/Chemical students from top IITs pivot to software/data science — effectively getting "CSE packages" with a non-CSE degree.<br/>
                <strong style={{color:"#e2e8f0"}}>PSU/Govt route:</strong> Civil, EE, Mech, ECE, Chemical — GATE exam opens PSU doors (BHEL, NTPC, ONGC etc). IES exam for top roles.
              </div>
            </div>
          </div>
        )}

        {/* ========== TAB: EXAMS ========== */}
        {tab==="exams" && (
          <div>
            <div className="note" style={{marginBottom:14}}>
              ⚡ <strong>Universal Eligibility:</strong> 10+2 / Class 12 passed with Physics, Chemistry & Mathematics compulsory. Minimum 75% aggregate (Gen/OBC) or 65% (SC/ST/PwD) for IITs/NITs/IIITs. Private colleges usually accept 45–60%. Each PCM subject must be passed individually. 12th appearing students can apply but must produce marksheet before admission.
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {EXAMS.map(ex=>{
                const isExp = expEx===ex.name;
                return (
                  <div key={ex.name} className={`card ${isExp?"on":""}`} onClick={()=>setExpEx(isExp?null:ex.name)}>
                    <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                      <div style={{flex:1,minWidth:140}}>
                        <div style={{fontSize:13,fontWeight:600,color:"#f1f5f9"}}>{ex.name}</div>
                        <div style={{fontSize:9,color:"#475569"}}>{ex.full}</div>
                      </div>
                      <div className="sb" style={{minWidth:110}}><div style={{fontSize:8,color:"#475569",marginBottom:1}}>FOR</div><div style={{fontSize:9,color:"#f59e0b"}}>{ex.for}</div></div>
                      <span style={{fontSize:12,color:isExp?"#f59e0b":"#334155",transform:isExp?"rotate(90deg)":"rotate(0)",display:"inline-block",transition:".2s"}}>▶</span>
                    </div>
                    {isExp && (
                      <div style={{marginTop:12,borderTop:"1px solid #1a1a2e",paddingTop:12,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(195px,1fr))",gap:12}} onClick={e=>e.stopPropagation()}>
                        <div><div style={{fontSize:9,color:"#f59e0b",marginBottom:5}}>✅ ELIGIBILITY</div><div style={{fontSize:10,color:"#94a3b8",lineHeight:1.7}}>{ex.eligibility}</div></div>
                        <div><div style={{fontSize:9,color:"#f59e0b",marginBottom:5}}>📝 EXAM PATTERN</div><div style={{fontSize:10,color:"#94a3b8",lineHeight:1.7}}>{ex.marks}</div></div>
                        <div>
                          <div style={{fontSize:9,color:"#f59e0b",marginBottom:5}}>📊 CUTOFF TRENDS</div>
                          <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.7}}>{ex.cutoff}</div>
                          <div style={{marginTop:8,padding:"5px 9px",background:"#0a0a14",border:"1px solid #1a1a2e",borderRadius:4}}>
                            <span style={{fontSize:9,color:"#475569"}}>🌐 </span><span style={{fontSize:9,color:"#3b82f6"}}>{ex.link}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{marginTop:16,background:"#0f0f1c",border:"1px solid #1a1a2e",borderRadius:6,padding:14}}>
              <div style={{fontSize:10,color:"#f59e0b",marginBottom:10,fontWeight:700}}>📅 EXAM CALENDAR (Typical Academic Year)</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:7}}>
                {[
                  {p:"Sep–Nov",e:"VITEEE, SRMJEEE, MU OET reg open. JEE Main Jan session reg begins."},
                  {p:"Jan",    e:"JEE Main Session 1. BITSAT registration opens."},
                  {p:"Feb–Mar",e:"MHT-CET, WBJEE, KEAM, AP/TS EAMCET reg. BITSAT slot booking."},
                  {p:"Apr",    e:"JEE Main Session 2. KCET. WBJEE. VITEEE. SRMJEEE. COMEDK reg."},
                  {p:"May",    e:"JEE Advanced (if qualified). BITSAT. MHT-CET. COMEDK. MET Manipal."},
                  {p:"Jun",    e:"TNEA counselling. UGEE (IIIT-H). JoSAA counselling begins (IITs, NITs, IIITs)."},
                  {p:"Jul–Sep",e:"State counsellings (MHT-CET, KCET, WBJEE etc). Private college admissions close."},
                ].map(e=>(
                  <div key={e.p} style={{background:"#0a0a14",border:"1px solid #1a1a2e",borderRadius:4,padding:"8px 10px"}}>
                    <div style={{fontSize:10,color:"#f59e0b",fontWeight:700,marginBottom:3}}>{e.p}</div>
                    <div style={{fontSize:9,color:"#94a3b8",lineHeight:1.5}}>{e.e}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== TAB: ANALYSIS ========== */}
        {tab==="analysis" && (
          <div>
            <div style={{fontSize:10,color:"#64748b",marginBottom:14}}>3-year trend analysis (2022→2024) across tiers, branches, and key insights</div>

            {/* Top 7 IIT trend bars */}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:"#f59e0b",marginBottom:10,fontWeight:700,letterSpacing:".08em"}}>TOP 7 IITs — AVG PACKAGE TREND (₹ LPA)</div>
              {COLLEGES.filter(c=>c.tier==="IIT").slice(0,7).map(col=>(
                <div key={col.id} style={{marginBottom:9}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:10,color:"#e2e8f0"}}>{col.name}</span>
                    <div style={{display:"flex",gap:10,fontSize:9}}>
                      <span style={{color:"#475569"}}>22: ₹{col.avg22}L</span>
                      <span style={{color:"#94a3b8"}}>23: ₹{col.avg23}L</span>
                      <span style={{color:"#10b981",fontWeight:700}}>24: ₹{col.avg24}L</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:2}}>
                    {[{v:col.avg22,op:.3},{v:col.avg23,op:.6},{v:col.avg24,op:1}].map(({v,op},i)=>(
                      <div key={i} style={{flex:1,height:8,background:"#0a0a14",borderRadius:2,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${Math.min(100,(v/30)*100)}%`,background:`rgba(245,158,11,${op})`,borderRadius:2}}/>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Key stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:10,marginBottom:18}}>
              {[
                {t:"🔥 Highest Package 2024-25",   stat:"₹5.5 Crore",  sub:"IIT Kanpur — Jane Street (Quant Trading, Amsterdam)",color:"#f59e0b"},
                {t:"📈 Best Avg Package IIT",       stat:"IIT Guwahati",sub:"₹25.75L avg — better than older IITs like KGP",     color:"#10b981"},
                {t:"🏅 Best Median (IIT)",          stat:"₹21.6 LPA",   sub:"IIT Guwahati 2024; IIT Madras ₹19.6L close 2nd",    color:"#3b82f6"},
                {t:"🏆 Best NIT Top Package",       stat:"₹120 LPA",    sub:"NIT Rourkela (CSE); NIT Warangal ₹88L; NIT Trichy ₹64L",color:"#a855f7"},
                {t:"✅ Most Reliable NIT",          stat:"NIT Trichy",   sub:"100% placement, avg ₹22L, CSE avg ₹27.17L",          color:"#10b981"},
                {t:"💡 Best Govt ROI",              stat:"IIT Guwahati", sub:"₹25.75L avg on ₹9L total fee ≈ 186% ROI",           color:"#f59e0b"},
                {t:"🌐 Most Intl Offers (2024)",    stat:"IIT Bombay",   sub:"78 international offers — Japan, UAE, USA, EU",      color:"#3b82f6"},
                {t:"💰 Best Private Value",         stat:"BITS Pilani",  sub:"₹17L avg, ₹120L top package, strong alumni network", color:"#10b981"},
              ].map(i=>(
                <div key={i.t} style={{background:"#0f0f1c",border:`1px solid ${i.color}33`,borderRadius:6,padding:12}}>
                  <div style={{fontSize:9,color:"#475569",marginBottom:5}}>{i.t}</div>
                  <div style={{fontSize:16,fontWeight:700,color:i.color,marginBottom:3}}>{i.stat}</div>
                  <div style={{fontSize:9,color:"#94a3b8"}}>{i.sub}</div>
                </div>
              ))}
            </div>

            {/* Tier median comparison */}
            <div style={{background:"#0f0f1c",border:"1px solid #1a1a2e",borderRadius:6,padding:14,marginBottom:16}}>
              <div style={{fontSize:10,color:"#f59e0b",marginBottom:10,fontWeight:700}}>📊 MEDIAN PACKAGE BY TIER — 2022 vs 2023 vs 2024</div>
              {[
                {t:"Old IITs (Bombay/Delhi/Madras/Kanpur/KGP/Roorkee/Guwahati)",y22:18,y23:20,y24:21.5,c:"#f59e0b"},
                {t:"2nd Gen IITs (BHU/Indore/Hyderabad/Bhubaneswar etc.)",       y22:12,y23:14,y24:15.5,c:"#f59e0baa"},
                {t:"New IITs (Ropar/Jammu/Goa/Bhilai/Tirupati etc.)",            y22:9, y23:11,y24:12.5,c:"#f59e0b55"},
                {t:"NIT Tier 1 (Trichy / NITK / Calicut)",                       y22:17,y23:19,y24:22,  c:"#3b82f6"},
                {t:"NIT Tier 2 (Warangal / MNIT / MANIT / NIT Delhi)",           y22:12,y23:13.5,y24:15,c:"#3b82f6aa"},
                {t:"NIT Tier 3 (Patna / Durgapur / Small NITs)",                 y22:8, y23:9.5,y24:11,  c:"#3b82f655"},
                {t:"IIITs (IIIT-H / IIIT-D / IIIT Allahabad)",                  y22:16,y23:18,y24:20,  c:"#a855f7"},
                {t:"BITS Pilani",                                                  y22:14,y23:16,y24:17,  c:"#10b981"},
                {t:"Top Private (VIT / Manipal / Thapar / Amrita)",              y22:8, y23:9, y24:10,  c:"#10b98188"},
                {t:"Average Private (SRM / Amity / KIIT / LPU)",                 y22:5, y23:6, y24:7,   c:"#10b98144"},
                {t:"Mid Private (Tamil Nadu / Karnataka / AP local)",             y22:5, y23:6, y24:7,   c:"#64748b"},
              ].map(row=>(
                <div key={row.t} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,flexWrap:"wrap"}}>
                  <span style={{minWidth:240,fontSize:9,color:"#94a3b8"}}>{row.t}</span>
                  <div style={{flex:1,display:"flex",gap:3,minWidth:120}}>
                    {[row.y22,row.y23,row.y24].map((v,i)=>(
                      <div key={i} style={{flex:1,height:18,background:"#0a0a14",borderRadius:2,overflow:"hidden",position:"relative"}}>
                        <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${Math.min(100,(v/30)*100)}%`,background:row.c,borderRadius:2}}/>
                        <span style={{position:"absolute",left:4,top:0,lineHeight:"18px",fontSize:8,color:"#fff",fontWeight:700,whiteSpace:"nowrap"}}>₹{v}L</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{display:"flex",gap:14,marginTop:6}}>
                {["2022","2023","2024"].map((y,i)=>(
                  <span key={y} style={{fontSize:9,color:["#475569","#94a3b8","#e2e8f0"][i]}}>■ {y}</span>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div style={{background:"#0a1410",border:"1px solid #0d2e1e",borderRadius:6,padding:14}}>
              <div style={{fontSize:10,color:"#10b981",marginBottom:10,fontWeight:700}}>📈 KEY MARKET TRENDS 2022–2025</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12,fontSize:10,color:"#94a3b8",lineHeight:1.8}}>
                <div><div style={{color:"#e2e8f0",fontWeight:600,marginBottom:3}}>📉 IT Hiring Slowdown (2023)</div>Mass layoffs at TCS/Infosys/Wipro/Meta affected Tier 3 colleges heavily. Product companies at IITs/NITs less affected. Mid-tier private college avg dropped 15-20%.</div>
                <div><div style={{color:"#e2e8f0",fontWeight:600,marginBottom:3}}>🚀 Quant/HFT Explosion</div>Jane Street, D.E. Shaw, Tower Research, Quadeye, Graviton driving ₹1Cr+ offers at IIT Bombay/Kanpur/Delhi. These firms target Math + CS students exclusively.</div>
                <div><div style={{color:"#e2e8f0",fontWeight:600,marginBottom:3}}>🤖 AI/ML Premium (2024–25)</div>Companies paying 20-30% premium for AI/ML specialization. DS/AI branch at IIITs and new IITs seeing packages rivaling CSE. OpenAI, Google DeepMind now recruiting.</div>
                <div><div style={{color:"#e2e8f0",fontWeight:600,marginBottom:3}}>🌏 International Offers Rising</div>IIT Bombay: 78 intl offers in 2024 (↑ from 65 in 2023). Japan, UAE, Netherlands, Singapore most active. Packages ₹50–300+L range. New IITs also getting 5-8 intl offers.</div>
              </div>
            </div>

            <div style={{marginTop:12}} className="note">
              ⚠️ <strong>Data Disclaimer:</strong> Compiled from official placement reports, NIRF disclosures 2023-25, verified media reports. "Average" package at most colleges excludes non-participating students (so real student-wide avg is lower). Median is a more honest indicator. Colleges 130-200 data is partially estimated — treat directionally. Verify at official college websites before taking any admission decision.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
