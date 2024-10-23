// CreateAccount.js
import  {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app,analytics} from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore ,collection, addDoc } from "firebase/firestore";


import './CreateAccount.css';



export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userImage , setUserImage] = useState('')
  const [imageUrl,setImageUrl] = useState()
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    const db = getFirestore(app);
    async ()=>{
      const docRef = await addDoc(collection(db, "image"), {
        userImage :imageUrl
      });
      console.log("Document written with ID: ", docRef.id);
    }
    // Firebase section start
    const storage = getStorage();

    // Create the file metadata
    if (userImage) {
      const storageRef = ref(storage, 'images/' + userImage.name);
      const uploadTask = uploadBytesResumable(storageRef, userImage);

      // Wait for the upload to complete
    async()=>  await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Upload failed:', error);
            reject(error);
          },
          async () => {
            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            setImageUrl(downloadURL);
            resolve(downloadURL);
          }
        );
      });
  

    const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      
    });
   
    // Firebase section end
    // Handle account creation logic here (e.g., validation)
    console.log('Creating account with:', username, email, password);

    // Call the createAccount function from context
    navigate('/home'); // Navigate to the dashboard after creating the account
  };
  }
  return (
    <div className="create-account-container">
      <h2 className='tow'>Create Account</h2>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
         File Image:
          <input
            type="file"
            onChange={(e) => setUserImage(e.target.files[0])}
            required
          />
        </label>
        <button type="submit" className="create-account-btn">Create Account</button>
      </form>
    </div>
  );
  }
