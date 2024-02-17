import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {

  const [movieList, setMovieList] = useState([]);



  
  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState(0);
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false);


  const [fileUpload, setfileUpload] = useState(null);

  
  const [updatedTitle, setupdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
    getMovieList();
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { title: updatedTitle});
    getMovieList();
  }

  useEffect(() => {
    getMovieList();
  }, [])

  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef, 
      {title: newMovieTitle, 
        releasedate: newReleaseDate, 
        receivedAnOscar: isNewMovieOscar,
        UserId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
    
  };


  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err){
      console.error(err);
    }
    
  }

  
  return (
    <div className="App">
      <Auth />

      <input placeholder='movie title...' onChange={(e) => setnewMovieTitle(e.target.value)}></input>
      <input placeholder='release date...' type='number' onChange={(e) => setnewReleaseDate(Number(e.target.value))}></input>
      <input type='checkbox' checked={isNewMovieOscar}  onChange={(e) => setisNewMovieOscar(e.target.checked)}></input> <label>Received an oscar</label>
      <button onClick={onSubmitMovie}>submit movie</button>





      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}> { movie.title } </h1>
            <p>Date: { movie.releasedate } </p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='new title...' onChange={(e) => setupdatedTitle(e.target.value)}></input>
            <button onClick={() => updateMovieTitle(movie.id)}>update title</button>
          </div>
        ))}
      </div>

      <div>
        <input type='file' onChange={(e) => setfileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
