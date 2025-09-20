import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO7yFIllU3udhAtJP0f6wFu7QvsXXzP1o",
    authDomain: "ksp-traffic-control-ff5ac.firebaseapp.com",
    projectId: "ksp-traffic-control-ff5ac",
    storageBucket: "ksp-traffic-control-ff5ac.appspot.com",
    messagingSenderId: "307072623604",
    appId: "1:307072623604:web:62ee9977aa9634bece0fa1",
    measurementId: "G-TYW5L6YZNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- IMPORTANT: Replace this with your admin email address ---
// This is the email that will have access to the admin page.
const ADMIN_EMAIL = "admin@example.com"; 

const sweetForm = document.getElementById('sweet-form');
const sweetsTableBody = document.getElementById('sweets-table-body');
const formTitle = document.getElementById('form-title');
const sweetIdField = document.getElementById('sweet-id');
const cancelEditBtn = document.getElementById('cancel-edit');

let allSweets = [];

// Check user auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Check if the logged-in user's email matches the admin email.
        if (user.email === ADMIN_EMAIL) {
            console.log(`Admin user authenticated: ${user.email}`);
            loadSweets();
        } else {
            console.warn(`Access denied. User ${user.email} is not an admin.`);
            document.querySelector('main').innerHTML = `<div class="container" style="text-align:center; padding: 4rem 0;"><h2>Access Denied</h2><p>You do not have permission to view this page.</p></div>`;
        }
    } else {
        window.location.href = '../index.html'; // Redirect to login if not signed in
    }
});

async function loadSweets() {
    try {
        const querySnapshot = await getDocs(collection(db, "sweets"));
        allSweets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderTable();
    } catch (error) {
        console.error("Error loading sweets: ", error);
    }
}

function renderTable() {
    sweetsTableBody.innerHTML = '';
    allSweets.forEach(sweet => {
        const row = `
            <tr>
                <td><img src="${sweet.imageUrl}" alt="${sweet.name}" width="50" height="50" style="object-fit: cover; border-radius: 5px;"></td>
                <td>${sweet.name}</td>
                <td>₹${sweet.price}</td>
                <td>
                    <button class="btn-edit" data-id="${sweet.id}">Edit</button>
                    <button class="btn-delete" data-id="${sweet.id}">Delete</button>
                </td>
            </tr>
        `;
        sweetsTableBody.innerHTML += row;
    });
}

sweetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const sweetData = {
        name: document.getElementById('sweet-name').value,
        price: parseFloat(document.getElementById('sweet-price').value),
        category: document.getElementById('sweet-category').value,
        description: document.getElementById('sweet-description').value,
        imageUrl: document.getElementById('sweet-image').value,
    };

    const sweetId = sweetIdField.value;

    try {
        if (sweetId) { // Update existing sweet
            const sweetRef = doc(db, "sweets", sweetId);
            await updateDoc(sweetRef, sweetData);
            alert('Sweet updated successfully!');
        } else { // Add new sweet
            await addDoc(collection(db, "sweets"), sweetData);
            alert('Sweet added successfully!');
        }
        sweetForm.reset();
        resetForm();
        loadSweets();
    } catch (error) {
        console.error("Error saving sweet: ", error);
        alert('Error saving sweet. Check console for details.');
    }
});

sweetsTableBody.addEventListener('click', (e) => {
    const sweetId = e.target.dataset.id;
    if (e.target.classList.contains('btn-edit')) {
        const sweetToEdit = allSweets.find(s => s.id === sweetId);
        populateFormForEdit(sweetToEdit);
    }
    if (e.target.classList.contains('btn-delete')) {
        if (confirm('Are you sure you want to delete this sweet?')) {
            deleteSweet(sweetId);
        }
    }
});

function populateFormForEdit(sweet) {
    formTitle.textContent = 'Edit Sweet';
    sweetIdField.value = sweet.id;
    document.getElementById('sweet-name').value = sweet.name;
    document.getElementById('sweet-price').value = sweet.price;
    document.getElementById('sweet-category').value = sweet.category;
    document.getElementById('sweet-description').value = sweet.description;
    document.getElementById('sweet-image').value = sweet.imageUrl;
    cancelEditBtn.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function resetForm() {
    formTitle.textContent = 'Add New Sweet';
    sweetIdField.value = '';
    sweetForm.reset();
    cancelEditBtn.classList.add('hidden');
}

cancelEditBtn.addEventListener('click', resetForm);

async function deleteSweet(id) {
    try {
        await deleteDoc(doc(db, "sweets", id));
        alert('Sweet deleted successfully!');
        loadSweets();
    } catch (error) {
        console.error("Error deleting sweet: ", error);
        alert('Error deleting sweet.');
    }
}
