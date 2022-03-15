import styles from '../../styles/Evernote.module.scss'
import { useState, useEffect } from 'react'
import { database} from "../../firebaseConfig";
import { collection, addDoc, getDocs } from 'firebase/firestore';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from 'next/dynamic';


const dbInstance = collection(database, 'instanceNotes')

export default function NoteOperations({getSingleNote}){
    const [isInputVisible, setInputVisible] = useState(false);

    const [noteTitle, setNoteTitle] = useState("")

    const [noteDesc, setNoteDesc] = useState('')

    const [notesArray, setNotesArray] = useState([])

    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }
    

    const addDesc = (value) => {
        setNoteDesc(value)
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
        .then(() => {
            setNoteTitle('')
            setNoteDesc('')
            // getNotes('')
        })
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return {...item.data(), id: item.id}
                }))
            })

    }

    useEffect(() => {
        getNotes();
    }, [])

    
    return (
        <>
            <div className={styles.btnContainer}>
                <button onClick={inputToggle}
                    className={styles.button}    
                >
                    Add A New Note
                </button>
            </div>

            {isInputVisible ? (
                <div className={styles.inputContainer}>
                    <input 
                    className={styles.input}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder='Enter the Title .....'
                    value={noteTitle}
                    />

                    <div className={styles.ReactQuill}>
                        <ReactQuill 
                            theme='snow'
                            placeholder='Desription here'
                            onChange={addDesc}
                            value={noteDesc}
                        />
                    </div>

                    <button 
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Save Note
                    </button>
                </div>
            ) : (
                <></>
            )}
            <p>List of Notes</p>
            <div className={styles.noteContainer}>
                {notesArray.map((note) => {
                    return (
                        <div
                            onClick={() => getSingleNote(note.id)} 
                            className={styles.notesInner}>
                            <h3>{note.noteTitle}</h3>
                            {/* <div dangerouslySetInnerHTML={{ __html: note.noteDesc}}>
                            </div> */}
                        </div>
                    )
                })}
            </div>

            <div className={styles.inputContainer}>

            </div>
        </>
    ) 
}