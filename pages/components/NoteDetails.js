import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig"
import { collection, deleteDoc, doc, getDoc, getDocs , updateDoc} from "firebase/firestore";
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from 'next/dynamic';
import styles from '../../styles/Evernote.module.scss'


const dbInstance = collection(database, 'instanceNotes')

export default function NoteDetails( { ID } ){
    const [singleNote, setSingleNote] = useState([])

    const [noteTitle, setNoteTitle] = useState("")

    const [noteDesc, setNoteDesc] = useState('')

    const [isEdit, setIsEdit] = useState(false)

    const getSingleNote = async () => {
        if (ID) {
            const singleNote = doc(database, 'instanceNotes', ID)
            const data = await getDoc(singleNote)
            setSingleNote({...data.data(), id:data.id})
        }
    }

    useEffect(() => {
        getSingleNote();
    }, [ID])


    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleNote(data.docs.map((item) => {
                    return {...item.data(), id: item.id}
                })[0])
            })

    }

    useEffect(() => {
        getNotes();
    }, [])

    const getEditData = () => {
        setIsEdit(true)
        setNoteTitle(singleNote.noteTitle)
        setNoteDesc(singleNote.noteDesc)
    }
    
    const editNote = (id) => {
        const collectionById = doc(database, 'instanceNotes', id)

        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
            .then(() => {
                window.location.reload()
            })
    }

    const deleteNote = (id) => {
        const collectionById = doc(database, 'instanceNotes', id)

        deleteDoc(collectionById)
            .then(() => {
                window.location.reload
            })

    }
    return (
        <>
            <div>
                <button 
                    onClick={getEditData} 
                    className={styles.editBtn}
                >
                    Edit
                </button>
                <button 
                    onClick={() => deleteNote(singleNote.id)} 
                    className={styles.deleteBtn}
                >
                    Delete
                </button>
            </div>

            { isEdit ? (
                <div className={styles.inputContainer}>
                    <input 
                        className={styles.input}
                        placeholder='Enter the title'
                        value={singleNote.noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />

                    <div className={styles.ReactQuill}>
                        <ReactQuill 
                            value={singleNote.noteDesc}
                            onChange={setNoteDesc}
                        />
                    </div>
                

                    <button 
                        onClick={() => editNote(singleNote.id)}
                        className={styles.saveBtn}>
                        Update Note
                    </button>
                </div>
            ) : (
                <></>
            )}

            <h2>{singleNote.noteTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc}}></div>
        </>
    )
}