import db from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const dataCollection = collection(db, "data");
class Dataservice {
    getData = () => {
        return getDocs(dataCollection)
    }

    addData = (newbook) =>{
        return addDoc(dataCollection, newbook)
    }

    updateData = (id, updatedData) => {
        return updateDoc(doc(dataCollection, id, updatedData))
    }

    deleteData = (id) => {
        return deleteDoc(doc(dataCollection, id))
    }
}

export default Dataservice