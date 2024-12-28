import { collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
import { db } from "../../server/firebase.js";

export const postOrder = async (payload) => {
    if (!payload) {
        return false;
    }
    try {
        const res = await addDoc(collection(db, 'orders'), { ...payload });
        
        return Boolean(res.id); // 'id' should be in response if successful
    } catch (err) {
        console.log('ERROR_POSTING_AN_ORDER_TO_FIREBASE', err);
    }
};

export const getAllOrders = async () => {
    try {
        const res = await getDocs(collection(db, 'orders'));
        const data = res?.docs.map(order => ({...order?.data(), id: order?.id}));

        return data || [];
    } catch (err) {
        console.log('ERROR_FETCHING_ALL_ORDERS_FROM_FIREBASE', err);
        return [];
    }
};
