const accountName = document.getElementById("account");

//const accountNames = document.querySelectorAll("[name='account']");
const accountNames = document.getElementsByClassName("accountID");

const submitApiRequestButtons = document.getElementsByClassName("submit-api-request")

console.log(accountNames)

accountName.addEventListener("keyup", (e) => {
    const value = e.target.value;

    Array.from(accountNames).forEach((field) => {
        field.innerHTML = value
    })

})

const validateForm = (e) => {
    console.log("Validate form", e.target.parentNode)
    const form = e.target.parentNode;
    const apiMethod = form["api-method"].value
    let apiRequest = form["api-request"].value

    apiRequest = "TEST"

    console.log("apiMethod:", apiMethod)
    console.log("apiRequest:", apiRequest)
}

Array.from(submitApiRequestButtons).forEach((submit) => {
    submit.addEventListener("click", validateForm)
})