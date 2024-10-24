import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import './CreateAccount.css';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userImage, setUserImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firebase storage upload
      if (userImage) {
        const storage = getStorage();
        const storageRef = ref(storage, 'image/' + userImage.name);
        const uploadTask = uploadBytesResumable(storageRef, userImage);

        // Upload the file and get the download URL
        const downloadURL = await new Promise((resolve, reject) => {
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
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', url);
              setImageUrl(url);
              resolve(url);
            }
          );
        });

        const db = getFirestore(app);
        await addDoc(collection(db, "users"), {
          username: username,
          userImage: downloadURL, 
        });
        console.log("User created and data saved with image URL!");

        navigate('/home'); 
      }
    } catch (error) {
      console.error("Error creating account: ", error);
    }
  };

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
