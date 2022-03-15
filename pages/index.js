import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import NoteDetails from './components/NoteDetails';
import NoteOperations from "./components/NoteOperations";

export default function Home() {
  const [ID, setID] = useState(null)
  const getSingleNote = (id) =>{
    setID(id)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Evernote</title>
        <meta name="description" content="Notes Application" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.left}>
            <NoteOperations getSingleNote={getSingleNote}/>  
          </div>
          <div className={styles.right}>
            <NoteDetails ID={ID}/>
          </div>
        </div>
      </main>
    </div>
  )
}
