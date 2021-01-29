/**
 * Εισαγωγή της διεύθυνσης και των σχολίων στην φόρμα επιβεβαίωσης.
**/

const urlParams = new URLSearchParams(window.location.search);
// Εισαγωγή της τιμής που έχουμε αποδώσει στην διεύθυνση στο πεδίο της διεύθυνσης.
document.getElementById("address").value = urlParams.get('address');
// Εισαγωγή της τιμής που έχουμε αποδώσει στο πεδίο των σχολίων.
document.getElementById("comments").value = urlParams.get('comments');