import { db, storage } from '../firebase-config';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const getUrlImage = async (selectedImg) => {
    const filePath = `eventIMG/${Date.now()}`;
};
export { getUrlImage };
