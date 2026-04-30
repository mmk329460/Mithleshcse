import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [resume, setResume] = useState(null);
  const [userPin, setUserPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('checking'); 
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isLocalMode, setIsLocalMode] = useState(false);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('vault_unlocked');
    if (sessionAuth === 'true') setIsUnlocked(true);
  }, []);

  useEffect(() => {
    try {
      setDocuments(JSON.parse(localStorage.getItem('portfolio_docs') || "[]"));
      setCertificates(JSON.parse(localStorage.getItem('portfolio_certs') || "[]"));
      setResume(JSON.parse(localStorage.getItem('portfolio_resume') || "null"));
      setUserPin(localStorage.getItem('portfolio_pin') || "");
    } catch (e) { console.error("Local data load failed"); }
    setIsLoading(false);

    const isConfigured = db.app.options.apiKey && db.app.options.apiKey !== "YOUR_API_KEY";
    if (isConfigured) {
      setDbStatus('checking');
      
      const syncPendingData = async (docs, certs) => {
        try {
          for (const d of docs) {
            if (!d.firestoreId) {
              await addDoc(collection(db, "documents"), { ...d, firestoreId: null });
            }
          }
          for (const c of certs) {
            if (!c.firestoreId) {
              await addDoc(collection(db, "certificates"), { ...c, firestoreId: null });
            }
          }
        } catch (e) { console.error("Sync loop error:", e); }
      };

      onSnapshot(collection(db, "documents"), (snap) => {
        setDbStatus('connected'); 
        const d = snap.docs.map(x => ({ ...x.data(), firestoreId: x.id }));
        if (d.length > 0) {
          d.sort((a,b) => b.id - a.id);
          setDocuments(d);
          localStorage.setItem('portfolio_docs', JSON.stringify(d));
        }
        const localDocs = JSON.parse(localStorage.getItem('portfolio_docs') || "[]");
        const localCerts = JSON.parse(localStorage.getItem('portfolio_certs') || "[]");
        syncPendingData(localDocs, localCerts);
      }, (err) => setDbStatus('error'));

      onSnapshot(collection(db, "certificates"), (snap) => {
        setDbStatus('connected');
        const c = snap.docs.map(x => ({ ...x.data(), firestoreId: x.id }));
        if (c.length > 0) {
          c.sort((a,b) => b.id - a.id);
          setCertificates(c);
          localStorage.setItem('portfolio_certs', JSON.stringify(c));
        }
      }, (err) => setDbStatus('error'));

      getDoc(doc(db, "config", "masterPin")).then(s => {
        if (s.exists()) setUserPin(s.data().pin);
      }).catch(() => {});
    }
  }, []);

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("File limited to 1MB (Free Mode).");
      return;
    }

    setUploadProgress(`Processing ${type}...`);
    
    try {
      const reader = new FileReader();
      const fileBase64 = await new Promise((res, rej) => {
        reader.onload = (e) => res(e.target.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      const fileData = {
        id: Date.now(),
        name: file.name,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        url: fileBase64,
        size: (file.size / 1024).toFixed(2) + ' KB',
        timestamp: new Date().toISOString()
      };

      if (type === 'doc') {
        const newDocs = [fileData, ...documents];
        setDocuments(newDocs);
        localStorage.setItem('portfolio_docs', JSON.stringify(newDocs));
      } else if (type === 'cert') {
        const newCerts = [fileData, ...certificates];
        setCertificates(newCerts);
        localStorage.setItem('portfolio_certs', JSON.stringify(newCerts));
      } else if (type === 'resume') {
        setResume(fileData);
        localStorage.setItem('portfolio_resume', JSON.stringify(fileData));
      }

      setUploadProgress(null);
      alert(`${type.toUpperCase()} saved locally! Attempting to sync with Cloud... ☁️`);

      const isConfigured = db.app.options.apiKey && db.app.options.apiKey !== "YOUR_API_KEY";
      if (isConfigured) {
        if (type === 'doc') addDoc(collection(db, "documents"), fileData);
        else if (type === 'cert') addDoc(collection(db, "certificates"), fileData);
        else if (type === 'resume') setDoc(doc(db, "config", "resume"), fileData);
      }
    } catch (err) {
      console.error("Hybrid upload error:", err);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (file, type) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    
    try {
      if (isLocalMode) {
        if (type === 'doc') {
          const newDocs = documents.filter(d => d.id !== file.id);
          setDocuments(newDocs);
          localStorage.setItem('portfolio_docs', JSON.stringify(newDocs));
        } else if (type === 'cert') {
          const newCerts = certificates.filter(c => c.id !== file.id);
          setCertificates(newCerts);
          localStorage.setItem('portfolio_certs', JSON.stringify(newCerts));
        }
      } else {
        const collectionName = type === 'doc' ? "documents" : "certificates";
        await deleteDoc(doc(db, collectionName, file.firestoreId));
      }
      alert("Deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  };

  const handleVerifyPin = () => {
    if (pinInput === userPin) {
      setIsUnlocked(true);
      sessionStorage.setItem('vault_unlocked', 'true');
      setShowPinModal(false);
      setPinInput("");
    } else {
      alert("Incorrect master PIN!");
    }
  };

  const handleSetPin = async () => {
    if (pinInput.length < 4) {
      alert("PIN must be at least 4 digits.");
      return;
    }
    try {
      if (isLocalMode) {
        localStorage.setItem('portfolio_pin', pinInput);
        setUserPin(pinInput);
      } else {
        await setDoc(doc(db, "config", "masterPin"), { pin: pinInput });
        setUserPin(pinInput);
      }
      setIsUnlocked(true);
      sessionStorage.setItem('vault_unlocked', 'true');
      setShowPinModal(false);
      setPinInput("");
      alert("Master PIN saved permanently in database!");
    } catch (error) {
      alert("Failed to set PIN.");
    }
  };

  return (
    <AppContext.Provider value={{
      documents, certificates, resume, userPin, isUnlocked,
      setIsUnlocked, showPinModal, setShowPinModal, pinInput, setPinInput,
      isLoading, dbStatus, uploadProgress, isLocalMode,
      handleFileUpload, handleDelete, handleVerifyPin, handleSetPin
    }}>
      {children}
    </AppContext.Provider>
  );
};
