// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase config (already in your code)
const firebaseConfig = {
    apiKey: "AIzaSyCSc_JlrE5ojWvMSlE7upEBQqrJqV-7TZg",
    authDomain: "paid-2024.firebaseapp.com",
    projectId: "paid-2024",
    storageBucket: "paid-2024.appspot.com",
    messagingSenderId: "596840912456",
    appId: "1:596840912456:web:07cd2c51a78f280fcb2a7d",
    measurementId: "G-JDM0RF1T98"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




function heyLOL() {
    console.log("hey LOL")
};

// DOM ELEMENTS
const expenseInput = document.querySelector(".expense-input");
const expenseAmount = document.querySelector(".expense-amount-input");
// const paidCheckbox = document.getElementById("paid-checkbox");
const checked = document.querySelector(".checked");
const expensesContainer = document.querySelector(".user-input-expenses")
const addButton = document.getElementById("add-button");
const expenseInputContainer = document.querySelector(".expense-input-container")


// Function to save input value to Firestore
const saveExpenseToFirestore = async () => {
    const expenseValue = expenseInput.value;
    const amountValue = expenseAmount.value;
    const checkStatus = checked.checked;
    
    try {
        await setDoc(doc(db, "expenses", "entry1"), {
            expense: expenseValue,
            amount: amountValue,
            isChecked: checkStatus
        });
        console.log("All expenses saved to Firestore:");
    } catch (error) {
        console.error("Error saving to Firestore:", error);
    }
};


// Function to retrieve saved value from Firestore
const loadExpenseFromFirestore = async () => {
    try {
        const docRef = doc(db, "expenses", "entry1");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            expenseInput.value = data.expense || "";
            expenseAmount.value = data.amount || "";
            checked.checked = data.isChecked || false;
            console.log("Expense data loaded from Firestore:", data);
        } else {
            console.log("No saved expense data found.");
        }
    } catch (error) {
        console.error("Error loading from Firestore:", error);
    }
};



// Load saved value from Firestore on page load
window.addEventListener("DOMContentLoaded", loadExpenseFromFirestore);


// Save value to Firestore whenever input changes
expenseInput.addEventListener("input", saveExpenseToFirestore);
expenseAmount.addEventListener("input", saveExpenseToFirestore);
checked.addEventListener("change", saveExpenseToFirestore);


function addNewExpenseRow() {
    let newBar = document.createElement('div');
    newBar.className = "user-input-expenses";
    newBar.innerHTML = `<div>
                            <input type="text" class="expense-input">
                        </div>
                        <div>
                            <input type="text" class="expense-amount-input">
                        </div>
                        <div class="check">
                            <input type="checkbox" class="checked">
                        </div>`
    expenseInputContainer.appendChild(newBar)          

}


addButton.addEventListener("click", addNewExpenseRow)





